import React, { useState } from 'react';
import { VIVA_QUESTIONS, VivaQuestion } from '../data/vivaQuestions';
import { 
  HelpCircle, 
  MessageSquare, 
  AlertTriangle, 
  Zap, 
  RotateCw, 
  Check, 
  Globe, 
  Shuffle, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface VivaSimulatorProps {
  searchQuery: string;
}

export const VivaSimulator: React.FC<VivaSimulatorProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [answerLanguage, setAnswerLanguage] = useState<'hinglish' | 'english'>('hinglish');
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  const categories = [
    'All',
    'Project Defense',
    'Security & Auth',
    'Database & MongoDB',
    'Real-time & WebSockets',
    'Frontend & React',
    'Backend & System Design'
  ];

  const filteredQuestions = VIVA_QUESTIONS.filter(q => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery) return true;
    const s = searchQuery.toLowerCase();
    return (
      q.question.toLowerCase().includes(s) ||
      q.hindiQuestion.toLowerCase().includes(s) ||
      q.hinglishAnswer.toLowerCase().includes(s) ||
      q.englishAnswer.toLowerCase().includes(s) ||
      q.examinerTrap.toLowerCase().includes(s) ||
      q.proTip.toLowerCase().includes(s)
    );
  });

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const nextCard = () => {
    setIsAnswerRevealed(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const prevCard = () => {
    setIsAnswerRevealed(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const currentFlashcard: VivaQuestion | undefined = filteredQuestions[flashcardIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Controls Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Section 15 • 20 High-Yield Viva Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Viva Questions with Natural Hinglish Answers
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real questions frequently asked by university external examiners for MERN Stack & Notice Board projects, paired with natural conversational answers and trap detectors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setAnswerLanguage('hinglish')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  answerLanguage === 'hinglish'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🗣️ Hinglish (Spoken)</span>
              </button>
              <button
                onClick={() => setAnswerLanguage('english')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  answerLanguage === 'english'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>🇬🇧 Formal English</span>
              </button>
            </div>

            {/* Flashcard Practice Mode Toggle */}
            <button
              onClick={() => {
                setIsFlashcardMode(!isFlashcardMode);
                setIsAnswerRevealed(false);
                setFlashcardIndex(0);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                isFlashcardMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlashcardMode ? 'Exit Test Mode' : 'Practice Flashcard Mode'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills & Progress */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFlashcardIndex(0);
                  setIsAnswerRevealed(false);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Prepared:</span>
            <span className="font-bold text-emerald-400">
              {masteredIds.size} / {VIVA_QUESTIONS.length} Mastered
            </span>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {isFlashcardMode ? (
        <div className="max-w-3xl mx-auto">
          {currentFlashcard ? (
            <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <span className="font-semibold text-indigo-400">
                  Card {flashcardIndex + 1} of {filteredQuestions.length} • {currentFlashcard.category}
                </span>
                <button
                  onClick={() => toggleMastered(currentFlashcard.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    masteredIds.has(currentFlashcard.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{masteredIds.has(currentFlashcard.id) ? 'Mastered' : 'Mark as Mastered'}</span>
                </button>
              </div>

              {/* Question */}
              <div className="my-6">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  Viva Question #{currentFlashcard.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentFlashcard.question}
                </h3>
                <p className="text-indigo-300 text-base mt-2 font-medium">
                  "{currentFlashcard.hindiQuestion}"
                </p>
              </div>

              {/* Reveal Button */}
              {!isAnswerRevealed ? (
                <div className="text-center py-10 bg-slate-950/60 rounded-xl border border-dashed border-slate-800 my-6">
                  <p className="text-slate-400 text-sm mb-4">
                    Try answering in your mind or out loud before checking the answer.
                  </p>
                  <button
                    onClick={() => setIsAnswerRevealed(true)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Flip to Reveal Answer & Traps</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5 my-6 animate-fadeIn">
                  {/* Spoken Answer */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {answerLanguage === 'hinglish' ? 'How to Answer (Hinglish)' : 'Formal English Response'}
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                      {answerLanguage === 'hinglish' ? currentFlashcard.hinglishAnswer : currentFlashcard.englishAnswer}
                    </p>
                  </div>

                  {/* Examiner Trap */}
                  <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300">Examiner's Hidden Trap: </span>
                      {currentFlashcard.examinerTrap}
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="bg-indigo-950/30 border border-indigo-800/50 rounded-xl p-4 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-indigo-300">Pro Buzzwords to Mention: </span>
                      {currentFlashcard.proTip}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={prevCard}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition"
                >
                  ← Previous Card
                </button>
                <button
                  onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  {isAnswerRevealed ? 'Hide Answer' : 'Show Answer'}
                </button>
                <button
                  onClick={nextCard}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
                >
                  Next Card →
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 p-8">No questions found in this category.</div>
          )}
        </div>
      ) : (
        /* STANDARD QUESTIONS LIST */
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const isMastered = masteredIds.has(q.id);
            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-6 transition-all shadow-md relative group"
              >
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q{q.id}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition">
                        {q.question}
                      </h3>
                      <p className="text-sm text-indigo-300/90 mt-0.5 font-medium">
                        "{q.hindiQuestion}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start shrink-0">
                    <span className="text-[11px] font-medium bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700">
                      {q.category}
                    </span>
                    <button
                      onClick={() => toggleMastered(q.id)}
                      title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        isMastered
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/80'
                          : 'bg-slate-800/80 text-slate-500 border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spoken Answer Box */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {answerLanguage === 'hinglish' ? 'Spoken Hinglish Answer (Say This Naturally)' : 'Formal Academic English Answer'}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {answerLanguage === 'hinglish' ? q.hinglishAnswer : q.englishAnswer}
                  </p>
                </div>

                {/* Secondary Advice (Trap + Buzzwords) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-3 text-amber-200 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300">Examiner's Trap: </span>
                      {q.examinerTrap}
                    </div>
                  </div>

                  <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-lg p-3 text-indigo-200 flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-indigo-300">Smart Buzzwords: </span>
                      {q.proTip}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
