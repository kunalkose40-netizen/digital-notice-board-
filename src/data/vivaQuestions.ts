export interface VivaQuestion {
  id: number;
  question: string;
  hindiQuestion: string;
  category: 'Security & Auth' | 'Database & MongoDB' | 'Real-time & WebSockets' | 'Frontend & React' | 'Backend & System Design' | 'Project Defense';
  hinglishAnswer: string;
  englishAnswer: string;
  examinerTrap: string;
  proTip: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: 'What is the core purpose of your Digital Notice Board System?',
    hindiQuestion: 'Aapke project ka main purpose kya hai?',
    category: 'Project Defense',
    hinglishAnswer: 'Sir, hamare project ka main purpose traditional physical notice board ko digitalize karna hai. Abhi colleges me physical boards pe notices late lagte hain, barish me kharab ho jate hain ya students missed kar dete hain. Hamara system authorized faculties ko instant notices with PDF/image publish karne deta hai, aur students ko unke mobile pe real-time instant notification milta hai with category filter (Exam, Events, Placement).',
    englishAnswer: 'The core purpose is to replace physical paper-based notice boards with a centralized, real-time web platform. It eliminates delays, enables remote access for students anywhere, prevents information clutter via categorization, and delivers instant alerts through WebSockets.',
    examinerTrap: 'Examiner wants to see if you can explain your project in 30 seconds without rambling.',
    proTip: 'Highlight "Remote 24/7 Access" and "Zero-Paper Eco-Friendly" in your very first sentence.'
  },
  {
    id: 2,
    question: 'Why did you choose React.js instead of plain HTML/CSS or Angular?',
    hindiQuestion: 'Frontend me React.js kyu use kiya? Normal HTML ya Angular kyu nahi?',
    category: 'Frontend & React',
    hinglishAnswer: 'Sir, React me Virtual DOM hota hai, jisse jab koi naya notice aata hai ya student filter change karta hai, toh pura page reload nahi hota—sirf wahi specific card update hota hai. Second, React ka component-based structure modular hai, jisme humne NoticeCard, FilterBar aur Modal reusable components banaye hain. Angular bulky hai for this scope, jabki React lightweight aur fast Single Page Application (SPA) experience deta hai.',
    englishAnswer: 'We chose React.js for its Virtual DOM reconciliation which enables flicker-free dynamic updates when notices are added or filtered. Its component-based architecture allows high reusability of UI components like notice cards and filter bars, offering superior speed over traditional multi-page HTML.',
    examinerTrap: 'They may ask: "Virtual DOM kya hota hai?". Be ready: It is an in-memory lightweight representation of the real DOM.',
    proTip: 'Mention "Single Page Application (SPA)" and "Component reusability".'
  },
  {
    id: 3,
    question: 'Why Node.js and Express for the backend instead of Java or PHP?',
    hindiQuestion: 'Backend me Node.js aur Express kyu choose kiya? Java ya PHP kyu nahi?',
    category: 'Backend & System Design',
    hinglishAnswer: 'Sir, Node.js single-threaded, non-blocking asynchronous event loop pe kaam karta hai. College applications me heavy concurrent read requests aate hain (jaise subah 9 baje hazaron students notices check karte hain). Node.js un I/O operations ko bina thread block kiye efficiently handle karta hai. Plus, frontend aur backend dono me JavaScript use hone se code consistency bani rehti hai.',
    englishAnswer: 'Node.js provides an asynchronous, non-blocking event-driven architecture that excels at handling high-concurrency I/O operations, such as thousands of students refreshing notices simultaneously. Express provides a lightweight, unopinionated framework for RESTful routing and middleware integration.',
    examinerTrap: 'They will ask: "Agar single-threaded hai toh multiple requests kaise handle karta hai?" Answer: Event Loop and libuv worker pool for I/O!',
    proTip: 'Use the phrase "Non-blocking Asynchronous I/O". Professors love this term.'
  },
  {
    id: 4,
    question: 'Why did you use MongoDB (NoSQL) instead of MySQL or PostgreSQL?',
    hindiQuestion: 'Relational database (MySQL) kyu nahi use kiya? MongoDB NoSQL kyu?',
    category: 'Database & MongoDB',
    hinglishAnswer: 'Sir, notices ka data semi-structured hota hai. Kisi notice me multiple attachments (PDF, images) hote hain, kisi me schedule dates hoti hain, kisi me links. MongoDB JSON-like BSON documents store karta hai jo naturally hamare React JavaScript objects se match karta hai (No impedance mismatch). Sath hi, MongoDB read-heavy systems me indexing ke sath extremely fast read queries provide karta hai.',
    englishAnswer: 'MongoDB stores data in flexible JSON-like BSON documents. Notices vary in content—some have multiple attachments, some have specific target departments. The document model easily embeds nested arrays like attachments without complex multi-table relational joins, optimizing read performance.',
    examinerTrap: 'Examiner might say: "Does MongoDB support transactions?". Say: "Yes, MongoDB supports multi-document ACID transactions since version 4.0, though our schema is largely single-document writes."',
    proTip: 'Explain how MongoDB avoids expensive SQL JOIN queries when fetching notices with their media.'
  },
  {
    id: 5,
    question: 'What is JWT (JSON Web Token) and how does it work in your app?',
    hindiQuestion: 'JWT kya hota hai aur aapke project me authentication kaise karta hai?',
    category: 'Security & Auth',
    hinglishAnswer: 'Sir, JWT ek stateless authentication mechanism hai. Jab admin login karta hai with email aur password, server verify karke ek signed token generate karta hai. Is token ke 3 parts hote hain: Header, Payload (userId, role), aur Signature (signed with a secret key). Server ye token client ko bhejta hai. Har subsequent request me client is token ko Authorization header (`Bearer <token>`) me bhejta hai. Server bina database me session check kiye sirf signature verify karke access de deta hai.',
    englishAnswer: 'JWT is a stateless authentication standard composed of Header, Payload, and Signature. Upon successful admin login, the server signs a token using a private secret key. The client stores it and attaches it to request headers (`Authorization: Bearer <token>`). The server verifies the cryptographic signature without querying session tables in the database.',
    examinerTrap: 'They will ask: "Can anyone read the payload of a JWT?". Say: "Yes, payload is Base64 encoded, not encrypted! That is why we never store sensitive data like passwords inside JWT payload."',
    proTip: 'Highlight that JWT is "Stateless"—server memory me session maintain nahi karni padti.'
  },
  {
    id: 6,
    question: 'What happens if an attacker steals the JWT token?',
    hindiQuestion: 'Agar kisi ne JWT token chura liya toh kya hoga? Security kaise banaye rakhi?',
    category: 'Security & Auth',
    hinglishAnswer: 'Sir, agar token chura liya jaye toh attacker valid time tak API access kar sakta hai. Isko prevent karne ke liye humne 3 security measures rakhe hain: First, token ki expiry short rakhi hai (e.g., 24 hours). Second, production me tokens ko HTTP-Only, Secure cookies me store karte hain jisse JavaScript XSS attacks se token read na kar sake. Third, sensitive routes pe HTTPS (SSL) enforce hota hai jisse network sniffing na ho sake.',
    englishAnswer: 'If a token is intercepted, the attacker can impersonate the user until it expires. To mitigate this risk, we set token expiration (TTL), transmit tokens over HTTPS to prevent packet sniffing, and recommend storing tokens in HTTP-only cookies to eliminate Cross-Site Scripting (XSS) theft.',
    examinerTrap: 'They test if you know the difference between LocalStorage vs HTTP-only Cookies.',
    proTip: 'Mention "HTTP-Only flag prevents XSS" and "Short expiration time".'
  },
  {
    id: 7,
    question: 'What are WebSockets and how do they differ from HTTP polling?',
    hindiQuestion: 'WebSocket kya hai aur normal HTTP polling se kaise alag hai?',
    category: 'Real-time & WebSockets',
    hinglishAnswer: 'Sir, normal HTTP me client request bhejta hai tabhi server response deta hai (Half-duplex, stateless). Agar HTTP polling karein toh browser har 3 second me server se puchega "Naya notice aaya kya?", jisse unnecessary network traffic aur server load badhta hai. WebSocket ek single TCP connection establish karta hai jo Full-Duplex aur persistent hota hai. Server jaise hi naya notice save karta hai, wo turant connected clients ko push kar deta hai with zero polling delay!',
    englishAnswer: 'Standard HTTP is unidirectional and request-driven; the client must poll repeatedly, causing heavy overhead. In contrast, WebSockets establish a single persistent, bidirectional TCP connection. As soon as an admin publishes a notice, the server immediately pushes the event to all connected clients in real time.',
    examinerTrap: 'They might ask: "WebSocket ka handshake kis protocol pe shuru hota hai?". Answer: It starts over standard HTTP with an "Upgrade" header and switches to ws://.',
    proTip: 'Use words like "Full-duplex", "Persistent TCP connection", and "Eliminates polling overhead".'
  },
  {
    id: 8,
    question: 'How are real-time notifications triggered when a notice is posted?',
    hindiQuestion: 'Real-time notification ka exact flow kya hai jab Admin naya notice post karta hai?',
    category: 'Real-time & WebSockets',
    hinglishAnswer: 'Sir, flow bahut simple hai: 1. Admin form submit karta hai to `POST /api/notices`. 2. Server pe Express route controller notice ko MongoDB me save karta hai. 3. Jaise hi save success hota hai, backend pe `io.emit("new_notice", savedNotice)` trigger hota hai. 4. Sabhi connected students ke browsers me socket listener event capture karta hai aur screen par toast popup show karta hai + notice list me card prepend kar deta hai.',
    englishAnswer: 'When the admin submits a new notice, the Express controller validates and persists the document in MongoDB. On successful commit, the Socket.io server instance broadcasts a `new_notice` event with the notice payload to all active client sockets. The client-side React listener catches the event, displays a toast alert, and updates state.',
    examinerTrap: 'They may ask: "What if student is offline when the notice is emitted?". Say: "When they reconnect, the initial REST API GET /api/notices fetches all notices from MongoDB, so they never miss anything!"',
    proTip: 'Differentiate between "Live broadcast for active users" vs "Persistent REST fetch for offline users".'
  },
  {
    id: 9,
    question: 'How does the Notice Expiry Date logic work?',
    hindiQuestion: 'Notice ki expiry date ka logic backend me kaise kaam karta hai?',
    category: 'Backend & System Design',
    hinglishAnswer: 'Sir, notice model me ek `expiryDate` field hai. Jab student notice feed fetch karta hai (`GET /api/notices`), hamara MongoDB query filter lagata hai: `{ expiryDate: { $gte: new Date() }, startDate: { $lte: new Date() } }`. Isse sirf wahi notices aate hain jo abhi active hain. Outdated notices database me archived rehte hain for historical records, par student dashboard par display nahi hote.',
    englishAnswer: 'Each notice document contains `startDate` and `expiryDate` timestamps. The public API query filters documents using `{ expiryDate: { $gte: new Date() }, startDate: { $lte: new Date() } }`. This ensures only currently valid announcements are delivered. In addition, MongoDB TTL indexes or a cron job can automate physical archiving.',
    examinerTrap: 'Examiner might ask: "Kya expired notice database se delete ho jata hai?". Answer: "No sir, soft-expiry is preferred for audit trails; however, admin can hard-delete if desired."',
    proTip: 'Highlight the difference between "Soft Filter via Query" vs "Hard Deletion".'
  },
  {
    id: 10,
    question: 'How is Notice Pinning implemented in MongoDB?',
    hindiQuestion: 'Important notice ko pin karne ka logic database me kaise query hota hai?',
    category: 'Database & MongoDB',
    hinglishAnswer: 'Sir, notice document me boolean flag hota hai: `isPinned: true/false`. Jab hum database se notices query karte hain, hum compound sort use karte hain: `.sort({ isPinned: -1, createdAt: -1 })`. Iska matlab pehle pinned notices (true = 1) aayenge in descending order, aur unke baad unpinned notices latest date ke hisaab se aayenge. Is query ko fast rakhne ke liye humne compound index `{ isPinned: -1, createdAt: -1 }` create kiya hai.',
    englishAnswer: 'Notices include a boolean flag `isPinned`. During retrieval, we apply a compound sort: `.sort({ isPinned: -1, createdAt: -1 })`. Pinned notices evaluate to true and sort to the top, followed chronologically by standard notices. A compound index on these fields ensures O(log n) sort execution.',
    examinerTrap: 'They will test if you know indexing. If you mention compound index, you score full marks!',
    proTip: 'Explain that true values sort before false values when sorting descending (-1).'
  },
  {
    id: 11,
    question: 'How do you handle Image and PDF attachments?',
    hindiQuestion: 'Image aur PDF upload kaise handle kiya hai? Server crash kyu nahi hota?',
    category: 'Backend & System Design',
    hinglishAnswer: 'Sir, files direct JSON body me nahi bheji ja sakti, isliye hum `multipart/form-data` use karte hain. Backend me `Multer` middleware incoming file stream ko intercept karta hai, file type (PDF/PNG/JPEG) aur size limit (e.g. 10MB) validate karta hai. Phir file ko cloud storage (jaise Cloudinary ya local uploads directory) me store karke uska public URL MongoDB me array `attachments: [{ url, originalName, fileType }]` me save kar leta hai.',
    englishAnswer: 'Files are transmitted as `multipart/form-data`. We use Multer middleware in Express to intercept the file stream, validate allowed MIME types (PDF, PNG, JPG) and enforce size limits. The file is written to storage (Cloudinary / local uploads), and the resulting static URL and metadata are stored in MongoDB.',
    examinerTrap: 'They will ask: "Kya aap PDF ko database me binary (BLOB) store kar rahe ho?". Say: "No sir! Storing binary in DB degrades performance. We store files on storage and only keep the URL string in MongoDB."',
    proTip: 'Emphasize that storing file URLs rather than binary in DB is standard industry best practice.'
  },
  {
    id: 12,
    question: 'What if 5000 students access the notice board at 9:00 AM? Will it crash?',
    hindiQuestion: 'Agar 5000 students ek sath notice board kholein toh kya hoga? Scalability kaise handle hogi?',
    category: 'Backend & System Design',
    hinglishAnswer: 'Sir, standard architecture me 3 reasons se system stable rahega: 1. Node.js non-blocking I/O concurrent read requests ko quickly serve karta hai. 2. MongoDB me notices collection indexed hai, toh query fast hoti hai. 3. Further scale karne ke liye hum Redis Caching layer add kar sakte hain, jisse active notices cache se serve ho aur database pe 5000 hits na jayein. Client side pe React SPA static assets CDN pe host ho sakte hain.',
    englishAnswer: 'Because notice reading is an I/O-bound read-heavy operation, Node.js\'s asynchronous event loop handles concurrent connections smoothly. Database compound indexes minimize query latency. For extreme scale, implementing a Redis cache in front of MongoDB and serving static React bundles via a CDN eliminates backend bottlenecks.',
    examinerTrap: 'Examiner tests your understanding of caching and horizontal scaling.',
    proTip: 'Mention "Redis In-Memory Cache" and "Database Indexing" to show architectural depth.'
  },
  {
    id: 13,
    question: 'How is State Management handled on the React frontend?',
    hindiQuestion: 'React frontend me state management kaise kiya hai? Redux use kiya ya Context/Hooks?',
    category: 'Frontend & React',
    hinglishAnswer: 'Sir, hamare application me humne React ke built-in hooks (`useState`, `useEffect`, `useMemo`) aur custom hooks use kiye hain. For example, notices list, active category filter, search query, aur modal state ke liye local aur lifted state use kiya hai. Global user auth status ke liye AuthContext use kiya hai. Is application ke scope ke liye heavy Redux boilerplate ki zarurat nahi thi, React hooks ne clean and performant state provide kiya.',
    englishAnswer: 'We utilized native React Hooks (`useState`, `useEffect`, `useMemo`) along with React Context API for global state like user authentication. For our application\'s scope, React Context and hooks provide optimal performance without the boilerplate overhead of external state libraries like Redux.',
    examinerTrap: 'They may ask: "Why not Redux?". Give the answer: Redux introduces unnecessary boilerplate for small-to-medium apps where React Context suffices.',
    proTip: 'Explain that avoiding unnecessary external libraries keeps bundle size small and load time fast.'
  },
  {
    id: 14,
    question: 'How are passwords secured in the database?',
    hindiQuestion: 'Admin ka password database me safe kaise hai? Plain text me toh nahi save hai?',
    category: 'Security & Auth',
    hinglishAnswer: 'Sir, password ko kabhi bhi plain text me save nahi kiya jata. Hum `Bcrypt.js` library use karte hain. Registration/Seed ke waqt password me random cryptographic "Salt" add karke one-way mathematical hash generate kiya jata hai. Login ke time par `bcrypt.compare()` hash compare karta hai. Agar database leak bhi ho jaye, toh koi bhi original password decipher nahi kar sakta.',
    englishAnswer: 'Passwords are never stored in plaintext. We use the Bcrypt algorithm, which incorporates automated cryptographic salting and iterative key stretching. Even in the event of a database compromise, rainbow table attacks are thwarted due to salted, irreversible one-way hashing.',
    examinerTrap: 'Examiner might ask: "Can we decrypt a bcrypt hash?". Strong Answer: "No sir! Bcrypt is a one-way cryptographic hash function, NOT encryption. It cannot be decrypted."',
    proTip: 'Never say "Bcrypt encrypts". Always say "Bcrypt hashes with a salt". This is a classic examiner trap!'
  },
  {
    id: 15,
    question: 'How does the search and filter feature work?',
    hindiQuestion: 'Notices ka search aur filter backend me hota hai ya frontend me?',
    category: 'Frontend & React',
    hinglishAnswer: 'Sir, humne dono level pe support design kiya hai. Frontend pe jab student search bar me type karta hai ya category button (Exam, Events, Placement) pe click karta hai, React state dynamically notices array ko filter karta hai using JavaScript `.filter()` with debouncing for instant response. Backend level pe humne MongoDB text index create kiya hai `{ title: "text", content: "text" }`, jisse heavy pagination me backend search efficiently work karta hai.',
    englishAnswer: 'We implemented multi-tier filtering. On the client side, React computes real-time filtered views using memoized filter predicates matching category and query strings. On the backend, MongoDB text indices and query filters (`{ category, $text: { $search: query } }`) handle paginated searches without full-collection scans.',
    examinerTrap: 'They might ask: "What is debouncing?". Answer: Debouncing delays execution until the user stops typing for 300ms, preventing wasteful renders.',
    proTip: 'Mention "Debouncing" for search inputs.'
  },
  {
    id: 16,
    question: 'How do you prevent a student from posting or deleting a notice?',
    hindiQuestion: 'Student notice delete ya post na kar sake, ye backend me kaise check hota hai?',
    category: 'Security & Auth',
    hinglishAnswer: 'Sir, frontend pe hum Admin buttons (Add/Delete/Edit) hide kar dete hain, par security frontend se nahi, BACKEND se guarantee hoti hai. Backend ke protected routes (jaise `POST /api/notices` aur `DELETE /api/notices/:id`) par ek `verifyAdmin` middleware laga hua hai. Ye middleware pehle JWT token verify karta hai, phir decoded payload me dekhta hai: `if (req.user.role !== "admin") return res.status(403).json({ error: "Access Denied" })`. Isliye student Postman se bhi API hit karega toh block ho jayega.',
    englishAnswer: 'Client-side UI hiding is merely cosmetic; true security is strictly enforced at the backend API gateway. A role-verification middleware checks the decoded JWT claims for every mutating route (POST, PUT, DELETE). If `req.user.role !== "admin"`, HTTP 403 Forbidden is returned, preventing any unauthorized API execution even via Postman.',
    examinerTrap: 'They want to hear that security is enforced on the SERVER side, not just by hiding buttons in the browser.',
    proTip: 'Say: "Client-side validation is for UX, Server-side validation is for Security". Examiners love this quote.'
  },
  {
    id: 17,
    question: 'Can you explain the 3-Tier Architecture of your project?',
    hindiQuestion: 'Project ka 3-Tier architecture simple shabdon me samjhao.',
    category: 'Backend & System Design',
    hinglishAnswer: 'Sir, hamara system 3 layers me structured hai: 1. Presentation Tier (Client): React.js + Tailwind CSS jo browser me user interface render karta hai. 2. Logic Tier (Server): Node.js + Express.js jisme API routing, JWT validation, business rules, aur WebSocket event broadcasting hoti hai. 3. Data Tier (Database): MongoDB database jisme collections aur indexes securely store hote hain. Is separation ki wajah se agar hum database change karein ya UI revamp karein, toh baki layers affect nahi hoti.',
    englishAnswer: 'Our application follows standard 3-Tier Architecture: Presentation Tier (React SPA handling views and UI interaction), Application/Logic Tier (Node/Express managing REST controllers, JWT middleware, and WebSocket engine), and Data Tier (MongoDB persisting document collections). This separation guarantees loose coupling and high maintainability.',
    examinerTrap: 'They might ask: "What is the difference between 2-Tier and 3-Tier?". Answer: In 2-Tier client talks directly to DB; in 3-Tier the Application server sits in between for security and business logic.',
    proTip: 'Highlight "Loose Coupling" and "Security isolation".'
  },
  {
    id: 18,
    question: 'What was the most challenging bug or difficulty you faced during development?',
    hindiQuestion: 'Development ke dauran sabse badi problem kya aayi aur aapne kaise solve ki?',
    category: 'Project Defense',
    hinglishAnswer: 'Sir, sabse challenging part real-time WebSocket connection sync aur state duplicate hone ka issue tha. Shuruat me jab admin notice create karta tha, socket event trigger hone par active students ki list me notice do baar render ho raha tha (ek bar socket push se aur ek bar automatic re-fetch se). Humne isko solve kiya by maintaining unique notice IDs in React state aur payload deduplication check lagakar (`setNotices(prev => [newNotice, ...prev.filter(n => n._id !== newNotice._id)])`).',
    englishAnswer: 'The biggest challenge was managing idempotent real-time state updates. Initially, a race condition between WebSocket broadcast events and REST re-fetching caused duplicate notice rendering on the client. We resolved this by implementing an ID-based deduplication filter in the React state updater.',
    examinerTrap: 'Never say "I had no problems". Examiners know real projects have bugs. Admitting a real technical bug and explaining the solution shows you actually coded it yourself!',
    proTip: 'Sharing a real debugging story proves authentic project development.'
  },
  {
    id: 19,
    question: 'If you have 2 more weeks, what feature will you implement next?',
    hindiQuestion: 'Agar 2 hafte aur milein, toh isme agla feature kya add karoge?',
    category: 'Project Defense',
    hinglishAnswer: 'Sir, hum 2 key features implement karenge: 1. Firebase Cloud Messaging (FCM) push notifications for mobile browsers even when the tab is closed. 2. Department-level access control, jisme Computer Science HOD sirf CS notices post kar sake aur Mechanical HOD sirf Mechanical notices post kar sake with an approval workflow from the College Principal.',
    englishAnswer: 'We would integrate Firebase Cloud Messaging (FCM) Service Workers for background push notifications even when the browser tab is closed, and implement hierarchical multi-tenant Role-Based Access Control (RBAC) allowing department HODs to manage sub-boards under Principal supervision.',
    examinerTrap: 'Tests whether you have vision beyond the bare minimum syllabus requirement.',
    proTip: 'Mention "Background Service Worker notifications" or "Department-level multi-tenancy".'
  },
  {
    id: 20,
    question: 'If an examiner asks: "What prevents this project from being deployed in production right now?"',
    hindiQuestion: 'Agar examiner puche: "Is project ko abhi college me deploy karne me kya kami hai?"',
    category: 'Project Defense',
    hinglishAnswer: 'Sir, hamara core logic aur functionality 100% production-ready hai. Real deployment ke liye hum 2 cheezein add karenge: 1. Production cloud media storage jaise AWS S3 bucket instead of local file storage for unlimited PDF scaling. 2. College LDAP / Single Sign-On (SSO) integration, jisse students ko alag credentials na banane padein aur wo apne official college email ID se direct sign-in kar sakein.',
    englishAnswer: 'The architectural core is complete. For institutional enterprise production, we would hook file attachments to AWS S3 / Cloudflare R2 for scalable CDN storage, and integrate College Active Directory / Google Workspace SSO so students login directly with institutional emails.',
    examinerTrap: 'They are testing your humility and understanding of production deployment pipelines (SSO, Cloud CDN).',
    proTip: 'Saying "Integration with College LDAP/Google Workspace SSO" immediately signals senior engineering awareness.'
  }
];
