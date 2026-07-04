import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import data from '../data.json';

export const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ cmd: string; output: string | React.ReactNode }[]>([
    { cmd: 'welcome', output: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: string | React.ReactNode;

    switch (cmd) {
      case 'help':
        output = 'Available commands: whoami, skills, projects, experience, contact, clear, exit';
        break;
      case 'whoami':
        output = `${data.personal.name} - ${data.personal.title}. ${data.personal.summary}`;
        break;
      case 'skills':
        output = data.skills_v2.map(cat => `${cat.category}: ${cat.items.map(s => s.name).join(', ')}`).join(' | ');
        break;
      case 'projects':
        output = data.projects.map(p => `- ${p.title}: ${p.description}`).join('\n');
        break;
      case 'experience':
        output = data.experience.map(e => `- ${e.role} @ ${e.company} (${e.period})`).join('\n');
        break;
      case 'contact':
        output = `Email: ${data.personal.email} | LinkedIn: ${data.personal.linkedin}`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    setHistory([...history, { cmd: input, output }]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 p-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-full shadow-lg hover:text-white hover:border-blue-500/50 transition-all z-50 group"
      >
        <TerminalIcon />
        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
          sudo open terminal
        </span>
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-4 md:inset-auto md:bottom-24 md:left-6 md:w-[600px] md:h-[400px] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden font-mono text-sm"
    >
      {/* Title Bar */}
      <div className="bg-slate-900 p-2 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2 px-2">
          <TerminalIcon size={14} className="text-slate-400" />
          <span className="text-slate-300">sravya@terminal: ~</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {history.map((item, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <div className="text-slate-400 mt-1 whitespace-pre-wrap leading-relaxed">
              {item.output}
            </div>
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">~</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};
