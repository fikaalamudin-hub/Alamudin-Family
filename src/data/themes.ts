import { ThemeId } from '../types';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  desc: string;
  /** Warna utama (untuk contoh bulatan warna & meta theme-color) */
  main: string;
}

export const THEMES: ThemeOption[] = [
  { id: 'zamrud', label: 'Hijau Zamrud', desc: 'Tenang & teduh (bawaan)', main: '#047857' },
  { id: 'laut', label: 'Biru Laut', desc: 'Segar & bersih', main: '#0369a1' },
  { id: 'ungu', label: 'Ungu Anggur', desc: 'Lembut & elegan', main: '#6d28d9' },
  { id: 'mawar', label: 'Merah Mawar', desc: 'Hangat & ceria', main: '#be123c' },
  { id: 'jingga', label: 'Jingga Senja', desc: 'Cerah & bersemangat', main: '#c2410c' },
  { id: 'tosca', label: 'Hijau Tosca', desc: 'Sejuk & modern', main: '#0f766e' },
];
