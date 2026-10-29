export interface SectionItem {
  id: string;
  number: number;
  title: string;
  tagline: string;
  summary: string;
  speakablePoint: string;
  details: {
    heading: string;
    points: string[];
  }[];
  keyTakeaway: string;
  diagramType?: 'architecture' | 'flow' | 'database' | 'comparison';
}

export const PROJECT_SECTIONS: SectionItem[] = [
  {
    id: 'intro',
    number: 1,
    title: 'Project Introduction',
    tagline: 'What is this project and why was it created?',
    summary: 'A centralized web-based digital communication platform that replaces traditional paper notice boards in colleges with real-time, categorized, and accessible digital notices.',
    speakablePoint: 'Sir/Ma\'am, our project is a Digital Notice Board System designed to modernize campus communication. It allows college administrators and faculties to publish, schedule, and categorize urgent circulars while students receive instant real-time updates and attachments on their phones or laptops.',
    details: [
      {
        heading: 'Core Concept',
        points: [
          'A modern MERN-stack web application designed for universities, colleges, and educational departments.',
          'Bridges the communication gap between college administration, faculty members, and students.',
          'Eliminates the physical restriction of having to stand near a wooden or glass notice board in a corridor to read updates.'
        ]
      },
      {
        heading: 'Primary Audience',
        points: [
          'Students: Access notices anytime, anywhere on smartphones, search circulars, download timetable PDFs, and filter by Exam or Placement.',
          'Faculties & Department HODs: Publish notices directly with instant approval and attachment support without printing paperwork.',
          'College Admin: Central control, user role management, pinning critical emergency notices, and monitoring expired circulars.'
        ]
      }
    ],
    keyTakeaway: 'In one sentence: It transforms the traditional slow, physical pin-board into an instant, cloud-accessible, paperless communication hub.'
  },
  {
    id: 'problem-statement',
    number: 2,
    title: 'Problem Statement',
    tagline: 'What exact pain-point are we solving?',
    summary: 'Colleges still depend on physical pinboards or unstructured WhatsApp groups, causing missed deadlines, lost exam notices, paper wastage, and zero verification.',
    speakablePoint: 'In most colleges today, students miss important placement drives or exam date sheets because physical notice boards are cluttered with old papers, torn by weather, or drowned in spam-filled WhatsApp groups. There is no official, organized, and real-time mechanism to reach every student reliably.',
    details: [
      {
        heading: 'Key Problems Identified',
        points: [
          'Physical Inaccessibility: A student absent on a particular day completely misses crucial exam forms or fees deadlines.',
          'Information Clutter: Multiple papers stapled on top of each other make it impossible to identify which circular is active or outdated.',
          'WhatsApp / Telegram Chaos: Official notices get buried under informal chats, memes, or unauthorized forwarded rumors.',
          'Environmental Waste & Delays: Hundreds of paper sheets printed daily, manual pinning delay of hours between HOD desk and notice board.'
        ]
      }
    ],
    keyTakeaway: 'Traditional notice boards lack searchability, real-time alert capability, remote access, and automatic expiry.'
  },
  {
    id: 'objectives',
    number: 3,
    title: 'Project Objectives',
    tagline: 'Measurable goals of our software',
    summary: 'To design and implement a secure, responsive, categorized, and real-time notice dissemination system with role-based access control.',
    speakablePoint: 'Our primary objective is to create a 100% paperless, zero-delay communication pipeline that delivers official notices within milliseconds with category filters, scheduled lifespans, and push notifications.',
    details: [
      {
        heading: 'Key Technical & Functional Goals',
        points: [
          'Zero-Paper Campus: Minimize paper waste and printing overhead by 90% across campus departments.',
          'Real-Time Delivery: Broadcast emergency alerts or urgent room changes in under 1 second via WebSockets.',
          'Smart Categorization: Organize notices cleanly into Exam, Events, Placement, and General sections.',
          'Lifecycle Management: Schedule notices ahead of time with auto-expiry so outdated circulars automatically disappear.',
          'Role-Based Security: Secure JWT-authenticated login protecting admin faculties from unauthorized edits.',
          'Attachment Handling: Support fast downloads of high-resolution routine images, Hall Tickets, and PDF circulars.'
        ]
      }
    ],
    keyTakeaway: 'Speed, Organization, Security, and Remote Access without paper or delay.'
  },
  {
    id: 'existing-system',
    number: 4,
    title: 'Existing System & Limitations',
    tagline: 'How things are currently done and why they fail',
    summary: 'Comparison of Traditional Physical Pinboards and Generic Chat Apps versus our dedicated software.',
    speakablePoint: 'Currently colleges use wooden notice boards or WhatsApp/Telegram groups. Wooden boards require physical presence and get damaged, while chat groups suffer from spam, loss of message history, and no authorized verification.',
    details: [
      {
        heading: 'Physical Pinboards (Traditional)',
        points: [
          'No remote access: Students at home during study leave or vacations miss updates.',
          'Vandalism & Wear: Notices get torn, wet during rains, or covered by unofficial posters.',
          'No search or filter: You have to read 30 papers to find one exam timetable.',
          'No audio or instant alert: Notice remains unseen until someone walks by.'
        ]
      },
      {
        heading: 'WhatsApp / Social Media Groups',
        points: [
          'Zero Verification: Risk of fake circulars or screenshots circulating as official.',
          'Chat Spam: Genuine announcements get buried in hundreds of "Thank you sir" messages.',
          'Privacy Concerns: Student phone numbers are exposed to everybody in large batches.',
          'No Structured Archive: Finding a circular from 3 months ago is nearly impossible.'
        ]
      }
    ],
    keyTakeaway: 'The existing workflow is either geographically locked (physical boards) or chaotic and unverified (chat groups).'
  },
  {
    id: 'proposed-system',
    number: 5,
    title: 'Proposed System',
    tagline: 'Our modern solution architecture',
    summary: 'A web-based digital notice board accessible on web and mobile browsers with instant sync, authentication, and categorization.',
    speakablePoint: 'We propose a cloud-ready web application built with React, Node.js, Express, MongoDB, and WebSockets. Authorized admins can post rich notices with PDFs and start/expiry dates, which immediately show up on student dashboards with real-time popup toasts.',
    details: [
      {
        heading: 'How Our Solution Solves Every Problem',
        points: [
          'Access from Anywhere: Responsive React SPA works seamlessly on college PCs, tablets, and student smartphones.',
          'Official Authenticity: Only verified admins/professors with JWT credentials can publish, ensuring zero fake news.',
          'Automatic Expiry: Circulars have an Expiry Date; the system automatically archives them when their time is over.',
          'Priority Pinning: Important notices (e.g., Exam Postponement) remain pinned at the very top with distinct badges.',
          'Instant Broadcast: WebSocket push ensures active students get notified the exact second a notice is saved.'
        ]
      }
    ],
    keyTakeaway: 'A single, trusted, organized source of truth for all campus circulars.'
  },
  {
    id: 'features',
    number: 6,
    title: 'Features List',
    tagline: 'Core capabilities delivered in the application',
    summary: 'Comprehensive list of Admin and Student features implemented in the system.',
    speakablePoint: 'Our system has two user roles: Admin and Student. Admin has full CRUD rights, scheduling, attachment uploads, and pinning. Students have real-time alerts, search, category filters, attachment downloads, and personal bookmarks.',
    details: [
      {
        heading: '1. Admin Features (Privileged)',
        points: [
          'Secure Admin Authentication with JWT token stored in HTTP-only cookies / local secure storage.',
          'Full Notice CRUD: Create new notices, Edit typo/dates, and Delete invalid circulars.',
          'Notice Categorization: Assign to Exam, Events, Placement, or General.',
          'Media Uploads: Upload PDF circulars and banner images (stored on cloud storage / Multer).',
          'Notice Scheduling: Set Start Date (publish in future) and Expiry Date (auto-archive).',
          'Notice Pinning: Pin crucial notices to the top of all feeds.'
        ]
      },
      {
        heading: '2. Student / Public Features',
        points: [
          'Live Categorized Feed: Clean dashboard organized by latest notices first.',
          'Real-time WebSocket Alert: Toast notification as soon as a new notice drops.',
          'Full-text Search: Instant search by keywords in title, author, or description.',
          'Attachment Preview & Download: One-click download of PDF syllabi or JPG event posters.',
          'Mark as Important / Bookmark: Save important notices to personal "Saved" list for offline recall.'
        ]
      }
    ],
    keyTakeaway: 'Comprehensive end-to-end functionality catering to both content creators (faculty) and consumers (students).'
  },
  {
    id: 'tech-stack',
    number: 7,
    title: 'Technology Stack',
    tagline: 'Why did we pick these specific tools?',
    summary: 'React 19 + Tailwind CSS on frontend; Node.js + Express.js on backend; MongoDB (NoSQL) for database; JWT for auth; WebSockets for live sync.',
    speakablePoint: 'We chose the MERN stack because of its high performance and unified JavaScript ecosystem. React provides a reactive Single Page Application UI, Node and Express deliver non-blocking asynchronous APIs, MongoDB offers flexible JSON document storage, and WebSockets ensure real-time notification push.',
    details: [
      {
        heading: 'Frontend: React.js + Tailwind CSS',
        points: [
          'React Component Architecture: Modular, reusable cards, modals, and search filters.',
          'Virtual DOM: Lightning-fast UI rendering without page reloads.',
          'Tailwind CSS: Utility-first styling providing sleek dark/light responsive layouts without bulky CSS files.'
        ]
      },
      {
        heading: 'Backend: Node.js + Express.js',
        points: [
          'Event-Driven, Asynchronous I/O: Handles thousands of concurrent student read requests effortlessly.',
          'Express RESTful APIs: Clean separation of routes for /api/notices and /api/auth.',
          'Multer middleware: Handles multipart/form-data for PDF and image uploads.'
        ]
      },
      {
        heading: 'Database: MongoDB + Mongoose',
        points: [
          'Flexible Document Schema: Easily accommodate attachments array, category enums, and timestamps.',
          'High Read Throughput: Ideal for read-heavy college apps where thousands of students fetch notices at 9:00 AM.',
          'TTL (Time-To-Live) / Date Indexing: Enables fast querying of active vs expired notices.'
        ]
      },
      {
        heading: 'Security & Real-time: JWT + WebSockets',
        points: [
          'JSON Web Tokens (JWT): Stateless, tamper-proof user authentication with signed claims.',
          'WebSockets (Socket.io): Full-duplex persistent TCP connection for immediate notice broadcasting.'
        ]
      }
    ],
    keyTakeaway: 'The MERN stack allows end-to-end JavaScript, high scalability, and seamless real-time WebSocket integration.'
  },
  {
    id: 'system-architecture',
    number: 8,
    title: 'System Architecture',
    tagline: '3-Tier Architectural Pattern',
    summary: 'Presentation Layer (React), Application Logic Layer (Node/Express with WebSocket Engine), and Data Layer (MongoDB).',
    speakablePoint: 'Our project follows a standard 3-Tier Architecture. The Client Tier is React with Tailwind; the Business Logic Tier is Node/Express hosting REST APIs and WebSocket server; and the Database Tier is MongoDB. Client requests pass through JWT authentication middleware before accessing notice resources.',
    details: [
      {
        heading: 'Tier 1: Presentation Layer (Client)',
        points: [
          'Single Page Application (SPA) running in user\'s browser.',
          'Communicates with backend via Axios/Fetch (HTTP REST) and Socket client (ws://).'
        ]
      },
      {
        heading: 'Tier 2: Business Logic & Server Layer',
        points: [
          'Express Server handling routing, validation, and authorization.',
          'JWT Auth Middleware intercepts protected routes (/api/notices POST/PUT/DELETE).',
          'WebSocket Gateway: Broadcasts "NEW_NOTICE" payload to all connected sockets.',
          'File Upload Controller: Validates MIME types (PDF, PNG, JPEG) and generates secure URLs.'
        ]
      },
      {
        heading: 'Tier 3: Database & Persistence Layer',
        points: [
          'MongoDB cluster storing collections: users, notices, bookmarks.',
          'Indexed on `category`, `createdAt`, `isPinned`, and `expiryDate`.'
        ]
      }
    ],
    keyTakeaway: 'Clean separation of concerns guarantees high testability, maintainability, and horizontal scalability.'
  },
  {
    id: 'module-explanation',
    number: 9,
    title: 'Module Explanation',
    tagline: 'Step-by-step breakdown of software modules',
    summary: 'The application is divided into 5 independent, loosely coupled modules.',
    speakablePoint: 'We divided the system into five core modules: Authentication Module, Notice Management Module, Categorization & Filter Module, Attachment & Media Module, and the Real-time Notification Module.',
    details: [
      {
        heading: '1. Authentication & Authorization Module',
        points: [
          'Admin login with Bcrypt password hashing and salt generation.',
          'JWT generation containing role ("admin" | "student") and 24h expiration.',
          'Role-based middleware protecting administrative endpoints.'
        ]
      },
      {
        heading: '2. Notice Management (CRUD) Module',
        points: [
          'Create notice with Title, Description, Category, Target Audience, and Dates.',
          'Edit existing notices with immediate database reflection.',
          'Soft or hard delete of outdated or mistaken circulars.'
        ]
      },
      {
        heading: '3. Category & Priority Pinning Module',
        points: [
          'Classifies notices under Exam, Events, Placement, and General.',
          'Pinned notice algorithm: Pinned notices are automatically sorted above standard notices irrespective of timestamp.'
        ]
      },
      {
        heading: '4. Scheduling & Expiry Module',
        points: [
          'Checks `startDate <= currentDate <= expiryDate` before serving to students.',
          'Admins can see draft/scheduled notices, while students only see currently valid ones.'
        ]
      },
      {
        heading: '5. Real-Time Notification Module',
        points: [
          'Socket.io rooms / broadcast channel.',
          'When admin calls `POST /api/notices`, server emits `io.emit("notice_published", newNotice)` to all active connected browsers.'
        ]
      }
    ],
    keyTakeaway: 'Modular design makes adding new features (like SMS alerts or college department sub-boards) straightforward.'
  },
  {
    id: 'database-explanation',
    number: 10,
    title: 'Database Design & Schema',
    tagline: 'MongoDB Collections and Data Structures',
    summary: 'Detailed explanation of User schema, Notice schema, and indexing strategies.',
    speakablePoint: 'We used MongoDB with Mongoose ODM. Our primary collections are Users and Notices. The Notice schema holds fields like title, body, category, author reference, attachments array, isPinned boolean, and startDate/expiryDate timestamps with optimized compound indexes.',
    details: [
      {
        heading: 'Users Collection Schema',
        points: [
          '_id: ObjectId (Primary Key)',
          'name: String (Full name of student or faculty)',
          'email: String (Unique, Indexed college email)',
          'password: String (Bcrypt hashed password)',
          'role: String (Enum: "admin", "faculty", "student")',
          'department: String (e.g., "Computer Science", "IT", "Mechanical")',
          'createdAt / updatedAt: Timestamps'
        ]
      },
      {
        heading: 'Notices Collection Schema',
        points: [
          '_id: ObjectId (Primary Key)',
          'title: String (Required, trimmed, indexed)',
          'content: String (Notice detailed description)',
          'category: String (Enum: "Exam", "Events", "Placement", "General")',
          'attachments: Array of Objects [{ url, fileType, originalName, size }]',
          'isPinned: Boolean (Default: false)',
          'startDate: Date (Default: Date.now)',
          'expiryDate: Date (Required, used for auto-filtering)',
          'postedBy: ObjectId (Reference to Users collection)',
          'viewsCount: Number (Default: 0)',
          'createdAt: Date'
        ]
      },
      {
        heading: 'Indexing & Performance',
        points: [
          'Compound Index: `{ isPinned: -1, createdAt: -1 }` ensures pinned notices appear on top with O(log n) efficiency.',
          'Text Index: `{ title: "text", content: "text" }` allows fast keyword search without table scans.'
        ]
      }
    ],
    keyTakeaway: 'The schema is normalized for users and embeds attachment metadata for lightning-fast single-query notice retrieval.'
  },
  {
    id: 'workflow',
    number: 11,
    title: 'Complete Project Working Flow',
    tagline: 'Life of a Notice from Creation to Expiry',
    summary: 'The step-by-step end-to-end data flow through the entire system.',
    speakablePoint: 'The flow starts when an Admin logs in and receives a JWT token. They fill the notice form, upload a PDF, set an expiry date, and hit Publish. The Express backend validates the data, uploads the attachment, writes to MongoDB, and triggers a WebSocket broadcast. The student\'s browser receives the event and renders the new notice card with zero page refresh.',
    details: [
      {
        heading: 'Phase 1: Admin Publication Flow',
        points: [
          'Step 1: Admin enters credentials on /login -> Server verifies bcrypt hash -> Returns signed JWT.',
          'Step 2: Admin opens "Create Notice" modal, types details, picks Category ("Placement"), sets Expiry Date.',
          'Step 3: Admin attaches Placement PDF -> Frontend sends multipart FormData to /api/notices.',
          'Step 4: Server auth middleware validates JWT token from header.'
        ]
      },
      {
        heading: 'Phase 2: Storage & Real-time Broadcast Flow',
        points: [
          'Step 5: Multer/Cloudinary saves attachment file and generates accessible secure URL.',
          'Step 6: Mongoose writes the document into MongoDB Notices collection.',
          'Step 7: Server fires `io.emit("new_notice", savedNotice)` across active WebSocket connections.'
        ]
      },
      {
        heading: 'Phase 3: Student Consumption Flow',
        points: [
          'Step 8: Student device receives WebSocket packet and plays subtle notification chime + toast.',
          'Step 9: React state updates immediately: notice card appears at the top (or pinned section).',
          'Step 10: Student can filter by "Placement", search keywords, click "Download PDF", or toggle "Bookmark".',
          'Step 11: When `expiryDate` passes, the query automatically excludes it from the active notice feed.'
        ]
      }
    ],
    keyTakeaway: 'End-to-end event-driven loop combining HTTP REST persistence and bidirectional WebSocket broadcasting.'
  },
  {
    id: 'advantages',
    number: 12,
    title: 'Advantages of the System',
    tagline: 'Why our software is superior',
    summary: 'Key environmental, operational, financial, and educational benefits.',
    speakablePoint: 'The major advantages are 24/7 remote accessibility, paperless cost savings, zero communication delay, clutter-free category sorting, and tamper-proof authorized publishing.',
    details: [
      {
        heading: 'Key Benefits',
        points: [
          '1. Eco-Friendly & Paperless: Saves reams of paper, printer ink, and electricity every academic semester.',
          '2. 24/7 Remote Access: Students on medical leave, internships, or vacations never miss a placement drive or exam notice.',
          '3. Instant Real-Time Reach: Emergency circulars (e.g., sudden holiday due to weather) reach thousands of students in 2 seconds.',
          '4. Structured & Searchable: Find any notice in seconds using search and filters instead of scanning boards.',
          '5. High Security: Only authenticated faculties can post; student access is read-only and safe from spam.',
          '6. Auto-Clean Clutter: Expired notices vanish automatically without manual peeling of old paper.'
        ]
      }
    ],
    keyTakeaway: 'Saves time, saves money, saves trees, and eliminates student anxiety regarding missed deadlines.'
  },
  {
    id: 'limitations',
    number: 13,
    title: 'System Limitations',
    tagline: 'Honest appraisal (examiners respect this!)',
    summary: 'Every realistic engineering project has limitations; acknowledging them shows academic maturity.',
    speakablePoint: 'Sir/Ma\'am, every system has boundaries. Our system currently requires active internet connectivity, relies on users checking their browsers or having device notifications enabled, and currently stores attachments on local/cloud limits rather than a distributed CDN.',
    details: [
      {
        heading: 'Identified Constraints',
        points: [
          '1. Internet Dependency: Requires an active data connection; students in zero-network rural zones cannot fetch fresh updates.',
          '2. Device Availability: Assumes students possess a smartphone, tablet, or personal computer.',
          '3. File Storage Limits: Large PDF uploads (e.g., 50MB magazines) can consume server bandwidth if not hooked to an S3/Cloudinary bucket.',
          '4. Push Notification Permissions: If student disables browser notification permissions, they will only see notices upon manually opening the website.'
        ]
      }
    ],
    keyTakeaway: 'Proactively stating limitations in viva shows you built the project genuinely and understand real-world engineering constraints.'
  },
  {
    id: 'future-scope',
    number: 14,
    title: 'Future Scope',
    tagline: 'How can this project be scaled further?',
    summary: 'Exciting future enhancements: Mobile App with Firebase Push, AI-based auto-summarization, SMS fallback, and Physical IoT Display integration.',
    speakablePoint: 'In the future, we plan to integrate SMS fallback for students without internet, a React Native mobile app with FCM push notifications, AI summarization of lengthy circulars, and IoT LED/TV displays in campus corridors running this web feed.',
    details: [
      {
        heading: 'Upcoming Roadmap',
        points: [
          '1. Campus IoT Hardware Integration: Hooking smart TVs or Raspberry Pi LED screens in campus canteens to auto-scroll this notice board.',
          '2. SMS / WhatsApp Business API: Critical emergency notices (e.g., flood holiday) sent as automated SMS to student phone numbers.',
          '3. AI Notice Summarizer: Integrating LLMs to summarize 10-page circulars into a 3-bullet quick summary for students.',
          '4. Department-Level Sub-Boards: Separate isolated channels for CSE, Mechanical, Library, and Sports council.',
          '5. Read-Receipts & Analytics: Admin dashboard showing how many students from Batch 2026 read the placement notice.'
        ]
      }
    ],
    keyTakeaway: 'This project provides a robust foundation that can easily evolve into an enterprise campus ERP communication module.'
  }
];
