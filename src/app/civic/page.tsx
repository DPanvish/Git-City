import React from 'react';
import Link from 'next/link';
import { 
  Building2, Radio, Zap, TrendingUp, GitMerge, Bug, Users, Network, 
  Search, ChevronDown, SlidersHorizontal, MessageSquare, CheckCircle2, 
  Clock, FileEdit, ShieldCheck, Wand2, History, Plus, RefreshCw 
} from 'lucide-react';

export default function CivicOverviewPage() {
  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans selection:bg-brand-cyan selection:text-slate-900">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d131f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="h-14 w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-slate-800/80 flex items-center justify-center text-brand-cyan shadow-neon transition-all group-hover:scale-105">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-brand-cyan flex items-center gap-1 drop-shadow-neon">
                GIT CITY
              </span>
            </Link>
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">STATUS: GRID ONLINE // V1.0</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="px-3 py-1 bg-brand-cyan text-slate-900 font-bold rounded-lg text-sm">Overview</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Districts</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Architecture</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Telemetry Docs</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-800/60 text-brand-cyan font-mono text-xs hover:bg-slate-700/60 hover:text-white transition-all shadow-sm border border-brand-cyan/20">
              Return to 3D Canvas
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 pb-12 px-6 max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 text-brand-cyan font-mono text-xs border border-white/5">
              <Building2 className="w-4 h-4" />
              <span className="tracking-wider">GIT CITY METROPOLIS</span>
            </div>
            <span className="text-slate-500 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-slate-400 tracking-wider">SECTOR // CIVIC_DISTRICT</span>
            <span className="text-slate-500 font-mono text-xs">/</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/40 text-blue-400 font-mono text-[10px] uppercase border border-blue-500/20">
              METROPOLIS CIVIC REGISTRY
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-lg bg-slate-900/60 border border-white/5">
              <button className="px-4 py-1.5 rounded text-xs bg-brand-cyan/20 text-brand-cyan font-semibold transition-all">Civic Dashboard</button>
              <button className="px-4 py-1.5 rounded text-xs text-slate-400 hover:text-slate-200 transition-colors">Audit Registry</button>
            </div>
          </div>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase">Municipal Central Command</span>
              <span className="font-mono text-xs text-slate-500">NODE::0x4E9A</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              City Hall
              <Building2 className="w-8 h-8 text-brand-cyan" />
            </h1>
            <p className="text-slate-400 text-sm">Everything in motion across your city right now</p>
          </div>
          
          {/* Live Status Pill */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Stream Status</div>
              <div className="text-xs font-mono text-brand-cyan flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                REALTIME SYNCHRONIZED
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Civic Actions" icon={<Zap className="w-4 h-4" />} value="41" 
            subtitle="Active items across 5 core systems" trend="up" colorClass="text-brand-cyan" bgClass="bg-brand-cyan" progress={78} 
          />
          <MetricCard 
            title="Open Pull Requests" icon={<GitMerge className="w-4 h-4" />} value="14 PRs" 
            subtitle={<> <span className="text-brand-cyan font-semibold">8</span> review-ready • <span className="text-blue-400 font-semibold">6</span> in-review </>} 
            colorClass="text-brand-cyan" bgClass="bg-brand-cyan" progress={57} 
          />
          <MetricCard 
            title="Open Issues" icon={<Bug className="w-4 h-4" />} value="27 Issues" 
            subtitle={<> <span className="text-red-400 font-semibold">12</span> bugs • <span className="text-brand-cyan font-semibold">9</span> feats </>} 
            colorClass="text-red-400" bgClass="bg-red-400" progress={44} 
          />
          <MetricCard 
            title="Active Architects" icon={<Users className="w-4 h-4" />} value="32 Online" 
            subtitle="Deploying across 8 urban districts" colorClass="text-purple-400" bgClass="bg-purple-400" progress={85} 
          />
        </div>

        {/* Toolbar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input 
                type="text" 
                placeholder="Filter across repos, authors, labels... (Press /)" 
                className="w-full h-10 pl-10 pr-10 bg-slate-800/50 text-sm text-slate-200 placeholder:text-slate-500 rounded-lg border border-white/5 focus:border-brand-cyan/50 focus:outline-none transition-colors"
              />
              <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-slate-700 text-[10px] font-mono text-slate-400 border border-slate-600">/</kbd>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <SelectBox options={['Repo: All Districts', 'git-city-core', 'neural-engine']} />
              <SelectBox options={['Age: Recently Updated', 'Newest First', 'Oldest First']} />
              <SelectBox options={['Status: All Statuses', 'Needs Review', 'Approved']} />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">CIVIC PRESETS:</span>
            <FilterChip label="Needs My Review" count={3} colorClass="text-brand-cyan" bgClass="bg-brand-cyan" />
            <FilterChip label="High Priority" count={5} colorClass="text-red-400" bgClass="bg-red-400" />
            <FilterChip label="Flagship Repos" count={18} colorClass="text-blue-400" bgClass="bg-blue-400" />
            <button className="ml-auto flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: PRs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                  <GitMerge className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-200">Pull Requests in Progress</h2>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                    14 open PRs • Sector Velocity High
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">SORT:</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-xs font-mono text-blue-400 border border-white/5">Recently Updated</span>
              </div>
            </div>

            <div className="space-y-3">
              <PRCard 
                repo="git-city-core" num="#1042" status="Needs Review" colorClass="text-brand-cyan" bgClass="bg-brand-cyan"
                title="feat: WebGL shader atmospheric fog bloom & volumetric lighting"
                author="Alex Chen" handle="@alex-chen" time="3 hours ago" adds={420} subs={38} comments={4}
              />
              <PRCard 
                repo="neural-engine" num="#891" status="Approved" colorClass="text-purple-400" bgClass="bg-purple-400" icon={<CheckCircle2 className="w-3 h-3"/>}
                title="refactor: optimize octree spatial queries for Monorepos"
                author="Sarah Lin" handle="@sarah-dev" time="1 day ago" adds={189} subs={112} comments={0}
              />
              <PRCard 
                repo="frontend-ui" num="#512" status="Changes Requested" colorClass="text-blue-400" bgClass="bg-blue-400" icon={<Clock className="w-3 h-3"/>}
                title="perf: virtualize citizen avatar nodes in large population clusters"
                author="Kenji Matsuda" handle="@k-matsuda" time="2 days ago" adds={74} subs={15} comments={7}
              />
            </div>
          </div>

          {/* Column 2: Issues */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-200">Open Issues</h2>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                    <span className="text-brand-cyan">0 open issues</span> • Sector in equilibrium
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800/60 hover:bg-slate-700/60 text-brand-cyan text-xs font-mono border border-white/5 transition-colors">
                <Wand2 className="w-3.5 h-3.5" /> Quick Triage
              </button>
            </div>

            <div className="p-8 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center justify-center text-center space-y-4 py-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-cyan/5 pointer-events-none rounded-xl" />
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-neon">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>
              <div className="space-y-1 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-brand-cyan font-mono text-[10px] uppercase border border-brand-cyan/20 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> CIVIC SECTOR OPTIMAL
                </div>
                <h3 className="text-lg font-bold text-slate-200 tracking-tight">All Clear — Zero Open Issues</h3>
                <p className="text-sm text-slate-400 max-w-sm">All civic tickets and bug anomalies in this sector have been resolved. The metropolis grid is running in peak condition.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800/60 text-brand-cyan text-xs font-mono border border-brand-cyan/20 hover:bg-slate-700/60 transition-colors">
                  <History className="w-4 h-4" /> View Closed
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-cyan text-slate-900 font-bold text-xs font-mono hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4" /> Create New Issue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>Live GitHub Event Stream connected • <strong className="text-slate-200">Sector Core Grid</strong> • Last full poll 34s ago</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 text-brand-cyan text-xs font-mono border border-white/5 hover:bg-slate-700/60 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Trigger Manual Sync
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents

function MetricCard({ title, icon, value, subtitle, trend, colorClass, bgClass, progress }: any) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-between gap-3 hover:border-brand-cyan/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">{title}</span>
        <div className={`w-7 h-7 rounded bg-slate-800 flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        <div className={`text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-1`}>
          {trend === 'up' && <TrendingUp className={`w-3.5 h-3.5 ${colorClass}`} />}
          {subtitle}
        </div>
      </div>
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${bgClass} rounded-full`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function SelectBox({ options }: { options: string[] }) {
  return (
    <div className="relative">
      <select className="appearance-none h-10 pl-3 pr-8 bg-slate-800/50 text-xs font-mono text-slate-200 rounded-lg border border-white/5 focus:outline-none focus:border-brand-cyan/50 cursor-pointer">
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-2.5 top-3 text-slate-500 pointer-events-none" />
    </div>
  );
}

function FilterChip({ label, count, colorClass, bgClass }: any) {
  return (
    <button className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/40 text-xs font-mono border border-white/5 hover:bg-slate-800/80 transition-colors">
      <span className={`w-1.5 h-1.5 rounded-full ${bgClass}`} />
      <span className="text-slate-300">{label}</span>
      <span className={`px-1.5 py-0.5 rounded bg-slate-900 ${colorClass} text-[9px] font-bold`}>{count}</span>
    </button>
  );
}

function PRCard({ repo, num, status, title, author, handle, time, adds, subs, comments, colorClass, bgClass, icon }: any) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-brand-cyan/30 transition-all space-y-3 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${bgClass} shadow-[0_0_8px_currentColor]`} />
          <span className={`text-xs font-mono font-medium ${colorClass}`}>{repo}</span>
          <span className="text-xs font-mono text-slate-500">{num}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full bg-slate-800/80 text-[10px] font-mono font-semibold ${colorClass} border border-white/10 flex items-center gap-1`}>
          {icon || <span className={`w-1.5 h-1.5 rounded-full ${bgClass}`} />} {status}
        </span>
      </div>
      <div className="text-sm font-semibold text-slate-200 group-hover:text-brand-cyan transition-colors">{title}</div>
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${bgClass} bg-opacity-20 flex items-center justify-center ${colorClass} text-[9px] font-bold`}>
            {author.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-slate-300">{author}</span>
          <span className="text-slate-500">{handle}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">{time}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-brand-cyan font-semibold">+{adds}</span>
          <span className="text-red-400 font-semibold">-{subs}</span>
          {comments > 0 && (
            <span className="flex items-center gap-1 text-slate-500">
              <MessageSquare className="w-3 h-3" /> {comments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
