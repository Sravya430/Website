import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Github, Star } from 'lucide-react';

export const ExtraSections: React.FC = () => {
  const portfolioUrl = typeof window !== 'undefined' ? window.location.href : '/';

  return (
    <div className="space-y-32">
      {/* Research Work Section */}
      <section id="research">
        <SectionHeader
          title="Research Projects"
          subtitle="Selected academic contributions and research-focused projects"
          icon={<BookOpen className="text-blue-500" />}
        />

        <div className="mt-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-slate-900/60 border border-slate-800 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold text-white">DiSCo: Cultural Preference Bias in LLMs</h3>
                <p className="text-blue-400 font-medium mt-2">Contributor · Under Review – ACL 2026</p>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-slate-400">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Contributed to research studying cultural preference bias in Large Language Models.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Worked on evaluating how LLMs default to UK/US cultural options across multiple cultures even when all answers are equally valid.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Assisted with academic writing, paper structuring, and editing across multiple drafts.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Prepared research presentations summarizing findings on prompt-based steering and cultural bias in LLMs.
              </li>
            </ul>
          </motion.div>

          <div className="pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-slate-900/60 border border-slate-800 rounded-3xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h4 className="text-xl font-semibold text-white">Computer Vision – Military CCTV Tracking</h4>
                  <p className="text-slate-500 mt-1">2025</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-slate-400">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  Built a real-time person tracking system for CCTV footage using computer vision techniques.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  Implemented speed estimation and directional vector analysis.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  Explored integration of lightweight Large Language Models (sub-7B parameter models) for resource-constrained tactical environments.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  Investigated efficient AI solutions for surveillance and defense-oriented environments.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects of Personal Interest Section */}
      <section id="personal-projects">
        <SectionHeader
          title="Projects of Personal Interest"
          subtitle="Selected side projects and portfolio work"
          icon={<Star className="text-yellow-500" />}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white">MCP Google Drive Server</h3>
            <p className="text-slate-400 mt-4">
              Model Context Protocol (MCP) server for Google Drive that enables AI assistants to securely interact with Google Drive.
            </p>
            <ul className="mt-6 space-y-3 text-slate-400">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Supports Google OAuth authentication.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Allows AI-powered access and management of Drive files.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Built to streamline AI workflows involving Google Drive.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white">Personal Portfolio Website</h3>
            <p className="text-slate-400 mt-4">
              Designed and developed my personal portfolio website to showcase my projects, research, experience, technical skills, and professional journey.
            </p>
            <ul className="mt-6 space-y-3 text-slate-400">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Built using React, TypeScript, and Vite.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Features a modern, responsive, and accessible user interface.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Serves as a central hub for my GitHub, LinkedIn, resume, and other professional profiles.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1">•</span>
                Continuously maintained with ongoing feature additions, design improvements, and content updates.
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Live Website <ExternalLink size={16} />
              </a>
              <a
                href="https://github.com/Sravya430/Website.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Github size={16} /> GitHub Repository
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
    <div className="h-1 w-20 bg-blue-600 mb-4" />
    <p className="text-slate-400 text-lg">{subtitle}</p>
  </div>
);
