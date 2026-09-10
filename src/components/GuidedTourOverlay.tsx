'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { CitySchema } from '@/data/mockCitySchema';

interface GuidedTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cityData: CitySchema;
}

const TOUR_STOPS = [
  { id: 1, title: 'Oldest Repo', subtitle: 'Oct 2018', commit: '#e4f901a', text: '“This is where it all started — your first commit, 6 years ago.”' },
  { id: 2, title: 'Most Active', subtitle: '1,420 commits', commit: '#8f2a99c', text: '“The beating heart of your metropolis. Constant activity and soaring structures.”' },
  { id: 3, title: 'Most Starred', subtitle: '1.8k stars', commit: '#1a4f00b', text: '“Your flagship landmark. Recognized across the ecosystem.”' },
  { id: 4, title: 'Current Streak', subtitle: '28 days 🔥', commit: '#c0ffee1', text: '“The momentum continues. Building day by day, block by block.”' },
];

export function GuidedTourOverlay({ isOpen, onClose, cityData }: GuidedTourOverlayProps) {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
      else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setCurrentStop(s => Math.min(TOUR_STOPS.length - 1, s + 1));
      }
      else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setCurrentStop(s => Math.max(0, s - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeStop = TOUR_STOPS[currentStop];
  const progressPercent = (currentStop / (TOUR_STOPS.length - 1)) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between overflow-hidden">
          {/* Cinematic Letterbox Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-between"
          >
            <div className="h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,9,16,0.85)_100%)]" />
            <div className="h-44 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
          </motion.div>

          {/* Focal Hologram Beacon Pin (Simulated at screen center) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center animate-float-slow"
          >
            <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0d131f]/90 border border-brand-cyan/60 shadow-neon backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan"></span>
              </span>
              <div className="flex items-center space-x-1.5 font-mono text-xs tracking-wide">
                <span className="text-amber-400 font-bold">★</span>
                <span className="font-bold text-white tracking-wider">dotfiles-archive</span>
                <span className="text-slate-500">•</span>
                <span className="text-brand-cyan/90">Founded Oct 2018</span>
              </div>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-brand-cyan/20 text-cyan-300 rounded border border-brand-cyan/30">
                Milestone
              </span>
            </div>
            <div className="w-[2px] h-10 bg-gradient-to-b from-brand-cyan to-transparent opacity-80" />
            <div className="w-7 h-2 rounded-full border border-brand-cyan animate-pulse-slow -mt-1 shadow-neon" />
          </motion.div>

          {/* Top Chrome */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="relative z-40 w-full px-8 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto"
          >
            <div className="flex items-center space-x-3.5 bg-[#0d131f]/85 border border-brand-cyan/30 px-4 py-2.5 rounded-full backdrop-blur-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan animate-pulse" />
                <span className="font-mono text-xs tracking-wider text-cyan-300 font-bold uppercase hidden sm:inline">
                  Guided Tour <span className="text-slate-500 mx-1">//</span> Episode 01: The Origin
                </span>
                <span className="font-mono text-xs tracking-wider text-cyan-300 font-bold uppercase sm:hidden">
                  Guided Tour
                </span>
              </div>
              <div className="h-3 w-[1px] bg-slate-700" />
              <span className="font-mono text-xs text-slate-400 font-medium tracking-tight">
                01:24 <span className="text-slate-600">/</span> 04:30
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentStop(s => Math.max(0, s - 1))}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#0d131f]/80 border border-slate-700/80 text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-slate-800/80 transition-all backdrop-blur-md active:scale-95" 
                title="Previous milestone [A]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsPlaying(p => !p)}
                className="h-10 px-4 flex items-center space-x-2 rounded-xl bg-[#082a30]/60 border border-brand-cyan/60 text-brand-cyan hover:bg-[#082a30]/80 hover:shadow-neon transition-all backdrop-blur-md active:scale-95" 
                title="Pause tour [Space]"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-brand-cyan" /> : <Play className="w-4 h-4 fill-brand-cyan" />}
                <span className="font-mono text-xs font-semibold tracking-wider uppercase hidden sm:inline">Auto-Nav</span>
              </button>
              
              <button 
                onClick={() => setCurrentStop(s => Math.min(TOUR_STOPS.length - 1, s + 1))}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#0d131f]/80 border border-slate-700/80 text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-slate-800/80 transition-all backdrop-blur-md active:scale-95" 
                title="Next milestone [D]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={onClose}
                className="h-10 px-4 flex items-center space-x-2 rounded-xl bg-[#0d131f]/80 border border-red-500/30 text-slate-300 hover:text-red-300 hover:border-red-400/60 hover:bg-red-950/30 transition-all backdrop-blur-md ml-1 active:scale-95" 
                title="Exit tour [ESC]"
              >
                <X className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs font-semibold tracking-wider uppercase hidden sm:inline">Exit Tour</span>
                <span className="text-[10px] px-1.5 py-0.5 font-mono bg-slate-800/90 text-slate-400 rounded border border-slate-700">ESC</span>
              </button>
            </div>
          </motion.header>

          {/* Bottom Narrative Panel */}
          <motion.main 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative z-40 w-full pb-8 px-6 pointer-events-auto"
          >
            <div className="max-w-4xl mx-auto rounded-2xl bg-[#0d131f]/90 border border-brand-cyan/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
              
              <div className="text-center mb-1.5">
                <motion.span 
                  key={`subtitle-${currentStop}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-cyan/90 font-bold block"
                >
                  Stop {currentStop + 1} of {TOUR_STOPS.length} — The Genesis Foundation <span className="text-slate-600">//</span> @{cityData.user.login}
                </motion.span>
              </div>

              <div className="text-center mb-6">
                <motion.h1 
                  key={`title-${currentStop}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xl md:text-3xl font-medium tracking-tight text-white/95 leading-snug drop-shadow-md min-h-[80px] md:min-h-0 flex items-center justify-center"
                >
                  {activeStop.text}
                </motion.h1>
                <p className="text-slate-400 text-xs mt-1 font-mono">
                  Camera anchored at Sector 01 • Coordinates: 37°N 122°W • Commit ID: <span className="text-brand-cyan/80">{activeStop.commit}</span>
                </p>
              </div>

              {/* Scrubber Progress Bar Track */}
              <div className="relative w-full px-6 py-4">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-slate-800 rounded-full" />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-cyan-400 to-brand-cyan shadow-neon rounded-full"
                />
                
                <div className="relative flex justify-between items-center w-full z-10">
                  {TOUR_STOPS.map((stop, index) => {
                    const isActive = index === currentStop;
                    const isPast = index < currentStop;
                    return (
                      <button 
                        key={stop.id}
                        onClick={() => setCurrentStop(index)}
                        className="group flex flex-col items-center text-left focus:outline-none cursor-pointer"
                      >
                        {isActive ? (
                          <div className="relative flex items-center justify-center">
                            <span className="absolute w-7 h-7 rounded-full bg-brand-cyan/20 animate-ping opacity-60" />
                            <div className="w-4 h-4 rounded-full bg-brand-cyan border-2 border-white shadow-neon flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#080e1a]" />
                            </div>
                          </div>
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${isPast ? 'bg-brand-cyan border-brand-cyan shadow-neon' : 'bg-slate-800 border-slate-600 group-hover:border-brand-cyan/70 group-hover:bg-slate-700'}`} />
                        )}
                        <div className={`mt-2 text-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                          <span className={`block font-mono text-xs ${isActive ? 'font-bold text-brand-cyan tracking-wide' : 'font-medium text-slate-300'}`}>{stop.title}</span>
                          <span className={`block text-[10px] font-mono ${isActive ? 'text-cyan-200/70' : 'text-slate-500'}`}>{stop.subtitle}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Status Row */}
              <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-brand-cyan font-semibold">0:45</span>
                    <span className="text-slate-600">/</span>
                    <span>3:20</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <button className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-brand-cyan/40 transition-colors">
                    1.0x
                  </button>
                </div>
                
                <div className="hidden sm:flex items-center space-x-3 text-[11px] text-slate-500">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">←</kbd> Prev [A]</span>
                  <span>•</span>
                  <span><kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Space</kbd> Pause</span>
                  <span>•</span>
                  <span>Next [D] <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">→</kbd></span>
                </div>
              </div>
            </div>
          </motion.main>
        </div>
      )}
    </AnimatePresence>
  );
}
