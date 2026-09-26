import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, BookOpen, ExternalLink, MessageSquare, RotateCcw, Sparkles, X } from 'lucide-react';
import { respond, starterQuestions } from './chatKnowledge';
import type { Answer } from './chatKnowledge';

interface Exchange { id: number; question: string; answer: Answer }
const MAX_LENGTH = 1000;
const MAX_HISTORY = 30;

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const reducedMotion = useReducedMotion();
  const last = exchanges.at(-1);
  const suggestions = last?.answer.suggestions ?? starterQuestions;

  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => {
    const container = scrollRef.current;
    const latest = latestRef.current;
    if (isOpen && exchanges.length && container && latest) {
      container.scrollTo({ top: container.scrollTop + latest.getBoundingClientRect().top - container.getBoundingClientRect().top - 16, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  }, [exchanges, isOpen, reducedMotion]);

  const close = () => {
    setIsOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  };

  const send = (value: string) => {
    const question = value.trim().slice(0, MAX_LENGTH);
    if (!question) return;
    const id = ++nextId.current;
    setExchanges(previous => [...previous, { id, question, answer: respond(question, previous.at(-1)?.answer.topics) }].slice(-MAX_HISTORY));
    setInput('');
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => isOpen ? close() : setIsOpen(true)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Ask about Sravya'}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
      >
        {isOpen ? <X aria-hidden="true" /> : <MessageSquare aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="portfolio-assistant"
            role="dialog"
            aria-modal="false"
            aria-labelledby="assistant-title"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            transition={{ duration: 0.16 }}
            onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}
            className="fixed bottom-24 left-3 right-3 z-50 flex h-[min(38rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl sm:left-auto sm:right-6 sm:w-[420px]"
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3">
              <div className="rounded-xl bg-blue-500/15 p-2 text-blue-300"><Sparkles size={19} aria-hidden="true" /></div>
              <div className="min-w-0 flex-1">
                <h2 id="assistant-title" className="text-sm font-semibold text-white">Sravya’s portfolio assistant</h2>
                <p className="mt-0.5 text-xs text-slate-400">Explore the work. Follow the sources.</p>
              </div>
              <button type="button" aria-label="Start a new conversation" title="Start a new conversation" disabled={!exchanges.length}
                onClick={() => { setExchanges([]); setInput(''); inputRef.current?.focus(); }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400 disabled:opacity-30"><RotateCcw size={17} aria-hidden="true" /></button>
              <button type="button" aria-label="Close assistant" onClick={close} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"><X size={19} aria-hidden="true" /></button>
            </header>

            <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4" data-lenis-prevent>
              <div className="mb-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-sm font-medium text-white">Get to know Sravya’s work</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Ask about her projects, DiSCo research, experience, or skills. Answers use published portfolio details, with links to explore further.</p>
              </div>
              <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="space-y-6">
                {exchanges.map((exchange, index) => (
                  <div key={exchange.id} ref={index === exchanges.length - 1 ? latestRef : undefined} className="scroll-mt-4 space-y-3">
                    <div className="ml-8 flex justify-end"><p className="max-w-full whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-sm text-white"><span className="sr-only">You: </span>{exchange.question}</p></div>
                    <div className="rounded-2xl rounded-tl-sm border border-slate-800 bg-slate-900/70 p-4">
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-300"><span className="sr-only">Assistant: </span>{exchange.answer.text}</p>
                      {exchange.answer.sources.length > 0 && (
                        <nav aria-label={`Sources for answer ${index + 1}`} className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-3">
                          {exchange.answer.sources.map(source => (
                            <a key={source.href} href={source.href} target={source.href.startsWith('https:') ? '_blank' : undefined} rel={source.href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                              onClick={() => { if (source.href.startsWith('#')) close(); }}
                              className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-2 text-xs font-medium text-blue-300 hover:bg-blue-500/20 focus-visible:outline-2 focus-visible:outline-blue-400">
                              <BookOpen size={12} className="shrink-0" aria-hidden="true" />{source.label}{source.href.startsWith('https:') && <ExternalLink size={11} className="shrink-0" aria-hidden="true" />}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Suggested questions">
                {suggestions.map(question => <button key={question} type="button" onClick={() => send(question)} className="rounded-xl border border-slate-700 px-3 py-2 text-left text-xs leading-relaxed text-slate-300 transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400">{question}</button>)}
              </div>
            </div>

            <form onSubmit={event => { event.preventDefault(); send(input); }} className="shrink-0 border-t border-slate-800 bg-slate-900 p-3">
              <label htmlFor="assistant-question" className="sr-only">Your question about Sravya</label>
              <div className="flex items-end gap-2 rounded-xl border border-slate-700 bg-slate-950 p-2 focus-within:border-blue-500">
                <textarea id="assistant-question" ref={inputRef} value={input} rows={2} maxLength={MAX_LENGTH} onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(input); }
                  }}
                  placeholder="Ask about a project, skill, or experience…"
                  className="min-w-0 flex-1 resize-none bg-transparent px-1 py-1 text-base leading-5 text-white placeholder:text-slate-500 focus:outline-none sm:text-sm"
                  aria-describedby="assistant-input-help" />
                <button type="submit" aria-label="Send question" disabled={!input.trim()} className="shrink-0 rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 disabled:cursor-not-allowed disabled:opacity-35"><ArrowUp size={18} aria-hidden="true" /></button>
              </div>
              <p id="assistant-input-help" className="mt-2 flex justify-between gap-2 px-1 text-[10px] text-slate-400"><span>Enter to send · Shift+Enter for a new line</span><span>{input.length}/{MAX_LENGTH}</span></p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
