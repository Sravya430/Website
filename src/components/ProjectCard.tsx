import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ChevronDown, ChevronUp } from 'lucide-react';
import { RagPipeline } from './RagPipeline';

interface ProjectProps {
  project: {
    title: string;
    subtitle: string;
    stack: string[];
    description: string;
    details: string[];
    metrics: Record<string, string>;
    github: string;
  };
}

export const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-blue-400 font-medium">{project.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>

        <p className="text-slate-400 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <p className="text-slate-500 text-xs uppercase tracking-wider">{key}</p>
              <p className="text-white font-bold text-lg">{value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-lg"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              View Details & Architecture <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-900/50 border-t border-slate-800"
          >
            <div className="p-6">
              <h4 className="text-white font-semibold mb-4">Implementation Details</h4>
              <ul className="space-y-2 mb-8">
                {project.details.map((detail, index) => (
                  <li key={index} className="flex gap-3 text-slate-400 text-sm">
                    <span className="text-blue-500">•</span>
                    {detail}
                  </li>
                ))}
              </ul>

              {project.title.toLowerCase().includes('rag') && (
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Architecture Pipeline</h4>
                  <RagPipeline />
                </div>
              )}

              {project.title.toLowerCase().includes('tracker') && (
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">RL Multi-Worker Tracking Simulation</h4>
                  <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    {/* Simulated RL Visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-8">
                        {[1, 2].map(id => (
                          <div key={id} className="relative w-32 h-32 border border-blue-500/30 rounded flex flex-col items-center justify-center">
                             <div className="absolute top-2 left-2 text-[10px] text-blue-500 font-mono">Worker_{id}</div>
                             <motion.div 
                               animate={{ 
                                 x: [0, 20, -20, 10, 0],
                                 y: [0, -10, 20, -5, 0]
                               }}
                               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                               className="w-12 h-12 border-2 border-blue-500 rounded flex items-center justify-center"
                             >
                               <div className="w-1 h-1 bg-blue-500 rounded-full" />
                             </motion.div>
                             <div className="mt-2 text-[10px] text-slate-500">IoU: 0.84</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
