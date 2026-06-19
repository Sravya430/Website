import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import data from '../data.json';

export const Timeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-800" />

      <div className="space-y-12">
        {data.experience.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center justify-between w-full ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="hidden md:block w-5/12" />
            
            {/* Dot */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-slate-950 z-10" />

            <div className="w-full md:w-5/12 ml-8 md:ml-0 bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4">
                Experience
              </span>
              <h3 className="text-xl font-bold text-white">{item.role}</h3>
              <p className="text-blue-400 font-medium mb-4">{item.company}</p>
              
              <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {item.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.location}
                </div>
              </div>

              <ul className="space-y-2">
                {item.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-slate-400 text-sm flex gap-2">
                    <span className="text-blue-500">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {data.education.map((item, index) => {
          const totalIndex = index + data.experience.length;
          return (
            <motion.div
              key={`edu-${index}`}
              initial={{ opacity: 0, x: totalIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: totalIndex * 0.1 }}
              className={`relative flex items-center justify-between w-full ${
                totalIndex % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="hidden md:block w-5/12" />
              
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-slate-950 z-10" />

              <div className="w-full md:w-5/12 ml-8 md:ml-0 bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full mb-4">
                  Education
                </span>
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <p className="text-purple-400 font-medium mb-2">{item.institution}</p>
                <p className="text-slate-500 text-sm mb-4">{item.details}</p>
                
                <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
