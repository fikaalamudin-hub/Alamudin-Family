import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Volume2,
  VolumeX,
  Compass,
  BellRing,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { CityOption, PrayerName, PrayerSchedule } from '../types';
import { INDONESIAN_CITIES } from '../data/cities';
import {
  calculateDistanceToKaaba,
  calculateQiblaDirection,
  getCompassCardinalLabel,
  getNextPrayerAndFastingCountdowns,
  playGentleAdzanChime,
} from '../utils/islamicTime';

interface PrayerQiblaViewProps {
  now: Date;
  selectedCity: CityOption;
  onSelectCity: (cityId: string) => void;
  schedule: PrayerSchedule;
  scheduleSource: 'aladhan' | 'offline';
  isLoadingSchedule: boolean;
  onRefreshSchedule: () => void;
  adzanSoundEnabled: boolean;
  onToggleAdzanSound: () => void;
}

const PRAYER_ROWS: { key: PrayerName; label: string; desc: string }[] = [
  { key: 'Imsak', label: 'Imsak', desc: 'Batas sahur sebelum Subuh' },
  { key: 'Subuh', label: 'Subuh', desc: 'Sholat fajar 2 rakaat' },
  { key: 'Terbit', label: 'Terbit (Syuruq)', desc: 'Matahari terbit' },
  { key: 'Dhuha', label: 'Dhuha', desc: 'Awal waktu sholat Dhuha' },
  { key: 'Dzuhur', label: 'Dzuhur', desc: 'Sholat tengah hari 4 rakaat' },
  { key: 'Ashar', label: 'Ashar', desc: 'Sholat sore 4 rakaat' },
  { key: 'Maghrib', label: 'Maghrib', desc: 'Waktu berbuka puasa & 3 rakaat' },
  { key: 'Isya', label: 'Isya', desc: 'Sholat malam 4 rakaat' },
];

