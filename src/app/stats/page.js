'use client';

import { useEffect, useState } from 'react';

const COLORS = {
  Text: '#8B5CF6',
  Call: '#1E3A3A',
  Video: '#22C55E',
  Meetup: '#F59E0B'
};

export default function StatsPage() {
  const [stats, setStats] = useState([]);
  const [total, setTotal] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem('keenkeeper_timeline');
    const entries = raw ? JSON.parse(raw) : [];
    
    const counts = entries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {});

    const processed = Object.keys(counts).map(type => ({
      type,
      count: counts[type],
      color: COLORS[type] || '#CBD5E1'
    })).sort((a, b) => b.count - a.count);

    setStats(processed);
    setTotal(entries.length);
  }, []);

  if (!mounted) return null;

  // Donut chart calculations
  const radius = 125;
  const strokeWidth = 25;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const gapSize = 4;

  let currentOffset = 0;

  return (
    <div className="px-4 md:px-5 py-10 md:py-20 w-full animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-8">Friendship Analytics</h1>

      <div className="bg-white border border-[#E9E9E9] rounded-lg p-5 md:p-8 drop-shadow-sm flex flex-col justify-center">
        <h2 className="text-[#244D3F] font-semibold text-lg mb-12">By Interaction Type</h2>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <p className="text-slate-400">No data available yet. Log some interactions to see your analytics!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12">
            {/* Custom SVG Donut Chart */}
            <div className="relative flex items-center justify-center w-[170px] h-[170px] md:w-[250px] md:h-[250px]">
              <svg
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                className="transform -rotate-90 w-full h-full"
              >
                {stats.map((entry, index) => {
                  const percentage = entry.count / total;
                  const segmentLength = (circumference * percentage) - (stats.length > 1 ? gapSize : 0);
                  const strokeDashoffset = currentOffset;
                  
                  currentOffset -= (circumference * percentage);

                  return (
                    <circle
                      key={entry.type}
                      stroke={entry.color}
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                      style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
                      strokeLinecap="round"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                  );
                })}
              </svg>

              
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl md:text-4xl font-bold text-[#1F2937]">{total}</span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total</span>
              </div>
            </div>

            
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {stats.map(entry => (
                <div key={entry.type} className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm font-medium text-slate-500">
                    {entry.type} <span className="text-slate-300 ml-1">({entry.count})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
