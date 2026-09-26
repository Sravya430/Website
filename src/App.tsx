import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { ExtraSections } from './components/ExtraSections';
import { SkillUniverse } from './components/SkillUniverse';
import { Timeline } from './components/Timeline';
import { ChatAssistant } from './components/ChatAssistant';
import { Terminal } from './components/Terminal';
import { aboutNotes, profile, projects } from './components/portfolioContent';

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Hero />
      <main id="main">
        <section id="projects" className="section page-width" aria-labelledby="work-heading">
          <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-heading">A few things I’ve <em>built.</em></h2></div><p>From a question worth asking<br className="desktop-break" /> to a system worth building.</p></div>
          <div className="project-stories">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
        </section>
        <ExtraSections />
        <section id="about" className="section page-width about-section" aria-labelledby="about-heading">
          <div className="about-intro"><p className="eyebrow">03 / A little more personal</p><h2 id="about-heading">How I <em>think.</em></h2><p className="serif-note">I tend to stay with a question<br />until the reasoning feels complete.</p><span className="margin-note">Curiosity, with a little structure.</span></div>
          <div className="about-notes">{aboutNotes.map((note,index) => <article key={note.title}><span className="note-number" aria-hidden="true">0{index+1}</span><div><h3>{note.title}</h3><p>{note.text}</p></div></article>)}</div>
        </section>
        <section id="experience" className="section page-width journey-section" aria-labelledby="journey-heading">
          <div className="section-heading"><div><p className="eyebrow">04 / Along the way</p><h2 id="journey-heading">Learning, then <em>doing.</em></h2></div><p>The experience and education<br className="desktop-break" /> behind the work.</p></div>
          <div className="journey-grid"><Timeline /><SkillUniverse /></div>
        </section>
        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="page-width contact-inner"><div><p className="eyebrow">05 / Leave a note</p><h2 id="contact-heading">Have an interesting<br /><em>problem in mind?</em></h2><p>I’m open to collaborations and opportunities.<br />I’d love to hear what you’re working on.</p></div>
            <div className="contact-links"><a className="contact-email" href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true" /><span>Email Sravya<small>{profile.email}</small></span><ArrowUpRight size={20} aria-hidden="true" /></a><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
          </div>
        </section>
      </main>
      <footer className="page-width footer"><p>© {new Date().getFullYear()} Sravya Varada</p><span className="footer-note">Made with care. And a few follow-up questions.</span><Terminal /></footer>
      <ChatAssistant />
    </>
  );
}
export default App;
