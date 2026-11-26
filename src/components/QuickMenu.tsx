import React from 'react';
import { LayoutDashboard, Clock, BookHeart, BookOpen, GraduationCap, Palette } from 'lucide-react';
import { NavTab } from '../types';
import { NAV_COLORS } from '../data/navColors';

interface QuickMenuProps {
  onNavigate: (tab: NavTab) => void;
}

const ITEMS: { id: NavTab; label: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'prayer', label: 'Jadwal Sholat', desc: 'Waktu sholat & arah kiblat', icon: Clock },
  { id: 'dua', label: 'Dzikir & Doa', desc: 'Doa harian & tasbih', icon: BookHeart },
  { id: 'quran', label: 'Al-Qur’an', desc: '114 surah + murottal', icon: BookOpen },
  { id: 'tajwid', label: 'Belajar Tajwid', desc: 'Materi & kuis seru', icon: GraduationCap },
  { id: 'settings', label: 'Tampilan', desc: 'Pilih warna & ukuran huruf', icon: Palette },
];

export const QuickMenu: React.FC<QuickMenuProps> = ({ onNavigate }) => (
  <section aria-label="Menu Cepat">
    <h3 className="font-display text-lg font-semibold mb-3">Menu Cepat</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {ITEMS.map((it) => {
        const c = NAV_COLORS[it.id];
        const Icon = it.icon;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onNavigate(it.id)}
            className={`text-left rounded-2xl bg-white dark:bg-[#12211C] border-2 ${c.ring} p-4 transition-colors min-h-[116px]`}
          >
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${c.chip}`}>
              <Icon className="w-6 h-6" />
            </span>
            <span className="block text-sm font-semibold leading-tight">{it.label}</span>
            <span className="block text-[11px] text-[#6A7870] dark:text-emerald-200/60 leading-snug mt-1">{it.desc}</span>
          </button>
        );
      })}
    </div>
  </section>
);
