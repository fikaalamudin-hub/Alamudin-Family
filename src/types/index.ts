export type NavTab = 'dashboard' | 'prayer' | 'dua' | 'quran' | 'tajwid' | 'settings';

export type ThemeId = 'zamrud' | 'laut' | 'ungu' | 'mawar' | 'jingga' | 'tosca';

export type FamilyMemberId = 'ayah' | 'ibu' | 'anak';

export interface FamilyMember {
  id: FamilyMemberId;
  label: string;
  roleDesc: string;
}

export interface IbadahHabit {
  id: string;
  label: string;
  category: 'sholat' | 'alquran' | 'sedekah';
}

export interface DailyChecklistMap {
  // key: YYYY-MM-DD -> memberId -> array of completed habit ids
  [dateKey: string]: {
    [memberId: string]: string[];
  };
}

export interface CityOption {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  timezone: 'WIB' | 'WITA' | 'WIT';
  utcOffset: number;
  // Accurate baseline prayer schedule in HH:mm (24h) used as instant fallback
  fallbackTimes: PrayerSchedule;
}

export interface PrayerSchedule {
  Imsak: string;
  Subuh: string;
  Terbit: string;
  Dhuha: string;
  Dzuhur: string;
  Ashar: string;
  Maghrib: string;
  Isya: string;
}

export type PrayerName = keyof PrayerSchedule;

export interface DuaItem {
  id: string;
  category: 'setelah-sholat' | 'sholat-dhuha' | 'doa-harian';
  order?: number;
  title: string;
  subtitle: string;
  arabic: string;
  latin: string;
  translation: string;
  reference: string;
  targetCount: number; // e.g., 1, 3, or 33
}

export interface SurahSummary {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Mekah' | 'Madinah' | string;
  arti: string;
  deskripsi?: string;
  audioFull?: Record<string, string>;
}

export interface AyahItem {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio?: Record<string, string>;
}

export interface SurahDetail extends SurahSummary {
  ayat: AyahItem[];
}

export interface QuranBookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  savedAt: string;
}

export type TajwidCategory = 'nun-sukun' | 'mim-sukun' | 'qalqalah' | 'mad';

export interface TajwidSegment {
  text: string;
  highlight?: boolean;
}

export interface TajwidExample {
  id: string;
  surahRef: string;
  segments: TajwidSegment[];
  latin: string;
  howToRead: string;
}

export interface TajwidLesson {
  id: string;
  category: TajwidCategory;
  categoryLabel: string;
  title: string;
  meaning: string;
  summary: string;
  letters: string[];
  colorKey: 'emerald' | 'amber' | 'sky' | 'rose' | 'violet';
  ruleLabel: string;
  examples: TajwidExample[];
}

export interface TajwidQuizQuestion {
  id: string;
  question: string;
  arabicSnippet: string;
  highlightedPart: string;
  latinSnippet: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
