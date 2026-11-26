import React from 'react';
import { RefreshCw, X } from 'lucide-react';

interface UpdateBannerProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

export const UpdateBanner: React.FC<UpdateBannerProps> = ({ onUpdate, onDismiss }) => (
  <div
    role="status"
    className="fixed z-50 left-3 right-3 bottom-20 lg:bottom-6 lg:left-auto lg:right-6 lg:w-[380px] rounded-2xl bg-emerald-700 text-white shadow-xl border border-emerald-500/60 px-4 py-3.5 flex items-center gap-3"
  >
    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
      <RefreshCw className="w-5 h-5 text-[#F6E2A1]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold">Versi baru tersedia</p>
      <p className="text-xs text-emerald-100">Ketuk “Perbarui” untuk memakai tampilan &amp; fitur terbaru.</p>
    </div>
    <button
      type="button"
      onClick={onUpdate}
      className="shrink-0 min-h-[40px] px-4 rounded-xl bg-[#F6E2A1] text-[#3B2F05] text-sm font-bold hover:bg-[#F1D77E] transition-colors"
    >
      Perbarui
    </button>
    <button
      type="button"
      aria-label="Tutup pemberitahuan"
      onClick={onDismiss}
      className="shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-white/15"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);
