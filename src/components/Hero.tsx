import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { research } from './portfolioContent';

export const Hero = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (open) firstLink.current?.focus(); }, [open]);
  return (
    <>
      <header className="site-header" onKeyDown={event => { if(event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); } }}>
        <div className="page-width header-inner"><a className="wordmark" href="#top" aria-label="Sravya Varada, home">Sravya Varada<span aria-hidden="true">.</span></a>
          <button className="menu-toggle" ref={toggleRef} type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X size={22} />:<Menu size={22} />}</button>
          <nav id="site-navigation" aria-label="Main navigation" className={open?'navigation is-open':'navigation'}>
            {['Work','Research','About','Contact'].map((label,index)=><a key={label} ref={index===0?firstLink:undefined} href={label==='Work'?'#projects':`#${label.toLowerCase()}`} onClick={()=>setOpen(false)}>{label}{label==='Contact'&&<ArrowUpRight size={14} aria-hidden="true" />}</a>)}
          </nav>
        </div>
      </header>
      <section id="top" className="hero page-width" aria-labelledby="hero-heading">
        <div className="hero-copy"><p className="eyebrow"><span className="small-rule" aria-hidden="true" /> Computer science · BITS Pilani</p><h1 id="hero-heading">Sravya <em>Varada.</em></h1><p className="hero-statement">Curious about how things work.<br /><em>Particular about how they feel.</em></p><p className="hero-description">Computer Science at BITS Pilani. Building AI systems and exploring how language models behave.</p><div className="hero-actions"><a className="button button-ink" href="#projects">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></a><a className="text-link" href={research.url} target="_blank" rel="noopener noreferrer">Read DiSCo <ArrowUpRight size={16} aria-hidden="true" /></a></div><p className="hero-footnote">AI engineering <span aria-hidden="true">/</span> Language models <span aria-hidden="true">/</span> Thoughtful systems</p></div>
        <figure className="portrait-composition"><span className="portrait-tab" aria-hidden="true">a little introduction</span><div className="portrait-frame"><img src="/sravya-avatar.webp" width="640" height="640" fetchPriority="high" alt="Illustrated avatar of Sravya with dark wavy hair and a navy blazer" /><figcaption><span>Sravya, illustrated.</span><span aria-hidden="true">✳</span></figcaption></div><div className="portrait-annotation" aria-hidden="true"><span>Always another<br />good question.</span><svg width="62" height="32" viewBox="0 0 62 32" fill="none"><path d="M2 3C18 30 34 32 57 19M48 17l10 1-5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg></div><span className="portrait-spark" aria-hidden="true">✧</span></figure>
      </section>
      <div className="page-width chapter-rule" aria-hidden="true"><span>Ideas, explored with care.</span><span>↓</span></div>
    </>
  );
};
