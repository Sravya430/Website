import { useEffect, useState, type ReactNode } from 'react';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { SkillUniverse } from './components/SkillUniverse';
import { Timeline } from './components/Timeline';
import { ChatAssistant } from './components/ChatAssistant';
import { Terminal } from './components/Terminal';
import { ExtraSections } from './components/ExtraSections';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Cpu, BarChart3, Globe, Zap, Code, Activity, Users, Star, GitBranch } from 'lucide-react';
import CountUp from 'react-countup';
import data from './data.json';

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  stargazers_count: number;
  language: string | null;
  name: string;
  html_url: string;
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguage: string;
}

interface ProjectSummary {
  title: string;
  subtitle: string;
  stack: string[];
  description: string;
  details: string[];
  metrics: Record<string, string>;
  github: string;
}

interface MetricCardProps {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

interface GithubStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

interface ContactLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

function App() {
  useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    topLanguage: '—',
  });
  const [isLoading, setIsLoading] = useState(true);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchGitHubStats = async () => {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/Sravya430', { signal: controller.signal }),
          fetch('https://api.github.com/users/Sravya430/repos?per_page=100', { signal: controller.signal }),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('Unable to fetch GitHub data');
        }

        const profile = (await profileResponse.json()) as GitHubProfile;
        const repos = (await reposResponse.json()) as GitHubRepo[];
        const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {});
        const topLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        setGithubStats({
          publicRepos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          totalStars,
          topLanguage,
        });
      } catch (error) {
        console.error('Failed to load GitHub statistics', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-32 py-32">
        {/* Metrics Section */}
        <section id="metrics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <MetricCard 
              icon={<Cpu className="text-blue-500" />} 
              value={1000} 
              suffix="+"
              label="MCQs Generated" 
              description="Production RAG System"
            />
            <MetricCard 
              icon={<Zap className="text-yellow-500" />} 
              value={70} 
              suffix="%"
              label="Automation" 
              description="Reduction in manual effort"
            />
            <MetricCard 
              icon={<BarChart3 className="text-purple-500" />} 
              value={2} 
              label="RL Workers" 
              description="Parallel A3C Implementation"
            />
            <MetricCard 
              icon={<Globe className="text-green-500" />} 
              value={15} 
              suffix="%"
              label="Data Analysed" 
              description="Active user base trends"
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeader title="Featured Projects" subtitle="Engineering end-to-end AI systems" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {(data.projects as ProjectSummary[]).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Extra Placeholder Sections */}
        <ExtraSections />

        {/* Skills Section */}
        <section id="skills">
          <SectionHeader title="Technical Expertise" subtitle="Core competencies & specializations" />
          <SkillUniverse />
        </section>

        {/* GitHub Activity Section */}
        <section id="github">
          <SectionHeader title="GitHub Activity" subtitle="Live statistics from GitHub" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="text-green-500" size={20} />
                  <h4 className="font-bold text-white">Contribution Overview</h4>
                </div>
                <span className="text-xs text-slate-500 font-mono">Live from GitHub</span>
              </div>
              <div className="space-y-4">
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=Sravya430&theme=dark&hide_border=true&background=020617`}
                  alt="GitHub contribution streak for Sravya430"
                  className="w-full rounded-xl border border-slate-800"
                />
              </div>
            </motion.div>
            <div className="space-y-4">
              <GithubStatCard icon={<Code size={18} />} label="Top Language" value={isLoading ? '—' : githubStats.topLanguage} />
              <GithubStatCard icon={<GitBranch size={18} />} label="Public Repositories" value={isLoading ? '—' : githubStats.publicRepos} />
              <GithubStatCard icon={<Star size={18} />} label="Total Stars Earned" value={isLoading ? '—' : githubStats.totalStars} />
              <GithubStatCard icon={<Users size={18} />} label="Followers" value={isLoading ? '—' : githubStats.followers} />
              <GithubStatCard icon={<Users size={18} />} label="Following" value={isLoading ? '—' : githubStats.following} />
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience">
          <SectionHeader title="Journey" subtitle="Experience & Education" />
          <div className="mt-12">
            <Timeline />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pb-20">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
            <SectionHeader title="Let's Build Together" subtitle="Open for collaborations and opportunities" center />
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <ContactLink href={data.personal.github} icon={<Github />} label="GitHub" />
              <ContactLink href={data.personal.linkedin} icon={<Linkedin />} label="LinkedIn" />
              <ContactLink href={`mailto:${data.personal.email}`} icon={<Mail />} label="Email" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} {data.personal.name}.</p>
      </footer>

      <ChatAssistant />
      <Terminal />
    </div>
  );
}

const MetricCard = ({ icon, value, suffix = '', label, description }: MetricCardProps) => {
  const CountUpComponent = (CountUp as typeof CountUp & { default?: typeof CountUp }).default || CountUp;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl"
    >
      <div className="mb-4">{icon}</div>
      <h4 className="text-3xl font-bold text-white mb-1">
        <CountUpComponent end={value} duration={2.5} suffix={suffix} enableScrollSpy scrollSpyOnce />
      </h4>
      <p className="text-sm font-semibold text-slate-300 mb-2">{label}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </motion.div>
  );
};

const GithubStatCard = ({ icon, label, value }: GithubStatCardProps) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
  >
     <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-800 rounded-lg text-blue-400">{icon}</div>
        <span className="text-sm text-slate-400">{label}</span>
     </div>
     <span className="font-bold text-white">{value}</span>
  </motion.div>
);

const SectionHeader = ({ title, subtitle, center = false }: SectionHeaderProps) => (
  <div className={center ? 'text-center' : ''}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
    <div className={`h-1 w-20 bg-blue-600 mb-4 ${center ? 'mx-auto' : ''}`} />
    <p className="text-slate-400 text-lg">{subtitle}</p>
  </div>
);

const ContactLink = ({ href, icon, label }: ContactLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors border border-slate-700"
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default App;
