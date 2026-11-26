import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Plus, Minus, Fingerprint } from 'lucide-react';
import { DUAS_DATA } from '../data/duas';
import { DuaItem } from '../types';
import { playSoftTasbihClick } from '../utils/islamicTime';

interface DuaDzikirViewProps {
  arabicFontSize: number;
  onChangeArabicFontSize: (next: number) => void;
}

export const DuaDzikirView: React.FC<DuaDzikirViewProps> = ({
  arabicFontSize,
  onChangeArabicFontSize,
}) => {
  const [activeCategory, setActiveCategory] = useState<'setelah-sholat' | 'doa-harian'>('setelah-sholat');
  const [tasbihCounts, setTasbihCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [freeTasbih, setFreeTasbih] = useState(0);

  const filteredItems = DUAS_DATA.filter((item) => item.category === activeCategory);

  const handleCopyDua = async (item: DuaItem) => {
    const textToCopy = `${item.title}\n\n${item.arabic}\n\n${item.latin}\n\nArtinya: "${item.translation}"\n(${item.reference})`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
    } catch {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
    }
  };

  const handleIncrementItem = (item: DuaItem) => {
    playSoftTasbihClick();
    setTasbihCounts((prev) => {
      const current = prev[item.id] || 0;
      const next = current >= item.targetCount ? item.targetCount : current + 1;
      return { ...prev, [item.id]: next };
    });
  };

  const handleResetItem = (id: string) => {
    setTasbihCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <div className="space-y-8">
      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
            Dzikir & Doa Keluarga
          </h2>
          <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">
            Susunan dzikir setelah sholat fardhu, tasbih digital, dan doa harian untuk anak hingga orang tua
          </p>
        </div>

        {/* Font Size Adjuster */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 rounded-xl p-1.5">
          <span className="text-xs font-medium text-[#5B6B62] dark:text-emerald-200/75 px-2.5 whitespace-nowrap">
            Ukuran Arab
          </span>
          <button
            type="button"
            aria-label="Perkecil huruf Arab"
            onClick={() => onChangeArabicFontSize(Math.max(22, arabicFontSize - 2))}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40 text-[#17231E] dark:text-[#F2EFE9] transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono-tabular text-xs font-semibold w-8 text-center text-[#17231E] dark:text-[#F2EFE9]">
            {arabicFontSize}
          </span>
          <button
            type="button"
            aria-label="Perbesar huruf Arab"
            onClick={() => onChangeArabicFontSize(Math.min(44, arabicFontSize + 2))}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40 text-[#17231E] dark:text-[#F2EFE9] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Switcher + Quick Tasbih Digital Widget */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="inline-flex p-1 rounded-xl bg-[#EAE4D3] dark:bg-[#0F1C17] border border-[#DFD8C4] dark:border-emerald-950 self-start">
          <button
            type="button"
            onClick={() => setActiveCategory('setelah-sholat')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
              activeCategory === 'setelah-sholat'
                ? 'bg-white dark:bg-emerald-700 text-[#17231E] dark:text-white shadow-sm'
                : 'text-[#5B6B62] dark:text-emerald-200/70 hover:text-[#17231E] dark:hover:text-white'
            }`}
          >
            Dzikir Setelah Sholat (Berurutan)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('doa-harian')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
              activeCategory === 'doa-harian'
                ? 'bg-white dark:bg-emerald-700 text-[#17231E] dark:text-white shadow-sm'
                : 'text-[#5B6B62] dark:text-emerald-200/70 hover:text-[#17231E] dark:hover:text-white'
            }`}
          >
            Doa Harian Keluarga
          </button>
        </div>

        {/* Tasbih Bebas Bar */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 rounded-xl px-4 py-2">
          <span className="text-xs font-medium text-[#5B6B62] dark:text-emerald-200/75 whitespace-nowrap">
            Tasbih Bebas
          </span>
          <span className="font-mono-tabular text-lg font-semibold text-emerald-700 dark:text-emerald-400 min-w-[36px] text-center">
            {freeTasbih}
          </span>
          <button
            type="button"
            onClick={() => {
              playSoftTasbihClick();
              setFreeTasbih((c) => c + 1);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors min-h-[40px] whitespace-nowrap active:scale-[0.98]"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Hitung</span>
          </button>
          <button
            type="button"
            aria-label="Reset tasbih bebas"
            onClick={() => setFreeTasbih(0)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[#6A7870] hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dua & Dzikir Cards */}
      <div className="space-y-5">
        {filteredItems.map((item) => {
          const count = tasbihCounts[item.id] || 0;
          const isCompleted = count >= item.targetCount;
          const isCopied = copiedId === item.id;

          return (
            <article
              key={item.id}
              className={`rounded-2xl bg-white dark:bg-[#12211C] border transition-colors p-6 sm:p-7 space-y-5 ${
                item.targetCount > 1 && isCompleted
                  ? 'border-emerald-500/60 dark:border-emerald-500/50'
                  : 'border-[#E4DEC9] dark:border-emerald-900/60'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6A7870] dark:text-emerald-300/70">
                    {item.order && <span className="font-mono-tabular font-semibold">Urutan {item.order}</span>}
                    {item.order && <span aria-hidden="true">·</span>}
                    <span>{item.reference}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-0.5">{item.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyDua(item)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DFD8C4] dark:border-emerald-900/70 text-xs font-medium text-[#2A3B33] dark:text-[#E5ECE8] hover:bg-[#FAF8F3] dark:hover:bg-emerald-900/40 transition-colors min-h-[40px] self-start whitespace-nowrap"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-400">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Doa</span>
                    </>
                  )}
                </button>
              </div>

              {/* Arabic Text */}
              <div
                dir="rtl"
                className="font-arabic text-right text-[#14241D] dark:text-[#F8F5EC] py-3 px-1 select-text"
                style={{ fontSize: `${arabicFontSize}px` }}
              >
                {item.arabic}
              </div>

              {/* Latin & Translation */}
              <div className="space-y-2.5 pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80">
                <p className="text-sm sm:text-base italic font-medium text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  {item.latin}
                </p>
                <p className="text-sm sm:text-base text-[#3D4E45] dark:text-[#D1DDD6] leading-relaxed">
                  “{item.translation}”
                </p>
              </div>

              {/* Interactive Tasbih Counter for Multi-Count Dzikir (3x / 33x) */}
              {item.targetCount > 1 && (
                <div className="pt-4 border-t border-[#EFECE1] dark:border-emerald-950/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tabular text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                      {count} / {item.targetCount}
                    </span>
                    <span className="text-xs text-[#6A7870] dark:text-emerald-200/70">
                      {isCompleted ? 'Alhamdulillah, target dzikir tercapai' : 'Klik tombol untuk menghitung'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleResetItem(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DFD8C4] dark:border-emerald-900/70 text-xs font-medium text-[#5B6B62] dark:text-emerald-200/80 hover:bg-[#FAF8F3] dark:hover:bg-emerald-900/40 min-h-[44px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIncrementItem(item)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] active:scale-[0.98] ${
                        isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      <Fingerprint className="w-4 h-4" />
                      <span>{isCompleted ? 'Selesai' : 'Klik Hitung'}</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
