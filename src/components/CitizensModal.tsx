'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles } from 'lucide-react';
import { CitySchema } from '@/data/types';

interface CitizensModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityData: CitySchema;
}

// Mock avatars for visual prototype since GitHub GraphQL doesn't return full followers lists cheaply
const MOCK_CITIZENS = [
  { id: 1, name: 'Alex Chen', handle: '@alex-chen', role: 'Contributor // core', stats: '142 commits • 18 PRs', color: 'emerald-400', img: 11 },
  { id: 2, name: 'Sarah Lin', handle: '@sarah-dev', role: 'Contributor // core', stats: '96 commits • 12 PRs', color: 'emerald-400', img: 12 },
  { id: 3, name: 'Kenji Matsuda', handle: '@k-matsuda', role: 'Contributor // neural', stats: '48 commits • 6 PRs', color: 'purple-400', img: 13 },
  { id: 4, name: 'Elias Vance', handle: '@elias-z', role: 'Contributor // frontend', stats: '34 commits • 4 PRs', color: 'emerald-400', img: 14 },
  { id: 5, name: 'Maya Lin', handle: '@m-lin', role: 'Contributor // core', stats: '22 commits • 3 PRs', color: 'brand-cyan', img: 15 },
  { id: 6, name: 'Taylor Swift-Dev', handle: '@taylordev', role: 'Follower', stats: 'Starred 6 repos', color: 'slate-400', img: 16 },
  { id: 7, name: 'Jordan Klein', handle: '@jordan-k', role: 'Follower', stats: 'Starred git-city-core', color: 'slate-400', img: 17 },
  { id: 8, name: 'Priya Patel', handle: '@priya-p', role: 'Contributor // docs', stats: '15 commits • 8 PRs', color: 'amber-400', img: 18 },
  { id: 9, name: 'Hans Schmidt', handle: '@hschmidt', role: 'Follower', stats: 'Forked neural-engine', color: 'slate-400', img: 19 },
];

export function CitizensModal({ isOpen, onClose, cityData }: CitizensModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'contributors' | 'followers'>('all');

  // Aggregate real stats from cityData
  const allBuildings = cityData.districts.flatMap(d => d.buildings);
  const totalContributors = allBuildings.reduce((acc, b) => acc + b.contributors, 0);
  const totalFollowers = cityData.user.followers;
  const totalCitizens = totalContributors + totalFollowers;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#070b12]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-2xl bg-[#0d131f]/95 border border-white/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Glow accent on top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/60 to-transparent" />

            {/* Header */}
            <div className="p-5 pb-4 border-b border-white/10 flex items-start justify-between relative">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#4ce0d2]" />
                  <h1 className="text-xl font-semibold text-white tracking-tight font-sans">Citizens of @{cityData.user.login}'s City</h1>
                </div>
                <p className="text-xs text-slate-400 font-mono">Based on your contributors and followers • <span className="text-brand-cyan">{totalCitizens.toLocaleString()} active citizens</span></p>
                
                {/* Metrics Pill Badges */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">{totalContributors.toLocaleString()} Core Contributors</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-white/10">{totalFollowers.toLocaleString()} Followers</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-white/5">Avg. Activity 14d</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Bar & Search */}
            <div className="px-5 py-3 border-b border-white/5 bg-[#090e18]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Segmented Buttons */}
              <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-white/5 rounded-xl w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all ${activeTab === 'all' ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-sm' : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
                >
                  All Citizens <span className="font-mono text-[10px] opacity-80">({totalCitizens})</span>
                </button>
                <button 
                  onClick={() => setActiveTab('contributors')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all ${activeTab === 'contributors' ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-sm' : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
                >
                  Contributors <span className="font-mono text-[10px] opacity-80">({totalContributors})</span>
                </button>
                <button 
                  onClick={() => setActiveTab('followers')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all ${activeTab === 'followers' ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-sm' : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
                >
                  Followers <span className="font-mono text-[10px] opacity-80">({totalFollowers})</span>
                </button>
              </div>

              {/* Search Citizen */}
              <div className="relative w-full sm:w-56 flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                <input 
                  className="w-full bg-slate-900/80 border border-white/10 focus:border-brand-cyan/50 focus:outline-none text-xs text-white placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg font-mono transition-all" 
                  placeholder="Search citizen or repo…" 
                  type="text" 
                />
              </div>
            </div>

            {/* Citizen Cards Grid */}
            <div className="p-5 max-h-[420px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {MOCK_CITIZENS.filter(c => activeTab === 'all' || (activeTab === 'contributors' && c.role.includes('Contributor')) || (activeTab === 'followers' && c.role === 'Follower')).map(citizen => {
                const colorClass = citizen.color === 'brand-cyan' ? 'border-[#4ce0d2]/40 group-hover:text-[#4ce0d2]' : `border-${citizen.color}/40 group-hover:text-${citizen.color}`;
                return (
                  <div key={citizen.id} className={`bg-slate-900/60 hover:bg-slate-800/60 border border-white/5 hover:border-${citizen.color}/40 rounded-xl p-3 flex flex-col items-center text-center transition-all cursor-pointer group shadow-sm`}>
                    <div className="relative mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={citizen.name} className={`w-10 h-10 rounded-full object-cover ring-2 ring-${citizen.color === 'brand-cyan' ? '[#4ce0d2]' : citizen.color}/60`} src={`https://i.pravatar.cc/100?img=${citizen.img}`} />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${citizen.role.includes('Contributor') ? 'bg-emerald-400' : 'bg-slate-500'} ring-2 ring-[#0d131f]`} />
                    </div>
                    <span className={`text-xs font-semibold text-white tracking-tight ${colorClass} transition-colors`}>{citizen.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{citizen.handle}</span>
                    
                    {citizen.role.includes('Contributor') ? (
                      <span className={`mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-medium ${citizen.color === 'brand-cyan' ? 'bg-[#4ce0d2]/15 text-[#4ce0d2] border-[#4ce0d2]/30' : `bg-${citizen.color}/15 text-${citizen.color} border-${citizen.color}/30`} border`}>
                        {citizen.role}
                      </span>
                    ) : (
                      <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-medium bg-slate-800 text-slate-300 border border-white/10">
                        {citizen.role}
                      </span>
                    )}
                    
                    <span className="mt-2 text-[10px] font-mono text-slate-400">{citizen.stats}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#090e18]/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Citizens bring lighting and vitality to your skyscrapers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Showing {MOCK_CITIZENS.length} of {totalCitizens}</span>
                <button className="px-3 py-1.5 rounded-lg bg-brand-cyan/15 hover:bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/30 text-xs font-medium transition-all active:scale-95">
                  View All Citizens
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
