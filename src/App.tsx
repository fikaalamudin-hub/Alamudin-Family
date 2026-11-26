import { useEffect, useRef, useState } from 'react';
import { BellRing, Moon, Sun, WifiOff, X } from 'lucide-react';
import {
  CityOption,
  DailyChecklistMap,
  FamilyMemberId,
  NavTab,
  PrayerName,
  PrayerSchedule,
  QuranBookmark,
} from './types';
import { INDONESIAN_CITIES } from './data/cities';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchPrayerTimesForCity } from './services/api';
import { getTodayDateKey, playGentleAdzanChime } from './utils/islamicTime';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/DashboardView';
import { PrayerQiblaView } from './components/PrayerQiblaView';
import { DuaDzikirView } from './components/DuaDzikirView';
import { QuranView } from './components/QuranView';
import { TajwidView } from './components/TajwidView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { useOnlineStatus } from './hooks/usePWAInstall';

const FARDHU_PRAYERS: PrayerName[] = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [now, setNow] = useState<Date>(() => new Date());
  const isOnline = useOnlineStatus();

  // Persisted Settings & User State in LocalStorage
  const [isDark, setIsDark] = useLocalStorage<boolean>('kb_dark_mode', false);
  const [cityId, setCityId] = useLocalStorage<string>('kb_city_id', 'jakarta');
  const [checklist, setChecklist] = useLocalStorage<DailyChecklistMap>('kb_ibadah_checklist', {});
  const [bookmark, setBookmark] = useLocalStorage<QuranBookmark | null>('kb_quran_bookmark', null);
  const [arabicFontSize, setArabicFontSize] = useLocalStorage<number>('kb_arabic_font_size', 30);
  const [adzanSoundEnabled, setAdzanSoundEnabled] = useLocalStorage<boolean>('kb_adzan_sound', true);

  const selectedCity: CityOption =
    INDONESIAN_CITIES.find((c) => c.id === cityId) || INDONESIAN_CITIES[0];

  const [schedule, setSchedule] = useState<PrayerSchedule>(selectedCity.fallbackTimes);
  const [scheduleSource, setScheduleSource] = useState<'aladhan' | 'offline'>('offline');
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  const [adzanBanner, setAdzanBanner] = useState<{ prayer: PrayerName; time: string } | null>(null);
  const lastNotifiedKeyRef = useRef<string>('');
  const [bookmarkTrigger, setBookmarkTrigger] = useState(0);

  // Sync Tailwind .dark class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Real-time 1-second clock
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load prayer schedule when city changes
  const loadSchedule = async (city: CityOption) => {
    setSchedule(city.fallbackTimes);
    setIsLoadingSchedule(true);
    const res = await fetchPrayerTimesForCity(city);
    setSchedule(res.schedule);
    setScheduleSource(res.source);
    setIsLoadingSchedule(false);
  };

  useEffect(() => {
    loadSchedule(selectedCity);
  }, [selectedCity.id]);

  // Check if current HH:mm matches a fardhu prayer time to trigger visual/audio notification
  useEffect(() => {
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentHHMM = `${hh}:${mm}`;
    const dateKey = getTodayDateKey(now);

    for (const p of FARDHU_PRAYERS) {
      if (schedule[p] === currentHHMM) {
        const triggerKey = `${dateKey}-${p}-${currentHHMM}`;
        if (lastNotifiedKeyRef.current !== triggerKey) {
          lastNotifiedKeyRef.current = triggerKey;
          setAdzanBanner({ prayer: p, time: currentHHMM });
          if (adzanSoundEnabled) {
            playGentleAdzanChime();
          }
        }
        break;
      }
    }
  }, [now, schedule, adzanSoundEnabled]);

  const handleToggleHabit = (dateKey: string, memberId: FamilyMemberId, habitId: string) => {
    setChecklist((prev) => {
      const dayMap = prev[dateKey] || {};
      const currentList = dayMap[memberId] || [];
      const exists = currentList.includes(habitId);
      const nextList = exists
        ? currentList.filter((id) => id !== habitId)
        : [...currentList, habitId];

      return {
        ...prev,
        [dateKey]: {
          ...dayMap,
          [memberId]: nextList,
        },
      };
    });
  };

  const handleResetTodayMember = (dateKey: string, memberId: FamilyMemberId) => {
    setChecklist((prev) => {
      const dayMap = prev[dateKey] || {};
      return {
        ...prev,
        [dateKey]: {
          ...dayMap,
          [memberId]: [],
        },
      };
    });
  };

  const handleNavigate = (tab: NavTab, openBookmark?: boolean) => {
    setActiveTab(tab);
    if (tab === 'quran' && openBookmark) {
      setBookmarkTrigger((n) => n + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#0B1411] text-[#17231E] dark:text-[#F2EFE9] transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
        selectedCity={selectedCity}
      />

      {/* Mobile Compact Header (52px) */}
      <header className="lg:hidden sticky top-0 z-30 h-[52px] px-4 bg-[#FAF8F3]/95 dark:bg-[#0F1C17]/95 backdrop-blur-md border-b border-[#E4DEC9] dark:border-emerald-950/90 flex items-center justify-between gap-2">
        <span className="font-display text-lg font-semibold text-[#14241D] dark:text-[#F5F2EA] whitespace-nowrap truncate">
          Fika Family&apos;s
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <PWAInstallButton variant="compact" />
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#2A3B33] dark:text-[#F3DF9B]"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="lg:pl-[264px] pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-9">
          {/* Offline Connectivity Banner */}
          {!isOnline && (
            <div className="mb-5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 px-4 py-3 flex items-center gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <WifiOff className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <span>
                Mode Offline Aktif — Aplikasi tetap dapat digunakan dengan data jadwal, doa, dan surah yang tersimpan di perangkat Anda.
              </span>
            </div>
          )}
          {/* Live Adzan Visual Banner if Prayer Time Arrives */}
          {adzanBanner && (
            <div className="mb-6 rounded-2xl bg-emerald-700 text-white px-5 py-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <BellRing className="w-5 h-5 text-[#F6E2A1] shrink-0" />
                <div>
                  <p className="text-sm sm:text-base font-semibold">
                    Telah Masuk Waktu Sholat {adzanBanner.prayer} ({adzanBanner.time} {selectedCity.timezone})
                  </p>
                  <p className="text-xs text-emerald-100">
                    Untuk wilayah {selectedCity.name} dan sekitarnya. Mari berwudhu dan laksanakan sholat berjamaah.
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup pengingat sholat"
                onClick={() => setAdzanBanner(null)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-emerald-600/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              now={now}
              selectedCity={selectedCity}
              schedule={schedule}
              checklist={checklist}
              onToggleHabit={handleToggleHabit}
              onResetTodayMember={handleResetTodayMember}
              bookmark={bookmark}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'prayer' && (
            <PrayerQiblaView
              now={now}
              selectedCity={selectedCity}
              onSelectCity={(id) => setCityId(id)}
              schedule={schedule}
              scheduleSource={scheduleSource}
              isLoadingSchedule={isLoadingSchedule}
              onRefreshSchedule={() => loadSchedule(selectedCity)}
              adzanSoundEnabled={adzanSoundEnabled}
              onToggleAdzanSound={() => setAdzanSoundEnabled((v) => !v)}
            />
          )}

          {activeTab === 'dua' && (
            <DuaDzikirView
              arabicFontSize={arabicFontSize}
              onChangeArabicFontSize={setArabicFontSize}
            />
          )}

          {activeTab === 'quran' && (
            <QuranView
              arabicFontSize={arabicFontSize}
              onChangeArabicFontSize={setArabicFontSize}
              bookmark={bookmark}
              onSaveBookmark={setBookmark}
              autoOpenBookmarkTrigger={bookmarkTrigger}
            />
          )}

          {activeTab === 'tajwid' && <TajwidView />}

          {/* Quiet Editorial Footer */}
          <footer className="mt-14 pt-6 border-t border-[#E4DEC9] dark:border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6A7870] dark:text-emerald-200/50">
            <span>Fika Family&apos;s · Sakinah Mawaddah Warohmah</span>
            <span>Data tersimpan otomatis di perangkat Anda</span>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} onSelectTab={(tab) => handleNavigate(tab)} />
    </div>
  );
}
