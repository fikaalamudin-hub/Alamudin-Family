import React from 'react';
import {
  LayoutDashboard,
  Clock,
  BookHeart,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { NavTab } from '../types';

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
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav
      aria-label="Navigasi Bawah"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#FAF8F3]/95 dark:bg-[#0F1C17]/95 backdrop-blur-md border-t border-[#E4DEC9] dark:border-emerald-950/90"
    >
      <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] px-1 transition-colors ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-[#6A7870] dark:text-[#96A89E] hover:text-[#17231E] dark:hover:text-[#F2EFE9]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
              <span className="text-[11px] font-medium tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
