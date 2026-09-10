'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Play, Share2, Settings, BarChart3, Layers, TrendingUp, SunMedium, Users, Trees, Search, Orbit, Moon, Expand } from 'lucide-react';
import { CitySchema } from '@/data/mockCitySchema';

interface HUDOverlayProps {
  cityData: CitySchema;
  onResetCamera?: () => void;
  onToggleDayNight?: () => void;
  onOpenCitizens?: () => void;
  onStartTour?: () => void;
  onOpenExport?: () => void;
}

export function HUDOverlay({ cityData, onResetCamera, onToggleDayNight, onOpenCitizens, onStartTour, onOpenExport }: HUDOverlayProps) {
  const allBuildings = cityData.districts.flatMap(d => d.buildings);
  const totalRepos = allBuildings.length;
  const totalStars = allBuildings.reduce((acc, b) => acc + b.stars, 0);
  const totalFollowers = cityData.user.followers;

  return (
    <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-between pointer-events-none p-3.5 sm:p-4">
      {/* ------------------------------------------------------------- */}
      {/* TOP BAR (FLOATING GLASSMORPHIC ~64px TALL)                    */}
      {/* ------------------------------------------------------------- */}
      <header className="w-full h-16 pointer-events-auto border border-white/10 rounded-2xl px-5 shadow-hud flex items-center justify-between transition-all backdrop-blur-2xl">
        {/* Left: Logo & Status Badge */}
        <div className="flex items-center gap-3.5">
          <a className="flex items-center gap-2.5 group" href="#">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-blue-600/20 border border-brand-cyan/50 flex items-center justify-center text-brand-cyan shadow-neon group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                GIT CITY
                <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">v1.2</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider mt-0.5 uppercase">Metropolis View</span>
            </div>
          </a>
          {/* District Chip */}
          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-mono text-slate-300">SECTOR // <span className="text-brand-cyan font-semibold">CORE_GRID</span></span>
          </div>
        </div>
        
        {/* Center: GitHub Account / Avatar Pill */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-inner bg-slate-900/60">
          <div className="relative">
            <img alt="User Avatar" className="w-8 h-8 rounded-lg object-cover ring-1.5 ring-brand-cyan/60" src={cityData.user.avatarUrl || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-cyan ring-2 ring-[#0d131f]"></span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white tracking-tight">@{cityData.user.login}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-slate-400">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 leading-none">Octocat Tier • Verified</span>
          </div>
        </div>
        
        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={onStartTour} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 text-xs font-medium transition-all active:scale-95 shadow-sm">
            <Play className="w-3.5 h-3.5 fill-brand-cyan stroke-brand-cyan" />
            <span className="hidden sm:inline">Guided Tour</span>
          </button>
          <button onClick={onOpenExport} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 text-xs font-medium transition-all active:scale-95 hover:border-slate-500">
            <Share2 className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <Link href="/settings" className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/10 transition-all active:scale-95 hover:text-white" title="Settings">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MIDDLE SECTION: LEFT & RIGHT FLOATING PANELS                  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 w-full flex justify-between items-start pt-4 pointer-events-none">
        
        {/* LEFT FLOATING PANEL: CITY STATS */}
        <aside className="w-72 pointer-events-auto border border-white/10 rounded-2xl p-4 shadow-hud flex flex-col gap-3.5 transition-all hover:border-brand-cyan/30 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-cyan" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">City Stats</h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">LIVE DATA</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-900/70 border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-slate-900/90 transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Total Repos</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-mono font-bold text-white tracking-tight">{totalRepos}</span>
                <span className="text-[10px] font-mono text-brand-cyan">bldgs</span>
              </div>
            </div>
            <div className="bg-slate-900/70 border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-slate-900/90 transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Total Stars</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-mono font-bold text-amber-300 tracking-tight">{totalStars.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-amber-400/80">★</span>
              </div>
            </div>
            <div 
              onClick={onOpenCitizens}
              className="bg-slate-900/70 border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-slate-900/90 hover:border-brand-cyan/30 transition-all cursor-pointer"
              title="View Citizens"
            >
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Followers</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-mono font-bold text-purple-300 tracking-tight">{totalFollowers.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-purple-400/80">pop</span>
              </div>
            </div>
            <div className="bg-slate-900/70 border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-slate-900/90 transition-colors">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Streak</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-mono font-bold text-brand-cyan tracking-tight">--</span>
                <span className="text-[10px] font-mono text-brand-cyan">days 🔥</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Skyline Density</span>
            <span className="text-white font-semibold">88.4% High</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-cyan via-blue-500 to-amber-400 h-1.5 rounded-full w-[88%]"></div>
          </div>
        </aside>

        {/* RIGHT FLOATING PANEL: METAPHOR LEGEND */}
        <aside className="w-60 pointer-events-auto border border-white/10 rounded-2xl p-4 shadow-hud flex flex-col gap-3 transition-all hover:border-brand-cyan/30 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-cyan" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legend</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">METAPHOR</span>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-xs font-semibold text-slate-200">Building height</span>
                <span className="text-[11px] font-mono text-amber-400">= Stars</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan flex-shrink-0 shadow-neon">
                <SunMedium className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-xs font-semibold text-slate-200">Window glow</span>
                <span className="text-[11px] font-mono text-brand-cyan">= Recent commits</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-xs font-semibold text-slate-200">Citizens</span>
                <span className="text-[11px] font-mono text-purple-300">= Contributors</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Trees className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-xs font-semibold text-slate-200">Green space</span>
                <span className="text-[11px] font-mono text-emerald-400">= Forked repos</span>
              </div>
            </div>
          </div>
          
          <div className="pt-1 text-[10px] text-slate-400 font-mono text-center">
            Click on any skyscraper to inspect
          </div>
        </aside>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM CONTROLS: CENTER FLOATING PILL-SHAPED BAR              */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full flex items-center justify-center pb-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 pl-3 pr-2 backdrop-blur-2xl border border-white/15 rounded-full shadow-hud hover:border-brand-cyan/40 transition-all max-w-xl w-full sm:w-auto bg-slate-900/60">
          
          <div className="relative flex items-center flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5" />
            <input className="w-full bg-slate-900/80 border border-white/5 focus:border-brand-cyan/50 focus:outline-none text-xs text-white placeholder-slate-400 pl-8 pr-12 py-2 rounded-full font-mono transition-all" placeholder="Find a repo…" type="text" />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">⌘K</kbd>
          </div>
          
          <div className="h-6 w-px bg-white/10 mx-1"></div>
          
          <button onClick={onResetCamera} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-white/5 text-xs font-medium transition-all active:scale-95 group" title="Reset Camera / Orbit View">
            <Orbit className="w-4 h-4 text-brand-cyan group-hover:rotate-45 transition-transform" />
            <span className="hidden md:inline text-xs font-mono">Reset Cam</span>
          </button>
          
          <button onClick={onToggleDayNight} className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 hover:text-amber-200 border border-white/5 transition-all active:scale-95" title="Toggle Day / Night Sky">
            <Moon className="w-4 h-4" />
          </button>
          
          <button className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/5 transition-all active:scale-95" title="Freecam View">
            <Expand className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
