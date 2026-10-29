import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  CheckCircle, 
  HelpCircle, 
  RotateCcw,
  Shield,
  Zap,
  GraduationCap
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

export const AIVivaExaminerChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      role: 'assistant',
      content: `Good morning candidate. I am Dr. Arvind Narayanan, your External University Examiner for today's B.Tech Viva examination.\n\nI have reviewed your project synopsis for the **"Digital Notice Board System"**. Let us begin. Tell me:\n\n**"Why did you choose WebSockets for notifications instead of standard HTTP polling? What exact problem would occur if 2,000 students polled your Express server every 3 seconds?"**\n\nYou may answer in English or Hinglish.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [activeTopic, setActiveTopic] = useState<string>('WebSockets vs Polling');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const topicPresets = [
    { title: 'WebSockets vs Polling', prompt: 'Ask me a tough question comparing WebSockets and HTTP polling for real-time notices.' },
    { title: 'JWT Security & Tokens', prompt: 'Ask me how JWT authentication works, and grill me on what happens if a token is stolen.' },
    { title: 'MongoDB Indexing & Schemas', prompt: 'Ask me why MongoDB was chosen over MySQL and test my knowledge of compound indexing.' },
    { title: 'Node.js Non-Blocking I/O', prompt: 'Ask me how Node.js handles 5,000 concurrent student reads if it is single-threaded.' },
    { title: 'Rapid Fire Surprise Viva', prompt: 'Act as a very strict examiner and ask me a surprise edge-case question on my project.' },
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Text to speech for examiner responses
  const speakText = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/viva-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          userResponse: textToSend,
          topic: activeTopic,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get evaluation');
      }

      const botReply = data.reply;
      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botReply);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply = `⚠️ *Connection note:* Server evaluation encountered: ${err.message}. Ensure your GEMINI_API_KEY is configured. Here is standard examiner advice: always emphasize server-side JWT verification, Bcrypt salted hashing, and MongoDB compound indexing on \`{ isPinned: -1, createdAt: -1 }\`.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    if (confirm('Reset the mock viva interview session?')) {
      window.speechSynthesis?.cancel();
      setMessages([
        {
          id: 'msg-reset',
          role: 'assistant',
          content: `Welcome back to the examination room. Let's start fresh. Introduce your project architecture in 30 seconds, or pick a specific technical topic from the chips below.`,
          timestamp: 'Just now',
        },
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-800/40 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  AI Mock Viva Examiner Simulator
                </h2>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-500/30">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Practice answering realistic viva questions with Prof. Arvind Narayanan. Get scored out of 10 with instant technical feedback.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextState = !isVoiceEnabled;
                setIsVoiceEnabled(nextState);
                if (!nextState) window.speechSynthesis?.cancel();
              }}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                isVoiceEnabled
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Examiner Voice Readout"
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isVoiceEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>
            <button
              onClick={handleResetChat}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs transition"
              title="Reset Viva Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Topic Starter Chips */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 self-center mr-1 font-semibold">Test Topic:</span>
          {topicPresets.map((t) => (
            <button
              key={t.title}
              onClick={() => {
                setActiveTopic(t.title);
                handleSendMessage(t.prompt);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                activeTopic === t.title
                  ? 'bg-rose-600/30 text-rose-200 border-rose-500/50'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[560px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-md ${
                    isBot
                      ? 'bg-slate-950/90 text-slate-200 border border-slate-800'
                      : 'bg-indigo-600 text-white border border-indigo-500/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5 opacity-75 font-semibold">
                    <span>{isBot ? 'Prof. Arvind Narayanan (Examiner)' : 'You (B.Tech Candidate)'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-line font-normal space-y-2">
                    {msg.content}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-rose-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Prof. Narayanan is evaluating your answer and grading technical accuracy...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Answer the examiner (e.g. 'Sir, WebSockets maintain a persistent TCP connection...')"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl px-4 py-3 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl transition shadow-lg shadow-rose-600/30 shrink-0"
              title="Submit Answer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
            <span>💡 Tip: You can type in simple Hinglish or English. Speak like you would in the real viva hall!</span>
            <span>Powered by Gemini</span>
          </div>
        </div>
      </div>
    </div>
  );
};
