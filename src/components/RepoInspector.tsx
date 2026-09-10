'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building } from '@/data/mockCitySchema';
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
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400/90 mb-1">
                    <Star className="w-3 h-3 fill-amber-400/80 text-amber-400" />
                    <span>Stars</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">{repo.stars.toLocaleString()}</span>
                </div>
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mb-1">
                    <GitFork className="w-3 h-3 text-emerald-400" />
                    <span>Forks</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">{Math.floor(repo.stars * 0.15)}</span>
                </div>
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-purple-400 mb-1">
                    <CircleDot className="w-3 h-3 text-purple-400" />
                    <span>Issues</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">14</span>
                </div>
                <div className="bg-slate-900/80 border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-brand-cyan mb-1">
                    <GitPullRequest className="w-3 h-3 text-brand-cyan" />
                    <span>PRs</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-white">{repo.openPRs}</span>
                </div>
              </div>

              {/* Activity Graph */}
              <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-cyan" /> Activity
                  </span>
                  <span className="text-[10px] font-mono text-brand-cyan/80">Last commit: {repo.lastCommitDaysAgo === 0 ? 'Today' : `${repo.lastCommitDaysAgo} days ago`}</span>
                </div>
                <div className="relative flex items-end justify-between gap-1.5 h-32 pt-10 px-1">
                  {[35, 50, 65, 40, 75, 45, 90, 100, 80, 55, 85, 65].map((h, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-1 h-full justify-end relative">
                      {i === 7 && (
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center whitespace-nowrap">
                          <div className="px-2.5 py-1 rounded-lg bg-[#0d131f]/95 border border-brand-cyan/50 backdrop-blur-md shadow-hud shadow-neon text-[10px] font-mono flex items-center gap-1.5 text-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                            <span className="text-white font-semibold">Peak:</span>
                            <span className="text-brand-cyan font-bold">38 commits</span>
                          </div>
                          <div className="w-2 h-1 border-t-4 border-t-brand-cyan/60 border-x-4 border-x-transparent"></div>
                        </div>
                      )}
                      <div className={`w-full hover:bg-brand-cyan rounded-t transition-all ${i === 7 ? 'bg-brand-cyan shadow-neon ring-2 ring-brand-cyan/60' : 'bg-brand-cyan/40'}`} style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5 text-[10px] font-mono text-slate-400">
                  <span>3 months ago</span>
                  <span className="text-brand-cyan font-medium">+38 commits this month</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Pull Requests */}
              <div className="border-t border-white/5 pt-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <GitPullRequest className="w-3.5 h-3.5 text-brand-cyan" /> Open Pull Requests
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">{repo.openPRs} active</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/5 hover:border-brand-cyan/30 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="alex-chen" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20" src="https://i.pravatar.cc/100?img=11" />
                        <span className="text-[11px] font-mono text-slate-400">@alex-chen</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Open</span>
                        <span className="text-[10px] font-mono text-slate-500">3h ago</span>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-200 mt-1.5 leading-snug hover:text-brand-cyan cursor-pointer transition-colors">feat: WebGL shader atmospheric fog bloom</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                      <span className="text-brand-cyan">#284</span>
                      <span>•</span>
                      <span>+420 / -38</span>
                    </div>
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
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2 overflow-hidden py-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img key={i} alt={`architect ${i}`} className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d131f] object-cover" src={`https://i.pravatar.cc/100?img=${i + 20}`} />
                    ))}
                  </div>
                  <div className="px-2.5 py-1.5 rounded-full bg-slate-800/90 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white cursor-pointer transition-colors">
                    +{Math.max(0, repo.contributors - 5)} more
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
