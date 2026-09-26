import { useRef, useState } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { profile, experience, projects, research, skillGroups } from './portfolioContent';

export const Terminal = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [input,setInput] = useState('');
  const [history,setHistory] = useState([{cmd:'welcome',output:'A small corner for the technically curious. Type help to explore.'}]);
  const submit = (event:React.FormEvent) => {
    event.preventDefault();
    const cmd = input.trim().toLowerCase();
    if(!cmd) return;
    setInput('');
    if(cmd==='exit') { dialog.current?.close(); return; }
    if(cmd==='clear') { setHistory([]); return; }
    const responses:Record<string,string> = {
      help:'Available commands: whoami, skills, projects, research, experience, contact, clear, exit',
      whoami:`${profile.name} — ${profile.summary}`,
      skills:skillGroups.map(group=>`${group.category}: ${group.items.map(item=>item.name).join(', ')}`).join('\n'),
      projects:projects.map(project=>`${project.title}\n${project.summary}`).join('\n\n'),
      research:`${research.title}\n${research.status} · ${research.submitted}\n${research.url}`,
      experience:experience.map(item=>`${item.role} @ ${item.company} (${item.period})`).join('\n'),
      contact:`Email: ${profile.email}\nLinkedIn: ${profile.linkedin}`,
    };
    setHistory(previous=>[...previous,{cmd:input.trim(),output:responses[cmd]??`Command not found: ${cmd}. Type help for a list of commands.`}].slice(-30));
    requestAnimationFrame(()=> { const node=contentRef.current; if(node) node.scrollTop=node.scrollHeight; });
  };
  return <>
    <button className="terminal-launcher" type="button" onClick={()=>{ dialog.current?.showModal(); inputRef.current?.focus(); }}><TerminalIcon size={13} aria-hidden="true" />For the technically curious</button>
    <dialog ref={dialog} className="terminal-dialog" aria-labelledby="terminal-heading"><div className="terminal-header"><h2 id="terminal-heading">sravya@notebook: ~</h2><button type="button" aria-label="Close terminal" onClick={()=>dialog.current?.close()}><X size={18}/></button></div><div ref={contentRef} className="terminal-content" role="log" aria-label="Terminal output" aria-live="polite">{history.map((entry,index)=><div key={index}><p className="terminal-command">› {entry.cmd}</p><p className="terminal-output">{entry.output}</p></div>)}</div><form className="terminal-form" onSubmit={submit}><label htmlFor="terminal-input" className="sr-only">Terminal command</label><span aria-hidden="true">›</span><input ref={inputRef} id="terminal-input" value={input} onChange={event=>setInput(event.target.value)} maxLength={300} autoComplete="off" spellCheck={false}/><button type="submit">Run</button></form></dialog>
  </>;
};
