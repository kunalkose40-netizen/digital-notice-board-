import React, { useState } from 'react';
import { INITIAL_NOTICES, Notice, NoticeAttachment } from '../data/mockNotices';
import { 
  Pin, 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Bell, 
  Check, 
  AlertCircle, 
  Radio, 
  UserCheck, 
  Shield, 
  Filter, 
  Paperclip, 
  Eye, 
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';

export const LiveNoticeBoardDemo: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [currentUserRole, setCurrentUserRole] = useState<'student' | 'admin'>('student');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['n-1', 'n-2']));
  
  // Real-time notification banner state
  const [liveToast, setLiveToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    category: string;
  } | null>(null);

  // Modal State for Notice Creation / Editing
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Exam' as Notice['category'],
    isPinned: false,
    author: 'Dr. R. K. Sharma',
    department: 'CSE Department',
    expiryDays: 14,
    hasAttachment: true,
    attachmentType: 'pdf' as 'pdf' | 'image',
    attachmentName: 'Circular_Schedule_Doc.pdf'
  });

  const categories = ['All', 'Exam', 'Events', 'Placement', 'General'];

  // Trigger simulated WebSocket broadcast
  const triggerWebSocketBroadcast = (title: string, message: string, category: string) => {
    setLiveToast({
      show: true,
      title,
      message,
      category
    });
    setTimeout(() => {
      setLiveToast(null);
    }, 5500);
  };

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Delete notice (Admin only)
  const handleDeleteNotice = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setNotices(prev => prev.filter(n => n.id !== id));
      triggerWebSocketBroadcast(
        'Notice Revoked / Deleted',
        `Notice "${title.substring(0, 30)}..." was removed from all boards.`,
        'General'
      );
    }
  };

  // Toggle Pin (Admin only)
  const handleTogglePin = (id: string) => {
    setNotices(prev => prev.map(n => {
      if (n.id === id) {
        const nextState = !n.isPinned;
        if (nextState) {
          triggerWebSocketBroadcast(
            'Notice Pinned by Admin',
            `"${n.title.substring(0, 35)}..." pinned to top priority!`,
            n.category
          );
        }
        return { ...n, isPinned: nextState };
      }
      return n;
    }));
  };

  // Open modal for new notice
  const handleOpenCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      category: 'Exam',
      isPinned: false,
      author: 'Dr. R. K. Sharma',
      department: 'Computer Science Dept',
      expiryDays: 14,
      hasAttachment: true,
      attachmentType: 'pdf',
      attachmentName: 'Exam_Schedule_Guidelines.pdf'
    });
    setIsModalOpen(true);
  };

  // Save Notice (Create or Edit)
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const expiryDateObj = new Date();
    expiryDateObj.setDate(expiryDateObj.getDate() + formData.expiryDays);
    const expiryStr = expiryDateObj.toISOString().split('T')[0];

    const attachments: NoticeAttachment[] = formData.hasAttachment
      ? [
          {
            id: `att-${Date.now()}`,
            name: formData.attachmentName || (formData.attachmentType === 'pdf' ? 'Official_Circular.pdf' : 'Poster.jpg'),
            type: formData.attachmentType,
            size: formData.attachmentType === 'pdf' ? '1.2 MB' : '2.4 MB',
            url: '#'
          }
        ]
      : [];

    if (editingNotice) {
      // Edit
      setNotices(prev => prev.map(n => {
        if (n.id === editingNotice.id) {
          return {
            ...n,
            title: formData.title,
            content: formData.content,
            category: formData.category,
            isPinned: formData.isPinned,
            expiryDate: expiryStr,
            attachments: attachments.length ? attachments : n.attachments
          };
        }
        return n;
      }));
      triggerWebSocketBroadcast(
        'Notice Updated by Admin',
        `Updated notice: "${formData.title.substring(0, 35)}..."`,
        formData.category
      );
    } else {
      // Create new notice
      const newNotice: Notice = {
        id: `n-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        authorRole: 'Head of Department',
        department: formData.department,
        isPinned: formData.isPinned,
        startDate: new Date().toISOString().split('T')[0],
        expiryDate: expiryStr,
        createdAt: new Date().toISOString(),
        attachments,
        viewsCount: 1
      };

      setNotices(prev => [newNotice, ...prev]);
      triggerWebSocketBroadcast(
        '⚡ WebSocket Push: New Notice Published!',
        `Broadcasted to all online students: "${newNotice.title.substring(0, 40)}..."`,
        newNotice.category
      );
    }

    setIsModalOpen(false);
  };

  // Filter notices
  const filteredNotices = notices.filter(n => {
    // Category filter
    if (selectedCategory !== 'All' && n.category !== selectedCategory) {
      return false;
    }
    // Bookmark filter
    if (showOnlyBookmarks && !bookmarkedIds.has(n.id)) {
      return false;
    }
    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    // Compound sort: Pinned first, then creation date desc
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Live WebSocket Toast Banner */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 border-2 border-indigo-500 rounded-2xl p-4 shadow-2xl animate-bounce flex items-start gap-3 text-white">
          <div className="p-2.5 bg-indigo-600 rounded-xl shrink-0 mt-0.5">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                {liveToast.title}
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800">
                ws://socket.emit
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100 mt-1">
              {liveToast.message}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Simulated real-time WebSocket packet arrived on client socket.
            </p>
          </div>
          <button
            onClick={() => setLiveToast(null)}
            className="text-slate-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Control Bar: Role Switcher & Live Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Live Interactive Application Simulator
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Campus Digital Notice Board
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrate Admin CRUD, Scheduling, WebSocket broadcasts, attachments, and student filters live during your viva.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <span className="text-xs text-slate-400 font-medium">Switch Active Role:</span>
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setCurrentUserRole('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentUserRole === 'student'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student View</span>
              </button>
              <button
                onClick={() => setCurrentUserRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentUserRole === 'admin'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Faculty Admin (JWT)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Call to Action */}
        {currentUserRole === 'admin' && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-amber-950/20 p-3.5 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <Shield className="w-4 h-4 text-amber-400" />
              <span><strong>Logged in as Admin (JWT Verified):</strong> You can create, edit, pin, and delete notices with immediate WebSocket broadcast.</span>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Notice</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
              {cat === 'Exam' && <span className="ml-1 text-[10px] opacity-75">📝</span>}
              {cat === 'Placement' && <span className="ml-1 text-[10px] opacity-75">💼</span>}
              {cat === 'Events' && <span className="ml-1 text-[10px] opacity-75">🎉</span>}
              {cat === 'General' && <span className="ml-1 text-[10px] opacity-75">📢</span>}
            </button>
          ))}
          <button
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              showOnlyBookmarks
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Important / Saved ({bookmarkedIds.size})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, exam, job..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 text-slate-200 placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-300">No notices found</p>
            <p className="text-xs text-slate-500 mt-1">Try changing category or clearing your search term.</p>
          </div>
        ) : (
          filteredNotices.map(notice => {
            const isBookmarked = bookmarkedIds.has(notice.id);
            const isPlacement = notice.category === 'Placement';
            const isExam = notice.category === 'Exam';
            const isEvents = notice.category === 'Events';

            let categoryColor = 'bg-slate-800 text-slate-300 border-slate-700';
            if (isExam) categoryColor = 'bg-rose-950/60 text-rose-300 border-rose-800/80';
            if (isPlacement) categoryColor = 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80';
            if (isEvents) categoryColor = 'bg-purple-950/60 text-purple-300 border-purple-800/80';

            return (
              <div
                key={notice.id}
                className={`bg-slate-900 rounded-2xl p-5 sm:p-6 transition-all shadow-md relative border ${
                  notice.isPinned
                    ? 'border-indigo-500/80 bg-gradient-to-r from-indigo-950/20 via-slate-900 to-slate-900 shadow-indigo-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Pinned Badge */}
                {notice.isPinned && (
                  <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 shadow-md">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>PINNED BY FACULTY</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Category & Timestamps */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryColor}`}>
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        Posted: {notice.startDate}
                      </span>
                      <span className="text-xs text-amber-400/90 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        Expires: {notice.expiryDate}
                      </span>
                    </div>

                    {/* Notice Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                      {notice.title}
                    </h3>

                    {/* Content */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {notice.content}
                    </p>

                    {/* Attachments Section */}
                    {notice.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80">
                        <span className="text-xs font-semibold text-slate-400 block mb-2 flex items-center gap-1.5">
                          <Paperclip className="w-3.5 h-3.5 text-indigo-400" />
                          Official Attachments ({notice.attachments.length})
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {notice.attachments.map(att => (
                            <button
                              key={att.id}
                              onClick={() => {
                                alert(`Downloading official document: "${att.name}" (${att.size})`);
                              }}
                              className="flex items-center gap-2 bg-slate-950 hover:bg-indigo-950/60 text-slate-200 hover:text-indigo-300 border border-slate-800 hover:border-indigo-700/60 text-xs px-3 py-1.5 rounded-lg transition"
                            >
                              <FileText className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="font-medium">{att.name}</span>
                              <span className="text-[10px] text-slate-500">({att.size})</span>
                              <Download className="w-3 h-3 text-slate-400 ml-1" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Author & Department Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                      <div>
                        Issued by: <strong className="text-slate-200">{notice.author}</strong> ({notice.authorRole}) • {notice.department}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {notice.viewsCount} campus views
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Student / Admin) */}
                  <div className="flex sm:flex-col items-center gap-2 shrink-0 self-start">
                    {/* Student Bookmark */}
                    <button
                      onClick={() => toggleBookmark(notice.id)}
                      title={isBookmarked ? 'Remove from Important' : 'Mark as Important'}
                      className={`p-2 rounded-xl border text-xs transition ${
                        isBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    {/* Admin Actions */}
                    {currentUserRole === 'admin' && (
                      <>
                        <button
                          onClick={() => handleTogglePin(notice.id)}
                          title={notice.isPinned ? 'Unpin Notice' : 'Pin Notice to Top'}
                          className={`p-2 rounded-xl border text-xs transition ${
                            notice.isPinned
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                              : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(notice.id, notice.title)}
                          title="Delete Notice"
                          className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/60 rounded-xl text-xs transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE / EDIT NOTICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <Plus className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-white">Create New Official Notice</h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Authenticated Admin action: Notice will be stored in MongoDB and broadcasted via WebSockets.
            </p>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Mid-Term Examination 2026"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Exam">Exam (Examinations & Schedules)</option>
                    <option value="Placement">Placement (Jobs & Interviews)</option>
                    <option value="Events">Events (Hackathons & Fests)</option>
                    <option value="General">General (Admin & Deadlines)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Valid For (Auto Expiry)</label>
                  <select
                    value={formData.expiryDays}
                    onChange={e => setFormData({ ...formData, expiryDays: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={7}>7 Days (1 Week)</option>
                    <option value={14}>14 Days (2 Weeks)</option>
                    <option value={30}>30 Days (1 Month)</option>
                    <option value={90}>90 Days (End of Semester)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Detailed Content *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter full notice text, guidelines, instructions, or venue..."
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              {/* Pin notice checkbox */}
              <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={e => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <label htmlFor="isPinned" className="text-xs font-medium text-slate-200 cursor-pointer">
                  Pin this notice to top of feed (Priority Announcement)
                </label>
              </div>

              {/* Attachment selector */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Include Official Attachment?</span>
                  <input
                    type="checkbox"
                    checked={formData.hasAttachment}
                    onChange={e => setFormData({ ...formData, hasAttachment: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                </div>
                {formData.hasAttachment && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">File Type</label>
                      <select
                        value={formData.attachmentType}
                        onChange={e => setFormData({ ...formData, attachmentType: e.target.value as any })}
                        className="w-full bg-slate-900 text-slate-200 rounded-lg p-1.5 border border-slate-700"
                      >
                        <option value="pdf">PDF Document (.pdf)</option>
                        <option value="image">Poster / Photo (.jpg/.png)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Document Name</label>
                      <input
                        type="text"
                        value={formData.attachmentName}
                        onChange={e => setFormData({ ...formData, attachmentName: e.target.value })}
                        className="w-full bg-slate-900 text-slate-200 rounded-lg p-1.5 border border-slate-700"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Publish & Broadcast via WebSocket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
