import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  ArrowLeft,
  Bookmark,
  Play,
  Pause,
  Volume2,
  Plus,
  Minus,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { QuranBookmark, SurahDetail, SurahSummary } from '../types';
import { fetchSurahDetail, fetchSurahList } from '../services/api';
import { SURAH_LIST_FALLBACK } from '../data/surahFallback';

interface QuranViewProps {
  arabicFontSize: number;
  onChangeArabicFontSize: (next: number) => void;
  bookmark: QuranBookmark | null;
  onSaveBookmark: (bookmark: QuranBookmark) => void;
  autoOpenBookmarkTrigger: number;
}

export const QuranView: React.FC<QuranViewProps> = ({
  arabicFontSize,
  onChangeArabicFontSize,
  bookmark,
  onSaveBookmark,
  autoOpenBookmarkTrigger,
}) => {
  const [surahs, setSurahs] = useState<SurahSummary[]>(SURAH_LIST_FALLBACK);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Mekah' | 'Madinah'>('all');

  const [activeSurah, setActiveSurah] = useState<SurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [surahError, setSurahError] = useState<string | null>(null);

  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    let mounted = true;
    fetchSurahList().then(({ surahs: list }) => {
      if (mounted) {
        setSurahs(list);
        setIsLoadingList(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const openSurah = async (nomor: number, scrollToAyah?: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
    }
    setIsLoadingSurah(true);
    setSurahError(null);
    try {
      const detail = await fetchSurahDetail(nomor);
      setActiveSurah(detail);
      if (scrollToAyah) {
        setTimeout(() => {
          const el = ayahRefs.current[scrollToAyah];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 250);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setSurahError(err instanceof Error ? err.message : 'Gagal memuat surah.');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  // Handle shortcut from Dashboard "Lanjutkan Baca"
  useEffect(() => {
    if (autoOpenBookmarkTrigger > 0 && bookmark) {
      openSurah(bookmark.surahNumber, bookmark.ayahNumber);
    }
  }, [autoOpenBookmarkTrigger]);

  const handleToggleAudio = (audioId: string, url?: string) => {
    if (!url) return;
    if (playingAudioId === audioId && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAudioId(audioId);

    audio.play().catch(() => {
      setPlayingAudioId(null);
    });
    audio.onended = () => {
      setPlayingAudioId(null);
    };
    audio.onerror = () => {
      setPlayingAudioId(null);
    };
  };

  const filteredSurahs = surahs.filter((s) => {
    const matchesSearch =
      s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.nomor) === searchQuery.trim();
    const matchesFilter =
      revelationFilter === 'all' ||
      s.tempatTurun.toLowerCase() === revelationFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Surah Detail Reader View
  if (activeSurah || isLoadingSurah || surahError) {
    const fullAudioUrl =
      activeSurah?.audioFull?.['05'] ||
      activeSurah?.audioFull?.['01'] ||
      (activeSurah
        ? `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${activeSurah.nomor}.mp3`
        : undefined);

    return (
      <div className="space-y-6">
        {/* Top Reader Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                setPlayingAudioId(null);
              }
              setActiveSurah(null);
              setSurahError(null);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#12211C] border border-[#DFD8C4] dark:border-emerald-900/70 text-sm font-medium text-[#17231E] dark:text-[#F2EFE9] hover:border-emerald-600/50 transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Daftar 114 Surah</span>
          </button>

          <div className="flex items-center gap-2 bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 rounded-xl p-1">
            <span className="text-xs font-medium text-[#5B6B62] dark:text-emerald-200/75 px-2.5">
              Ukuran Arab
            </span>
            <button
              type="button"
              aria-label="Perkecil teks Arab"
              onClick={() => onChangeArabicFontSize(Math.max(22, arabicFontSize - 2))}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono-tabular text-xs font-semibold w-7 text-center">{arabicFontSize}</span>
            <button
              type="button"
              aria-label="Perbesar teks Arab"
              onClick={() => onChangeArabicFontSize(Math.min(44, arabicFontSize + 2))}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#F5F2EA] dark:hover:bg-emerald-900/40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoadingSurah && (
          <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-8 space-y-4 animate-pulse">
            <div className="h-7 w-48 bg-[#EAE4D3] dark:bg-emerald-950 rounded-lg" />
            <div className="h-4 w-72 bg-[#EFECE1] dark:bg-emerald-950/60 rounded-lg" />
            <div className="h-24 w-full bg-[#FAF8F3] dark:bg-[#0D1914] rounded-xl mt-6" />
          </div>
        )}

        {surahError && (
          <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-rose-300 dark:border-rose-900 p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#17231E] dark:text-[#F2EFE9]">Gagal Memuat Surah</h3>
              <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">{surahError}</p>
            </div>
          </div>
        )}

        {activeSurah && !isLoadingSurah && (
          <>
            {/* Surah Header Banner */}
            <section className="rounded-2xl bg-emerald-800 dark:bg-[#102920] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-200">
                  <span>Surah ke-{activeSurah.nomor}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSurah.tempatTurun}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSurah.jumlahAyat} Ayat</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-1.5">
                  {activeSurah.namaLatin}{' '}
                  <span className="font-arabic text-2xl sm:text-3xl text-[#F3DF9B] ml-2">
                    ({activeSurah.nama})
                  </span>
                </h2>
                <p className="text-sm text-emerald-100/90 mt-1">Arti: {activeSurah.arti}</p>
              </div>

              {fullAudioUrl && (
                <button
                  type="button"
                  onClick={() => handleToggleAudio(`full-${activeSurah.nomor}`, fullAudioUrl)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#F3DF9B] text-[#14241D] font-semibold text-sm hover:bg-[#ebd17d] transition-colors min-h-[44px] self-start sm:self-auto whitespace-nowrap"
                >
                  {playingAudioId === `full-${activeSurah.nomor}` ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Jeda Murottal Surah</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Putar Murottal Full</span>
                    </>
                  )}
                </button>
              )}
            </section>

            {/* Bismillah Header (except At-Taubah #9 and Al-Fatihah #1 where Bismillah is ayah 1) */}
            {activeSurah.nomor !== 1 && activeSurah.nomor !== 9 && (
              <div className="text-center py-4 font-arabic text-3xl text-[#17231E] dark:text-[#F6E2A1]">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </div>
            )}

            {/* Ayat List */}
            <div className="space-y-4">
              {activeSurah.ayat.map((ayah) => {
                const audioUrl =
                  ayah.audio?.['05'] ||
                  ayah.audio?.['01'] ||
                  undefined;
                const ayahAudioKey = `ayah-${activeSurah.nomor}-${ayah.nomorAyat}`;
                const isPlayingThis = playingAudioId === ayahAudioKey;
                const isBookmarked =
                  bookmark?.surahNumber === activeSurah.nomor &&
                  bookmark?.ayahNumber === ayah.nomorAyat;

                return (
                  <article
                    key={ayah.nomorAyat}
                    ref={(el) => {
                      ayahRefs.current[ayah.nomorAyat] = el as HTMLDivElement | null;
                    }}
                    className={`rounded-2xl bg-white dark:bg-[#12211C] border p-5 sm:p-6 space-y-4 transition-colors ${
                      isBookmarked
                        ? 'border-[#D4AF37] dark:border-[#E5C97B]'
                        : isPlayingThis
                        ? 'border-emerald-600 dark:border-emerald-400'
                        : 'border-[#E4DEC9] dark:border-emerald-900/60'
                    }`}
                  >
                    {/* Ayah Top Action Row */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono-tabular text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        QS. {activeSurah.namaLatin} : {ayah.nomorAyat}
                      </span>

                      <div className="flex items-center gap-2">
                        {audioUrl && (
                          <button
                            type="button"
                            onClick={() => handleToggleAudio(ayahAudioKey, audioUrl)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors min-h-[40px] whitespace-nowrap ${
                              isPlayingThis
                                ? 'bg-emerald-700 text-white border-emerald-700'
                                : 'bg-[#FAF8F3] dark:bg-[#162922] border-[#DFD8C4] dark:border-emerald-900/70 text-[#2A3B33] dark:text-[#E5ECE8] hover:border-emerald-600/50'
                            }`}
                          >
                            {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span>{isPlayingThis ? 'Jeda' : 'Dengar'}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            onSaveBookmark({
                              surahNumber: activeSurah.nomor,
                              surahName: activeSurah.namaLatin,
                              ayahNumber: ayah.nomorAyat,
                              savedAt: new Date().toISOString(),
                            })
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors min-h-[40px] whitespace-nowrap ${
                            isBookmarked
                              ? 'bg-[#F8F1DA] dark:bg-[#2C2512] border-[#D4AF37] text-[#8E6714] dark:text-[#F3DF9B]'
                              : 'bg-[#FAF8F3] dark:bg-[#162922] border-[#DFD8C4] dark:border-emerald-900/70 text-[#2A3B33] dark:text-[#E5ECE8] hover:border-emerald-600/50'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          <span>{isBookmarked ? 'Terakhir Dibaca' : 'Tandai'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div
                      dir="rtl"
                      className="font-arabic text-right text-[#14241D] dark:text-[#F8F5EC] py-2"
                      style={{ fontSize: `${arabicFontSize}px` }}
                    >
                      {ayah.teksArab}
                    </div>

                    {/* Transliteration & Kemenag Translation */}
                    <div className="space-y-2 pt-3 border-t border-[#EFECE1] dark:border-emerald-950/80">
                      {ayah.teksLatin && (
                        <p className="text-sm italic font-medium text-emerald-800 dark:text-emerald-300 leading-relaxed">
                          {ayah.teksLatin}
                        </p>
                      )}
                      <p className="text-sm sm:text-base text-[#3D4E45] dark:text-[#D1DDD6] leading-relaxed">
                        {ayah.teksIndonesia}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // Surah Directory View (114 Surahs)
  return (
    <div className="space-y-7">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
            Al-Qur’an Digital
          </h2>
          <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">
            114 Surah lengkap dengan bacaan Arab, Latin, Terjemahan Kemenag RI, audio murottal, dan penanda baca
          </p>
        </div>
      </div>

      {/* Saved Bookmark Banner */}
      {bookmark && (
        <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#D4AF37]/60 dark:border-[#E5C97B]/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F8F1DA] dark:bg-[#2A2311] flex items-center justify-center text-[#9A7116] dark:text-[#F3DF9B] shrink-0">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#6A7870] dark:text-emerald-200/70">
                Terakhir Dibaca Keluarga
              </p>
              <p className="text-base font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                QS. {bookmark.surahName} · Ayat {bookmark.ayahNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openSurah(bookmark.surahNumber, bookmark.ayahNumber)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors min-h-[44px] whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lanjutkan Membaca</span>
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#6A7870] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama surah, arti, atau nomor (misal: Yasin, Al-Kahf, 36)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#12211C] border border-[#DFD8C4] dark:border-emerald-900/70 text-sm text-[#17231E] dark:text-[#F2EFE9] placeholder:text-[#86928B] min-h-[44px]"
          />
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#EAE4D3] dark:bg-[#0F1C17] border border-[#DFD8C4] dark:border-emerald-950 self-start">
          {(['all', 'Mekah', 'Madinah'] as const).map((filterVal) => (
            <button
              key={filterVal}
              type="button"
              onClick={() => setRevelationFilter(filterVal)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px] whitespace-nowrap ${
                revelationFilter === filterVal
                  ? 'bg-white dark:bg-emerald-700 text-[#17231E] dark:text-white shadow-sm'
                  : 'text-[#5B6B62] dark:text-emerald-200/70'
              }`}
            >
              {filterVal === 'all' ? 'Semua (114)' : filterVal === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}
            </button>
          ))}
        </div>
      </div>

      {/* Surah Grid */}
      {isLoadingList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 animate-pulse"
            />
          ))}
        </div>
      ) : filteredSurahs.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-10 text-center space-y-2">
          <p className="font-semibold text-[#17231E] dark:text-[#F2EFE9]">Surah tidak ditemukan</p>
          <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70">
            Coba kata kunci lain atau reset filter pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setRevelationFilter('all');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-sm font-medium min-h-[44px]"
          >
            Tampilkan Semua Surah
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.nomor}
              type="button"
              onClick={() => openSurah(surah.nomor)}
              className="group text-left rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 hover:border-emerald-600 dark:hover:border-emerald-500 p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors min-h-[84px]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-10 h-10 rounded-xl bg-[#F5F2EA] dark:bg-emerald-950/80 border border-[#E4DEC9] dark:border-emerald-900 flex items-center justify-center font-mono-tabular text-sm font-semibold text-emerald-800 dark:text-emerald-300 shrink-0">
                  {surah.nomor}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[#17231E] dark:text-[#F2EFE9] group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                    {surah.namaLatin}
                  </h3>
                  <p className="text-xs text-[#6A7870] dark:text-emerald-200/65 truncate mt-0.5">
                    {surah.arti} · {surah.jumlahAyat} Ayat ·{' '}
                    {surah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}
                  </p>
                </div>
              </div>

              <span className="font-arabic text-2xl text-emerald-800 dark:text-[#F3DF9B] shrink-0">
                {surah.nama}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
