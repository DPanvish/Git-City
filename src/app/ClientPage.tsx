'use client';

import { useState } from 'react';
import { CityScene } from '@/components/CityScene';
import { RepoInspector } from '@/components/RepoInspector';
import { HUDOverlay } from '@/components/HUDOverlay';
import { CitySchema, Building } from '@/data/mockCitySchema';

interface ClientPageProps {
  initialData: CitySchema;
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [selectedRepo, setSelectedRepo] = useState<Building | null>(null);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[var(--color-canvas-base)] text-[var(--color-text-high)]">
      {/* 3D Scene Layer */}
      <CityScene cityData={initialData} selectedRepo={selectedRepo} onBuildingClick={setSelectedRepo} />

      {/* Repo Inspector Overlay (slides in when selectedRepo is set) */}
      <RepoInspector repo={selectedRepo} onClose={() => setSelectedRepo(null)} />

      {/* 2D UI Overlay Layer (HUD) */}
      <HUDOverlay 
        cityData={initialData} 
        onResetCamera={() => setSelectedRepo(null)} 
      />
    </main>
  );
}
