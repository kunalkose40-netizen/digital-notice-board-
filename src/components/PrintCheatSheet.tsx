import React from 'react';
import { VIVA_QUESTIONS } from '../data/vivaQuestions';
import { Printer, Download, GraduationCap, CheckCircle2 } from 'lucide-react';

export const PrintCheatSheet: React.FC = () => {
  const top10Questions = VIVA_QUESTIONS.slice(0, 10);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner with Print Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl print:hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            Exam-Day Quick Revision Cheat Sheet
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Condensed 2-page printout with elevator pitch, system specs, and top 10 viva answers to review right outside the viva hall.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet (Stylized for both screen and print) */}
      <div className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 shadow-2xl print:shadow-none print:p-0 print:m-0 border border-slate-200">
        {/* Header */}
        <div className="border-b-2 border-indigo-600 pb-4 mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Digital Notice Board System
            </h1>
            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mt-0.5">
              B.Tech Final Year Viva Master Cheat Sheet • CSE Department
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>Stack: React 19 + Node.js + Express + MongoDB</div>
            <div>Auth: JWT (Stateless) | Real-time: WebSockets</div>
          </div>
        </div>

        {/* 1-Minute Pitch */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
            60-Second Viva Elevator Pitch (Speak this first):
          </h3>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            "Sir/Ma'am, our project is a Digital Notice Board System designed to modernize campus communication. It replaces slow physical pinboards with a centralized web platform where authorized faculties publish circulars with PDF/image attachments and automated expiry dates. Students receive instant real-time updates via WebSockets without page reloads, and can search or filter circulars by Exam, Events, or Placement."
          </p>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold block text-slate-800">1. Architecture</span>
            <p className="text-slate-600 mt-1">3-Tier Decoupled: React SPA (Client) + Express REST/Socket API (Logic) + MongoDB (Data).</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold block text-slate-800">2. Security & Auth</span>
            <p className="text-slate-600 mt-1">Bcrypt password salting + Stateless JWT tokens with verifyAdmin middleware role enforcement.</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold block text-slate-800">3. Performance Optimization</span>
            <p className="text-slate-600 mt-1">MongoDB compound index on <code>&#123; isPinned: -1, createdAt: -1 &#125;</code> for instant sorted notice feeds.</p>
          </div>
        </div>

        {/* Top 10 High Yield Viva Questions & Answers */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
            Top 10 High-Yield Viva Questions & Hinglish Answers
          </h3>

          <div className="space-y-3.5">
            {top10Questions.map((q) => (
              <div key={q.id} className="text-xs border-b border-slate-100 pb-2.5">
                <div className="flex items-start gap-2 mb-1">
                  <span className="font-bold text-indigo-700 shrink-0">Q{q.id}.</span>
                  <span className="font-bold text-slate-900">{q.question}</span>
                </div>
                <div className="pl-5 text-slate-700 leading-relaxed">
                  <strong className="text-emerald-700">Answer: </strong>
                  {q.hinglishAnswer}
                </div>
                <div className="pl-5 text-[11px] text-amber-700 mt-0.5">
                  <strong>Examiner trap: </strong>{q.examinerTrap}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Rules Reminder */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <span className="font-bold block text-slate-800 mb-1">3 Quick Hall Rules:</span>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>Never say "Bcrypt encrypts"; say "Bcrypt hashes with a cryptographic salt".</li>
            <li>Never say "I don't know"; say "Sir, based on my understanding of this protocol...".</li>
            <li>Emphasize that security is enforced on the server via JWT middleware, not by hiding UI buttons.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
