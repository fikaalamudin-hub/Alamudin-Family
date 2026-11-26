import { PrayerName, PrayerSchedule } from '../types';

const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Menghitung sudut arah kiblat (dalam derajat dari Utara searah jarum jam)
 */
export function calculateQiblaDirection(lat: number, lng: number): number {
  const phiK = toRadians(KAABA_LAT);
  const lambdaK = toRadians(KAABA_LNG);
  const phi = toRadians(lat);
  const lambda = toRadians(lng);

  const y = Math.sin(lambdaK - lambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  let bearing = toDegrees(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;
  return Math.round(bearing * 10) / 10;
}

/**
 * Menghitung jarak dari kota ke Ka'bah (km) dengan formula Haversine
 */
export function calculateDistanceToKaaba(lat: number, lng: number): number {
  const R = 6371;
  const dLat = toRadians(KAABA_LAT - lat);
  const dLon = toRadians(KAABA_LNG - lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat)) * Math.cos(toRadians(KAABA_LAT)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function getCompassCardinalLabel(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return 'Utara';
  if (deg >= 22.5 && deg < 67.5) return 'Timur Laut';
  if (deg >= 67.5 && deg < 112.5) return 'Timur';
  if (deg >= 112.5 && deg < 157.5) return 'Tenggara';
  if (deg >= 157.5 && deg < 202.5) return 'Selatan';
  if (deg >= 202.5 && deg < 247.5) return 'Barat Daya';
  if (deg >= 247.5 && deg < 292.5) return 'Barat';
  return 'Barat Laut';
}

export function getTodayDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatMasehiDate(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

const HIJRI_MONTHS_ID = [
  'Muharram',
  'Safar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  'Sya\'ban',
  'Ramadhan',
  'Syawal',
  'Dzulqa\'dah',
  'Dzulhijjah',
];

function getHijriPartsWithIntl(date: Date): { day: number; month: number; year: number } | null {
  try {
    const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = fmt.formatToParts(date);
    const day = Number(parts.find((p) => p.type === 'day')?.value);
    const month = Number(parts.find((p) => p.type === 'month')?.value);
    const yearStr = parts.find((p) => p.type === 'year')?.value || '';
    const year = Number(yearStr.replace(/\D/g, ''));
    if (day && month && year) {
      return { day, month, year };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fallback tabular Islamic calendar approximation if browser lacks ICU islamic-umalqura
 */
function approximateHijri(date: Date): { day: number; month: number; year: number } {
  const jd = Math.floor(date.getTime() / 86400000) + 2440588;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month, year };
}

export function getHijriDateInfo(date: Date = new Date()): {
  day: number;
  month: number;
  monthName: string;
  year: number;
  formatted: string;
} {
  const parts = getHijriPartsWithIntl(date) || approximateHijri(date);
  const monthName = HIJRI_MONTHS_ID[parts.month - 1] || 'Hijriah';
  return {
    day: parts.day,
    month: parts.month,
    monthName,
    year: parts.year,
    formatted: `${parts.day} ${monthName} ${parts.year} H`,
  };
}

/**
 * Menghitung sisa hari/jam/menit menuju 1 Ramadhan berikutnya
 */
export function getNextRamadhanCountdown(now: Date = new Date()): {
  isCurrentlyRamadhan: boolean;
  ramadhanDay: number | null;
  targetYearH: number;
  days: number;
  hours: number;
  minutes: number;
  targetDateFormatted: string;
} {
  const currentHijri = getHijriDateInfo(now);
  if (currentHijri.month === 9) {
    return {
      isCurrentlyRamadhan: true,
      ramadhanDay: currentHijri.day,
      targetYearH: currentHijri.year,
      days: 0,
      hours: 0,
      minutes: 0,
      targetDateFormatted: `Ramadhan ${currentHijri.year} H`,
    };
  }

  // Probe forward day by day (max 370 days) to find 1 Ramadhan
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  let targetDate: Date | null = null;
  let targetYearH = currentHijri.month < 9 ? currentHijri.year : currentHijri.year + 1;

  for (let i = 1; i <= 370; i++) {
    cursor.setDate(cursor.getDate() + 1);
    const h = getHijriDateInfo(cursor);
    if (h.month === 9 && h.day === 1) {
      targetDate = new Date(cursor.getTime());
      targetYearH = h.year;
      break;
    }
  }

  if (!targetDate) {
    // Fallback approx 29.53 days per Hijri month
    const monthsLeft = currentHijri.month < 9 ? 9 - currentHijri.month : 12 - currentHijri.month + 9;
    const approxDays = Math.max(1, Math.round(monthsLeft * 29.53 - currentHijri.day));
    targetDate = new Date(now.getTime() + approxDays * 86400000);
  }

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(diffMs / 86400000);
  const hours = Math.floor((diffMs % 86400000) / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);

  return {
    isCurrentlyRamadhan: false,
    ramadhanDay: null,
    targetYearH,
    days,
    hours,
    minutes,
    targetDateFormatted: formatMasehiDate(targetDate),
  };
}

/**
 * Mengubah string "HH:mm" menjadi Date hari ini
 */
export function parseTimeToday(timeStr: string, now: Date = new Date()): Date {
  const clean = timeStr.split(' ')[0];
  const [hStr, mStr] = clean.split(':');
  const h = Number(hStr) || 0;
  const m = Number(mStr) || 0;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
}

export function formatCountdownHMS(diffMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getNextPrayerAndFastingCountdowns(schedule: PrayerSchedule, now: Date = new Date()): {
  nextPrayer: PrayerName;
  nextPrayerTime: string;
  nextPrayerCountdown: string;
  activePrayer: PrayerName;
  fastingLabel: string;
  fastingTargetTime: string;
  fastingCountdown: string;
} {
  const coreOrder: PrayerName[] = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

  let nextPrayer: PrayerName = 'Subuh';
  let nextPrayerDate: Date | null = null;
  let activePrayer: PrayerName = 'Isya';

  for (let i = 0; i < coreOrder.length; i++) {
    const name = coreOrder[i];
    const target = parseTimeToday(schedule[name], now);
    if (target.getTime() > now.getTime()) {
      nextPrayer = name;
      nextPrayerDate = target;
      activePrayer = i === 0 ? 'Isya' : coreOrder[i - 1];
      break;
    }
  }

  if (!nextPrayerDate) {
    // Setelah Isya -> Subuh esok hari
    nextPrayer = 'Subuh';
    activePrayer = 'Isya';
    const tomorrowSubuh = parseTimeToday(schedule.Subuh, now);
    tomorrowSubuh.setDate(tomorrowSubuh.getDate() + 1);
    nextPrayerDate = tomorrowSubuh;
  }

  // Fasting countdown: Antara Imsak/Subuh dan Maghrib -> Hitung mundur Buka Puasa (Maghrib)
  // Setelah Maghrib -> Hitung mundur Imsak esok hari
  const imsakToday = parseTimeToday(schedule.Imsak, now);
  const maghribToday = parseTimeToday(schedule.Maghrib, now);

  let fastingLabel = 'Menuju Buka Puasa (Maghrib)';
  let fastingTargetTime = schedule.Maghrib;
  let fastingTargetDate = maghribToday;

  if (now.getTime() < imsakToday.getTime()) {
    fastingLabel = 'Menuju Imsak';
    fastingTargetTime = schedule.Imsak;
    fastingTargetDate = imsakToday;
  } else if (now.getTime() >= maghribToday.getTime()) {
    fastingLabel = 'Menuju Imsak Esok Hari';
    fastingTargetTime = schedule.Imsak;
    const tomorrowImsak = new Date(imsakToday.getTime());
    tomorrowImsak.setDate(tomorrowImsak.getDate() + 1);
    fastingTargetDate = tomorrowImsak;
  }

  return {
    nextPrayer,
    nextPrayerTime: schedule[nextPrayer],
    nextPrayerCountdown: formatCountdownHMS(nextPrayerDate.getTime() - now.getTime()),
    activePrayer,
    fastingLabel,
    fastingTargetTime,
    fastingCountdown: formatCountdownHMS(fastingTargetDate.getTime() - now.getTime()),
  };
}

/**
 * Menghasilkan nada pengingat adzan yang lembut menggunakan Web Audio API
 */
export function playGentleAdzanChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 659.25, 1046.5]; // C5 E5 G5 E5 C6 gentle pentatonic chime
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.28);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + idx * 0.28 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.28 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.28);
      osc.stop(ctx.currentTime + idx * 0.28 + 0.75);
    });
  } catch {
    // Ignore audio context restriction if browser blocks autoplay
  }
}

export function playSoftTasbihClick(): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(640, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Ignore
  }
}
