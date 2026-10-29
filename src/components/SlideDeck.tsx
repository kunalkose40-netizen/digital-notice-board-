import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  Layers, 
  GraduationCap, 
  Sparkles, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface Slide {
  number: number;
  title: string;
  subtitle: string;
  points: string[];
  notes: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    number: 1,
    title: 'Digital Notice Board System',
    subtitle: 'A Modern Real-Time Communication Hub for College Campuses',
    tag: 'B.Tech CSE Capstone Project',
    points: [
      'Developed by: Final Year B.Tech Computer Science & Engineering',
      'Technology: MERN Stack (React.js, Node.js, Express.js, MongoDB) + WebSockets',
      'Target Users: College Administrators, Faculty HODs, and 5000+ Students',
      'Core Goal: Modernize campus communication, eradicate paper wastage, and provide zero-delay notices.'
    ],
    notes: 'Good morning respected external examiners and professors. Today we present our capstone project: Digital Notice Board System. It is an end-to-end cloud platform built with React, Node, Express, MongoDB, and WebSockets to modernize campus communication.'
  },
  {
    number: 2,
    title: 'Problem Statement',
    subtitle: 'Pain Points of Existing Campus Communication',
    tag: 'The Core Problem',
    points: [
      'Physical Constraint: Absent students or those on study leave miss crucial exam circulars.',
      'Information Clutter: Old, torn, rain-damaged papers pinned on top of each other.',
      'WhatsApp / Telegram Noise: Official circulars get lost among casual chat spam and rumors.',
      'Environmental Waste: Thousands of pages printed and discarded every semester.'
    ],
    notes: 'In most colleges, notice boards are physically locked to corridors. Important placement and exam schedules get covered by unofficial posters or lost in unstructured WhatsApp groups.'
  },
  {
    number: 3,
    title: 'Project Objectives',
    subtitle: 'Key Deliverables and Design Goals',
    tag: 'Objectives',
    points: [
      'Zero-Paper Campus: Digitize 100% of departmental circulars, saving paper and printing costs.',
      'Sub-Second Real-Time Alerts: Broadcast urgent announcements to all students via WebSockets.',
      'Smart Categorization: Seamless sorting into Exam, Events, Placement, and General categories.',
      'Automated Lifecycle: Start dates and auto-expiry so outdated circulars vanish without manual effort.',
      'Role-Based Security: JWT-authenticated faculties with role authorization.'
    ],
    notes: 'Our measurable objectives are to save 100% paper, deliver circulars within milliseconds using WebSockets, categorize notices cleanly, and automate notice expiry.'
  },
  {
    number: 4,
    title: 'Existing System vs Proposed System',
    subtitle: 'Comparative Analysis',
    tag: 'Comparison',
    points: [
      'Access: Physical pinboard (Local corridor only) vs Proposed (24/7 Remote on mobile & PC)',
      'Speed: Manual paper pinning (Hours of delay) vs Proposed (Instant sub-second broadcast)',
      'Searchability: Zero search on corkboards vs Proposed (Instant text search & category filters)',
      'Authenticity: Chat groups risk fake news vs Proposed (Cryptographically signed JWT authoring)',
      'Lifecycle: Papers stay forever vs Proposed (Automated start & expiration date filtering)'
    ],
    notes: 'Unlike physical boards which require walking to a corridor, or chat groups which suffer from unverified rumors, our proposed system offers 24/7 verified, searchable access.'
  },
  {
    number: 5,
    title: 'Core Features & Role Architecture',
    subtitle: 'Admin and Student Portals',
    tag: 'Features',
    points: [
      'Admin Portal: Secure JWT login, create/edit/delete circulars, attach PDFs/images, set expiry dates, and pin priority notices.',
      'Student Portal: Live categorized feed, instant WebSocket alerts, full-text search, PDF downloads, and personal bookmarking.',
      'Notice Pinning: Urgent alerts stay at the top of the feed regardless of publication timestamp.',
      'Multi-Format Attachments: Supports exam timetables, job descriptions, and event posters.'
    ],
    notes: 'The system has two roles: Admins with full CRUD and scheduling rights, and Students who receive real-time updates, download attachments, and bookmark critical dates.'
  },
  {
    number: 6,
    title: 'Technology Stack & Selection Justification',
    subtitle: 'Why MERN + WebSockets?',
    tag: 'Tech Stack',
    points: [
      'Frontend: React.js 19 + Tailwind CSS (Component reusability, Virtual DOM speed, responsive UI)',
      'Backend: Node.js + Express.js (Asynchronous non-blocking I/O ideal for concurrent student reads)',
      'Database: MongoDB + Mongoose (Flexible BSON document schema, embedded attachments, compound indexes)',
      'Real-Time: WebSockets / Socket.io (Full-duplex persistent connection, zero polling overhead)',
      'Security: JWT (Stateless authentication) + Bcrypt (Cryptographically salted password hashing)'
    ],
    notes: 'We chose the MERN stack for unified JavaScript end-to-end, high-concurrency non-blocking I/O in Node, flexible JSON documents in MongoDB, and real-time WebSockets.'
  },
  {
    number: 7,
    title: 'System Architecture (3-Tier Decoupled)',
    subtitle: 'Presentation, Logic, and Persistence Tiers',
    tag: 'Architecture',
    points: [
      'Tier 1 (Presentation): React SPA communicating via HTTP REST APIs and persistent WebSocket channel.',
      'Tier 2 (Logic Server): Express routing, Multer multipart file upload handling, and JWT role verification middleware.',
      'Tier 3 (Data Layer): MongoDB database collections (Users, Notices) with compound indexes on { isPinned: -1, createdAt: -1 }.',
      'Event Engine: Socket.io gateway triggers io.emit("new_notice") on successful database commit.'
    ],
    notes: 'Our architecture cleanly separates presentation in React, logic in Express with JWT middleware, and persistence in MongoDB with compound indexing.'
  },
  {
    number: 8,
    title: 'Database Design & Schema Optimization',
    subtitle: 'MongoDB Document Structure',
    tag: 'Database',
    points: [
      'Notices Collection: _id, title, content, category (Enum), attachments array, isPinned, startDate, expiryDate, postedBy, views.',
      'Users Collection: _id, name, email (unique index), password (Bcrypt hash), role ("admin" | "student"), department.',
      'Compound Index: { isPinned: -1, createdAt: -1 } allows O(log n) sorting of pinned notices without memory sort bottlenecks.',
      'Text Index: Full-text search index on { title: "text", content: "text" }.'
    ],
    notes: 'Notice documents embed attachment metadata directly, eliminating expensive relational joins. Compound indexes ensure pinned notices sort on top with extreme speed.'
  },
  {
    number: 9,
    title: 'Advantages & Environmental Impact',
    subtitle: 'Real-World Value Delivered',
    tag: 'Impact',
    points: [
      '100% Eco-Friendly & Paperless: Substantially reduces institutional paper and ink budget.',
      'Zero Missed Deadlines: Remote student access ensures no one misses exam forms or placement cutoffs.',
      'Immediate Crisis Communication: Urgent campus announcements (weather closures, room changes) dispatched in under 1 second.',
      'Clutter-Free Dashboard: Outdated notices auto-archive based on expiry timestamps.'
    ],
    notes: 'The project delivers measurable environmental and operational value by eliminating paper and ensuring no student ever misses a placement or exam deadline.'
  },
  {
    number: 10,
    title: 'Limitations & Future Scope Roadmap',
    subtitle: 'Honest Engineering Assessment',
    tag: 'Future Scope',
    points: [
      'Current Limitations: Requires internet connectivity; notifications depend on browser tab or OS permissions.',
      'Future Scope 1: React Native Mobile App with Firebase Cloud Messaging (FCM) background push notifications.',
      'Future Scope 2: Campus IoT TV Displays (Raspberry Pi screens in campus hallways running live board feed).',
      'Future Scope 3: AI Notice Summarizer (LLM-based automatic 3-point bullet summary of 10-page circulars).',
      'Future Scope 4: Multi-tenant department hierarchy with Principal approval workflow.'
    ],
    notes: 'While current constraints require active internet, our roadmap includes a React Native app with Firebase push, campus IoT smart TV displays, and AI-powered notice summarization.'
  }
];

export const SlideDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);

  const slide = SLIDES[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Slide Control Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Presentation Mode (Slide Deck)</h3>
            <p className="text-xs text-slate-400">Use Left/Right keyboard arrows or buttons to advance slides.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              showNotes
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 inline mr-1" />
            {showNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}
          </button>

          <span className="text-xs font-mono text-slate-400">
            Slide {currentSlideIndex + 1} of {SLIDES.length}
          </span>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative min-h-[460px] flex flex-col justify-between overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Top Badge */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
              {slide.tag}
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Slide {slide.number} / {SLIDES.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base text-indigo-300 font-medium mt-1 mb-8">
            {slide.subtitle}
          </p>

          {/* Slide Points */}
          <div className="space-y-4 mb-8">
            {slide.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-2" />
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlideIndex
                    ? 'w-6 bg-indigo-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, SLIDES.length - 1))}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-lg shadow-indigo-600/30"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="mt-6 bg-slate-950/90 border border-indigo-900/40 rounded-2xl p-6 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Volume2 className="w-4 h-4" />
            <span>What to speak on this slide (Presenter Notes)</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-medium">
            "{slide.notes}"
          </p>
        </div>
      )}
    </div>
  );
};
