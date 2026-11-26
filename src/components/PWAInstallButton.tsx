import React, { useState } from 'react';
import { Download, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'sidebar' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'sidebar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // Hide when already installed and launched from home screen
  if (isInstalled) {
    return null;
  }

  // Native Chromium / Android install prompt ready
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'compact'
            ? 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors min-h-[40px] whitespace-nowrap'
            : 'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors min-h-[44px] whitespace-nowrap'
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Pasang di HP</span>
      </button>
    );
  }

  // iOS Safari or browsers without beforeinstallprompt: provide clear guided modal
  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        className={
          variant === 'compact'
            ? 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F3] dark:bg-[#14261F] border border-[#DFD8C4] dark:border-emerald-900/70 text-[#17231E] dark:text-[#F2EFE9] text-xs font-medium hover:border-emerald-600/50 transition-colors min-h-[40px] whitespace-nowrap'
            : 'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#14261F] border border-[#DFD8C4] dark:border-emerald-900/70 text-[#17231E] dark:text-[#F2EFE9] text-xs font-medium hover:border-emerald-600/50 transition-colors min-h-[44px] whitespace-nowrap'
        }
      >
        <Smartphone className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
        <span>{isIOS ? 'Pasang di iPhone' : 'Pasang di Layar Utama'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-guide-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/70 p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  id="pwa-guide-title"
                  className="font-display text-lg font-semibold text-[#17231E] dark:text-[#F2EFE9]"
                >
                  Pasang Fika Family&apos;s di Layar Utama
                </h3>
                <p className="text-xs text-[#6A7870] dark:text-emerald-200/70 mt-0.5">
                  Akses cepat layaknya aplikasi native langsung dari HP
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup panduan"
                onClick={() => setShowGuide(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#6A7870] hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-3 text-sm text-[#3D4E45] dark:text-[#D1DDD6]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">1.</span>
                  <span>
                    Buka halaman ini menggunakan <strong>Safari</strong> di iPhone/iPad.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">2.</span>
                  <span className="flex items-center flex-wrap gap-1">
                    Ketuk ikon <strong>Bagikan (Share)</strong> <Share className="w-4 h-4 inline text-emerald-700 dark:text-emerald-400" /> di bilah bawah Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">3.</span>
                  <span>
                    Gulir ke bawah lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>, kemudian ketuk <strong>Tambah</strong>.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm text-[#3D4E45] dark:text-[#D1DDD6]">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">1.</span>
                  <span>
                    Buka aplikasi melalui <strong>Google Chrome</strong> atau <strong>Edge</strong> (pastikan alamat situs menggunakan HTTPS).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">2.</span>
                  <span>
                    Ketuk ikon menu titik tiga <strong>(⋮)</strong> di pojok kanan atas browser.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-400">3.</span>
                  <span>
                    Pilih <strong>Tambahkan ke layar utama (Add to Home screen)</strong> atau <strong>Instal aplikasi</strong>.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors min-h-[44px]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};
