import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import data from '../data.json';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm Sravya's AI assistant. Ask me anything about her experience, projects, or skills!", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response based on data.json
    setTimeout(() => {
      const query = inputValue.toLowerCase();
      let response = "I'm not sure about that. Try asking about her RAG project, RL research, or skills!";

      if (query.includes('rag') || query.includes('mcq')) {
        response = data.projects[1].description + " " + data.projects[1].details.join(' ');
      } else if (query.includes('rl') || query.includes('tracker') || query.includes('pytorch')) {
        response = data.projects[0].description + " " + data.projects[0].details.join(' ');
      } else if (query.includes('skill') || query.includes('tech') || query.includes('language')) {
        const skillsList = data.skills_v2.flatMap(cat => cat.items.map(s => s.name)).join(', ');
        response = `Her core skills include: ${skillsList}.`;
      } else if (query.includes('experience') || query.includes('intern')) {
        response = `Sravya was a Software Engineering Intern (AI) at National Finance Olympiad where she ${data.experience[0].highlights[0]}`;
      } else if (query.includes('education') || query.includes('college') || query.includes('bits')) {
        response = `She is a Computer Science undergraduate at BITS Pilani (CGPA: 5.62).`;
      } else if (query.includes('contact') || query.includes('email')) {
        response = `You can reach her at ${data.personal.email} or via LinkedIn: ${data.personal.linkedin}`;
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all z-50 group"
      >
        <MessageSquare className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask Sravya AI
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Bot className="text-blue-500" size={20} />
                <span className="font-bold text-white text-sm">Sravya AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 p-1 rounded-full ${msg.sender === 'user' ? 'bg-slate-800' : 'bg-blue-600/20'}`}>
                      {msg.sender === 'user' ? <User size={12} className="text-slate-400" /> : <Bot size={12} className="text-blue-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me something..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
