/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { ProjectGuide } from './components/ProjectGuide';
import { VivaSimulator } from './components/VivaSimulator';
import { ConfidenceCoach } from './components/ConfidenceCoach';
import { LiveNoticeBoardDemo } from './components/LiveNoticeBoardDemo';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { SlideDeck } from './components/SlideDeck';
import { PrintCheatSheet } from './components/PrintCheatSheet';
import { ThreeNoticeBoardKiosk } from './components/ThreeNoticeBoardKiosk';
import { AIVivaExaminerChat } from './components/AIVivaExaminerChat';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  LayoutDashboard, 
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('guide');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Breadcrumb / Mode Subtitle */}
        <div className="bg-slate-900/60 border-b border-slate-800/60 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Active Mode:</span>
              <span className="font-semibold text-indigo-400 capitalize">
                {activeTab === 'guide' && 'Complete Project Report & Presentation Guide (Sections 1-14)'}
                {activeTab === 'viva' && '20 Essential Viva Questions with Hinglish Explanations (Section 15)'}
                {activeTab === 'aiexaminer' && 'AI Viva Examiner Simulation (Dr. Arvind Narayanan - Gemini 3.8 Flash)'}
                {activeTab === 'kiosk' && '3D Smart Corridor Kiosk & IoT Terminal (Three.js PBR Studio)'}
                {activeTab === 'coach' && 'Examiner Confidence & Pitch Defense Coach (Section 16)'}
                {activeTab === 'demo' && 'Live Digital Notice Board Application Simulator'}
                {activeTab === 'architecture' && '3-Tier System Architecture & MongoDB Database Schemas'}
                {activeTab === 'slides' && 'PowerPoint Presentation Slide Deck (10 Projector Slides)'}
                {activeTab === 'cheatsheet' && 'Printable Exam-Day Quick Revision Sheet'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Viva Ready</span>
              </span>
              <span>•</span>
              <span>B.Tech Final Year Capstone</span>
            </div>
          </div>
        </div>

        {/* View Router */}
        {activeTab === 'guide' && <ProjectGuide searchQuery={searchQuery} />}
        {activeTab === 'viva' && <VivaSimulator searchQuery={searchQuery} />}
        {activeTab === 'aiexaminer' && <AIVivaExaminerChat />}
        {activeTab === 'kiosk' && <ThreeNoticeBoardKiosk />}
        {activeTab === 'coach' && <ConfidenceCoach />}
        {activeTab === 'demo' && <LiveNoticeBoardDemo />}
        {activeTab === 'architecture' && <ArchitectureVisualizer />}
        {activeTab === 'slides' && <SlideDeck />}
        {activeTab === 'cheatsheet' && <PrintCheatSheet />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>
              <strong>Digital Notice Board System</strong> • 4th Year B.Tech Computer Science Project
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>React 19 + Tailwind CSS</span>
            <span>•</span>
            <span>Node.js + Express</span>
            <span>•</span>
            <span>MongoDB + WebSockets</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
