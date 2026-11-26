import React from 'react';
import {
  LayoutDashboard,
  Clock,
  BookHeart,
  BookOpen,
  GraduationCap,
  Palette,
} from 'lucide-react';
import { NavTab } from '../types';
import { NAV_COLORS } from '../data/navColors';

interface MobileNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

const MOBILE_TABS: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
  { id: 'prayer', label: 'Sholat', icon: Clock },
  { id: 'dua', label: 'Dzikir', icon: BookHeart },
  { id: 'quran', label: 'Al-Qur\'an', icon: BookOpen },
  { id: 'tajwid', label: 'Tajwid', icon: GraduationCap },
  { id: 'settings', label: 'Tampilan', icon: Palette },
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav
      aria-label="Navigasi Bawah"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#FAF8F3]/95 dark:bg-[#0F1C17]/95 backdrop-blur-md border-t border-[#E4DEC9] dark:border-emerald-950/90"
    >
      <div className="grid grid-cols-6 h-full max-w-xl mx-auto">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const c = NAV_COLORS[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center justify-center min-h-[44px] px-0.5 transition-colors"
            >
              <span
                className={`w-10 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? c.active : c.chip
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
              </span>
              <span
                className={`text-[10px] tracking-tight mt-1 whitespace-nowrap ${
                  isActive ? `font-bold ${c.text}` : 'font-medium text-[#6A7870] dark:text-[#96A89E]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
