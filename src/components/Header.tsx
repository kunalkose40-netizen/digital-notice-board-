import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Mic, 
  LayoutDashboard, 
  Network, 
  Presentation, 
  Printer, 
  GraduationCap,
  Sparkles,
  Tv,
  Bot
} from 'lucide-react';

export type TabType = 'guide' | 'viva' | 'coach' | 'demo' | 'kiosk' | 'aiexaminer' | 'architecture' | 'slides' | 'cheatsheet';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const tabs = [
    { id: 'guide' as TabType, label: '14 Core Sections', icon: BookOpen, badge: 'Full Report' },
    { id: 'viva' as TabType, label: '20 Viva Q&A (Hinglish)', icon: HelpCircle, badge: 'High Yield' },
    { id: 'aiexaminer' as TabType, label: 'AI Viva Examiner', icon: Bot, badge: 'Gemini AI' },
    { id: 'kiosk' as TabType, label: '3D Smart Kiosk', icon: Tv, badge: 'Three.js PBR' },
    { id: 'coach' as TabType, label: 'Examiner Confidence Coach', icon: Mic, badge: 'Pitch & Tips' },
    { id: 'demo' as TabType, label: 'Live Notice Board Demo', icon: LayoutDashboard, badge: 'Interactive' },
    { id: 'architecture' as TabType, label: 'Architecture & MongoDB', icon: Network, badge: 'Diagrams' },
    { id: 'slides' as TabType, label: 'Presentation Slides (PPT)', icon: Presentation, badge: '10 Slides' },
    { id: 'cheatsheet' as TabType, label: 'Exam Day Cheat Sheet', icon: Printer, badge: 'Printable' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Digital Notice Board System
                <span className="text-xs bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-500/30">
                  B.Tech CSE Capstone
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Complete Viva Preparation & Presentation Mastery Portal • React + Node.js + Express + MongoDB + WebSockets
            </p>
          </div>
        </div>

        {/* Quick Viva Confidence Badge & Search */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 px-3 py-1.5 rounded-lg text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Examiner Ready: 20 Hinglish Q&A + Live Demo</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search concepts, questions, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800/90 text-sm text-slate-200 placeholder-slate-400 border border-slate-700 rounded-lg px-3.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-64 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
