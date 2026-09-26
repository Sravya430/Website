import { ArrowUpRight } from 'lucide-react';
import { skillGroups } from './portfolioContent';
const evidence:Record<string,{label:string;href:string}>={
  'Programming Languages':{label:'Python in the RAG pipeline',href:'#rag'},
  'Computer Science Fundamentals':{label:'Parallel workers in the tracker',href:'#tracker'},
  'AI / Machine Learning':{label:'PyTorch & reinforcement learning',href:'#tracker'},
  'Web Development':{label:'REST services in the internship',href:'#experience'},
  'Tools & Platforms':{label:'Explore the public code',href:'https://github.com/Sravya430'},
};
export const SkillUniverse = () => (
  <aside id="skills" className="toolkit" aria-labelledby="toolkit-heading"><span className="toolkit-tab" aria-hidden="true">the working toolkit</span><h3 id="toolkit-heading" className="subsection-title">Tools, with context.</h3><p className="toolkit-intro">The languages and ideas behind the work.</p>{skillGroups.map(group=><div className="toolkit-group" key={group.category}><h4>{group.category}</h4><p>{group.items.map(item=>item.name).join(' · ')}</p><a className="evidence-link" href={evidence[group.category].href} target={evidence[group.category].href.startsWith('https')?'_blank':undefined} rel={evidence[group.category].href.startsWith('https')?'noopener noreferrer':undefined}>{evidence[group.category].label}<ArrowUpRight size={13} aria-hidden="true" /></a></div>)}</aside>
);
