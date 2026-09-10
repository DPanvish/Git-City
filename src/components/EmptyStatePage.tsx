'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Compass, 
  Terminal, 
  User, 
  Shield, 
  Grid, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  Layers, 
  Users 
} from 'lucide-react';
import { UserProfile } from '@/data/types';
import { signIn } from 'next-auth/react';

interface EmptyStatePageProps {
  user: UserProfile;
}

export default function EmptyStatePage({ user }: EmptyStatePageProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastScanTime, setLastScanTime] = useState('Just now (Cache fresh)');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastScanTime(`${timeString} (No new repositories detected)`);
    }, 900);
  };

  return (
    <div className="bg-[#0d131f] text-slate-200 font-sans min-h-screen antialiased selection:bg-[#4ce0d2]/30 selection:text-[#4ce0d2]">
      {/* Dynamic Atmospheric Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[540px] bg-gradient-to-b from-[#6ffdee]/10 via-[#4ce0d2]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#70d8ff]/5 blur-3xl pointer-events-none rounded-full"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d131f]/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] border-b border-[#1a202c]">
        <div className="h-14 w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-[#242a37] flex items-center justify-center text-[#4ce0d2] shadow-[0_0_12px_rgba(76,224,210,0.25)] transition-all group-hover:shadow-[0_0_16px_rgba(76,224,210,0.5)]">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#6ffdee] flex items-center drop-shadow-[0_0_8px_rgba(111,253,238,0.4)]">GIT CITY</span>
              </div>
            </Link>
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080e1a]/80 border border-[#1a202c]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ce0d2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ce0d2]"></span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest">STATUS: GRID ONLINE // V1.0</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="px-3 py-1 bg-[#4ce0d2]/10 text-[#4ce0d2] font-semibold rounded-lg text-sm border border-[#4ce0d2]/20">Overview</Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Districts</Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Architecture</Link>
            <Link href="/" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Telemetry Docs</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#161c28] text-[#4ce0d2] text-xs font-mono hover:bg-[#242a37] hover:text-white transition-all shadow-[0_0_12px_rgba(76,224,210,0.12)] border border-[#2f3542]">
              <Compass className="w-4 h-4" />
              Explore Demo
            </Link>
            <button onClick={() => signIn("github")} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#6ffdee]/10 text-[#6ffdee] text-sm font-semibold hover:bg-[#6ffdee]/20 transition-all border border-[#6ffdee]/30 shadow-[0_0_16px_rgba(76,224,210,0.2)]">
              <Terminal className="w-4 h-4" />
              Sign in with GitHub
            </button>
            <div className="w-8 h-8 rounded-full border-2 border-[#4ce0d2] bg-[#080e1a] flex items-center justify-center overflow-hidden">
              <img src={user.avatarUrl || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-14 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative z-10 px-6">
        
        {/* Secondary Top Status Sub-deck */}
        <div className="w-full max-w-5xl px-6 py-3 flex flex-wrap items-center justify-between gap-3 bg-[#080e1a]/60 backdrop-blur-md rounded-2xl border border-[#1a202c] shadow-lg mb-8 mt-4">
          <div className="flex items-center gap-3 border-r border-[#2f3542] pr-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#242a37] text-[#6ffdee] border border-[#2f3542]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ffdee] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ffdee]"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest font-bold">FOUNDATION TELEMETRY</span>
            </div>
            <span className="text-xs font-mono text-slate-400">SECTOR 00 // METROPOLIS GENESIS</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#161c28] text-slate-300 border border-[#2f3542]">
              <Shield className="w-3.5 h-3.5 text-[#4ce0d2]" />
              <span className="text-xs font-mono text-slate-400">READ-ONLY OAUTH :: CONNECTED</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>ACCOUNT:</span>
              <span className="text-[#6ffdee] font-medium tracking-wide">@{user.login}</span>
            </div>
          </div>
        </div>

        {/* Central Stage Card */}
        <div className="w-full max-w-4xl relative rounded-2xl bg-[#161c28]/70 backdrop-blur-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-[#2f3542]">
          
          {/* Top Decorative Corner Badges */}
          <div className="absolute top-4 left-5 flex items-center gap-1.5 text-slate-500 text-[10px] font-mono font-bold">
            <Grid className="w-3.5 h-3.5" />
            <span>GRID POS [000.00 : 000.00]</span>
          </div>
          <div className="absolute top-4 right-5 flex items-center gap-1.5 text-[#6ffdee]/70 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ffdee] animate-pulse"></span>
            <span>SCANNER ONLINE</span>
          </div>

          {/* Construction Illustration Box with Layered Radial Halos */}
          <div className="relative w-full max-w-md h-72 flex items-center justify-center my-4">
            <div className="absolute inset-0 bg-gradient-to-t from-[#6ffdee]/15 via-[#4ce0d2]/5 to-transparent rounded-full blur-2xl"></div>
            
            {/* Custom Tactical Isometric Construction SVG */}
            <svg className="w-full h-full relative z-10 drop-shadow-[0_0_24px_rgba(76,224,210,0.2)]" fill="none" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
              <circle className="animate-pulse" cx="80" cy="90" fill="#6ffdee" opacity="0.6" r="1.5"></circle>
              <circle className="animate-pulse" cx="120" cy="50" fill="#70d8ff" opacity="0.8" r="2"></circle>
              <circle cx="360" cy="70" fill="#4ce0d2" opacity="0.7" r="1.5"></circle>
              <circle className="animate-pulse" cx="390" cy="110" fill="#6ffdee" opacity="0.5" r="2"></circle>
              <circle cx="230" cy="40" fill="#6ffdee" opacity="0.9" r="2.5"></circle>
              
              <path d="M230 35 L230 45 M225 40 L235 40" opacity="0.7" stroke="#6ffdee" strokeWidth="0.8"></path>
              <path d="M370 65 L370 75 M365 70 L375 70" opacity="0.6" stroke="#70d8ff" strokeWidth="0.7"></path>
              
              {/* Isometric Ground Grid Field */}
              <g opacity="0.35">
                <path d="M70 200 L230 120 L390 200 L230 280 Z" fill="none" stroke="#3c4947" strokeWidth="1"></path>
                <path d="M110 200 L230 140 L350 200 L230 260 Z" stroke="#3c4947" strokeDasharray="3 3" strokeWidth="0.75"></path>
                <path d="M150 200 L230 160 L310 200 L230 240 Z" opacity="0.7" stroke="#4ce0d2" strokeDasharray="2 2" strokeWidth="0.8"></path>
                <line stroke="#3c4947" strokeWidth="0.6" x1="70" x2="230" y1="200" y2="280"></line>
                <line stroke="#3c4947" strokeWidth="0.6" x1="390" x2="230" y1="200" y2="280"></line>
                <line stroke="#3c4947" strokeWidth="0.6" x1="150" x2="310" y1="160" y2="240"></line>
                <line stroke="#3c4947" strokeWidth="0.6" x1="310" x2="150" y1="160" y2="240"></line>
              </g>

              {/* Foundation Platform Slab */}
              <path d="M170 200 L230 170 L290 200 L230 230 Z" fill="#1a202c" stroke="#4ce0d2" strokeWidth="1.5"></path>
              <path d="M170 200 L230 230 L230 240 L170 210 Z" fill="#0d131f" stroke="#4ce0d2" strokeWidth="1"></path>
              <path d="M290 200 L230 230 L230 240 L290 210 Z" fill="#161c28" stroke="#4ce0d2" strokeWidth="1"></path>
              
              <circle cx="230" cy="200" opacity="0.8" r="16" stroke="#4ce0d2" strokeDasharray="2 3" strokeWidth="0.8"></circle>
              <line opacity="0.6" stroke="#6ffdee" strokeWidth="0.8" x1="230" x2="230" y1="180" y2="220"></line>
              <line opacity="0.6" stroke="#6ffdee" strokeWidth="0.8" x1="210" x2="250" y1="200" y2="200"></line>
              
              <path d="M195 188 L195 140 L230 122 L230 170" fill="none" opacity="0.7" stroke="#4ce0d2" strokeDasharray="4 2" strokeWidth="1.2"></path>
              <path d="M265 188 L265 140 L230 122" fill="none" opacity="0.7" stroke="#4ce0d2" strokeDasharray="4 2" strokeWidth="1.2"></path>
              <line opacity="0.5" stroke="#70d8ff" strokeWidth="0.8" x1="195" x2="230" y1="164" y2="146"></line>
              <line opacity="0.5" stroke="#70d8ff" strokeWidth="0.8" x1="265" x2="230" y1="164" y2="146"></line>
              
              <path d="M210 180 L230 170 L250 180 L230 190 Z" fill="#4ce0d2" fillOpacity="0.35" stroke="#6ffdee" strokeWidth="1"></path>
              <path d="M210 180 L230 190 L230 160 L210 150 Z" fill="#006059" fillOpacity="0.6" stroke="#4ce0d2" strokeWidth="0.8"></path>
              <path d="M250 180 L230 190 L230 160 L250 150 Z" fill="#4ce0d2" fillOpacity="0.2" stroke="#6ffdee" strokeWidth="0.8"></path>
              
              <line stroke="#f59e0b" strokeLinecap="round" strokeWidth="2.5" x1="285" x2="285" y1="205" y2="65"></line>
              <line opacity="0.7" stroke="#f59e0b" strokeWidth="1.2" x1="292" x2="292" y1="201" y2="70"></line>
              
              <g opacity="0.8" stroke="#f59e0b" strokeWidth="0.8">
                <line x1="285" x2="292" y1="180" y2="170"></line>
                <line x1="285" x2="292" y1="170" y2="180"></line>
                <line x1="285" x2="292" y1="150" y2="140"></line>
                <line x1="285" x2="292" y1="140" y2="150"></line>
                <line x1="285" x2="292" y1="120" y2="110"></line>
                <line x1="285" x2="292" y1="110" y2="120"></line>
                <line x1="285" x2="292" y1="90" y2="80"></line>
                <line x1="285" x2="292" y1="80" y2="90"></line>
              </g>
              
              <rect fill="#242a37" height="12" rx="2" stroke="#f59e0b" strokeWidth="1" width="16" x="280" y="65"></rect>
              <circle cx="288" cy="71" fill="#6ffdee" r="2.5"></circle>
              <line stroke="#f59e0b" strokeWidth="2" x1="330" x2="215" y1="55" y2="55"></line>
              <line stroke="#f59e0b" strokeWidth="1.5" x1="285" x2="285" y1="42" y2="65"></line>
              
              <line stroke="#bdc7df" strokeWidth="0.8" x1="285" x2="325" y1="42" y2="55"></line>
              <line stroke="#bdc7df" strokeWidth="0.8" x1="285" x2="225" y1="42" y2="55"></line>
              <rect fill="#3d475b" height="10" rx="1" stroke="#f59e0b" strokeWidth="0.8" width="16" x="315" y="50"></rect>
              <rect fill="#6ffdee" height="4" rx="1" width="8" x="232" y="54"></rect>
              <line stroke="#6ffdee" strokeDasharray="2 1" strokeWidth="1" x1="236" x2="236" y1="58" y2="120"></line>
              
              <g>
                <path d="M231 122 L236 119 L241 122 L236 125 Z" fill="#6ffdee" stroke="#ffffff" strokeWidth="0.6"></path>
                <path d="M231 122 L236 125 L236 131 L231 128 Z" fill="#4ce0d2" stroke="#6ffdee" strokeWidth="0.5"></path>
                <path d="M241 122 L236 125 L236 131 L241 128 Z" fill="#006059" stroke="#6ffdee" strokeWidth="0.5"></path>
                <ellipse cx="236" cy="142" fill="none" opacity="0.6" rx="8" ry="4" stroke="#4ce0d2" strokeWidth="0.8"></ellipse>
                <ellipse cx="236" cy="150" fill="none" opacity="0.4" rx="13" ry="6" stroke="#4ce0d2" strokeDasharray="2 2" strokeWidth="0.5"></ellipse>
              </g>
              
              <line stroke="#bdc7df" strokeWidth="1" x1="175" x2="175" y1="195" y2="160"></line>
              <circle className="animate-ping" cx="175" cy="158" fill="#6ffdee" opacity="0.75" r="3"></circle>
              <circle cx="175" cy="158" fill="#6ffdee" r="2"></circle>
              <path d="M171 164 L175 160 L179 164" stroke="#4ce0d2" strokeWidth="0.8"></path>
              <polygon fill="url(#hologram-grad)" opacity="0.18" points="175,158 150,195 200,195"></polygon>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="hologram-grad" x1="175" x2="175" y1="158" y2="195">
                  <stop stopColor="#4ce0d2" stopOpacity="0.8"></stop>
                  <stop offset="1" stopColor="#4ce0d2" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Foundation Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242a37]/80 text-[#4ce0d2] shadow-sm mb-4 border border-[#2f3542]">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono tracking-wider font-bold">FOUNDATION PHASE // METROPOLIS GENESIS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-xl mb-3">
            Your city is just getting started
          </h1>
          <p className="text-base text-slate-400 max-w-xl mb-8 leading-relaxed">
            Push some commits or make your first repository public — your skyline will grow from this foundation pad.
          </p>

          {/* Primary / Secondary Action Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6ffdee]/10 text-[#6ffdee] border border-[#6ffdee]/40 font-semibold hover:bg-[#6ffdee]/20 transition-all duration-200 shadow-[0_0_24px_rgba(76,224,210,0.2)] hover:shadow-[0_0_32px_rgba(76,224,210,0.4)] transform hover:-translate-y-0.5">
              <span>Go to GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#242a37] text-[#4ce0d2] text-sm font-mono hover:bg-[#2f3542] transition-all shadow-sm border border-[#2f3542] hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? 'rotate-180' : ''}`} />
              <span>{isRefreshing ? 'Probing GitHub API...' : 'Check Repositories'}</span>
            </button>
          </div>

          {/* Micro Status Hint */}
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mb-8">
            <Clock className="w-3.5 h-3.5 text-[#4ce0d2]" />
            <span>Last scanned: {lastScanTime}</span>
          </div>

          {/* Quick Starter Architectural Legend / "How your city builds" mini-cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-6 border-t border-[#2f3542]">
            {/* Card 1: Repositories */}
            <div className="p-4 rounded-xl bg-[#1a202c]/60 hover:bg-[#1a202c] border border-[#2f3542]/50 hover:border-[#2f3542] transition-all flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#4ce0d2]/10 flex items-center justify-center text-[#4ce0d2] group-hover:bg-[#4ce0d2]/20 transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">LAYER 01</span>
              </div>
              <span className="text-sm font-semibold text-white mt-1">Public Repositories</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every public repository materializes as a distinct skyscraper in your metropolis district.
              </p>
            </div>
            
            {/* Card 2: Commits & Branches */}
            <div className="p-4 rounded-xl bg-[#1a202c]/60 hover:bg-[#1a202c] border border-[#2f3542]/50 hover:border-[#2f3542] transition-all flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#70d8ff]/10 flex items-center justify-center text-[#70d8ff] group-hover:bg-[#70d8ff]/20 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">LAYER 02</span>
              </div>
              <span className="text-sm font-semibold text-white mt-1">Commits &amp; Branches</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Activity drives architectural height. Each push adds illuminated vertical floor tiers.
              </p>
            </div>
            
            {/* Card 3: Stars & Contributors */}
            <div className="p-4 rounded-xl bg-[#1a202c]/60 hover:bg-[#1a202c] border border-[#2f3542]/50 hover:border-[#2f3542] transition-all flex flex-col gap-2 group">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#bdc7df]/10 flex items-center justify-center text-[#bdc7df] group-hover:bg-[#bdc7df]/20 transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">LAYER 03</span>
              </div>
              <span className="text-sm font-semibold text-white mt-1">Stars &amp; Contributors</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sparks neon beacon intensity, public plazas, and orbiting contributor drone traffic.
              </p>
            </div>
          </div>
        </div>

        {/* Monospace Telemetry Status Footer Capsule */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 px-6 py-3 rounded-full bg-[#080e1a]/80 border border-[#2f3542] backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#6ffdee] animate-ping"></span>
            <span className="text-xs font-mono text-[#6ffdee] font-medium tracking-wide">
              GIT CITY CLIENT // ZERO REPOSITORIES INDEXED
            </span>
          </div>
          <span className="text-xs font-mono text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            LISTENING TO GITHUB API HOOKS
          </span>
          <span className="text-xs font-mono text-slate-600 hidden sm:inline">•</span>
          <span className="text-[10px] font-mono text-slate-500 hidden md:inline">
            LATENCY: 24ms
          </span>
        </div>

      </main>

      <footer className="w-full bg-[#080e1a] border-t border-[#1a202c] py-6 mt-8">
        <div className="w-full px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">© 2026 GIT CITY LABS // ORBITAL TELEMETRY</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-xs font-mono text-slate-500">SYNCHRONIZING WITH GITHUB API ENGINE</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-mono text-slate-500 hover:text-[#4ce0d2] transition-colors">API PROTOCOL</Link>
            <Link href="/" className="text-xs font-mono text-slate-500 hover:text-[#4ce0d2] transition-colors">COORDINATES</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
