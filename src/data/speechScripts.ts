export interface SpeechScript {
  id: string;
  title: string;
  duration: string;
  tagline: string;
  scriptLines: {
    speakerCue: string;
    englishText: string;
    hinglishExplanation: string;
  }[];
}

export const ELEVATOR_PITCH: SpeechScript = {
  id: 'elevator-pitch',
  title: 'The 60-Second Elevator Pitch',
  duration: '60 Seconds',
  tagline: 'When the examiner enters and says: "Briefly introduce what you built."',
  scriptLines: [
    {
      speakerCue: 'Warm Opening (First 10s)',
      englishText: 'Good morning, respected external examiner and faculty members. My name is [Your Name], and I am excited to present our final year project: "Digital Notice Board System".',
      hinglishExplanation: 'Eye contact banaye rakhein, ek confident smile ke sath shuruat karein. Jaldbazi mat karein.'
    },
    {
      speakerCue: 'Problem in 1 Sentence (10-25s)',
      englishText: 'In our colleges today, physical notice boards are cluttered, paper gets damaged by rain or misplaced, and urgent announcements like exam schedule changes or placement drives often go unnoticed by absent students.',
      hinglishExplanation: 'Problem ko relatable banayein jisse examiner ko lage ki ye real problem hai jo unhone bhi college me dekhi hai.'
    },
    {
      speakerCue: 'Your Solution (25-45s)',
      englishText: 'To solve this, we built a centralized real-time web application using the MERN stack—React, Node.js, Express, and MongoDB. It allows authorized faculties to publish categorized circulars with PDF attachments, schedule automated expiry dates, and pin urgent notices.',
      hinglishExplanation: 'MERN stack aur core features (PDF, expiry, pin, categories) ko crisp tarike se mention karein.'
    },
    {
      speakerCue: 'Impact & Demo Hook (45-60s)',
      englishText: 'Whenever an admin posts a circular, students receive an instant live notification via WebSockets on their screens without reloading. We are ready to demonstrate the working system and would love to walk you through it.',
      hinglishExplanation: 'WebSockets ka word drop karein aur confident tone me live demo offer karein.'
    }
  ]
};

export const THREE_MINUTE_PRESENTATION: SpeechScript = {
  id: '3min-presentation',
  title: 'The 3-Minute Formal Project Opening',
  duration: '3 Minutes',
  tagline: 'Step-by-step presentation script to read or speak alongside your PowerPoint slides.',
  scriptLines: [
    {
      speakerCue: 'Slide 1: Title & Team Introduction (0:00 - 0:30)',
      englishText: 'Respected examiners and professors, good morning. We present our B.Tech Capstone Project titled "Digital Notice Board System" developed under the guidance of our project mentor. Campus communication has historically relied on physical cork boards and chaotic social messaging groups. Our project aims to transform this into a structured, real-time, zero-paper ecosystem.',
      hinglishExplanation: 'Slides change karte waqt examiner ki taraf dekhein. Guide ka naam zaroor mention karein.'
    },
    {
      speakerCue: 'Slide 2: Problem Statement & Objectives (0:30 - 1:15)',
      englishText: 'Every semester, colleges print thousands of paper notices. When notices expire, they remain on boards for months creating clutter. Important circulars regarding university exams or placement shortlists get lost. Our objectives were fourfold: first, eliminate 100% paper waste; second, provide category-wise segregation (Exam, Events, Placement, General); third, enable automated notice expiry so outdated info disappears; and fourth, deliver instant real-time alerts via WebSockets.',
      hinglishExplanation: 'Objectives ko numbers me bolne se examiner impress hote hain (First, second, third, fourth).'
    },
    {
      speakerCue: 'Slide 3: System Architecture & Technologies (1:15 - 2:00)',
      englishText: 'Coming to our technology stack, we adopted a 3-tier architecture. On the client tier, we used React.js with Tailwind CSS for a reactive Single Page Application. On the business logic tier, we implemented Node.js and Express.js REST APIs with JWT authentication for role-based security. For the persistence tier, we utilized MongoDB with Mongoose for document flexibility. Real-time broadcast is handled via bidirectional WebSockets.',
      hinglishExplanation: 'Tech stack ko "Presentation, Logic, and Data Tier" bolkar structured form me present karein.'
    },
    {
      speakerCue: 'Slide 4: Live Demo Handover (2:00 - 3:00)',
      englishText: 'Now, allow us to demonstrate the running application. We will show you two perspectives: the Faculty Admin portal where we publish a scheduled placement circular with an attached PDF and pin it; and the Student portal where the notice arrives instantly through a real-time WebSocket toast alert without page reload. Let us switch to the live screen.',
      hinglishExplanation: 'Demo handover smooth hona chahiye. Admin aur Student dono role dikhane ka promise karein.'
    }
  ]
};

export const SAY_THIS_NOT_THAT = [
  {
    dontSay: 'Maine YouTube video dekh kar banaya hai.',
    sayThis: 'I researched MERN stack best practices and implemented a 3-tier architecture with modular components.',
    why: 'Never admit you copied a tutorial; speak like an engineer who researched patterns.'
  },
  {
    dontSay: 'MongoDB best database hai isliye use kiya.',
    sayThis: 'We selected MongoDB because its flexible document model naturally handles variable attachments and eliminates expensive SQL JOIN operations.',
    why: 'Examiners hate "X is best" without technical reasoning.'
  },
  {
    dontSay: 'Bcrypt password ko encrypt karta hai.',
    sayThis: 'Bcrypt generates a one-way salted cryptographic hash, preventing plain text password leakage.',
    why: 'Hashing is NOT encryption. Calling bcrypt "encryption" is an instant viva mark deduction!'
  },
  {
    dontSay: 'Button hide karke student ko restrict kiya hai.',
    sayThis: 'Client-side button toggling is for UX, while security is strictly enforced on the server via JWT role-verification middleware.',
    why: 'Security MUST live on the backend, not in the browser.'
  },
  {
    dontSay: 'Mujhe ye answer nahi aata.',
    sayThis: 'Sir, I am not completely certain of this specific edge case right now, but according to my understanding of the protocol, it would work by... May I verify and get back to you?',
    why: 'Shows intellectual honesty, composure, and professional attitude instead of panic.'
  }
];

export const VIVA_SURVIVAL_RULES = [
  {
    rule: 'Rule 1: Never stay completely silent',
    description: 'If you take 10 seconds of silence, the examiner thinks you don\'t know anything. Instead, say: "Sir, that is a great question. Let me break down how our system approaches this..." This gives you 5 seconds to think.'
  },
  {
    rule: 'Rule 2: Steer the conversation to your strengths',
    description: 'If the examiner asks a tricky question about deep operating systems, connect it back to your project: "In Node.js, we managed this through the libuv event loop for our WebSocket connections..."'
  },
  {
    rule: 'Rule 3: Have the Live Demo ready in 2 tabs',
    description: 'Keep Tab 1 as Admin and Tab 2 as Student. Do not fumble with logins during the viva. Pre-fill sample notices so the screen looks vibrant and active!'
  },
  {
    rule: 'Rule 4: Credit your mentor and team',
    description: 'Use "We" instead of "I" when explaining architecture ("We designed the schema...", "Under mentor guidance we opted for JWT..."). Examiners value team spirit.'
  },
  {
    rule: 'Rule 5: Keep your posture open and calm',
    description: 'Do not cross your arms or look at the floor. Look at the examiner, nod when they speak, and keep a paper notepad and pen on the table to jot down feedback.'
  }
];
