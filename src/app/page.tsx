'use client';

import { CityScene } from '@/components/CityScene';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--color-canvas-base)] text-[var(--color-text-high)]">
      {/* 3D Scene Layer */}
      <CityScene />

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
            SYSTEM.STATUS // ONLINE
          </div>
          <div className="hud-panel px-3 py-1.5 rounded text-center pointer-events-auto cursor-default">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-0.5">Coordinates</div>
            <div className="font-mono text-[13px] font-medium text-[var(--color-secondary)] drop-shadow-[0_0_8px_var(--color-secondary)]">
              X: 142.8 Z: 89.1
            </div>
          </div>
        </div>

        {/* Bottom Centered Connect Card */}
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
            
            {/* Action Button: Emerald gradient + Monospace + Scale interaction */}
            <button 
              className="w-full max-w-[240px] h-12 rounded bg-gradient-to-br from-[#10B981] to-[#059669] text-[#070A0F] font-mono font-semibold text-[15px] hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] active:scale-[0.97] transition-all duration-150 ease-out flex items-center justify-center"
            >
              INITIALIZE_CONNECTION()
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
