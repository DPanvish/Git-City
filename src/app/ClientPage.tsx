'use client';

import { useState } from 'react';
import { CityScene } from '@/components/CityScene';
import { RepoInspector } from '@/components/RepoInspector';
import { motion } from 'motion/react';
import { signIn } from 'next-auth/react';
import { CitySchema, Building } from '@/data/mockCitySchema';

interface ClientPageProps {
  initialData: CitySchema;
  isAuthenticated: boolean;
}

export default function ClientPage({ initialData, isAuthenticated }: ClientPageProps) {
  const [selectedRepo, setSelectedRepo] = useState<Building | null>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--color-canvas-base)] text-[var(--color-text-high)]">
      {/* 3D Scene Layer */}
      <CityScene cityData={initialData} selectedRepo={selectedRepo} onBuildingClick={setSelectedRepo} />

      {/* Repo Inspector Overlay (slides in when selectedRepo is set) */}
      <RepoInspector repo={selectedRepo} onClose={() => setSelectedRepo(null)} />

      {/* 2D UI Overlay Layer (HUD) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }} 
      >
        {/* Top HUD Bar */}
        <div className="w-full flex justify-between items-start pointer-events-none">
          <div className="font-mono text-[var(--color-text-muted)] text-[11px] font-semibold uppercase tracking-[0.08em]">
            SYSTEM.STATUS // {isAuthenticated ? "LIVE" : "SIMULATION"}
          </div>
          <div className="hud-panel px-3 py-1.5 rounded text-center pointer-events-auto cursor-default">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-0.5">
              {isAuthenticated ? "User" : "Coordinates"}
            </div>
            <div className="font-mono text-[13px] font-medium text-[var(--color-secondary)] drop-shadow-[0_0_8px_var(--color-secondary)]">
              {isAuthenticated ? initialData.user.login : "X: 142.8 Z: 89.1"}
            </div>
          </div>
        </div>

        {/* Bottom Centered Connect Card - Only show if not authenticated */}
        {!isAuthenticated && (
          <motion.div 
            className="mx-auto pointer-events-auto flex flex-col items-center mb-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 1.2, delay: 2.5 }} // Delayed to let city rise
          >
            <div className="hud-panel p-8 rounded-xl flex flex-col items-center text-center max-w-lg w-full">
              <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                Git City
              </h1>
              <p className="font-sans text-[15px] leading-relaxed text-[var(--color-text-muted)] mb-8 max-w-[280px]">
                Your GitHub profile, rendered as a living 3D procedural metropolis.
              </p>
              
              <button 
                onClick={() => signIn('github')}
                className="w-full max-w-[240px] h-12 rounded bg-gradient-to-br from-[#10B981] to-[#059669] text-[#070A0F] font-mono font-semibold text-[15px] hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] active:scale-[0.97] transition-all duration-150 ease-out flex items-center justify-center"
              >
                INITIALIZE_CONNECTION()
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
