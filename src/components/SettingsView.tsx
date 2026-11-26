import React from 'react';
import { Check, Moon, Sun, BellRing, Type, RefreshCw, Palette, Trash2 } from 'lucide-react';
import { ThemeId } from '../types';
import { THEMES } from '../data/themes';

interface SettingsViewProps {
  theme: ThemeId;
  onSelectTheme: (t: ThemeId) => void;
  isDark: boolean;
  onToggleDark: () => void;
  arabicFontSize: number;
  onChangeArabicFontSize: (n: number) => void;
  adzanSoundEnabled: boolean;
  onToggleAdzanSound: () => void;
  onCheckUpdate: () => void;
  checkingUpdate: boolean;
  updateResult: 'idle' | 'latest' | 'found' | 'error';
}

const Card: React.FC<{ title: string; icon: React.ReactNode; hint?: string; children: React.ReactNode }> = ({
  title,
  icon,
  hint,
  children,
}) => (
  <section className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-5 sm:p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        {hint && <p className="text-xs text-[#6A7870] dark:text-emerald-200/60">{hint}</p>}
      </div>
    </div>
    {children}
  </section>
);

const Switch: React.FC<{ on: boolean; onClick: () => void; label: string }> = ({ on, onClick, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={onClick}
    className={`relative w-14 h-8 rounded-full transition-colors shrink-0 ${
      on ? 'bg-emerald-600' : 'bg-[#CFC8B4] dark:bg-[#34463E]'
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
        on ? 'translate-x-6' : ''
      }`}
    />
  </button>
);

export const SettingsView: React.FC<SettingsViewProps> = ({
  theme,
  onSelectTheme,
  isDark,
  onToggleDark,
  arabicFontSize,
  onChangeArabicFontSize,
  adzanSoundEnabled,
  onToggleAdzanSound,
  onCheckUpdate,
  checkingUpdate,
  updateResult,
}) => {
  const handleResetData = () => {
    if (
      window.confirm(
        'Hapus semua data tersimpan di perangkat ini (catatan ibadah, penanda Al-Qur’an, pengaturan)? Tindakan ini tidak bisa dibatalkan.'
      )
    ) {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('kb_'))
          .forEach((k) => localStorage.removeItem(k));
      } catch {
        /* abaikan */
      }
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">Tampilan &amp; Pengaturan</h2>
        <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">
          Atur warna, ukuran huruf, dan suara sesuai kenyamanan keluarga. Semua pilihan tersimpan otomatis.
        </p>
      </div>

      <Card title="Warna Aplikasi" icon={<Palette className="w-5 h-5" />} hint="Ketuk salah satu warna untuk langsung mengganti tampilan">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {THEMES.map((t) => {
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTheme(t.id)}
                aria-pressed={active}
                className={`relative text-left rounded-xl border-2 p-3 transition-colors min-h-[84px] ${
                  active
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'border-[#E4DEC9] dark:border-emerald-900/60 hover:border-emerald-400'
                }`}
              >
                <span
                  className="block w-9 h-9 rounded-full mb-2 ring-2 ring-white dark:ring-[#12211C] shadow"
                  style={{ backgroundColor: t.main }}
                />
                <span className="block text-sm font-semibold leading-tight">{t.label}</span>
                <span className="block text-[11px] text-[#6A7870] dark:text-emerald-200/60 leading-tight mt-0.5">
                  {t.desc}
                </span>
                {active && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card title="Mode Terang / Gelap" icon={isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />} hint="Mode gelap nyaman untuk membaca di malam hari">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">{isDark ? 'Mode Gelap aktif' : 'Mode Terang aktif'}</span>
          <Switch on={isDark} onClick={onToggleDark} label="Mode gelap" />
        </div>
      </Card>

      <Card title="Ukuran Huruf Arab" icon={<Type className="w-5 h-5" />} hint="Berlaku di Al-Qur’an dan Dzikir & Doa">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6A7870] dark:text-emerald-200/60">Kecil</span>
          <input
            type="range"
            min={22}
            max={48}
            step={2}
            value={arabicFontSize}
            onChange={(e) => onChangeArabicFontSize(Number(e.target.value))}
            aria-label="Ukuran huruf Arab"
            className="flex-1 accent-emerald-600 h-8"
          />
          <span className="text-sm text-[#6A7870] dark:text-emerald-200/60">Besar</span>
        </div>
        <p
          className="font-arabic text-center mt-3 text-emerald-800 dark:text-emerald-200"
          style={{ fontSize: arabicFontSize }}
          dir="rtl"
          lang="ar"
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      </Card>

      <Card title="Suara Pengingat Adzan" icon={<BellRing className="w-5 h-5" />} hint="Bunyi lembut saat masuk waktu sholat">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">{adzanSoundEnabled ? 'Suara aktif' : 'Suara dimatikan'}</span>
          <Switch on={adzanSoundEnabled} onClick={onToggleAdzanSound} label="Suara pengingat adzan" />
        </div>
      </Card>

      <Card title="Pembaruan Aplikasi" icon={<RefreshCw className="w-5 h-5" />} hint="Aplikasi memeriksa versi baru otomatis. Anda juga bisa mengecek sendiri.">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCheckUpdate}
            disabled={checkingUpdate}
            className="min-h-[44px] px-5 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-600 disabled:opacity-60"
          >
            {checkingUpdate ? 'Memeriksa…' : 'Cek Pembaruan'}
          </button>
          <span className="text-sm text-[#5B6B62] dark:text-emerald-200/70">
            {updateResult === 'latest' && 'Anda sudah memakai versi terbaru.'}
            {updateResult === 'found' && 'Versi baru ditemukan — ikuti banner “Perbarui”.'}
            {updateResult === 'error' && 'Tidak bisa memeriksa. Pastikan internet aktif.'}
          </span>
        </div>
      </Card>

      <Card title="Hapus Data" icon={<Trash2 className="w-5 h-5" />} hint="Mengembalikan aplikasi seperti baru di perangkat ini">
        <button
          type="button"
          onClick={handleResetData}
          className="min-h-[44px] px-5 rounded-xl border-2 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40"
        >
          Hapus Semua Data Tersimpan
        </button>
      </Card>
    </div>
  );
};
