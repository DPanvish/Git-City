'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building } from '@/data/types';
import { Star, GitFork, CircleDot, GitPullRequest, Activity, X, ExternalLink, GitBranch, Copy, Users } from 'lucide-react';

interface RepoInspectorProps {
  repo: Building | null;
  onClose: () => void;
}

export function RepoInspector({ repo, onClose }: RepoInspectorProps) {
  return (
    <AnimatePresence>
      {repo && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#04070e]/50 backdrop-blur-[1.5px] z-20 pointer-events-auto transition-opacity duration-300"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className="fixed top-0 right-0 bottom-0 h-screen w-full sm:w-[440px] z-50 bg-[#0d131f]/95 backdrop-blur-2xl border-l border-brand-cyan/25 shadow-[-16px_0_40px_rgba(0,0,0,0.85)] flex flex-col pointer-events-auto select-auto"
          >
            <div className="sticky top-0 z-10 px-5 pt-4 pb-3.5 bg-[#0d131f]/90 backdrop-blur-xl border-b border-white/10 flex items-start justify-between">
              <div className="flex flex-col pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-[10px] font-mono font-medium text-brand-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span> {repo.material.toUpperCase()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800/90 border border-white/10 text-[10px] font-mono text-slate-400">Public</span>
                  {repo.isPinned && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Flagship
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">{repo.repoName}</h1>
                <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed line-clamp-2">
                  Procedural 3D city generator rendering GitHub telemetry and codebase architecture into an interactive WebGL skyline.
                </p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/10 transition-all active:scale-95" title="Close Drawer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-32">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 flex flex-col items-start justify-center text-left hover:border-amber-400/30 transition-colors group">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400/90 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400/80 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>Stars</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-white mb-2">{repo.stars.toLocaleString()}</span>
                  <div className="w-full px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-400/90 tracking-tight">
                    [↑ Determines Tower Height]
                  </div>
                </div>
                
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 flex flex-col items-start justify-center text-left hover:border-brand-cyan/30 transition-colors group">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-cyan mb-1">
                    <GitPullRequest className="w-3.5 h-3.5 text-brand-cyan group-hover:scale-110 transition-transform" />
                    <span>Open PRs</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-white mb-2">{repo.openPRs}</span>
                  <div className="w-full px-2 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[9px] font-mono text-brand-cyan/90 tracking-tight">
                    [🗼 Determines Roof Spire Height]
                  </div>
                </div>
              </div>

              {/* Glow Battery (Commit Activity) */}
              <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    <Activity className="w-4 h-4 text-brand-cyan" /> Recency & Glow
                  </div>
                  <div className="px-2 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[9px] font-mono text-brand-cyan/90 tracking-tight">
                    [💡 Determines Neon Glow Intensity]
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold font-mono text-white">
                      {repo.lastCommitDaysAgo === 0 ? 'Today' : `${repo.lastCommitDaysAgo}`}
                      {repo.lastCommitDaysAgo !== 0 && <span className="text-xs font-sans font-normal text-slate-400 ml-1">days ago</span>}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Last Commit</span>
                  </div>
                  
                  {/* Battery Bar */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
                    {/* The intensity drops as days go up. Max intensity at 0 days, zero at ~100 days */}
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#4ce0d2] to-[#70d8ff] shadow-neon transition-all duration-1000"
                      style={{ width: `${Math.max(5, 100 - Math.min(100, repo.lastCommitDaysAgo))}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1">
                    <span>Intense Glow</span>
                    <span>Dimmed</span>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="border-t border-white/5 pt-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Contributors
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{repo.contributors} architects</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/30 border border-white/5 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-neon">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold font-mono text-white">{repo.contributors}</span>
                    <span className="text-[10px] font-mono text-slate-500">Registered Contributors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0d131f]/95 backdrop-blur-xl border-t border-white/10 space-y-2">
              <a onClick={() => window.open(repo.url, '_blank')} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-cyan to-teal-400 hover:opacity-95 text-slate-950 font-semibold text-xs font-mono shadow-neon active:scale-[0.98] transition-all cursor-pointer">
                <span>VIEW ON GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />
              </a>
              <div className="flex items-center justify-between text-[11px] font-mono px-1">
                <button className="text-slate-400 hover:text-brand-cyan flex items-center gap-1 transition-colors">
                  <GitBranch className="w-3 h-3" />
                  <span>Inspect Skyway</span>
                </button>
                <button className="text-slate-400 hover:text-brand-cyan flex items-center gap-1 transition-colors">
                  <Copy className="w-3 h-3" />
                  <span>Copy clone URL</span>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
