import { profile, experience, education, skillGroups, projects, research, sources } from './portfolioContent.ts';
import type { Source } from './portfolioContent.ts';

export type Topic = 'about' | 'disco' | 'rag' | 'tracker' | 'mcp' | 'website' | 'experience' | 'education' | 'skills' | 'contact' | 'projects';
export type { Source } from './portfolioContent.ts';
export interface Answer {
  text: string;
  sources: Source[];
  suggestions: string[];
  topics: Topic[];
}

export const starterQuestions = ['What has Sravya built?', 'Tell me about DiSCo', 'Where did she work?', 'What are her skills?'];
const suggested: Record<Topic, string[]> = {
  about: starterQuestions,
  disco: ['What was her contribution?', 'Is it accepted at ACL?', 'Link the paper'],
  rag: ['What does 70% mean?', 'What stack did it use?', 'Is its code public?'],
  tracker: ['What stack did it use?', 'What results are documented?', 'Is its code public?'],
  mcp: ['How does authentication work?', 'Where is its repository?', 'Show her other projects'],
  website: ['What stack did it use?', 'Where is its repository?', 'How can I contact her?'],
  experience: ['When was the internship?', 'What does 70% mean?', 'Tell me about the RAG project'],
  education: ['What are her skills?', 'Tell me about DiSCo', 'How can I contact her?'],
  skills: ['What are her Python skills?', 'What has she built with PyTorch?', 'Show her projects'],
  contact: ['What has Sravya built?', 'Tell me about her experience'],
  projects: ['Tell me about DiSCo', 'Tell me about the MCP project', 'Tell me about the RAG project'],
};

