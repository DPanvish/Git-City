import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CornerUpLeft, Download, Link as LinkIcon, Lock, Layers } from 'lucide-react';
import { CitySchema } from '@/data/mockCitySchema';

interface ExportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityData: CitySchema;
}

export function ExportShareModal({ isOpen, onClose, cityData }: ExportShareModalProps) {
  const [includeStats, setIncludeStats] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allBuildings = cityData.districts.flatMap(d => d.buildings);
  const totalRepos = allBuildings.length;
  const totalStars = allBuildings.reduce((acc, b) => acc + b.stars, 0);
  const streakDays = cityData.ambient.streakDays;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#080e1a] text-slate-200 font-sans flex flex-col justify-between antialiased selection:bg-teal-500/30 selection:text-teal-200"
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundSize: '40px 40px',
              backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
            }}
          />

          {/* Atmospheric Backdrop Light Elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-brand-cyan/5 blur-[140px] rounded-full"></div>
          </div>

          {/* Top Global Bar */}
          <header className="relative z-10 w-full border-b border-slate-800/80 bg-[#0d131f]/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-100 hover:text-teal-300 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm tracking-wider uppercase">Git City</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold">v1.2</span>
              </div>
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Snapshot Export Chamber</span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors">
                <CornerUpLeft className="w-3.5 h-3.5" />
                <span>Return to 3D Canvas</span>
              </button>
            </div>
          </header>

          {/* Main Center Card Container */}
          <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-[560px] bg-[#0d131f]/95 border border-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_25px_-5px_rgba(76,224,210,0.25)]"
            >
              
              {/* Top Subtle Edge Highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"></div>

              {/* Header & Breadcrumb */}
              <div className="mb-5">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-medium">Export Protocol // Raytrace Render</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">RES: 1920x1080 (HD)</span>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Export City Snapshot
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">Generate a high-fidelity rendering of your GitHub metropolis to share with peers.</p>
              </div>

              {/* Settings Row: Stats Overlay Toggle */}
              <div className="flex items-center justify-between py-2.5 px-3 mb-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <Layers className="w-3 h-3" />
                  </div>
                  <div>
                    <label htmlFor="stats-toggle" className="text-xs font-medium text-slate-200 cursor-pointer block">Include stats overlay in export</label>
                    <span className="text-[10px] text-slate-500 block">Embeds repo count, total stars, and activity streak in bottom card</span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="stats-toggle" checked={includeStats} onChange={(e) => setIncludeStats(e.target.checked)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-200 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500 peer-checked:after:bg-[#080e1a]"></div>
                </label>
              </div>

              {/* Preview Card Frame */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-[#080e1a] shadow-[inset_0_0_40px_rgba(0,0,0,0.75),0_12px_30px_-10px_rgba(0,0,0,0.8)] mb-5 group">
                
                {/* Snapshot Top Bar */}
                <div className="bg-[#0b101b] px-3 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    </div>
                    <span className="text-slate-300 font-semibold ml-1">City Snapshot Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400 text-[10px] bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20 font-medium">@{cityData.user.login}</span>
                    <span className="text-slate-500">sector_01.png</span>
                  </div>
                </div>

                {/* Visual Canvas Preview Area */}
                <div className="relative w-full aspect-[16/10] bg-[#070c16] flex items-center justify-center overflow-hidden">
                  
                  {/* Isometric Grid Floor Visual */}
                  <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="city-iso-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 0 10 L 20 0 L 40 10 L 20 20 Z" fill="none" stroke="rgba(76, 224, 210, 0.12)" strokeWidth="0.8"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#city-iso-grid)" />
                  </svg>

                  {/* Volumetric Ambient Spotlight Rays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070c16] via-transparent to-teal-500/10 pointer-events-none"></div>

                  {/* Stylized Isometric 3D City Buildings (Vectorized wireframe matching Git City theme) */}
                  <svg className="relative z-10 w-4/5 h-4/5 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Secondary Buildings */}
                    <g opacity="0.45">
                      {/* Far Left Building */}
                      <polygon points="50,110 80,95 80,185 50,200" fill="#0c1829" stroke="#254a68" strokeWidth="1"/>
                      <polygon points="80,95 110,110 110,200 80,185" fill="#10233b" stroke="#254a68" strokeWidth="1"/>
                      <polygon points="50,110 80,95 110,110 80,125" fill="#183659" stroke="#386b94" strokeWidth="1"/>
                      {/* Yellow/Cyan windows */}
                      <circle cx="65" cy="130" r="1.8" fill="#4ce0d2"/>
                      <circle cx="65" cy="148" r="1.8" fill="#fbbf24"/>
                      <circle cx="95" cy="135" r="1.8" fill="#4ce0d2"/>
                    </g>

                    <g opacity="0.55">
                      {/* Far Right Building */}
                      <polygon points="260,95 290,80 290,175 260,190" fill="#0d1c30" stroke="#244d6e" strokeWidth="1"/>
                      <polygon points="290,80 320,95 320,190 290,175" fill="#132a47" stroke="#244d6e" strokeWidth="1"/>
                      <polygon points="260,95 290,80 320,95 290,110" fill="#1a3d66" stroke="#3b729e" strokeWidth="1"/>
                      {/* Windows */}
                      <circle cx="275" cy="115" r="1.8" fill="#a855f7"/>
                      <circle cx="305" cy="120" r="1.8" fill="#4ce0d2"/>
                      <circle cx="305" cy="140" r="1.8" fill="#38bdf8"/>
                    </g>

                    {/* Midground Buildings */}
                    <g>
                      {/* Medium Left Tower */}
                      <polygon points="100,85 135,68 135,190 100,207" fill="#0a192b" stroke="#1cb3a6" strokeWidth="1.2"/>
                      <polygon points="135,68 170,85 170,207 135,190" fill="#0f243d" stroke="#1cb3a6" strokeWidth="1.2"/>
                      <polygon points="100,85 135,68 170,85 135,102" fill="#153654" stroke="#4ce0d2" strokeWidth="1.2"/>
                      {/* Glowing neon grid windows */}
                      <rect x="112" y="105" width="4" height="6" rx="1" fill="#4ce0d2" opacity="0.9"/>
                      <rect x="122" y="125" width="4" height="6" rx="1" fill="#fbbf24" opacity="0.9"/>
                      <rect x="112" y="145" width="4" height="6" rx="1" fill="#c084fc" opacity="0.9"/>
                      <rect x="145" y="112" width="4" height="6" rx="1" fill="#4ce0d2" opacity="0.9"/>
                      <rect x="155" y="132" width="4" height="6" rx="1" fill="#38bdf8" opacity="0.9"/>
                    </g>

                    {/* Central Flagship Skyscraper (git-city-core) */}
                    <g>
                      {/* Ambient Skyway Beam */}
                      <path d="M 180 20 L 180 180" stroke="url(#cyan-beam)" strokeWidth="2" strokeDasharray="3 3"/>
                      
                      {/* Top spire & milestone ring */}
                      <ellipse cx="180" cy="30" rx="16" ry="5" fill="none" stroke="#4ce0d2" strokeWidth="1.5"/>
                      <line x1="180" y1="20" x2="180" y2="42" stroke="#4ce0d2" strokeWidth="2"/>
                      <circle cx="180" cy="20" r="3" fill="#4ce0d2" filter="drop-shadow(0 0 4px #4ce0d2)"/>

                      {/* Main Monolith Prism */}
                      <polygon points="140,55 180,35 180,195 140,215" fill="#0b1a2c" stroke="#4ce0d2" strokeWidth="1.8"/>
                      <polygon points="180,35 220,55 220,215 180,195" fill="#10253f" stroke="#4ce0d2" strokeWidth="1.8"/>
                      <polygon points="140,55 180,35 220,55 180,75" fill="#1b4163" stroke="#5eead4" strokeWidth="1.8"/>

                      {/* Radiant Window Blocks */}
                      <rect x="152" y="78" width="5" height="7" rx="1" fill="#4ce0d2" />
                      <rect x="164" y="90" width="5" height="7" rx="1" fill="#facc15" />
                      <rect x="152" y="108" width="5" height="7" rx="1" fill="#c084fc" />
                      <rect x="164" y="125" width="5" height="7" rx="1" fill="#4ce0d2" />
                      <rect x="152" y="145" width="5" height="7" rx="1" fill="#38bdf8" />
                      <rect x="164" y="162" width="5" height="7" rx="1" fill="#4ce0d2" />

                      <rect x="192" y="78" width="5" height="7" rx="1" fill="#38bdf8" />
                      <rect x="204" y="94" width="5" height="7" rx="1" fill="#4ce0d2" />
                      <rect x="192" y="115" width="5" height="7" rx="1" fill="#fbbf24" />
                      <rect x="204" y="135" width="5" height="7" rx="1" fill="#c084fc" />
                      <rect x="192" y="155" width="5" height="7" rx="1" fill="#4ce0d2" />
                    </g>

                    {/* Holographic Building Label */}
                    <g>
                      <rect x="135" y="6" width="90" height="15" rx="3" fill="#0d131f" stroke="#4ce0d2" strokeWidth="1" opacity="0.95"/>
                      <circle cx="143" cy="13.5" r="2" fill="#4ce0d2"/>
                      <text x="150" y="17" fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="bold">git-city-core</text>
                    </g>

                    <defs>
                      <linearGradient id="cyan-beam" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4ce0d2" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#4ce0d2" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Watermark / HUD Overlay (Toggled) */}
                  <AnimatePresence>
                    {includeStats && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0d131f]/90 border border-teal-500/30 rounded-lg px-3 py-2 backdrop-blur-md z-20"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-[10px] font-bold">GC</div>
                          <div>
                            <div className="text-[11px] font-bold text-white leading-none">@{cityData.user.login}’s Metropolis</div>
                            <div className="text-[9px] font-mono text-teal-400 mt-0.5">gitcity.internal/@{cityData.user.login}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono">
                          <div className="text-right">
                            <span className="text-slate-400">REPOS</span>
                            <span className="text-teal-300 font-bold ml-1">{totalRepos}</span>
                          </div>
                          <div className="w-px h-4 bg-slate-700"></div>
                          <div className="text-right">
                            <span className="text-slate-400">STARS</span>
                            <span className="text-amber-300 font-bold ml-1">{totalStars.toLocaleString()}</span>
                          </div>
                          <div className="w-px h-4 bg-slate-700"></div>
                          <div className="text-right">
                            <span className="text-slate-400">STREAK</span>
                            <span className="text-orange-400 font-bold ml-1">{streakDays}d 🔥</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Live Snapshot Corner Badge */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-slate-700/80 backdrop-blur-md text-[9px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    LIVE 3D VIEWPORT
                  </div>
                </div>

                {/* Preview Meta Sub-bar */}
                <div className="bg-[#0b101b]/90 px-3 py-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Camera: 45° Isometric Orbit</span>
                  <span>Format: PNG 24-bit with alpha</span>
                </div>
              </div>

              {/* Export Options Row: 4 Icon Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* Option 1: Download Image (Primary) */}
                <button type="button" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 hover:border-teal-400 transition-all text-center">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-teal-200">Download Image</span>
                  <span className="text-[9px] font-mono text-teal-400/80 mt-0.5">PNG (2.4 MB)</span>
                </button>

                {/* Option 2: Copy Link */}
                <button type="button" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all text-center">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Copy Link</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Direct 3D URL</span>
                </button>

                {/* Option 3: Share to X */}
                <button type="button" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all text-center">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    {/* X / Twitter SVG glyph */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Share to X</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Tweet Card</span>
                </button>

                {/* Option 4: Share to LinkedIn */}
                <button type="button" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all text-center">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    {/* LinkedIn SVG glyph */}
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63s1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Share to LinkedIn</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">Post to Feed</span>
                </button>

              </div>

              {/* Bottom Minimal Status Note */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-teal-400" />
                  Public read-only link • No write access required
                </span>
                <button onClick={onClose} type="button" className="text-slate-400 hover:text-slate-200 transition-colors">
                  Dismiss [Esc]
                </button>
              </div>

            </motion.div>
          </main>

          {/* Global Footer Note */}
          <footer className="relative z-10 py-3 text-center border-t border-slate-900 bg-[#080e1a]/80 text-[11px] font-mono text-slate-500">
            <span>GIT CITY CLIENT BUILD // v1.2.4-STABLE • SECTOR SNAPSHOT PIPELINE</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
