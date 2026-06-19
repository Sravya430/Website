import React from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';

export const SkillUniverse: React.FC = () => {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.skills_v2.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              {category.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative"
                >
                  <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-blue-500/50 transition-all">
                    {skill.name}
                  </div>
                  
                  {/* Tooltip for proficiency */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {skill.level}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-blue-600" />
                  </div>

                  {/* Inline badge for mobile/glance */}
                  <div className={`mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-center ${
                    skill.level === 'Good Knowledge' 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {skill.level === 'Good Knowledge' ? 'Good' : 'Basic'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