export const PrayerQiblaView: React.FC<PrayerQiblaViewProps> = ({
  now,
  selectedCity,
  onSelectCity,
  schedule,
  scheduleSource,
  isLoadingSchedule,
  onRefreshSchedule,
  adzanSoundEnabled,
  onToggleAdzanSound,
}) => {
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [compassActive, setCompassActive] = useState(false);
  const [testNotice, setTestNotice] = useState(false);

  const countdownInfo = getNextPrayerAndFastingCountdowns(schedule, now);
  const qiblaBearing = calculateQiblaDirection(selectedCity.lat, selectedCity.lng);
  const distanceKm = calculateDistanceToKaaba(selectedCity.lat, selectedCity.lng);
  const cardinalLabel = getCompassCardinalLabel(qiblaBearing);

  // Optional mobile device orientation listener
  useEffect(() => {
    if (!compassActive) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const webkitHeading = (event as unknown as { webkitCompassHeading?: number }).webkitCompassHeading;
      if (typeof webkitHeading === 'number') {
        setDeviceHeading(webkitHeading);
      } else if (typeof event.alpha === 'number') {
        setDeviceHeading((360 - event.alpha) % 360);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [compassActive]);

  const handleEnableDeviceCompass = async () => {
    if (compassActive) {
      setCompassActive(false);
      setDeviceHeading(null);
      return;
    }
    try {
      const DeviceOrientationEvt = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };
      if (DeviceOrientationEvt && typeof DeviceOrientationEvt.requestPermission === 'function') {
        const res = await DeviceOrientationEvt.requestPermission();
        if (res === 'granted') {
          setCompassActive(true);
        }
      } else {
        setCompassActive(true);
      }
    } catch {
      setCompassActive(true);
    }
  };

  const handleTestAdzan = () => {
    playGentleAdzanChime();
    setTestNotice(true);
    setTimeout(() => setTestNotice(false), 4500);
  };

  // Needle rotation relative to North (or device heading if sensor active)
  const dialRotation = deviceHeading !== null ? -deviceHeading : 0;
  const qiblaPointerRotation = qiblaBearing + dialRotation;

  return (
    <div className="space-y-8">
      {/* Page Header & City Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
            Jadwal Sholat & Arah Kiblat
          </h2>
          <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">
            Waktu sholat akurat sesuai standar Kemenag RI ·{' '}
            {scheduleSource === 'aladhan' ? 'Sinkronisasi langsung Aladhan' : 'Jadwal lokal tersimpan'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 absolute left-3.5 pointer-events-none" />
            <select
              aria-label="Pilih Kota di Indonesia"
              value={selectedCity.id}
              onChange={(e) => onSelectCity(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl bg-white dark:bg-[#12211C] border border-[#DFD8C4] dark:border-emerald-900/70 text-sm font-medium text-[#17231E] dark:text-[#F2EFE9] min-h-[44px] cursor-pointer"
            >
              {INDONESIAN_CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.province})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onRefreshSchedule}
            disabled={isLoadingSchedule}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#12211C] border border-[#DFD8C4] dark:border-emerald-900/70 text-sm font-medium text-[#2A3B33] dark:text-[#E5ECE8] hover:border-emerald-600/50 transition-colors min-h-[44px] whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingSchedule ? 'animate-spin' : ''}`} />
            <span>Perbarui</span>
          </button>
        </div>
      </div>

      {/* Test Adzan Visual Alert Banner */}
      {testNotice && (
        <div className="rounded-xl bg-emerald-700 text-white px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BellRing className="w-5 h-5 text-[#F6E2A1] shrink-0" />
            <div>
              <p className="text-sm font-semibold">Simulasi Pengingat Waktu Adzan Aktif</p>
              <p className="text-xs text-emerald-100">
                Notifikasi visual dan nada lembut akan muncul otomatis saat masuk waktu sholat fardhu.
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
        </div>
      )}

      {/* Main 2-Column Layout: Schedule Table + Qibla Compass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Schedule List (7 cols) */}
        <section className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EFECE1] dark:border-emerald-950/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-base text-[#17231E] dark:text-[#F2EFE9]">
                Jadwal Hari Ini — {selectedCity.name}
              </h3>
              <p className="text-xs text-[#6A7870] dark:text-emerald-200/60">
                Sholat berikutnya: {countdownInfo.nextPrayer} dalam{' '}
                <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">
                  {countdownInfo.nextPrayerCountdown}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleAdzanSound}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors min-h-[40px] whitespace-nowrap ${
                  adzanSoundEnabled
                    ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-transparent border-[#E4DEC9] dark:border-emerald-900/60 text-[#6A7870] dark:text-emerald-200/60'
                }`}
              >
                {adzanSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{adzanSoundEnabled ? 'Pengingat Aktif' : 'Pengingat Senyap'}</span>
              </button>

              <button
                type="button"
                onClick={handleTestAdzan}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-[#F5F2EA] dark:bg-emerald-950/60 text-[#2A3B33] dark:text-emerald-200 hover:bg-[#EAE4D3] dark:hover:bg-emerald-900/50 transition-colors min-h-[40px] whitespace-nowrap"
              >
                Tes Nada
              </button>
            </div>
          </div>

          <div className="divide-y divide-[#EFECE1] dark:divide-emerald-950/80">
            {PRAYER_ROWS.map((row) => {
              const isNext = countdownInfo.nextPrayer === row.key;
              const isActive = countdownInfo.activePrayer === row.key;
              return (
                <div
                  key={row.key}
                  className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                    isNext
                      ? 'bg-emerald-50/80 dark:bg-emerald-900/25'
                      : isActive
                      ? 'bg-[#FAF8F3] dark:bg-[#152821]'
                      : ''
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-base font-semibold ${
                          isNext
                            ? 'text-emerald-800 dark:text-emerald-300'
                            : 'text-[#17231E] dark:text-[#F2EFE9]'
                        }`}
                      >
                        {row.label}
                      </span>
                      {isNext && (
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          · Berikutnya
                        </span>
                      )}
                      {!isNext && isActive && (
                        <span className="text-xs font-medium text-[#A57A1D] dark:text-[#E5C97B]">
                          · Waktu Berjalan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6A7870] dark:text-emerald-200/60 mt-0.5">{row.desc}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono-tabular text-lg font-semibold ${
                        isNext
                          ? 'text-emerald-800 dark:text-emerald-300'
                          : 'text-[#17231E] dark:text-[#F2EFE9]'
                      }`}
                    >
                      {schedule[row.key]}
                    </span>
                    <span className="ml-1.5 text-xs text-[#6A7870] dark:text-emerald-200/60">
                      {selectedCity.timezone}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Qibla Compass Card (5 cols) */}
        <section className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-6 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                Kompas Arah Kiblat
              </h3>
              <p className="text-xs text-[#6A7870] dark:text-emerald-200/65 mt-1">
                {selectedCity.name} · {qiblaBearing}° {cardinalLabel} · {distanceKm.toLocaleString('id-ID')} km ke Ka’bah
              </p>
            </div>
            <Compass className="w-5 h-5 text-[#B88B28] dark:text-[#E5C97B] shrink-0" />
          </div>

          {/* Interactive SVG Compass */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                {/* Outer Ring */}
                <circle
                  cx="120"
                  cy="120"
                  r="108"
                  fill="none"
                  className="stroke-[#E4DEC9] dark:stroke-emerald-900"
                  strokeWidth="2"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="88"
                  fill="none"
                  className="stroke-[#EFECE1] dark:stroke-emerald-950"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Rotating Cardinal Dial */}
                <g
                  style={{
                    transform: `rotate(${dialRotation}deg)`,
                    transformOrigin: '120px 120px',
                    transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <text
                    x="120"
                    y="24"
                    textAnchor="middle"
                    className="fill-emerald-700 dark:fill-emerald-400 text-[13px] font-bold"
                  >
                    U
                  </text>
                  <text
                    x="220"
                    y="125"
                    textAnchor="middle"
                    className="fill-[#6A7870] dark:fill-emerald-200/60 text-[12px] font-medium"
                  >
                    T
                  </text>
                  <text
                    x="120"
                    y="224"
                    textAnchor="middle"
                    className="fill-[#6A7870] dark:fill-emerald-200/60 text-[12px] font-medium"
                  >
                    S
                  </text>
                  <text
                    x="20"
                    y="125"
                    textAnchor="middle"
                    className="fill-[#6A7870] dark:fill-emerald-200/60 text-[12px] font-medium"
                  >
                    B
                  </text>
                </g>

                {/* Qibla Bearing Pointer */}
                <g
                  style={{
                    transform: `rotate(${qiblaPointerRotation}deg)`,
                    transformOrigin: '120px 120px',
                    transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Gold Kaaba Pointer */}
                  <polygon points="120,34 128,120 112,120" fill="#059669" />
                  <polygon points="120,200 126,120 114,120" className="fill-[#D4CBB4] dark:fill-emerald-900" />
                  {/* Small Kaaba square icon at tip */}
                  <rect x="113" y="26" width="14" height="14" rx="2" fill="#17231E" stroke="#E5C97B" strokeWidth="1.5" />
                </g>

                {/* Center Pivot */}
                <circle cx="120" cy="120" r="8" fill="#D4AF37" />
                <circle cx="120" cy="120" r="3" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5B6B62] dark:text-emerald-200/70">Sudut Kiblat dari Utara</span>
              <span className="font-mono-tabular font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                {qiblaBearing}° ({cardinalLabel})
              </span>
            </div>

            <button
              type="button"
              onClick={handleEnableDeviceCompass}
              className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium border transition-colors min-h-[44px] ${
                compassActive
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-[#FAF8F3] dark:bg-[#162922] text-[#17231E] dark:text-[#F2EFE9] border-[#DFD8C4] dark:border-emerald-900/70 hover:border-emerald-600/50'
              }`}
            >
              {compassActive
                ? deviceHeading !== null
                  ? `Sensor Kompas Aktif (${Math.round(deviceHeading)}°)`
                  : 'Menunggu Sensor Kompas HP...'
                : 'Aktifkan Sensor Kompas Perangkat'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
