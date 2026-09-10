import React from 'react';
import Link from 'next/link';
import { Building2, ArrowLeft, User, Shield, Info, RefreshCw, Palette, AlertTriangle, LogOut, Trash2 } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/');
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-[#080e1a] text-slate-200 font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan relative">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: '32px 32px',
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
        }}
      />

      {/* Top Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#232b3b] bg-[#080e1a]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#161c28] border border-brand-cyan/40 flex items-center justify-center text-brand-cyan group-hover:border-brand-cyan transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-white flex items-center gap-1.5">
                GIT CITY
                <span className="text-[10px] font-mono text-brand-cyan px-1.5 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/25">v1.2</span>
              </span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-400">METROPOLIS PREFERENCES</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/" className="inline-flex items-center space-x-2 text-xs font-medium px-3.5 py-1.5 rounded-lg border border-[#232b3b] bg-[#161c28] hover:bg-[#1c2434] text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Return to 3D Canvas</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[640px] mx-auto px-5 py-10 pb-20 relative z-10">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-brand-cyan mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <span>NODE // CONFIGURATION_WORKSPACE</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Settings &amp; Preferences</h1>
          <p className="text-sm text-slate-400">Manage your connected GitHub account, telemetry sync cadence, and metropolitan rendering options.</p>
        </div>

        {/* Vertical Stack of Grouped Cards */}
        <div className="space-y-6">
          
          {/* Section: Account */}
          <section className="bg-[#0d131f] rounded-xl border border-[#232b3b] shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#232b3b]/70 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <User className="w-4 h-4 text-brand-cyan" />
                <h2 className="text-sm font-semibold text-white tracking-wide">Account</h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Authenticated</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img alt="GitHub Profile" className="w-14 h-14 rounded-full border-2 border-brand-cyan/40 object-cover shadow-md" src={user?.image || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"} />
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0d131f] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-white">@{user?.name || "developer"}</h3>
                      <span className="text-[10px] font-mono text-slate-400 bg-[#161c28] px-1.5 py-0.5 rounded border border-[#232b3b]">Octocat Tier</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      Connected as <span className="text-slate-300 font-mono">{user?.email || "unknown"}</span>
                    </p>
                  </div>
                </div>
                <button className="text-xs font-medium text-rose-400 hover:text-rose-300 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center space-x-1.5">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section: Data & Privacy */}
          <section className="bg-[#0d131f] rounded-xl border border-[#232b3b] shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#232b3b]/70 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Shield className="w-4 h-4 text-brand-cyan" />
                <h2 className="text-sm font-semibold text-white tracking-wide">Data &amp; Privacy</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Telemetry Engine</span>
            </div>
            <div className="p-6 space-y-5">
              <div className="rounded-lg bg-[#080e1a] p-4 border border-[#232b3b]/80 flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-md bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center shrink-0 mt-0.5 text-brand-cyan">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Strict Read-Only OAuth Scope</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Git City only requests minimal public and read-only telemetry scopes (<code className="text-brand-cyan font-mono text-[11px]">read:user</code>, <code className="text-brand-cyan font-mono text-[11px]">public_repo</code>). We never request write permissions, cannot push commits, modify code, or alter repository settings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-xs font-semibold text-white">Metropolis Telemetry Sync</div>
                  <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    Last synced: <span className="text-slate-300">12 minutes ago</span>
                  </p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-brand-cyan text-[#080e1a] hover:bg-[#62ebd9] text-xs font-semibold tracking-wide shadow-neon transition-all flex items-center space-x-2">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh My City</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section: Appearance */}
          <section className="bg-[#0d131f] rounded-xl border border-[#232b3b] shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#232b3b]/70 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Palette className="w-4 h-4 text-brand-cyan" />
                <h2 className="text-sm font-semibold text-white tracking-wide">Appearance</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Rendering &amp; FX</span>
            </div>
            <div className="p-6 divide-y divide-[#232b3b]/70">
              <div className="pb-5 flex items-center justify-between">
                <div className="pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-white">Day/Night ambient mode</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Metropolis Sky</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Toggle between procedural dark neon city lights and high-contrast daylight skyline architectural shaders.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-[#161c28] border border-[#232b3b] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#080e1a] peer-checked:bg-brand-cyan after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 peer-checked:after:bg-[#080e1a] after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="pt-5 flex items-center justify-between">
                <div className="pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-white">Reduced motion</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">Accessibility</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Disables 3D camera sweeps, orbit inertia, particle emissions, and volumetric light flickers for smoother performance.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-[#161c28] border border-[#232b3b] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-brand-cyan after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Section: Danger Zone */}
          <section className="bg-[#0d131f] rounded-xl border border-rose-950/70 shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-rose-950/80 bg-rose-950/20 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-semibold text-rose-300 tracking-wide">Danger Zone</h2>
              </div>
              <span className="text-[11px] font-mono text-rose-400/80">Permanent Actions</span>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-white">Disconnect GitHub Account</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
                    Revokes OAuth access tokens and purges cached repository geometry, citizen graphs, and commit records from your browser.
                  </p>
                </div>
                <button className="shrink-0 px-4 py-2 rounded-lg border border-rose-500/40 text-rose-400 hover:text-white hover:bg-rose-600/20 hover:border-rose-500 text-xs font-medium transition-all flex items-center justify-center space-x-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Disconnect GitHub Account</span>
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* Quick Footer Meta */}
        <div className="mt-12 text-center text-xs font-mono text-slate-500 space-y-1">
          <p>GIT CITY CLIENT BUILD // v1.2.4-STABLE (REVISION #0X4E9A)</p>
          <p className="text-[11px] text-slate-600">ZERO DATA STORED ON EXTERNAL SERVERS • LOCAL CLIENT RENDERING</p>
        </div>
      </main>
    </div>
  );
}
