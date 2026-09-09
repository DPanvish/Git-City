'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(38.4);
  const [reposCount, setReposCount] = useState(28);
  const [currentRepo, setCurrentRepo] = useState('user/frontend-core [842 commits, 18 branches]');
  const totalRepos = 64;

  useEffect(() => {
    const simulatedRepos = [
      'user/frontend-core [842 commits, 18 branches]',
      'user/api-gateway [1,429 commits, 32 branches]',
      'user/neural-pipeline [512 commits, 8 branches]',
      'user/infrastructure-iac [390 commits, 12 branches]',
      'user/auth-service [615 commits, 9 branches]',
      'user/analytics-engine [1,840 commits, 45 branches]'
    ];
    
    let repoIndex = 0;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 88.0) {
          const next = prev + Math.random() * 2.8;
          return next > 88.0 ? 88.0 : next;
        }
        return prev;
      });

      setReposCount((prev) => {
        if (prev < totalRepos) {
          return Math.min(totalRepos, prev + Math.floor(Math.random() * 3 + 1));
        }
        return prev;
      });

      if (Math.random() > 0.45) {
        repoIndex = (repoIndex + 1) % simulatedRepos.length;
        setCurrentRepo(simulatedRepos[repoIndex]);
      }
    }, 950);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-hud-edge-pad py-card-pad-lg overflow-hidden select-none bg-background">
      {/* Deep Vector Wireframe & Isometric Skyline Underlay (10-15% Opacity Ambience) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
        <svg className="w-full h-full max-w-7xl" fill="none" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="skyline-fade" x1="720" x2="720" y1="200" y2="850">
              <stop offset="0%" stopColor="#4CE0D2" stopOpacity="0.8"></stop>
              <stop offset="60%" stopColor="#4CE0D2" stopOpacity="0.15"></stop>
              <stop offset="100%" stopColor="#080E1A" stopOpacity="0"></stop>
            </linearGradient>
            <pattern height="40" id="grid-pattern" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4CE0D2" strokeOpacity="0.25" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          {/* Isometric Floor Plane Grid */}
          <g transform="translate(0, 320) skewX(-32) rotate(12) scale(1.4, 0.7)">
            <rect fill="url(#grid-pattern)" height="1200" width="1800"></rect>
          </g>
          {/* Wireframe City Blocks & Monolith Tower Silhouettes */}
          <g stroke="url(#skyline-fade)" strokeWidth="1.2">
            {/* Monolith Alpha */}
            <polygon fill="#080E1A" fillOpacity="0.65" points="280,720 280,340 360,280 440,340 440,720 360,780"></polygon>
            <line strokeOpacity="0.6" x1="360" x2="360" y1="280" y2="780"></line>
            <line x1="280" x2="360" y1="340" y2="400"></line>
            <line x1="440" x2="360" y1="340" y2="400"></line>
            <circle className="animate-pulse" cx="360" cy="274" fill="#6FFDEE" r="2.5"></circle>
            {/* District Spire Beta */}
            <polygon fill="#080E1A" fillOpacity="0.7" points="460,750 460,220 530,170 600,220 600,750 530,810"></polygon>
            <line strokeOpacity="0.8" x1="530" x2="530" y1="170" y2="810"></line>
            <line strokeDasharray="3 3" x1="460" x2="530" y1="280" y2="330"></line>
            <line strokeDasharray="3 3" x1="600" x2="530" y1="280" y2="330"></line>
            <line strokeDasharray="3 3" x1="460" x2="530" y1="380" y2="430"></line>
            <line strokeDasharray="3 3" x1="600" x2="530" y1="380" y2="430"></line>
            <circle cx="530" cy="165" fill="#4CE0D2" r="3"></circle>
            {/* Monolith Gamma (Monorepo Skyscraper) */}
            <polygon fill="#080E1A" fillOpacity="0.8" points="620,770 620,130 710,70 800,130 800,770 710,830"></polygon>
            <line strokeOpacity="0.9" x1="710" x2="710" y1="70" y2="830"></line>
            <line x1="620" x2="710" y1="130" y2="190"></line>
            <line x1="800" x2="710" y1="130" y2="190"></line>
            <line x1="620" x2="710" y1="230" y2="290"></line>
            <line x1="800" x2="710" y1="230" y2="290"></line>
            <line strokeDasharray="2 2" x1="620" x2="710" y1="330" y2="390"></line>
            <line strokeDasharray="2 2" x1="800" x2="710" y1="330" y2="390"></line>
            <circle className="animate-ping" cx="710" cy="65" fill="#69F8EA" r="3"></circle>
            {/* District Tower Delta */}
            <polygon fill="#080E1A" fillOpacity="0.65" points="830,760 830,260 900,210 970,260 970,760 900,810"></polygon>
            <line strokeOpacity="0.6" x1="900" x2="900" y1="210" y2="810"></line>
            <circle cx="900" cy="204" fill="#4CE0D2" r="2.5"></circle>
            {/* Auxiliary Block Epsilon */}
            <polygon fill="#080E1A" fillOpacity="0.5" points="990,730 990,400 1060,350 1130,400 1130,730 1060,780"></polygon>
            <line strokeOpacity="0.5" x1="1060" x2="1060" y1="350" y2="780"></line>
            {/* Window Telemetry Specks (City Lights) */}
            <g fill="#4CE0D2" opacity="0.65">
              <rect height="5" width="3" x="650" y="240"></rect>
              <rect height="5" width="3" x="670" y="260"></rect>
              <rect height="5" width="3" x="685" y="310"></rect>
              <rect height="5" width="3" x="740" y="250"></rect>
              <rect height="5" width="3" x="760" y="320"></rect>
              <rect height="5" width="3" x="735" y="380"></rect>
              <rect height="5" width="3" x="500" y="320"></rect>
              <rect height="5" width="3" x="550" y="360"></rect>
              <rect height="5" width="3" x="570" y="420"></rect>
              <rect height="5" width="3" x="860" y="340"></rect>
              <rect height="5" width="3" x="920" y="310"></rect>
              <rect height="5" width="3" x="940" y="380"></rect>
            </g>
          </g>
        </svg>
      </div>

      {/* Soft Central Light Radial Halo */}
      <div className="absolute w-[36rem] h-[36rem] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10"></div>

      {/* Main HUD Loading Console Stack */}
      <div className="relative w-full max-w-xl mx-auto flex flex-col z-10">
        {/* Top HUD Header Strip (Frameless telemetry readouts) */}
        <div className="flex items-center justify-between pb-dock-gap px-card-pad-sm">
          <div className="flex items-center gap-metric-gap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-caption-caps text-caption-caps text-primary tracking-[0.14em]">
              PROTOCOL // METROPOLIS_INITIALIZATION_V1
            </span>
          </div>
          <div className="font-telemetry-sm text-telemetry-sm text-on-surface-variant flex items-center gap-micro-gap">
            <span className="text-outline">STREAM:</span>
            <span className="text-on-surface font-semibold">GQL.LIVE</span>
          </div>
        </div>

        {/* Glassmorphic HUD Command Deck Container */}
        <div className="w-full rounded-xl bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] p-card-pad-lg flex flex-col gap-card-pad-md relative">
          {/* Subtle Top Edge Light Shimmer Gradient */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary-container/40 to-transparent"></div>

          {/* Identity & Connection Status Header */}
          <div className="flex items-center justify-between gap-dock-gap">
            <div className="flex items-center gap-dock-gap">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-[0_0_16px_rgba(76,224,210,0.2)]">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-caption-caps text-caption-caps text-on-surface-variant">COMMAND NODE</span>
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Git City Core Engine</span>
              </div>
            </div>
            
            {/* Connected Developer Pill */}
            <div className="inline-flex items-center gap-metric-gap px-card-pad-sm py-micro-gap rounded-full bg-surface-container-high">
              <div className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(76,224,210,0.8)]"></div>
              <span className="font-telemetry-sm text-telemetry-sm text-on-surface">Connected as <span className="text-primary font-medium">@developer</span></span>
            </div>
          </div>

          {/* Active Operation & Cursor Status Readout */}
          <div className="pt-dock-gap flex flex-col gap-micro-gap">
            <div className="flex items-baseline gap-metric-gap">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold flex items-center">
                Surveying your repositories
                <span className="inline-block w-2.5 h-5 bg-primary ml-2 animate-pulse shadow-[0_0_10px_#4CE0D2]"></span>
              </h1>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-telemetry-sm text-telemetry-sm pt-micro-gap">
              <span className="text-primary-fixed-dim tracking-wider">
                FETCHING NODES: {reposCount} / {totalRepos} REPOSITORIES IDENTIFIED
              </span>
              <span className="text-on-surface-variant tracking-normal">
                LATENCY: <span className="text-on-surface">32ms</span>
              </span>
            </div>
          </div>

          {/* Glowing Progress Track */}
          <div className="flex flex-col gap-metric-gap mt-micro-gap">
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden relative shadow-inner">
              <div 
                className="h-full bg-primary-container rounded-full relative transition-all duration-700 ease-out shadow-[0_0_16px_rgba(76,224,210,0.9)]" 
                style={{ width: `${progress.toFixed(1)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-[pulse_2s_infinite]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between font-telemetry-code text-telemetry-code">
              <div className="flex items-center gap-micro-gap">
                <span className="text-primary font-semibold">{progress.toFixed(1)}%</span>
                <span className="text-on-surface-variant">TELEMETRY PARSED</span>
              </div>
              <span className="text-on-surface-variant">RATE: <span className="text-on-surface">1.4 MB/s</span></span>
            </div>
          </div>

          {/* Pipeline Step Checklist */}
          <div className="pt-card-pad-sm flex flex-col gap-dock-gap">
            <div className="font-caption-caps text-caption-caps text-on-surface-variant tracking-widest pb-micro-gap">
              GENERATION PIPELINE SEQUENCE
            </div>
            <div className="flex flex-col gap-dock-gap">
              
              {/* Step 1: Active */}
              <div className="flex items-center justify-between p-card-pad-sm rounded-lg bg-surface-container-high/60 transition-all">
                <div className="flex items-center gap-dock-gap">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-primary font-medium">Surveying your repositories</span>
                    <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">Cataloging forks, branches, and star clusters</span>
                  </div>
                </div>
                <span className="font-telemetry-sm text-telemetry-sm text-primary px-card-pad-sm py-micro-gap rounded bg-primary/10 font-medium">
                  IN PROGRESS
                </span>
              </div>

              {/* Step 2: Queued */}
              <div className="flex items-center justify-between p-card-pad-sm rounded-lg bg-transparent transition-all opacity-45">
                <div className="flex items-center gap-dock-gap">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant">
                    <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-on-surface font-normal">Mapping contributors</span>
                    <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">Computing architect towers and flightpaths</span>
                  </div>
                </div>
                <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">QUEUED</span>
              </div>

              {/* Step 3: Queued */}
              <div className="flex items-center justify-between p-card-pad-sm rounded-lg bg-transparent transition-all opacity-45">
                <div className="flex items-center gap-dock-gap">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant">
                    <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-on-surface font-normal">Lighting up recent commits</span>
                    <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">Synthesizing neon window glow frequencies</span>
                  </div>
                </div>
                <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">QUEUED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Diagnostic Sub-feed */}
        <div className="mt-dock-gap p-card-pad-sm rounded bg-surface-container-lowest flex items-center justify-between font-telemetry-code text-telemetry-code text-on-surface-variant">
          <div className="flex items-center gap-metric-gap truncate">
            <span className="text-primary font-bold">&gt;</span>
            <span className="truncate">SCANNING: {currentRepo}</span>
          </div>
          <span className="text-outline pl-dock-gap flex-shrink-0">OK: 200</span>
        </div>
      </div>

      {/* Atmospheric Reassurance & Monospace Tip Footer */}
      <div className="mt-card-pad-md flex flex-col items-center gap-metric-gap text-center px-card-pad-sm">
        <p className="font-telemetry-sm text-telemetry-sm text-secondary-fixed-dim/90 max-w-lg">
          <span className="text-primary font-semibold">Tip:</span> Larger monorepos generate skyscrapers up to 80 floors high with dedicated branch transit lines.
        </p>
        <div className="flex items-center justify-center gap-metric-gap text-on-surface-variant/80 font-telemetry-sm text-telemetry-sm mt-micro-gap">
          <span className="material-symbols-outlined text-[15px] text-primary-container">lock</span>
          <span>Encrypted telemetry stream</span>
          <span className="text-outline-variant">•</span>
          <span>Read-only GitHub OAuth token</span>
          <span className="text-outline-variant">•</span>
          <span>No source code stored</span>
        </div>
      </div>
    </div>
  );
}
