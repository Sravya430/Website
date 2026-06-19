import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';

export const ExtraSections: React.FC = () => {
  return (
    <div className="space-y-32">
      {/* Research Work Section */}
      <section id="research">
        <SectionHeader 
          title="Research Work" 
          subtitle="Explorations in AI and Reinforcement Learning" 
          icon={<BookOpen className="text-blue-500" />}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-12 bg-slate-900/50 border border-slate-800 border-dashed rounded-3xl text-center"
        >
          <p className="text-slate-400 text-lg italic">
            "Research papers, publications, and ongoing research will be added here."
          </p>
          <div className="mt-8 flex justify-center gap-4 text-xs font-mono text-slate-600">
             <span>• TITLE</span>
             <span>• DESCRIPTION</span>
             <span>• PUBLICATION VENUE</span>
             <span>• LINKS</span>
          </div>
        </motion.div>
      </section>

      {/* Projects of Personal Interest Section */}
      <section id="personal-projects">
        <SectionHeader 
          title="Projects of Personal Interest" 
          subtitle="Side quests and creative experiments" 
          icon={<Star className="text-yellow-500" />}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-12 bg-slate-900/50 border border-slate-800 border-dashed rounded-3xl text-center"
        >
          <p className="text-slate-400 text-lg italic">
            "Personal exploration projects will be showcased here soon."
          </p>
          <div className="mt-8 flex justify-center gap-4 text-xs font-mono text-slate-600">
             <span>• TITLE</span>
             <span>• TECH STACK</span>
             <span>• GITHUB</span>
             <span>• LIVE DEMO</span>
          </div>
        </motion.div>
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
