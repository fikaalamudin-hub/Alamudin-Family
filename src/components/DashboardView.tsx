import React, { useState } from 'react';
import { QuickMenu } from './QuickMenu';
import heroImg from '../assets/images/hero_keluarga_berkah_1795585236214.jpg';
import {
  Check,
  BookOpen,
  ArrowRight,
  Clock,
  MoonStar,
  Calendar,
  HeartHandshake,
  RotateCcw,
} from 'lucide-react';
import {
  CityOption,
  DailyChecklistMap,
  FamilyMemberId,
  NavTab,
  PrayerSchedule,
  QuranBookmark,
} from '../types';
import { FAMILY_MEMBERS, IBADAH_HABITS } from '../data/cities';
import {
  formatMasehiDate,
  getHijriDateInfo,
  getNextPrayerAndFastingCountdowns,
  getNextRamadhanCountdown,
  getTodayDateKey,
} from '../utils/islamicTime';

interface DashboardViewProps {
  now: Date;
  selectedCity: CityOption;
  schedule: PrayerSchedule;
  checklist: DailyChecklistMap;
  onToggleHabit: (dateKey: string, memberId: FamilyMemberId, habitId: string) => void;
  onResetTodayMember: (dateKey: string, memberId: FamilyMemberId) => void;
  bookmark: QuranBookmark | null;
  onNavigate: (tab: NavTab, openBookmark?: boolean) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  now,
  selectedCity,
  schedule,
  checklist,
  onToggleHabit,
  onResetTodayMember,
  bookmark,
  onNavigate,
}) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMemberId>('ayah');
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const todayKey = getTodayDateKey(now);
  const masehiStr = formatMasehiDate(now);
  const hijriInfo = getHijriDateInfo(now);
  const prayerCountdowns = getNextPrayerAndFastingCountdowns(schedule, now);
  const ramadhanInfo = getNextRamadhanCountdown(now);

  const getGreetingByHour = (hour: number): string => {
    if (hour >= 3 && hour < 11) return 'Selamat Pagi, Keluarga Alamudin';
    if (hour >= 11 && hour < 15) return 'Selamat Siang, Keluarga Alamudin';
    if (hour >= 15 && hour < 18) return 'Selamat Sore, Keluarga Alamudin';
    return 'Selamat Malam, Keluarga Alamudin';
  };

  const todayMap = checklist[todayKey] || {};
  const currentMemberCompleted = todayMap[selectedMember] || [];
  const totalHabits = IBADAH_HABITS.length;

  const totalFamilyChecks = FAMILY_MEMBERS.reduce((acc, m) => {
    return acc + (todayMap[m.id]?.length || 0);
  }, 0);
  const maxFamilyChecks = FAMILY_MEMBERS.length * totalHabits;
  const familyPct = Math.round((totalFamilyChecks / maxFamilyChecks) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Banner with Serene Architecture & Real-Time Primary Countdown */}
      <section className="relative overflow-hidden rounded-2xl border border-[#DFD8C4] dark:border-emerald-900/60 bg-[#10261D]">
        {!heroImgFailed && (
          <img
            src={heroImg}
            alt="Pelataran masjid bernuansa batu gading dan zamrud saat cahaya pagi"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0B1D16]/95 via-[#0B1D16]/80 to-[#0B1D16]/55"
          aria-hidden="true"
        />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 text-[#FAF8F3]">
            <p className="text-xs sm:text-sm font-medium text-[#E5C97B] tracking-wide">
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {getGreetingByHour(now.getHours())}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#DCE5DF]">
              <span>{masehiStr}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#F3DF9B]">{hijriInfo.formatted}</span>
              <span aria-hidden="true">·</span>
              <span>
                {selectedCity.name} ({selectedCity.timezone})
              </span>
            </div>
          </div>

          {/* Dominant Focal Anchor: Next Prayer Real-time Timer */}
          <div className="lg:col-span-5 bg-[#091611]/75 backdrop-blur-md border border-emerald-500/25 rounded-xl p-5 sm:p-6 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-emerald-200/80">Menuju Sholat Berikutnya</p>
                <p className="font-display text-xl sm:text-2xl font-semibold text-white mt-0.5">
                  {prayerCountdowns.nextPrayer}{' '}
                  <span className="text-base font-normal text-[#E5C97B] font-mono-tabular">
                    ({prayerCountdowns.nextPrayerTime})
                  </span>
                </p>
              </div>
              <Clock className="w-6 h-6 text-[#E5C97B] shrink-0" />
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between gap-4">
              <span className="text-xs text-emerald-100/75">Sisa Waktu</span>
              <span className="font-mono-tabular text-3xl sm:text-4xl font-semibold tracking-tight text-[#F6E2A1]">
                {prayerCountdowns.nextPrayerCountdown}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Cepat berwarna */}
      <QuickMenu onNavigate={onNavigate} />

      {/* Countdown Strip: Buka Puasa / Imsak + Ramadhan Berikutnya + Lanjutkan Tilawah */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Fasting Countdown (Maghrib / Imsak) */}
        <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#5E6D65] dark:text-emerald-300/70">
                Hitung Mundur Puasa
              </p>
              <h3 className="text-base font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1">
                {prayerCountdowns.fastingLabel}
              </h3>
            </div>
            <MoonStar className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          </div>

          <div className="mt-5 pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80 flex items-baseline justify-between">
            <span className="text-xs text-[#6A7870] dark:text-emerald-200/60 tabular-nums">
              Pukul {prayerCountdowns.fastingTargetTime} {selectedCity.timezone}
            </span>
            <span className="font-mono-tabular text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
              {prayerCountdowns.fastingCountdown}
            </span>
          </div>
        </div>

        {/* Card 2: Next Ramadhan Countdown */}
        <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#5E6D65] dark:text-emerald-300/70">
                Menanti Bulan Suci
              </p>
              <h3 className="text-base font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1">
                {ramadhanInfo.isCurrentlyRamadhan
                  ? `Ramadhan Hari ke-${ramadhanInfo.ramadhanDay}`
                  : `Menuju Ramadhan ${ramadhanInfo.targetYearH} H`}
              </h3>
            </div>
            <Calendar className="w-5 h-5 text-[#B88B28] dark:text-[#E5C97B] shrink-0" />
          </div>

          <div className="mt-5 pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80 flex items-baseline justify-between gap-2">
            {ramadhanInfo.isCurrentlyRamadhan ? (
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Marhaban ya Ramadhan, mari perbanyak amal.
              </span>
            ) : (
              <>
                <span className="text-xs text-[#6A7870] dark:text-emerald-200/60 truncate">
                  {ramadhanInfo.targetDateFormatted}
                </span>
                <span className="font-mono-tabular text-2xl font-semibold text-[#A57A1D] dark:text-[#E5C97B] whitespace-nowrap">
                  {ramadhanInfo.days} Hari
                </span>
              </>
            )}
          </div>
        </div>

        {/* Card 3: Al-Qur'an Terakhir Dibaca / Quick Action */}
        <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#5E6D65] dark:text-emerald-300/70">
                Tilawah Al-Qur’an
              </p>
              <h3 className="text-base font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1">
                {bookmark
                  ? `QS. ${bookmark.surahName} : Ayat ${bookmark.ayahNumber}`
                  : 'Mulai Tadarus Hari Ini'}
              </h3>
            </div>
            <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          </div>

          <div className="mt-5 pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80 flex items-center justify-between">
            <span className="text-xs text-[#6A7870] dark:text-emerald-200/60">
              {bookmark ? 'Penanda tersimpan' : '114 Surah lengkap'}
            </span>
            <button
              type="button"
              onClick={() => onNavigate('quran', Boolean(bookmark))}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors min-h-[40px] whitespace-nowrap"
            >
              <span>{bookmark ? 'Lanjutkan Baca' : 'Buka Al-Qur’an'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Tracker Ibadah Keluarga */}
      <section className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#EFECE1] dark:border-emerald-950/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                Tracker Ibadah Keluarga Hari Ini
              </h3>
              <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-0.5">
                Centang ibadah harian bersama untuk saling menyemangati · Tersimpan otomatis ({familyPct}% capaian keluarga)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onResetTodayMember(todayKey, selectedMember)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#5B6B62] dark:text-emerald-200/80 hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40 border border-[#E4DEC9] dark:border-emerald-900/60 transition-colors min-h-[40px] self-start sm:self-auto whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset {FAMILY_MEMBERS.find((m) => m.id === selectedMember)?.label}</span>
          </button>
        </div>

        {/* Family Member Overview Selector */}
        <div className="grid grid-cols-3 border-b border-[#EFECE1] dark:border-emerald-950/80 bg-[#FAF8F3]/70 dark:bg-[#0D1914]">
          {FAMILY_MEMBERS.map((member) => {
            const doneCount = todayMap[member.id]?.length || 0;
            const isSelected = selectedMember === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member.id)}
                className={`p-4 text-left transition-colors border-b-2 min-h-[44px] ${
                  isSelected
                    ? 'border-emerald-700 dark:border-emerald-400 bg-white dark:bg-[#12211C]'
                    : 'border-transparent hover:bg-[#F2EFE5] dark:hover:bg-emerald-950/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm sm:text-base font-semibold ${
                      isSelected
                        ? 'text-emerald-800 dark:text-emerald-300'
                        : 'text-[#3D4E45] dark:text-[#B9C7BF]'
                    }`}
                  >
                    {member.label}
                  </span>
                  <span className="font-mono-tabular text-xs font-semibold text-[#6A7870] dark:text-emerald-300/70">
                    {doneCount}/{totalHabits}
                  </span>
                </div>
                <p className="text-xs text-[#6A7870] dark:text-emerald-200/50 mt-0.5 truncate">
                  {member.roleDesc}
                </p>
                {/* Thin progress bar */}
                <div className="mt-2.5 h-1.5 w-full rounded-full bg-[#E8E3D3] dark:bg-emerald-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.round((doneCount / totalHabits) * 100)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Checklist */}
        <div className="divide-y divide-[#EFECE1] dark:divide-emerald-950/80">
          {IBADAH_HABITS.map((habit) => {
            const isChecked = currentMemberCompleted.includes(habit.id);
            const activeLabel = FAMILY_MEMBERS.find((m) => m.id === selectedMember)?.label;
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => onToggleHabit(todayKey, selectedMember, habit.id)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#FAF8F3] dark:hover:bg-[#162922] transition-colors min-h-[56px]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-emerald-700 border-emerald-700 dark:bg-emerald-500 dark:border-emerald-500 text-white'
                        : 'border-[#CFC8B4] dark:border-emerald-800 bg-transparent'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[2.5]" />}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-medium truncate ${
                      isChecked
                        ? 'text-[#6A7870] dark:text-emerald-200/50 line-through'
                        : 'text-[#17231E] dark:text-[#F2EFE9]'
                    }`}
                  >
                    {habit.label}
                  </span>
                </div>

                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isChecked
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-[#7C8A82] dark:text-emerald-200/45'
                  }`}
                >
                  {isChecked ? `Selesai (${activeLabel})` : 'Belum'}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
