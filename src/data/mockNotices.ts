export interface NoticeAttachment {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  size: string;
  url: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Exam' | 'Events' | 'Placement' | 'General';
  author: string;
  authorRole: string;
  department: string;
  isPinned: boolean;
  isImportant?: boolean;
  startDate: string; // ISO string YYYY-MM-DD
  expiryDate: string; // ISO string YYYY-MM-DD
  createdAt: string;
  attachments: NoticeAttachment[];
  viewsCount: number;
}

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n-1',
    title: 'URGENT: End Semester Practical Exam Timetable - B.Tech VIII Sem',
    content: 'All 8th semester Computer Science & Engineering students are hereby informed that the Major Project Viva and Practical Examination schedule is released. Students must report in formal attire with hard-bound project reports duly signed by their respective guides and HOD.',
    category: 'Exam',
    author: 'Dr. R. K. Sharma',
    authorRole: 'Controller of Examinations',
    department: 'Examination Cell',
    isPinned: true,
    isImportant: true,
    startDate: '2026-10-25',
    expiryDate: '2026-11-15',
    createdAt: '2026-10-28T09:30:00Z',
    attachments: [
      {
        id: 'att-1',
        name: 'CSE_Final_Year_Viva_Schedule_2026.pdf',
        type: 'pdf',
        size: '1.4 MB',
        url: '#'
      }
    ],
    viewsCount: 428
  },
  {
    id: 'n-2',
    title: 'Campus Recruitment Drive: Senior Software Engineer Trainee at TechCorp',
    content: 'TechCorp is conducting an on-campus placement drive for B.Tech CS/IT graduating batch of 2026. Eligible CGPA cutoff is 7.5 and above with no active backlogs. Round 1 Online Aptitude & Coding test will be held this Saturday in the Central Computer Labs at 10:00 AM.',
    category: 'Placement',
    author: 'Prof. Ananya Sen',
    authorRole: 'Head - Training & Placement Cell',
    department: 'T&P Department',
    isPinned: true,
    isImportant: true,
    startDate: '2026-10-26',
    expiryDate: '2026-11-05',
    createdAt: '2026-10-27T14:15:00Z',
    attachments: [
      {
        id: 'att-2',
        name: 'TechCorp_Job_Description_CTC_Slab.pdf',
        type: 'pdf',
        size: '850 KB',
        url: '#'
      },
      {
        id: 'att-3',
        name: 'Shortlisted_Eligible_Students_List.pdf',
        type: 'pdf',
        size: '620 KB',
        url: '#'
      }
    ],
    viewsCount: 612
  },
  {
    id: 'n-3',
    title: 'HACK-CAMPUS 2026: 36-Hour National Level Hackathon Registration Open',
    content: 'The Department of Computer Science invites teams to register for HACK-CAMPUS 2026. Exciting tracks in Generative AI, Cloud Systems, IoT, and Cyber Defense. Total prize pool of ₹2,50,000. Maximum 4 members per team. Free food, mentors, and sponsor swags provided.',
    category: 'Events',
    author: 'Er. Vikrant Mehta',
    authorRole: 'Faculty Coordinator - Tech Council',
    department: 'CSE Department',
    isPinned: false,
    isImportant: false,
    startDate: '2026-10-20',
    expiryDate: '2026-11-20',
    createdAt: '2026-10-26T11:00:00Z',
    attachments: [
      {
        id: 'att-4',
        name: 'Hackathon_Official_Poster.jpg',
        type: 'image',
        size: '2.1 MB',
        url: '#'
      }
    ],
    viewsCount: 890
  },
  {
    id: 'n-4',
    title: 'Library Clearance & Hostel No-Dues Deadline for Final Year Students',
    content: 'Notice for all passing out graduates: All borrowed reference books and library cards must be surrendered to the Central Library before 10th November 2026 to obtain the Final Clearance Slip required for provisional degree certificates.',
    category: 'General',
    author: 'Central Administration',
    authorRole: 'Chief Librarian',
    department: 'Library Services',
    isPinned: false,
    isImportant: false,
    startDate: '2026-10-15',
    expiryDate: '2026-11-10',
    createdAt: '2026-10-25T16:40:00Z',
    attachments: [
      {
        id: 'att-5',
        name: 'No_Dues_Form_Format.pdf',
        type: 'pdf',
        size: '310 KB',
        url: '#'
      }
    ],
    viewsCount: 340
  },
  {
    id: 'n-5',
    title: 'Re-evaluation & Grade Improvement Results Declared (Odd Semesters)',
    content: 'The re-checking and re-evaluation results for 3rd, 5th, and 7th semester examinations held in Dec-Jan are now officially updated on the student ERP portal. Any discrepancies should be notified within 3 working days.',
    category: 'Exam',
    author: 'Examination Cell',
    authorRole: 'Assistant Registrar',
    department: 'Admin Block',
    isPinned: false,
    isImportant: false,
    startDate: '2026-10-10',
    expiryDate: '2026-11-01',
    createdAt: '2026-10-24T10:10:00Z',
    attachments: [],
    viewsCount: 520
  }
];
