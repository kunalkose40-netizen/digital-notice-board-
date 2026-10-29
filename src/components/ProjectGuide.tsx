import React, { useState } from 'react';
import { PROJECT_SECTIONS, SectionItem } from '../data/projectData';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Volume2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProjectGuideProps {
  searchQuery: string;
}

export const ProjectGuide: React.FC<ProjectGuideProps> = ({ searchQuery }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Default open first 4 sections
    return {
      'intro': true,
      'problem-statement': true,
      'objectives': true,
      'tech-stack': true,
      'system-architecture': true
    };
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    PROJECT_SECTIONS.forEach(s => { allOpen[s.id] = true; });
    setExpandedSections(allOpen);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = PROJECT_SECTIONS.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.speakablePoint.toLowerCase().includes(q) ||
      s.details.some(d => d.points.some(p => p.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-700/40 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Report & Presentation Core</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              14 Core Technical Presentation Sections
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Organized exactly in the formal sequence required by college viva examiners and accreditation committees. Each section includes what to speak in viva, detailed engineering justifications, and key takeaways.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={expandAll}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700 transition"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700 transition"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Quick jump badges */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-slate-800">
          <span className="text-xs text-slate-400 self-center mr-1 font-medium">Quick Jump:</span>
          {PROJECT_SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#section-${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                setExpandedSections(prev => ({ ...prev, [sec.id]: true }));
                const el = document.getElementById(`section-${sec.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-xs bg-slate-800/80 hover:bg-indigo-600/80 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700/60 transition"
            >
              {sec.number}. {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {filteredSections.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
            No sections matched your search query "{searchQuery}". Try searching for words like "JWT", "MongoDB", "Architecture", or "WebSocket".
          </div>
        ) : (
          filteredSections.map((section: SectionItem) => {
            const isExpanded = !!expandedSections[section.id];
            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden transition-all shadow-md"
              >
                {/* Section Header */}
                <div
                  onClick={() => toggleSection(section.id)}
                  className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none bg-slate-900/90 hover:bg-slate-800/50 transition"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-sm font-bold shrink-0 mt-0.5">
                      {section.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                        {section.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(
                          `${section.title}\n\nSpeakable Point:\n${section.speakablePoint}\n\nSummary:\n${section.summary}\n\nKey Takeaway:\n${section.keyTakeaway}`,
                          section.id
                        );
                      }}
                      title="Copy section notes"
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                    >
                      {copiedId === section.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <div className="p-1 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Section Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                    {/* Speakable Viva Script (Highlight Box) */}
                    <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-4 sm:p-5 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0 mt-0.5">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                              What to Speak in Front of Examiner (Memorize This)
                            </h4>
                          </div>
                          <p className="text-slate-100 text-sm sm:text-base leading-relaxed mt-2 font-medium italic">
                            "{section.speakablePoint}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Executive Summary
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-slate-800">
                        {section.summary}
                      </p>
                    </div>

                    {/* Detailed Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-800/40 border border-slate-800 rounded-lg p-4"
                        >
                          <h5 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-indigo-400" />
                            {detail.heading}
                          </h5>
                          <ul className="space-y-2">
                            {detail.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Key Takeaway Banner */}
                    <div className="flex items-center gap-3 bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-3 text-xs sm:text-sm text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-200">Key Takeaway for Viva: </span>
                        {section.keyTakeaway}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
