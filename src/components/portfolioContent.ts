import data from '../data.json' with { type: 'json' };

export interface Source { label: string; href: string }
export interface ProjectStory {
  id: 'rag' | 'tracker' | 'mcp';
  number: string;
  title: string;
  category: string;
  summary: string;
  question: string;
  contribution: string;
  approach: string;
  outcome: string;
  stack: string[];
  details: string[];
  metrics: { value: string; label: string }[];
  github: string;
}

export const profile = data.personal;
export const experience = data.experience;
export const education = data.education;
export const skillGroups = data.skills_v2;
const rag = data.projects.find(project => project.title === 'Production RAG System')!;
const tracker = data.projects.find(project => project.title === 'Real-Time Multi-Object Tracker')!;

export const research = {
  name: 'DiSCo',
  title: 'DiSCo: A Distribution-First Steering and Cultural Prior Evaluation Framework for Measuring Cultural Preference Bias in LLMs',
  shortTitle: 'Whose preferences does a language model reflect?',
  question: 'When culturally grounded answers are equally valid, which ones do language models prefer—and how much can a prompt change that?',
  description: 'A framework for measuring cultural preference bias and prompt-based steering in LLMs.',
  scope: 'The study evaluates six instruction-tuned LLMs on 304 items spanning 12 cultures.',
  contribution: 'Academic writing, paper structuring, editing across drafts, and research presentations.',
  role: 'Co-author',
  status: 'arXiv preprint',
  submitted: 'September 9, 2026',
  authors: ['Bhuvan Arora', 'Devesh Saraogi', 'Sravya Varada', 'Dhruv Kumar'],
  url: 'https://arxiv.org/abs/2609.10253',
  metrics: [{ value: '6', label: 'instruction-tuned LLMs' }, { value: '304', label: 'benchmark items' }, { value: '12', label: 'cultures' }],
  acceptanceNote: 'The linked record does not establish acceptance at ACL or another peer-reviewed venue, so I can’t claim conference acceptance.',
};

export const projects: ProjectStory[] = [
  {
    id: 'rag', number: '01', title: rag.title, category: 'AI engineering · National Finance Olympiad',
    summary: rag.description,
    question: 'How can a question bank become a dependable source for generating educational content?',
    contribution: 'Built a retrieval-augmented generation pipeline and Python backend services during my AI engineering internship.',
    approach: 'Connected an existing PostgreSQL question bank, ChromaDB retrieval, and the OpenAI API through a FastAPI backend.',
    outcome: rag.details[0],
    stack: rag.stack, details: rag.details,
    metrics: [{ value: '1,000+', label: 'MCQs generated' }, { value: '~70%', label: 'of question creation automated' }], github: rag.github,
  },
  {
    id: 'tracker', number: '02', title: tracker.title, category: 'Reinforcement learning · Computer vision',
    summary: tracker.description,
    question: 'How can parallel reinforcement-learning workers learn to track objects in video?',
    contribution: 'Implemented an A3C multi-worker tracking system in PyTorch and engineered a custom MOT17Env.',
    approach: 'Used torch.multiprocessing for parallel workers and explored lightweight LLMs for resource-constrained environments.',
    outcome: 'The project reports stable convergence across two parallel workers. Quantitative tracking accuracy and FPS are not published here.',
    stack: tracker.stack, details: tracker.details,
    metrics: [{ value: '2', label: 'parallel workers' }], github: tracker.github,
  },
  {
    id: 'mcp', number: '03', title: 'MCP Google Drive Server', category: 'Personal project · Developer tools',
    summary: 'An MCP (Model Context Protocol) server for Google Drive that lets AI assistants access and manage Drive files.',
    question: 'How can an AI assistant work with files already in Google Drive?',
    contribution: 'Built a Google Drive server using Model Context Protocol to support AI-assisted file workflows.',
    approach: 'Uses Google OAuth authentication to connect Drive file access and management with an assistant.',
    outcome: 'A public implementation of an MCP server for Google Drive, with OAuth authentication and file-management capabilities.',
    stack: ['Model Context Protocol', 'Google Drive', 'Google OAuth'],
    details: ['Supports Google OAuth authentication.', 'Allows AI-powered access and management of Drive files.', 'Built to streamline AI workflows involving Google Drive.'],
    metrics: [], github: 'https://github.com/Sravya430/MCP-Google-Drive',
  },
];

export const sources: Record<string, Source> = {
  about: { label: 'How I think', href: '#about' },
  disco: { label: 'DiSCo on arXiv', href: research.url },
  research: { label: 'Research on this site', href: '#research' },
  rag: { label: 'RAG project', href: '#rag' },
  tracker: { label: 'Tracking project', href: '#tracker' },
  mcp: { label: 'MCP source code', href: projects[2].github },
  website: { label: 'Website source code', href: 'https://github.com/Sravya430/Website' },
  experience: { label: 'Experience & education', href: '#experience' },
  education: { label: 'Experience & education', href: '#experience' },
  skills: { label: 'Working toolkit', href: '#skills' },
  contact: { label: 'Email Sravya', href: `mailto:${profile.email}` },
  linkedin: { label: 'LinkedIn', href: profile.linkedin },
  github: { label: 'GitHub profile', href: profile.github },
  projects: { label: 'Selected work', href: '#projects' },
};

export const aboutNotes = [
  { title: 'Start with the why.', text: 'I like finding the intuition behind an idea, then working through the details until the explanation holds together.' },
  { title: 'Question the assumptions.', text: 'Follow-up questions are part of the process. I care about what a result tells us, what it leaves out, and whether the reasoning is consistent.' },
  { title: 'Make the details matter.', text: 'Technical depth and thoughtful design belong together. I’m drawn to things that are useful, carefully considered, and quietly beautiful.' },
];
