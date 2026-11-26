import { NavTab } from '../types';

/**
 * Warna khusus tiap menu agar mudah dikenali.
 * (Class ditulis lengkap supaya terbaca oleh Tailwind.)
 */
export const NAV_COLORS: Record<
  NavTab,
  { chip: string; active: string; text: string; ring: string }
> = {
  dashboard: {
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    active: 'bg-emerald-600 text-white',
    text: 'text-emerald-700 dark:text-emerald-400',
    ring: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400',
  },
  prayer: {
    chip: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
    active: 'bg-sky-600 text-white',
    text: 'text-sky-700 dark:text-sky-400',
    ring: 'border-sky-200 dark:border-sky-800 hover:border-sky-400',
  },
  dua: {
    chip: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    active: 'bg-rose-600 text-white',
    text: 'text-rose-700 dark:text-rose-400',
    ring: 'border-rose-200 dark:border-rose-800 hover:border-rose-400',
  },
  quran: {
    chip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    active: 'bg-amber-600 text-white',
    text: 'text-amber-700 dark:text-amber-400',
    ring: 'border-amber-200 dark:border-amber-800 hover:border-amber-400',
  },
  tajwid: {
    chip: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
    active: 'bg-violet-600 text-white',
    text: 'text-violet-700 dark:text-violet-400',
    ring: 'border-violet-200 dark:border-violet-800 hover:border-violet-400',
  },
  settings: {
    chip: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
    active: 'bg-pink-600 text-white',
    text: 'text-pink-700 dark:text-pink-400',
    ring: 'border-pink-200 dark:border-pink-800 hover:border-pink-400',
  },
};
