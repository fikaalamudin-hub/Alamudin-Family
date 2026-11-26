import React, { useState } from 'react';
import {
  BookOpenCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { TAJWID_LESSONS, TAJWID_QUIZ_BANK } from '../data/tajwid';
import { TajwidCategory, TajwidQuizQuestion } from '../types';

function pickRandomQuizQuestions(count: number = 5): TajwidQuizQuestion[] {
  const pool = [...TAJWID_QUIZ_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

const COLOR_STYLES: Record<
  'emerald' | 'amber' | 'sky' | 'rose' | 'violet',
  {
    highlightText: string;
    highlightBg: string;
    letterBox: string;
    ruleText: string;
  }
> = {
  emerald: {
    highlightText: 'text-emerald-700 dark:text-emerald-300',
    highlightBg: 'bg-emerald-100/80 dark:bg-emerald-900/50 rounded px-1.5',
    letterBox: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
    ruleText: 'text-emerald-700 dark:text-emerald-400',
  },
  amber: {
    highlightText: 'text-amber-700 dark:text-amber-300',
    highlightBg: 'bg-amber-100/80 dark:bg-amber-900/50 rounded px-1.5',
    letterBox: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    ruleText: 'text-amber-700 dark:text-amber-400',
  },
  sky: {
    highlightText: 'text-sky-700 dark:text-sky-300',
    highlightBg: 'bg-sky-100/80 dark:bg-sky-900/50 rounded px-1.5',
    letterBox: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200',
    ruleText: 'text-sky-700 dark:text-sky-400',
  },
  rose: {
    highlightText: 'text-rose-700 dark:text-rose-300',
    highlightBg: 'bg-rose-100/80 dark:bg-rose-900/50 rounded px-1.5',
    letterBox: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200',
    ruleText: 'text-rose-700 dark:text-rose-400',
  },
  violet: {
    highlightText: 'text-violet-700 dark:text-violet-300',
    highlightBg: 'bg-violet-100/80 dark:bg-violet-900/50 rounded px-1.5',
    letterBox: 'bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800 text-violet-800 dark:text-violet-200',
    ruleText: 'text-violet-700 dark:text-violet-400',
  },
};

export const TajwidView: React.FC = () => {
  const [mode, setMode] = useState<'materi' | 'kuis'>('materi');
  const [categoryFilter, setCategoryFilter] = useState<'all' | TajwidCategory>('all');

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<TajwidQuizQuestion[]>(() => pickRandomQuizQuestions(5));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const visibleLessons = TAJWID_LESSONS.filter(
    (lesson) => categoryFilter === 'all' || lesson.category === categoryFilter
  );

  const currentQuestion = quizQuestions[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    if (optionIdx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 >= quizQuestions.length) {
      setQuizFinished(true);
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestions(pickRandomQuizQuestions(5));
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-8">
      {/* Header & Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#17231E] dark:text-[#F2EFE9]">
            Belajar Tajwid Interaktif
          </h2>
          <p className="text-sm text-[#5B6B62] dark:text-emerald-200/70 mt-1">
            Panduan tajwid ramah anak dan pemula dengan kode warna huruf dan kuis bermain sambil belajar
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#EAE4D3] dark:bg-[#0F1C17] border border-[#DFD8C4] dark:border-emerald-950 self-start">
          <button
            type="button"
            onClick={() => setMode('materi')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
              mode === 'materi'
                ? 'bg-white dark:bg-emerald-700 text-[#17231E] dark:text-white shadow-sm'
                : 'text-[#5B6B62] dark:text-emerald-200/70'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Materi Tajwid</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('kuis')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] whitespace-nowrap ${
              mode === 'kuis'
                ? 'bg-white dark:bg-emerald-700 text-[#17231E] dark:text-white shadow-sm'
                : 'text-[#5B6B62] dark:text-emerald-200/70'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Kuis 5 Soal</span>
          </button>
        </div>
      </div>

      {mode === 'materi' ? (
        <div className="space-y-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: 'Semua Materi' },
                { id: 'nun-sukun', label: 'Nun Sukun & Tanwin' },
                { id: 'mim-sukun', label: 'Mim Sukun' },
                { id: 'qalqalah', label: 'Qalqalah' },
                { id: 'mad', label: 'Mad Thabi’i' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors min-h-[44px] whitespace-nowrap ${
                  categoryFilter === tab.id
                    ? 'bg-emerald-700 border-emerald-700 text-white'
                    : 'bg-white dark:bg-[#12211C] border-[#DFD8C4] dark:border-emerald-900/60 text-[#3D4E45] dark:text-[#C5D1CA] hover:border-emerald-600/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleLessons.map((lesson) => {
              const palette = COLOR_STYLES[lesson.colorKey];

              return (
                <article
                  key={lesson.id}
                  className="rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-6 space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Title & Category */}
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#6A7870] dark:text-emerald-200/70">
                          {lesson.categoryLabel} · {lesson.meaning}
                        </span>
                        <span className={`font-semibold ${palette.ruleText}`}>{lesson.ruleLabel}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-[#3D4E45] dark:text-[#D1DDD6] leading-relaxed mt-2">
                        {lesson.summary}
                      </p>
                    </div>

                    {/* Hijaiyah Letters */}
                    <div>
                      <p className="text-xs font-medium text-[#6A7870] dark:text-emerald-200/70 mb-2">
                        Huruf-hurufnya:
                      </p>
                      <div className="flex flex-wrap gap-2" dir="rtl">
                        {lesson.letters.map((letter) => (
                          <span
                            key={letter}
                            className={`font-arabic text-2xl px-3.5 py-1 rounded-xl border ${palette.letterBox}`}
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Color-coded Quranic Examples */}
                    <div className="space-y-3 pt-3 border-t border-[#EFECE1] dark:border-emerald-950/80">
                      <p className="text-xs font-medium text-[#6A7870] dark:text-emerald-200/70">
                        Contoh Potongan Ayat & Cara Membaca:
                      </p>
                      {lesson.examples.map((ex) => (
                        <div
                          key={ex.id}
                          className="rounded-xl bg-[#FAF8F3] dark:bg-[#0D1914] border border-[#EFECE1] dark:border-emerald-950/80 p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs text-[#6A7870] dark:text-emerald-200/60">
                              {ex.surahRef}
                            </span>
                            <span className="text-xs font-semibold italic text-emerald-800 dark:text-emerald-300">
                              {ex.latin}
                            </span>
                          </div>

                          <div dir="rtl" className="font-arabic text-3xl text-right text-[#14241D] dark:text-[#F8F5EC] py-1">
                            {ex.segments.map((seg, i) =>
                              seg.highlight ? (
                                <span
                                  key={i}
                                  className={`${palette.highlightText} ${palette.highlightBg} font-bold`}
                                >
                                  {seg.text}
                                </span>
                              ) : (
                                <span key={i}>{seg.text}</span>
                              )
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-[#3D4E45] dark:text-[#C5D1CA] leading-relaxed">
                            <strong className="font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                              Cara baca:{' '}
                            </strong>
                            {ex.howToRead}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        /* Interactive 5-Question Quiz Mode */
        <section className="max-w-2xl mx-auto rounded-2xl bg-white dark:bg-[#12211C] border border-[#E4DEC9] dark:border-emerald-900/60 p-6 sm:p-8">
          {quizFinished ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs font-medium text-[#6A7870] dark:text-emerald-200/70">
                  Hasil Kuis Tajwid Keluarga
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#17231E] dark:text-[#F2EFE9] mt-1 font-mono-tabular">
                  Skor: {score} / {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                </h3>
                <p className="text-sm sm:text-base text-[#5B6B62] dark:text-emerald-200/75 mt-2 max-w-md mx-auto">
                  {score === quizQuestions.length
                    ? 'MasyaAllah, luar biasa! Seluruh soal tajwid berhasil dijawab dengan benar.'
                    : score >= 3
                    ? 'Alhamdulillah, pemahaman tajwid sudah sangat baik. Terus berlatih bersama keluarga!'
                    : 'Semangat belajar! Yuk baca kembali materi warna huruf tajwid lalu coba kuis lagi.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi (5 Soal Acak)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('materi')}
                  className="px-5 py-3 rounded-xl border border-[#DFD8C4] dark:border-emerald-900/70 text-sm font-medium text-[#17231E] dark:text-[#F2EFE9] min-h-[44px]"
                >
                  Ulangi Materi
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#6A7870] dark:text-emerald-200/70">
                  <span className="font-mono-tabular">
                    Soal {currentIdx + 1} dari {quizQuestions.length}
                  </span>
                  <span className="font-mono-tabular">Skor sementara: {score}</span>
                </div>
                <div className="h-2 rounded-full bg-[#EFECE1] dark:bg-emerald-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question & Arabic Snippet */}
              <div className="space-y-4">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#17231E] dark:text-[#F2EFE9] leading-snug">
                  {currentQuestion.question}
                </h3>

                <div className="rounded-xl bg-[#FAF8F3] dark:bg-[#0D1914] border border-[#EFECE1] dark:border-emerald-950/80 p-5 text-center space-y-2">
                  <p dir="rtl" className="font-arabic text-3xl sm:text-4xl text-[#14241D] dark:text-[#F8F5EC]">
                    {currentQuestion.arabicSnippet}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5B6B62] dark:text-emerald-300/80">
                    Fokus pada lafaz: <strong className="font-arabic text-lg mx-1">{currentQuestion.highlightedPart}</strong> ({currentQuestion.latinSnippet})
                  </p>
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isAnswered = selectedOption !== null;
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle =
                    'bg-[#FAF8F3] dark:bg-[#162922] border-[#DFD8C4] dark:border-emerald-900/70 text-[#17231E] dark:text-[#F2EFE9] hover:border-emerald-600';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-50 dark:bg-emerald-900/45 border-emerald-600 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isChosen && !isCorrect) {
                      btnStyle =
                        'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                    } else {
                      btnStyle =
                        'bg-transparent border-[#EFECE1] dark:border-emerald-950 text-[#7C8A82] dark:text-emerald-200/40';
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx)}
                      className={`p-4 rounded-xl border text-left text-sm sm:text-base transition-colors flex items-center justify-between gap-2 min-h-[52px] ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation after Answering */}
              {selectedOption !== null && (
                <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    {selectedOption === currentQuestion.correctIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-[#17231E] dark:text-[#F2EFE9]">
                        {selectedOption === currentQuestion.correctIndex
                          ? 'Benar! Barakallahu fiik.'
                          : `Kurang tepat. Jawaban benar: ${currentQuestion.options[currentQuestion.correctIndex]}`}
                      </p>
                      <p className="text-sm text-[#3D4E45] dark:text-[#D1DDD6] mt-1 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors min-h-[44px]"
                    >
                      <span>
                        {currentIdx + 1 >= quizQuestions.length ? 'Lihat Skor Akhir' : 'Soal Berikutnya'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