const internship = experience[0];
const rag = projects[0];
const tracker = projects[1];
const mcp = projects[2];
const summaries: Record<Topic, string> = {
  about: `${profile.name} is a Computer Science undergraduate at BITS Pilani. Her work includes AI backends, a production RAG system, reinforcement-learning tracking, and DiSCo research.`,
  disco: `Sravya co-authored ${research.name}. ${research.description} ${research.scope}\n\nIt is an ${research.status}, submitted ${research.submitted}. Her documented contribution includes ${research.contribution[0].toLowerCase() + research.contribution.slice(1)}`,
  rag: `${rag.summary}\n\n${rag.details.join('\n')}\n\nStack: ${rag.stack.join(', ')}.`,
  tracker: `${tracker.summary}\n\n${tracker.details.join('\n')}\n\nStack: ${tracker.stack.join(', ')}.`,
  mcp: `${mcp.summary} ${mcp.approach} ${mcp.details.join(' ')}`,
  website: 'Sravya built this portfolio using React, TypeScript, and Vite, with Tailwind CSS and Framer Motion. It brings together her projects, research, experience, skills, and professional links. The source code is public on GitHub.',
  experience: `Sravya was an ${internship.role} at ${internship.company} (${internship.period}), in ${internship.location}.\n\n${internship.highlights.join('\n')}`,
  education: education.map(item => `${item.degree} — ${item.institution}\n${item.period}`).join('\n\n'),
  skills: skillGroups.map(group => `${group.category}: ${group.items.map(item => item.name).join(', ')}.`).join('\n\n'),
  contact: `You can email Sravya at ${profile.email}, connect on LinkedIn, or explore her GitHub using the links below.`,
  projects: 'Her portfolio includes:\n\n• DiSCo — cultural preference bias and steering in LLMs; co-authored arXiv preprint.\n• Production RAG system — educational question generation.\n• Real-time multi-object tracker — A3C reinforcement learning in PyTorch.\n• MCP Google Drive server — OAuth-based Drive access for AI assistants.\n\nChoose a project to explore its work, stack, or available source code.',
};

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFKC').replace(/[’']/g, '').replace(/[^a-z0-9%+#]+/g, ' ').trim()
    .replace(/\bintership\b/g, 'internship').replace(/\bexpereince\b/g, 'experience')
    .replace(/\bpytoch\b/g, 'pytorch').replace(/\bdisoco\b/g, 'disco');
}

function answer(text: string, topics: Topic[] = [], links: Source[] = [], prompts?: string[]): Answer {
  return { text, topics, sources: [...new Map(links.map(link => [link.href, link])).values()], suggestions: prompts ?? (topics.length === 1 ? suggested[topics[0]] : starterQuestions) };
}

export function respond(input: string, context: Topic[] = []): Answer {
  const q = normalize(input).slice(0, 1200);
  const has = (pattern: RegExp) => pattern.test(q);
  const explicit: Topic[] = [];
  if (has(/\b(disco|cultural|culture|arxiv|acl|paper|publication|bias|steering)\b/)) explicit.push('disco');
  if (has(/\b(rag|retrieval|mcq|mcqs|question generation|question creation|chromadb|fastapi)\b|70\s*%/)) explicit.push('rag');
  if (has(/\b(tracker|tracking|a3c|mot17|opencv|reinforcement|rl|cctv)\b/)) explicit.push('tracker');
  if (has(/\b(mcp|google drive|oauth|model context protocol)\b/)) explicit.push('mcp');
  if (has(/\b(website|this site|this portfolio|portfolio website)\b/)) explicit.push('website');

  // Unknown personal facts must never be inferred from a nearby keyword.
  if (has(/\b(salary|pay|compensation|ctc|age|birthday|married|relationship|home address|phone|mobile|visa|citizenship|religion)\b/)) {
    return answer('I don’t have confirmed information to share about that. For professional enquiries, please contact Sravya directly.', [], [sources.contact, sources.linkedin]);
  }
  if (has(/\b(available|availability|hire|hiring|recruit|recruiter|job|opportunit\w*|collaborat\w*|start date|notice period|relocat\w*)\b/)) {
    return answer('For professional enquiries, please contact Sravya. Her current availability, start date, and preferred arrangements are not documented here; please confirm those with her directly.', ['contact'], [sources.contact, sources.linkedin]);
  }
  if (has(/\b(resume|résumé|cv|certificate|certification)\b/)) {
    return answer('I don’t have a verified download link for her latest résumé or certificate records here. Please use LinkedIn or email Sravya for the current version.', ['contact'], [sources.linkedin, sources.contact]);
  }
  if (has(/\b(contact|email|reach|connect|linkedin)\b/) && !has(/\b(paper|repository|repo)\b/)) {
    return answer(summaries.contact, ['contact'], [sources.contact, sources.linkedin, sources.github]);
  }
  if (has(/\b(location|based|live|lives|living)\b/) && explicit.length === 0) {
    return answer(`Her portfolio lists ${profile.location}. For her current work location or arrangements, please confirm directly with Sravya.`, ['contact'], [sources.contact]);
  }
  if (has(/\b(15\s*%|15 percent|time saved|time reduction|manual effort|70 percent)\b/) || q.includes('15%') || q.includes('70%')) {
    return answer(`${rag.outcome} It does not establish a 70% reduction in time. The portfolio does not retain a verified 15% outcome claim.`, ['rag'], [sources.experience, sources.rag]);
  }

  const wantsLink = has(/\b(link|url|repo|repository|github|source|code|public|download|read)\b/);
  const wantsStack = has(/\b(stack|technologies|tools|frameworks|built with|tech used)\b/);
  const wantsSkills = has(/\b(skill|skills|proficien\w*|expertise|languages|strongest|good at|know|knows)\b/);
  const skills = skillGroups.flatMap(group => group.items);
  const matchedSkills = skills.filter(skill => {
    const name = normalize(skill.name.replace(/ \(.*\)/, ''));
    const aliases = name === 'dbms' ? ['dbms', 'sql', 'databases'] : name === 'dsa' ? ['dsa', 'data structures', 'algorithms'] : name === 'rest apis' ? ['rest apis', 'rest api'] : [name];
    return aliases.some(alias => (` ${q} `).includes(` ${alias} `));
  });
  if (!wantsStack && (wantsSkills || (matchedSkills.length > 0 && explicit.length === 0 && !wantsLink))) {
    if (matchedSkills.length > 0) {
      const skillText = matchedSkills.map(skill => `${skill.name}: ${skill.level.toLowerCase()} (self-described in the portfolio).`).join('\n');
      const evidence: string[] = [];
      const links = [sources.skills];
      if (has(/\b(pytorch|python)\b/)) { evidence.push('Project evidence: the A3C tracker uses Python and PyTorch; the internship also includes Python backend services.'); links.push(sources.tracker); }
      if (has(/\b(react|typescript|vercel)\b/)) { evidence.push('Project evidence: this portfolio uses React, TypeScript, and Vite and is hosted on Vercel.'); links.push(sources.website); }
      return answer(`${skillText}${evidence.length ? '\n\n' + evidence.join('\n') : ''}`, ['skills'], links);
    }
    if (has(/\b(rust|golang|go|c\+\+|c#|swift|kotlin|ruby|aws|kubernetes|docker)\b|c\+\+|c#/)) {
      return answer('I don’t see that skill documented in the portfolio, so I can’t confirm her experience with it. Her listed skills are available below.', ['skills'], [sources.skills]);
    }
    if (has(/\b(programming|coding|language|languages)\b/)) {
      return answer(`Listed programming languages: ${skillGroups[0].items.map(item => `${item.name} (${item.level.toLowerCase()})`).join(', ')}. These are self-described levels.`, ['skills'], [sources.skills]);
    }
    return answer(summaries.skills, ['skills'], [sources.skills]);
  }

  if (has(/\b(education|college|university|bits|degree|study|studies|studying|school|cgpa|gpa|grade|grades|graduat\w*)\b/) && explicit.length === 0) {
    if (has(/\b(cgpa|gpa|grade|grades)\b/)) return answer(education.map(item => `${item.institution}: ${item.details}`).join('\n'), ['education'], [sources.education]);
    if (has(/\b(graduat\w*)\b/)) return answer('Sravya’s B.E. Computer Science studies at BITS Pilani are listed as August 2023–present. The portfolio data does not specify a graduation date; confirm her expected completion date with her.', ['education'], [sources.education, sources.contact]);
    return answer(summaries.education, ['education'], [sources.education]);
  }
  const experienceQuestion = has(/\b(experience|intern\w*|nfo|national finance|olympiad|employment|employer|career)\b|\bwhere\b.*\b(work|worked|working)\b|\bwork history\b/);
  if (experienceQuestion && explicit.length === 0) {
    return answer(summaries.experience, ['experience'], [sources.experience]);
  }
  if (explicit.length === 0 && has(/\b(projects|built|portfolio|research)\b/) && !wantsLink && !wantsStack && !has(/\b(it|its|that|this|her contribution)\b/)) {
    return answer(summaries.projects, ['projects'], [sources.projects, sources.research, sources.mcp]);
  }

  const followup = wantsLink || wantsStack || has(/\b(it|its|that|this|more|detail\w*|contribution|contribute\w*|role|results|metrics|when|authors|coauthors|authentication|accepted|published|status)\b/);
  const topics = explicit.length ? explicit : followup ? context : [];
  if (topics.length > 1 && explicit.length === 0) {
    return answer('Which topic do you mean? Select one below so I can give the right details.', topics, [], topics.map(topic => `Tell me about ${topic === 'disco' ? 'DiSCo' : topic}`).slice(0, 4));
  }
  if (topics.length === 1 && topics[0] === 'projects') return answer(summaries.projects, ['projects'], [sources.projects, sources.research, sources.mcp]);
  if (topics.length > 0 && !topics.includes('projects')) {
    const parts: string[] = [];
    const links: Source[] = [];
    for (const topic of topics) {
      links.push(sources[topic]);
      if (topic === 'disco') {
        if (has(/\b(accepted|acl|peer reviewed|status|published)\b/)) parts.push(`${research.name} is an ${research.status} submitted ${research.submitted}. ${research.acceptanceNote}`);
        else if (has(/\b(contribution|contribute\w*|role|personally|herself|her part)\b/)) parts.push(`Sravya is a ${research.role.toLowerCase()}. Her documented work includes ${research.contribution[0].toLowerCase() + research.contribution.slice(1)} The portfolio does not attribute all experiments or implementation solely to her.`);
        else if (has(/\b(authors|coauthors|who wrote)\b/)) parts.push(`${research.name}’s authors are ${research.authors.slice(0, -1).join(', ')}, and ${research.authors.at(-1)}.`);
        else if (wantsStack) parts.push(`${research.scope} The portfolio does not list the implementation stack or individual model names; consult the paper for those details.`);
        else if (wantsLink) parts.push(`Read “${research.title}” using the arXiv link below. A separate public code repository is not linked in this portfolio.`);
        else parts.push(summaries.disco);
      } else if (topic === 'rag' || topic === 'tracker') {
        const project = topic === 'rag' ? rag : tracker;
        if (wantsLink) parts.push(`A public source-code repository for the ${project.title} is not linked in this portfolio. You can review the project description below or ask Sravya about access.`);
        else if (wantsStack) parts.push(`${project.title} uses ${project.stack.join(', ')}.`);
        else if (has(/\b(results|metrics|accuracy|performance|benchmark|speed|latency)\b/)) parts.push(topic === 'rag' ? `${rag.outcome} No measured latency, accuracy, or time-saving percentage is published here.` : `${tracker.outcome} It does not publish quantitative tracking accuracy, FPS, or comparative benchmark scores.`);
        else parts.push(summaries[topic]);
      } else if (topic === 'mcp') {
        parts.push(wantsStack ? 'The documented interface is Model Context Protocol with Google OAuth authentication. The portfolio does not list a complete language or dependency stack; the repository contains the implementation.' : has(/\b(authentication|oauth|secure|security)\b/) ? 'The MCP Google Drive server uses Google OAuth for authentication. The portfolio does not document exact scopes, token storage, or security audit results; consult the repository for implementation details.' : summaries.mcp);
      } else if (topic === 'experience' && has(/\b(when|date|dates|long|duration)\b/)) {
        parts.push(`The ${internship.role} internship at ${internship.company} is listed as ${internship.period}.`);
      } else {
        parts.push(summaries[topic]);
      }
    }
    return answer(parts.join('\n\n'), topics, links);
  }
  if (wantsLink) return answer('Here are Sravya’s public GitHub and LinkedIn profiles. For a particular project’s source code or the DiSCo paper, name the project.', ['contact'], [sources.github, sources.linkedin]);
  if (has(/^(hi|hey|hello|good morning|good evening)[!. ]*$/)) return answer('Hi! I can help you explore Sravya’s projects, research, experience, and skills. What would you like to know?', [], [], starterQuestions);
  if (has(/^(thanks|thank you|great|awesome|ok|okay)[!. ]*$/)) return answer('You’re welcome! You can explore another topic below.', [], [], starterQuestions);
  if (has(/\b(who is sravya|who is she|her name|about sravya|introduce|summary|summari\w*|tell me about her|tell me about yourself|what does she do)\b/)) return answer(summaries.about, ['about'], [sources.education, sources.projects, sources.disco]);
  if (has(/\b(you|assistant|bot|help)\b/)) return answer('I’m Sravya’s portfolio guide. I answer from the information published on this site and link to supporting pages. I can help with projects, research, experience, education, skills, and contact details. I can’t confirm unpublished information or take actions for Sravya.', [], [], starterQuestions);
  return answer('I couldn’t confidently match that to the published portfolio. Try naming a project or ask about experience, education, skills, or contact details. For information that isn’t documented here, Sravya can confirm directly.', [], [sources.contact], starterQuestions);
}
