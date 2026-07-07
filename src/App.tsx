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

const githubUsername = data.personal.github.split('/').filter(Boolean).pop() ?? 'Sravya430';
const showGitHubSection = false;

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
  publicRepos: string | number;
  followers: string | number;
  following: string | number;
  totalStars: string | number;
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
    publicRepos: '—',
    followers: '—',
    following: '—',
    totalStars: '—',
    topLanguage: '—',
  });
  const [isLoading, setIsLoading] = useState(true);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!showGitHubSection) {
      return;
    }

    const controller = new AbortController();

    const fetchGitHubStats = async () => {
      setIsLoading(true);

      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            signal: controller.signal,
            cache: 'no-store',
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`, {
            signal: controller.signal,
            cache: 'no-store',
            headers: { Accept: 'application/vnd.github+json' },
          }),
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
  }, [githubUsername]);

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

        {/* GitHub Activity Section - disabled via feature flag */}
        {showGitHubSection && (
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
                  <GitHubStatsImageCard
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&hide_border=true&bg_color=020617&cache_seconds=1800`}
                    alt={`${githubUsername} GitHub statistics`}
                    title="Overall GitHub Statistics"
                    fallbackLabel="GitHub statistics are temporarily unavailable."
                  />
                  <GitHubStatsImageCard
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&theme=dark&hide_border=true&layout=compact&cache_seconds=1800`}
                    alt={`${githubUsername} most used languages`}
                    title="Most Used Languages"
                    fallbackLabel="Language breakdown is temporarily unavailable."
                  />
                  <GitHubContributionGraphCard username={githubUsername} />
                  <GitHubStatsImageCard
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&hide_border=true&background=020617&cache_seconds=1800`}
                    alt={`${githubUsername} GitHub contribution streak`}
                    title="Contribution Streak"
                    fallbackLabel="Contribution streak is temporarily unavailable."
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
        )}

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

const GitHubContributionGraphCard = ({ username }: { username: string }) => {
  const [attempt, setAttempt] = useState(0);
  const primarySrc = `https://ghchart.rshah.org/${username}`;
  const fallbackSrc = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark`;
  const displaySrc = attempt === 0 ? primarySrc : fallbackSrc;
  const exhausted = attempt >= 2;

  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
      <div className="px-4 py-3 text-sm font-medium text-slate-400 border-b border-slate-800">Contribution Calendar</div>
      {exhausted ? (
        <div className="p-6 text-sm text-slate-400 text-center">
          Live contribution data is unavailable right now, but the GitHub statistics above are still visible.
        </div>
      ) : (
        <img
          src={displaySrc}
          alt={`${username} contribution calendar`}
          className="w-full"
          loading="lazy"
          onError={() => setAttempt((current) => current + 1)}
        />
      )}
    </div>
  );
};

const GitHubStatsImageCard = ({ src, alt, title, fallbackLabel }: { src: string; alt: string; title: string; fallbackLabel: string }) => {
  const [hasError, setHasError] = useState(false);
  const imageSrc = `${src}${src.includes('?') ? '&' : '?'}cache_seconds=1800&_=${Date.now()}`;

  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
      <div className="px-4 py-3 text-sm font-medium text-slate-400 border-b border-slate-800">{title}</div>
      {hasError ? (
        <div className="p-4 text-sm text-slate-400">{fallbackLabel}</div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

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
