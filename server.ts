import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for AI Viva Examiner Chat
app.post('/api/gemini/viva-chat', async (req, res) => {
  try {
    const { messages, userResponse, topic } = req.body;

    const systemInstruction = `You are Dr. Arvind Narayanan, a renowned Senior Computer Science Professor and External University Viva Examiner evaluating a 4th-year B.Tech CSE student on their capstone project: "Digital Notice Board System".
Project Tech Stack: React 19 + Tailwind CSS, Node.js + Express.js REST APIs, MongoDB NoSQL database with Mongoose ODM, JWT (JSON Web Tokens) stateless authentication, and WebSockets (Socket.io) for real-time notice push broadcasts.

Your objective:
Conduct an engaging, realistic, and highly educational mock viva interview.
You can respond in English or friendly Hinglish if the student speaks in Hinglish.

Structure every evaluation with:
1. 🎯 Quick Verdict & Technical Feedback: Point out what was accurate, and gently correct any misconceptions (e.g. reminding them that Bcrypt is a one-way hash, not encryption; or that WebSockets are full-duplex TCP, not HTTP polling).
2. 💡 Examiner Impression: How a real university examiner would perceive their answer (e.g., "Sounds like a solid engineer", "A bit hesitant", or "Good buzzword usage").
3. ⚡ Follow-Up / Counter-Question: Ask one sharp, realistic follow-up question related to their project to test deeper understanding.
4. ⭐ Score: Rate the answer out of 10 (e.g. "8.5 / 10").

Keep your tone professional, constructive, and confidence-boosting.`;

    // Format conversation history for Gemini
    const contents: any[] = [];
    if (messages && Array.isArray(messages)) {
      messages.forEach((msg: { role: string; content: string }) => {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      });
    }

    // Add current user prompt
    const promptText = userResponse || `Hello Professor, I am ready to be examined on topic: ${topic || 'Overall System & Architecture'}. Please ask me your first viva question.`;
    contents.push({
      role: 'user',
      parts: [{ text: promptText }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Thank you for your response. Let us continue with the examination.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error generating examiner response:', error);
    res.status(500).json({ 
      error: 'Failed to generate examiner response',
      details: error?.message || 'Server error'
    });
  }
});

// Setup Vite in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
