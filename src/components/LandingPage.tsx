import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]">
        <div className="h-14 w-full px-hud-edge-pad flex items-center justify-between">
          <div className="flex items-center gap-gutter">
            <Link href="#" className="flex items-center gap-metric-gap group">
              <div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center text-primary-container shadow-[0_0_12px_rgba(76,224,210,0.25)] transition-all group-hover:shadow-[0_0_16px_rgba(76,224,210,0.5)]">
                <span className="material-symbols-outlined text-[18px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary flex items-center gap-micro-gap drop-shadow-[0_0_8px_rgba(111,253,238,0.4)]">
                  GIT CITY
                </span>
              </div>
            </Link>
            <div className="hidden md:inline-flex items-center gap-metric-gap px-card-pad-sm py-micro-gap rounded-full bg-surface-container-lowest/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
              </span>
              <span className="font-caption-caps text-caption-caps text-on-surface-variant">STATUS: GRID ONLINE // V1.0</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-gutter">
            <Link href="#" className="transition-colors bg-primary-container text-on-primary-container font-bold rounded-lg px-3 py-1">Overview</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1">Districts</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1">Architecture</Link>
            <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors px-3 py-1">Telemetry Docs</Link>
          </nav>
          <div className="flex items-center gap-dock-gap">
            <Link href="#" className="hidden sm:inline-flex items-center gap-micro-gap px-card-pad-md py-micro-gap rounded-lg bg-surface-container-low text-primary-container font-telemetry-sm text-telemetry-sm hover:bg-surface-container-high hover:text-on-surface transition-all shadow-[0_0_12px_rgba(76,224,210,0.12)]">
              <span className="material-symbols-outlined text-[16px]">explore</span>Explore Demo
            </Link>
            <Link href="/api/auth/signin" className="inline-flex items-center gap-micro-gap px-card-pad-md py-micro-gap rounded-lg bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold hover:bg-primary-fixed transition-all shadow-[0_0_16px_rgba(76,224,210,0.35)]">
              <span className="material-symbols-outlined text-[18px]">terminal</span>Sign in with GitHub
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-14 bg-background">
        <div className="flex flex-col w-full">
          {/* HERO STAGE */}
          <section className="relative w-full overflow-hidden bg-surface-container-lowest -mt-14 pt-14 flex flex-col justify-between min-h-[720px] lg:min-h-[820px]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/3 w-[560px] h-[560px] rounded-full bg-primary-container/10 blur-[130px]"></div>
              <div className="absolute bottom-0 right-1/4 w-[640px] h-[340px] rounded-full bg-tertiary-container/10 blur-[100px]"></div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none select-none flex items-end justify-center">
              <svg className="w-full h-[88%] object-cover opacity-90" fill="none" preserveAspectRatio="xMidYMax slice" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="neonGridGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#4ce0d2" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#080e1a" stopOpacity="0.0"></stop>
                  </linearGradient>
                  <linearGradient id="towerGradA" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#242a37"></stop>
                    <stop offset="100%" stopColor="#080e1a"></stop>
                  </linearGradient>
                  <linearGradient id="towerGradB" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a202c"></stop>
                    <stop offset="100%" stopColor="#080e1a"></stop>
                  </linearGradient>
                  <linearGradient id="towerGradC" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2f3542"></stop>
                    <stop offset="100%" stopColor="#0d131f"></stop>
                  </linearGradient>
                  <pattern height="40" id="cityIsometricGrid" patternUnits="userSpaceOnUse" width="80">
                    <path d="M 0 20 L 40 0 L 80 20 L 40 40 Z" fill="none" stroke="#4ce0d2" strokeOpacity="0.08" strokeWidth="1"></path>
                    <circle cx="40" cy="20" fill="#4ce0d2" fillOpacity="0.3" r="1.5"></circle>
                  </pattern>
                </defs>
                <rect fill="url(#cityIsometricGrid)" height="480" width="1600" y="420"></rect>
                <rect fill="url(#neonGridGrad)" height="480" width="1600" y="420"></rect>
                <g opacity="0.45">
                  <rect fill="#161c28" height="340" width="70" x="740" y="240"></rect>
                  <rect fill="#1a202c" height="390" width="90" x="830" y="190"></rect>
                  <rect fill="#161c28" height="310" width="65" x="940" y="270"></rect>
                  <rect fill="#242a37" height="370" width="80" x="1030" y="210"></rect>
                  <rect fill="#161c28" height="410" width="105" x="1130" y="170"></rect>
                  <rect fill="#242a37" height="320" width="75" x="1260" y="260"></rect>
                  <line stroke="#4ce0d2" strokeOpacity="0.7" strokeWidth="2" x1="875" x2="875" y1="190" y2="130"></line>
                  <circle cx="875" cy="130" fill="#6ffdee" r="3"></circle>
                  <line stroke="#70d8ff" strokeOpacity="0.7" strokeWidth="2" x1="1182" x2="1182" y1="170" y2="110"></line>
                  <circle cx="1182" cy="110" fill="#70d8ff" r="3"></circle>
                </g>
                <g id="tower-typescript">
                  <rect fill="url(#towerGradB)" height="380" rx="3" width="110" x="710" y="310"></rect>
                  <path d="M710 310 L765 270 L820 310 Z" fill="#242a37"></path>
                  <rect fill="#4ce0d2" height="6" opacity="0.9" width="12" x="725" y="330"></rect>
                  <rect fill="#2B7489" height="6" opacity="0.8" width="12" x="745" y="330"></rect>
                  <rect fill="#4ce0d2" height="6" opacity="0.9" width="12" x="785" y="330"></rect>
                  <rect fill="#2B7489" height="6" opacity="0.7" width="12" x="725" y="350"></rect>
                  <rect fill="#4ce0d2" height="6" opacity="0.95" width="12" x="765" y="350"></rect>
                  <rect fill="#4ce0d2" height="6" opacity="0.8" width="12" x="785" y="350"></rect>
                  <line stroke="#4ce0d2" strokeOpacity="0.3" strokeWidth="1" x1="710" x2="710" y1="310" y2="690"></line>
                  <line stroke="#4ce0d2" strokeOpacity="0.2" strokeWidth="1" x1="820" x2="820" y1="310" y2="690"></line>
                </g>
                <g id="tower-python">
                  <rect fill="url(#towerGradA)" height="470" rx="4" width="140" x="850" y="240"></rect>
                  <polygon fill="#2f3542" points="850,240 920,200 990,240"></polygon>
                  <line stroke="#4ce0d2" strokeWidth="2" x1="920" x2="920" y1="200" y2="140"></line>
                  <circle cx="920" cy="140" fill="#4ce0d2" r="3.5"></circle>
                  <rect fill="#3572A5" height="8" opacity="0.9" width="16" x="870" y="265"></rect>
                  <rect fill="#F1E05A" height="8" opacity="0.95" width="16" x="896" y="265"></rect>
                  <rect fill="#3572A5" height="8" opacity="0.85" width="16" x="948" y="265"></rect>
                </g>
                <g id="tower-ruby-js">
                  <rect fill="url(#towerGradC)" height="390" rx="3" width="130" x="1020" y="340"></rect>
                  <polygon fill="#242a37" points="1020,340 1085,290 1150,340"></polygon>
                  <rect fill="#F1E05A" height="6" opacity="0.9" width="14" x="1040" y="360"></rect>
                  <rect fill="#701516" height="6" opacity="0.95" width="14" x="1108" y="360"></rect>
                </g>
                <rect fill="url(#towerGradB)" height="360" rx="2" width="95" x="1180" y="390"></rect>
                <rect fill="#4ce0d2" height="7" opacity="0.85" width="12" x="1200" y="415"></rect>
                <rect fill="url(#towerGradA)" height="290" rx="2" width="70" x="620" y="440"></rect>
                <rect fill="#F1E05A" height="6" opacity="0.9" width="10" x="635" y="465"></rect>
                <g opacity="0.25">
                  <line stroke="#4ce0d2" strokeDasharray="4 8" x1="0" x2="1600" y1="620" y2="620"></line>
                  <line stroke="#4ce0d2" strokeDasharray="6 12" x1="0" x2="1600" y1="740" y2="740"></line>
                  <circle cx="920" cy="450" r="180" stroke="#4ce0d2" strokeDasharray="2 6"></circle>
                  <circle cx="920" cy="450" r="280" stroke="#70d8ff" strokeDasharray="4 10" strokeOpacity="0.4"></circle>
                </g>
              </svg>
            </div>
            
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-background/30 to-transparent"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-background/70 to-transparent lg:w-3/5"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-hud-edge-pad pt-12 lg:pt-16 flex flex-col justify-between flex-1">
              <div className="max-w-2xl py-6 lg:py-12">
                <div className="inline-flex items-center gap-metric-gap px-card-pad-sm py-micro-gap rounded-full bg-surface-container-low shadow-[0_0_12px_rgba(76,224,210,0.15)] mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-caption-caps text-caption-caps text-primary tracking-wider drop-shadow-[0_0_8px_rgba(111,253,238,0.5)]">
                    [ SECTOR 01 // METROPOLIS INIT ]
                  </span>
                </div>
                
                <h1 className="font-display-hero text-display-hero text-on-surface font-extrabold tracking-tight mb-4">
                  Your GitHub. <br/>
                  <span className="text-primary drop-shadow-[0_0_24px_rgba(76,224,210,0.35)]">Rebuilt as a City.</span>
                </h1>
                
                <p className="font-body-lg text-body-lg text-secondary max-w-lg mb-8 leading-relaxed">
                  Every repo a building. Every commit a light in the window. Turn your codebase telemetry into an interactive 3D midnight skyline.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-dock-gap mb-6">
                  <Link href="/api/auth/signin" className="inline-flex items-center justify-center gap-metric-gap px-card-pad-lg py-dock-gap rounded-lg bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold hover:bg-primary-fixed shadow-[0_0_24px_rgba(76,224,210,0.45)] transition-all transform hover:-translate-y-0.5">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                    </svg>
                    <span>Sign in with GitHub</span>
                  </Link>
                  <Link href="#" className="inline-flex items-center gap-micro-gap px-card-pad-md py-dock-gap rounded-lg bg-surface-container-high text-primary-container font-telemetry-sm text-telemetry-sm hover:bg-surface-variant hover:text-on-surface transition-all shadow-[0_0_12px_rgba(0,0,0,0.3)]">
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Launch Live Holo-Grid</span>
                  </Link>
                </div>
              </div>
              
              <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between pb-8 pt-4 gap-dock-gap">
                <div className="inline-flex items-center gap-gutter px-card-pad-md py-card-pad-sm rounded-lg bg-surface-container-low/90 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]">
                  <div className="flex items-center gap-metric-gap">
                    <span className="material-symbols-outlined text-[16px] text-primary">domain</span>
                    <span className="font-caption-caps text-caption-caps text-on-surface-variant">SECTOR TELEMETRY:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-dock-gap font-telemetry-sm text-telemetry-sm">
                    <span className="text-on-surface"><span className="text-secondary-container">TOTAL REPOS:</span> <span className="text-primary font-bold">48</span></span>
                    <span className="text-secondary-container">//</span>
                    <span className="text-on-surface"><span className="text-secondary-container">COMMITS:</span> <span className="text-tertiary-container font-bold">14,290</span></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-12">
            <div className="max-w-4xl mx-auto px-hud-edge-pad">
              <div className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-card-pad-lg flex flex-col sm:flex-row items-center sm:items-start gap-gutter shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_16px_rgba(76,224,210,0.25)]">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <div className="flex flex-col text-center sm:text-left">
                  <div className="inline-flex items-center justify-center sm:justify-start gap-micro-gap mb-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Read-only access.</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">We never modify your GitHub account.</span>
                  </div>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed mt-1">
                    Git City requests zero write scopes. We never store source code on disk, never make commits on your behalf, and never alter repository settings. Telemetry is computed strictly in-memory via the official GitHub REST/GraphQL API.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
