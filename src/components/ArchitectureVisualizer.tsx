import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Server, 
  Monitor, 
  Lock, 
  Radio, 
  FileCode, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  Key,
  CalendarClock
} from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'3tier' | 'jwt' | 'socket' | 'schema' | 'lifecycle'>('3tier');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-900/60 via-slate-900 to-slate-900 border border-sky-700/40 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 text-xs font-semibold px-3 py-1 rounded-full border border-sky-500/30 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Section 8 & 10 • Technical Architecture & Data Models</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              System Architecture & MongoDB Deep Dive
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Visual architectural models and database schemas to explain the technical plumbing of your B.Tech project when the examiner asks to draw system diagrams.
            </p>
          </div>

          <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveDiagram('3tier')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeDiagram === '3tier' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3-Tier Architecture
            </button>
            <button
              onClick={() => setActiveDiagram('jwt')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeDiagram === 'jwt' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              JWT Auth Flow
            </button>
            <button
              onClick={() => setActiveDiagram('socket')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeDiagram === 'socket' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              WebSocket Broadcast
            </button>
            <button
              onClick={() => setActiveDiagram('schema')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeDiagram === 'schema' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MongoDB Schemas
            </button>
            <button
              onClick={() => setActiveDiagram('lifecycle')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeDiagram === 'lifecycle' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Notice Lifecycle
            </button>
          </div>
        </div>
      </div>

      {/* 3-TIER ARCHITECTURE DIAGRAM */}
      {activeDiagram === '3tier' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                3-Tier Client-Server-Database Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Strict separation of concerns between visual rendering, business logic, and document persistence.
              </p>
            </div>

            {/* 3 Tiers Flow Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              {/* Tier 1: Client */}
              <div className="bg-slate-950/80 border-2 border-indigo-500/40 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg">
                <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Tier 1: Presentation
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Client Frontend</h4>
                      <span className="text-xs text-indigo-400 font-mono">React 19 + Tailwind CSS</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      Single Page Application (SPA)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      Virtual DOM instant reconciliation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      Socket.io client listener (`ws://`)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      Client-side search debouncing
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                  Payload: JSON over HTTP REST & WebSockets
                </div>
              </div>

              {/* Tier 2: Logic Server */}
              <div className="bg-slate-950/80 border-2 border-emerald-500/40 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg">
                <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Tier 2: Business Logic
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Application Server</h4>
                      <span className="text-xs text-emerald-400 font-mono">Node.js + Express.js</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      JWT Verification Middleware
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      REST API Routes (`/api/notices`)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Multer Multipart File Handler
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Socket.io WebSocket Server
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                  Non-blocking Async I/O (libuv)
                </div>
              </div>

              {/* Tier 3: Database */}
              <div className="bg-slate-950/80 border-2 border-amber-500/40 rounded-2xl p-6 relative flex flex-col justify-between shadow-lg">
                <div className="absolute -top-3 left-4 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Tier 3: Persistence
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="p-2.5 bg-amber-600/20 text-amber-400 rounded-xl">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Data Layer</h4>
                      <span className="text-xs text-amber-400 font-mono">MongoDB + Cloud Storage</span>
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Collections: Users, Notices
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Compound Indexes on isPinned + date
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      BSON Flexible Document Store
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      Static PDF & Image Assets
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                  Mongoose ODM with Schemas
                </div>
              </div>
            </div>

            {/* Speaking Guide for this diagram */}
            <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">How to explain this diagram to the examiner: </strong>
                "Sir, our system follows a classic 3-Tier decoupled pattern. When a user opens the app, the React SPA makes a GET request to Express. Express queries MongoDB using compound indexes and returns JSON notices. When an admin creates a notice, Express saves to MongoDB and immediately fires a WebSocket event to all connected sockets."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JWT AUTHENTICATION FLOW */}
      {activeDiagram === 'jwt' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400" />
                JWT Authentication & Role Authorization Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Stateless, cryptographically signed token verification flow.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '1. Admin Login Submission',
                  desc: 'Admin enters email and password on React login form -> POST /api/auth/login.',
                  sub: 'Payload: { email, password }'
                },
                {
                  step: '2. Bcrypt Password Verification',
                  desc: 'Server fetches user record from MongoDB by email -> Calls bcrypt.compare(plainPassword, user.passwordHash).',
                  sub: 'If hash does not match, returns HTTP 401 Unauthorized.'
                },
                {
                  step: '3. JWT Token Generation & Signing',
                  desc: 'Server creates signed JWT containing payload: { id, email, role: "admin" } with HMAC-SHA256 signature using secret key.',
                  sub: 'Expiry: 24 Hours. Server returns token to browser.'
                },
                {
                  step: '4. Token Attachment to Requests',
                  desc: 'React stores token securely and attaches to Axios headers for all mutating API requests.',
                  sub: 'Header: Authorization: Bearer eyJhbGciOiJIUzI1Ni...'
                },
                {
                  step: '5. Server Middleware Verification (verifyAdmin)',
                  desc: 'Express middleware intercepts /api/notices -> Decodes token with JWT_SECRET -> Verifies expiration and checks if req.user.role === "admin".',
                  sub: 'If valid, next() is called; if forged or expired, returns HTTP 403 Forbidden.'
                }
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-4">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.step}</h4>
                    <p className="text-xs text-slate-300 mt-0.5">{s.desc}</p>
                    <span className="inline-block mt-1 text-[11px] font-mono text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {s.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WEBSOCKET EVENT CYCLE */}
      {activeDiagram === 'socket' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-400" />
                WebSocket Real-Time Broadcast Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Full-duplex persistent TCP socket connection eliminating HTTP polling latency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  1. Persistent Handshake
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  When a student loads the web page, the React client initiates an HTTP request with <code className="text-emerald-300">Upgrade: websocket</code> header. Once upgraded, a persistent full-duplex TCP socket remains open.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                  const socket = io(SERVER_URL);<br />
                  socket.on('connect', () =&gt; console.log('Connected!'));
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  2. Event Emission on Publish
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  In the Express notice controller, immediately following the <code className="text-emerald-300">notice.save()</code> MongoDB promise resolution, the socket gateway broadcasts the event:
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                  io.emit('new_notice_published', savedNotice);
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 md:col-span-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  3. Client Event Ingestion & Re-render
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Every active student browser immediately captures the broadcast payload. The state updater prepends the new notice to the React notices array and triggers a toast banner without any page refresh!
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                  socket.on('new_notice_published', (newNotice) =&gt; &#123;<br />
                  &nbsp;&nbsp;setNotices(prev =&gt; [newNotice, ...prev]);<br />
                  &nbsp;&nbsp;showToast(`New ${'{newNotice.category}'} Notice Published!`);<br />
                  &#125;);
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MONGODB SCHEMAS */}
      {activeDiagram === 'schema' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Mongoose ODM Schemas & Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Notice, User, and Bookmark schemas with compound indexing strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notice Schema */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  NoticeSchema (models/Notice.js)
                </span>
                <pre className="text-[11px] text-slate-300 font-mono bg-slate-900 p-3.5 rounded-lg border border-slate-800 overflow-x-auto leading-relaxed">
{`const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Exam', 'Events', 'Placement', 'General'],
    required: true,
    index: true
  },
  attachments: [{
    name: String,
    url: String,
    fileType: { type: String, enum: ['pdf', 'image'] },
    size: String
  }],
  isPinned: { 
    type: Boolean, 
    default: false 
  },
  startDate: { 
    type: Date, 
    default: Date.now 
  },
  expiryDate: { 
    type: Date, 
    required: true,
    index: true 
  },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  viewsCount: { type: Number, default: 0 }
}, { timestamps: true });

// Compound Index for High-Performance Sorted Query
noticeSchema.index({ isPinned: -1, createdAt: -1 });`}
                </pre>
              </div>

              {/* User Schema */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  UserSchema (models/User.js)
                </span>
                <pre className="text-[11px] text-slate-300 font-mono bg-slate-900 p-3.5 rounded-lg border border-slate-800 overflow-x-auto leading-relaxed">
{`const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true 
  },
  password: { 
    type: String, 
    required: true 
  }, // Bcrypt Salted Hash
  role: { 
    type: String, 
    enum: ['admin', 'faculty', 'student'],
    default: 'student' 
  },
  department: { 
    type: String, 
    default: 'Computer Science & Engineering' 
  }
}, { timestamps: true });`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTICE LIFECYCLE */}
      {activeDiagram === 'lifecycle' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-purple-400" />
                Notice State Machine Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                How circulars transition from creation to scheduled, active, and auto-archived.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                  State 1: Scheduled (Future)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Admin sets <code className="text-purple-300">startDate &gt; currentDate</code>. The notice is saved in MongoDB but excluded from the active student feed query until its scheduled release morning.
                </p>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                  Visible to: Admins only (Drafts)
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/40">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  State 2: Live / Active
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  <code className="text-emerald-300">startDate &lt;= currentDate &lt;= expiryDate</code>. The circular is actively served to all students, searchable, and displays live countdowns.
                </p>
                <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-800">
                  Visible to: All Students & Faculty
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  State 3: Expired / Archived
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  <code className="text-rose-300">currentDate &gt; expiryDate</code>. Notice is automatically excluded by the standard feed filter, preventing outdated clutter on the dashboard.
                </p>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                  Visible to: Admin Historical Audit Trail
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
