import React, { useState, useEffect } from 'react';
import { 
  ELEVATOR_PITCH, 
  THREE_MINUTE_PRESENTATION, 
  SAY_THIS_NOT_THAT, 
  VIVA_SURVIVAL_RULES 
} from '../data/speechScripts';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertOctagon, 
  Clock, 
  Sparkles, 
  ShieldCheck,
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const ConfidenceCoach: React.FC = () => {
  const [activeSpeechTab, setActiveSpeechTab] = useState<'pitch' | 'formal' | 'saythis' | 'rules'>('pitch');
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = (secs: number = 60) => {
    setIsTimerRunning(false);
    setTimerSeconds(secs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-slate-900 to-slate-900 border border-purple-700/40 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30 mb-2">
              <Mic className="w-3.5 h-3.5" />
              <span>Section 16 • Confident Examiner Speech Master</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How to Speak Confidently in Front of Examiners
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Examiners judge your confidence, body language, and clarity of thought more than raw syntax memorization. Practice these word-for-word scripts and recovery tactics.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setActiveSpeechTab('pitch'); resetTimer(60); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeSpeechTab === 'pitch' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              60s Pitch
            </button>
            <button
              onClick={() => { setActiveSpeechTab('formal'); resetTimer(180); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeSpeechTab === 'formal' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3-Min Presentation
            </button>
            <button
              onClick={() => setActiveSpeechTab('saythis')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeSpeechTab === 'saythis' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Say This / Not That
            </button>
            <button
              onClick={() => setActiveSpeechTab('rules')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeSpeechTab === 'rules' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              5 Golden Rules
            </button>
          </div>
        </div>
      </div>

      {/* 60s ELEVATOR PITCH */}
      {activeSpeechTab === 'pitch' && (
        <div className="space-y-6">
          {/* Practice Timer Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <h4 className="text-sm font-bold text-white">Speech Rehearsal Timer</h4>
                <p className="text-xs text-slate-400">Aim to complete this pitch in 45 to 55 seconds smoothly.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-mono font-bold ${timerSeconds < 10 ? 'text-rose-400 animate-pulse' : 'text-purple-300'}`}>
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => resetTimer(60)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">{ELEVATOR_PITCH.title}</h3>
              <p className="text-sm text-purple-300 mt-0.5">{ELEVATOR_PITCH.tagline}</p>
            </div>

            <div className="space-y-6">
              {ELEVATOR_PITCH.scriptLines.map((line, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 relative">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                    {line.speakerCue}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed mb-3">
                    "{line.englishText}"
                  </p>
                  <div className="text-xs text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                    <span className="font-semibold text-purple-300">💡 Mentor Cue:</span>
                    <span>{line.hinglishExplanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3-MINUTE PRESENTATION OPENING */}
      {activeSpeechTab === 'formal' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-sm font-bold text-white">Slide Presentation Opening Timer</h4>
                <p className="text-xs text-slate-400">Speak calmly during your first 4 slides before switching to live code.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono font-bold text-indigo-300">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60) < 10 ? `0${timerSeconds % 60}` : timerSeconds % 60}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => resetTimer(180)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">{THREE_MINUTE_PRESENTATION.title}</h3>
              <p className="text-sm text-indigo-300 mt-0.5">{THREE_MINUTE_PRESENTATION.tagline}</p>
            </div>

            <div className="space-y-6">
              {THREE_MINUTE_PRESENTATION.scriptLines.map((line, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
                    {line.speakerCue}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed mb-3">
                    "{line.englishText}"
                  </p>
                  <div className="text-xs text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                    <span className="font-semibold text-indigo-300">💡 Mentor Cue:</span>
                    <span>{line.hinglishExplanation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SAY THIS / NOT THAT */}
      {activeSpeechTab === 'saythis' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-1">Vocabulary & Examiner Psychology</h3>
            <p className="text-sm text-slate-400">
              Certain casual words instantly trigger skepticism from senior examiners. Swap rookie phrases for software engineering vocabulary.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SAY_THIS_NOT_THAT.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Don't Say */}
                  <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-rose-400 mb-2">
                      <AlertOctagon className="w-4 h-4" />
                      <span>Rookie Phrase (Avoid Saying)</span>
                    </div>
                    <p className="text-rose-200 text-sm font-medium italic">
                      "{item.dontSay}"
                    </p>
                  </div>

                  {/* Say This */}
                  <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Senior Engineer Phrasing (Say This)</span>
                    </div>
                    <p className="text-emerald-200 text-sm font-medium">
                      "{item.sayThis}"
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-indigo-300">Why this matters: </span>
                  {item.why}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5 GOLDEN RULES OF B.TECH VIVA */}
      {activeSpeechTab === 'rules' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-1">5 Golden Viva Defense Rules</h3>
            <p className="text-sm text-slate-400">
              Exam Hall Strategy: How to handle aggressive examiners, tackle unknown questions, and keep your composure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VIVA_SURVIVAL_RULES.map((rule, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>{rule.rule}</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}

            {/* Emergency Recovery Card */}
            <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-800/50 rounded-xl p-5 md:col-span-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>The "I Don't Know" Golden Recovery Formula</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                If the examiner asks a question you have completely zero clue about, NEVER say "Sir syllabus me nahi tha" or guess randomly. Use this 3-step script:
              </p>
              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 text-xs sm:text-sm text-amber-200 italic">
                "Sir, I do not want to guess incorrectly on this specific detail. Based on my understanding of our Node/MongoDB pipeline, [mention 1 related thing you DO know]. I will definitely study this specific protocol right after this viva."
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                This shows extreme maturity, intellectual honesty, and respect for the examiner's expertise.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
