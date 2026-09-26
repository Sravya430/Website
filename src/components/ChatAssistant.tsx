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
        aria-label={isOpen ? 'Close portfolio assistant' : 'Ask about my work'}
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
        className="assistant-launcher"
      >
        {isOpen ? <X size={18} aria-hidden="true" /> : <MessageSquare size={18} aria-hidden="true" />}<span>{isOpen ? 'Close assistant' : 'Ask about my work'}</span>
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
            className="assistant-panel"
          >
            <header className="assistant-header">
              <div className="assistant-icon"><Sparkles size={19} aria-hidden="true" /></div>
              <div className="assistant-heading">
                <h2 id="assistant-title">A note about Sravya</h2>
                <p>Projects, research & a few good questions.</p>
              </div>
              <button type="button" aria-label="Start a new conversation" title="Start a new conversation" disabled={!exchanges.length}
                onClick={() => { setExchanges([]); setInput(''); inputRef.current?.focus(); }}
                className="icon-button"><RotateCcw size={17} aria-hidden="true" /></button>
              <button type="button" aria-label="Close assistant" onClick={close} className="icon-button"><X size={19} aria-hidden="true" /></button>
            </header>

            <div ref={scrollRef} className="assistant-scroll" data-lenis-prevent>
              <div className="assistant-welcome">
                <p>What are you curious about?</p>
                <p>Ask about her projects, DiSCo research, experience, or skills. Answers use published portfolio details, with links to explore further.</p>
              </div>
              <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="assistant-log">
                {exchanges.map((exchange, index) => (
                  <div key={exchange.id} ref={index === exchanges.length - 1 ? latestRef : undefined} className="assistant-exchange">
                    <div className="question-wrap"><p className="question-bubble"><span className="sr-only">You: </span>{exchange.question}</p></div>
                    <div className="answer-bubble">
                      <p><span className="sr-only">Assistant: </span>{exchange.answer.text}</p>
                      {exchange.answer.sources.length > 0 && (
                        <nav aria-label={`Sources for answer ${index + 1}`} className="assistant-sources">
                          {exchange.answer.sources.map(source => (
                            <a key={source.href} href={source.href} target={source.href.startsWith('https:') ? '_blank' : undefined} rel={source.href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                              onClick={() => { if (source.href.startsWith('#')) close(); }}
                              className="source-link">
                              <BookOpen size={12} className="shrink-0" aria-hidden="true" />{source.label}{source.href.startsWith('https:') && <ExternalLink size={11} className="shrink-0" aria-hidden="true" />}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="assistant-suggestions" aria-label="Suggested questions">
                {suggestions.map(question => <button key={question} type="button" onClick={() => send(question)} className="suggestion-button">{question}</button>)}
              </div>
            </div>

            <form onSubmit={event => { event.preventDefault(); send(input); }} className="assistant-form">
              <label htmlFor="assistant-question" className="sr-only">Your question about Sravya</label>
              <div className="assistant-input-wrap">
                <textarea id="assistant-question" ref={inputRef} value={input} rows={2} maxLength={MAX_LENGTH} onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(input); }
                  }}
                  placeholder="Ask about a project, skill, or experience…"
                  className="assistant-input"
                  aria-describedby="assistant-input-help" />
                <button type="submit" aria-label="Send question" disabled={!input.trim()} className="send-question"><ArrowUp size={18} aria-hidden="true" /></button>
              </div>
              <p id="assistant-input-help" className="assistant-help"><span>Enter to send · Shift+Enter for a new line</span><span>{input.length}/{MAX_LENGTH}</span></p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
