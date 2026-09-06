'use client';

import { CityScene } from '@/components/CityScene';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050510] text-white">
      {/* 3D Scene Layer */}
      <CityScene />

      {/* 2D UI Overlay Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none flex flex-col justify-end p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 1.2, delay: 2 }} // Critically damped spring (Apple style), delayed to let the city rise
      >
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            Git City
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-md">
            Your GitHub profile, rendered as a living 3D city.
          </p>
          
          {/* Apple-design interactive button: instant response on active state */}
          <button className="px-6 py-3 bg-white text-black font-medium rounded-full active:scale-[0.97] transition-transform duration-100 ease-out pointer-events-auto shadow-lg hover:bg-zinc-100">
            Sign in with GitHub
          </button>
        </div>
      </motion.div>
    </main>
  );
}
