import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Trophy, Zap, AlertCircle } from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export const LeetCode: React.FC = () => {
  const username = "rwKxNvFmTp";
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();
        
        if (data.status === "success") {
          setStats(data);
        } else {
          setError(data.message || "Failed to fetch stats");
        }
      } catch (err) {
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="leetcode" className="py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-orange-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">LeetCode Stats</h2>
          </div>
          <div className="h-1 w-20 bg-orange-600 mb-4" />
          <p className="text-slate-400 text-lg">Coding consistency and problem-solving metrics</p>
        </div>
        <a 
          href={`https://leetcode.com/u/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors border border-slate-700 w-fit"
        >
          <span>View Profile</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
          <div className="flex items-center gap-3 text-slate-500 animate-pulse">
            <Zap className="animate-spin" size={20} />
            <span>Fetching real-time data...</span>
          </div>
        </div>
      ) : error ? (
        <div className="p-8 bg-slate-900/50 rounded-2xl border border-red-500/20 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={32} />
          <p className="text-slate-400">{error}</p>
          <p className="text-slate-500 text-sm mt-2 font-mono">User: {username}</p>
        </div>
      ) : stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Solved" 
            value={stats.totalSolved.toString()} 
            icon={<Trophy className="text-yellow-500" />} 
          />
          <StatCard 
            label="Easy" 
            value={stats.easySolved.toString()} 
            color="text-green-500" 
          />
          <StatCard 
            label="Medium" 
            value={stats.mediumSolved.toString()} 
            color="text-orange-500" 
          />
          <StatCard 
            label="Hard" 
            value={stats.hardSolved.toString()} 
            color="text-red-500" 
          />
          
          <div className="lg:col-span-4 mt-4 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-6">
             <div className="flex gap-8">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Ranking</p>
                  <p className="text-white font-bold text-xl">{stats.ranking.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Reputation</p>
                  <p className="text-white font-bold text-xl">{stats.reputation}</p>
                </div>
             </div>
             <div className="text-slate-500 text-sm italic font-mono">
                * Live heatmap visualization is currently limited by public API availability.
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

const StatCard = ({ label, value, icon, color = "text-white" }: { label: string; value: string; icon?: React.ReactNode; color?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl"
  >
    <div className="flex justify-between items-start mb-4">
      <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
      {icon}
    </div>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </motion.div>
);
