import React from 'react';
import {
  LayoutDashboard,
  Clock,
  BookHeart,
  BookOpen,
  GraduationCap,
  Moon,
  Sun,
  MapPin,
} from 'lucide-react';
import { CityOption, NavTab } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isDark: boolean;
  onToggleDark: () => void;
  selectedCity: CityOption;
}

const NAV_ITEMS: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Beranda Keluarga', icon: LayoutDashboard },
  { id: 'prayer', label: 'Jadwal & Kiblat', icon: Clock },
  { id: 'dua', label: 'Dzikir & Doa', icon: BookHeart },
  { id: 'quran', label: 'Al-Qur\'an Digital', icon: BookOpen },
  { id: 'tajwid', label: 'Belajar Tajwid', icon: GraduationCap },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleDark,
  selectedCity,
}) => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[264px] lg:fixed lg:inset-y-0 lg:left-0 z-30 bg-[#F4F0E6] dark:bg-[#0F1C17] border-r border-[#E4DEC9] dark:border-emerald-950/80 transition-colors">
      {/* Brand Header */}
      <div className="px-6 pt-7 pb-6 border-b border-[#E4DEC9] dark:border-emerald-950/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-[#FAF8F3] shadow-sm shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3L4 9v11a1 1 0 001 1h14a1 1 0 001-1V9l-8-6z" />
              <path d="M9 21V13a3 3 0 016 0v8" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold tracking-tight text-[#14241D] dark:text-[#F5F2EA] truncate">
              Fika Family&apos;s
            </h1>
            <p className="text-xs text-[#5B6B62] dark:text-emerald-300/70 truncate">
              Sakinah Mawaddah Warohmah
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto" aria-label="Menu Utama">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600 shadow-sm'
                  : 'text-[#3D4E45] dark:text-[#C5D1CA] hover:bg-[#EAE4D3] dark:hover:bg-emerald-900/40'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls: City Indicator & Dark Mode Switch */}
      <div className="p-4 border-t border-[#E4DEC9] dark:border-emerald-950/80 space-y-3">
        <button
          type="button"
          onClick={() => onSelectTab('prayer')}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#14261F] border border-[#E4DEC9] dark:border-emerald-900/60 text-left hover:border-emerald-600/50 transition-colors min-h-[44px]"
        >
          <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-[#6A7870] dark:text-emerald-300/60">Lokasi Jadwal Sholat</p>
            <p className="text-xs font-semibold text-[#17231E] dark:text-[#F2EFE9] truncate">
              {selectedCity.name}, {selectedCity.timezone}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onToggleDark}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#14261F] border border-[#E4DEC9] dark:border-emerald-900/60 text-sm font-medium text-[#2A3B33] dark:text-[#E5ECE8] hover:border-emerald-600/50 transition-colors min-h-[44px]"
        >
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-700 shrink-0" />
            )}
            {isDark ? 'Mode Terang' : 'Mode Gelap'}
          </span>
          <span className="text-xs text-[#6A7870] dark:text-emerald-300/60">
            {isDark ? 'Aktif' : 'Nonaktif'}
          </span>
        </button>

        <PWAInstallButton variant="sidebar" />
      </div>
    </aside>
  );
};
