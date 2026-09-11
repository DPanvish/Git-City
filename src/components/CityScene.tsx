'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, ContactShadows, Grid, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { InstancedBuildings } from './InstancedBuildings';
import { CitySchema, Building } from '@/data/types';
import * as THREE from 'three';

interface CitySceneProps {
  cityData: CitySchema;
  selectedRepo: Building | null;
  onBuildingClick?: (building: Building) => void;
}

export function CityScene({ cityData, selectedRepo, onBuildingClick }: CitySceneProps) {
  const cameraControlRef = useRef<CameraControls>(null);

  useEffect(() => {
    // Arrival sequence: camera starts high and eases down
    if (cameraControlRef.current) {
      // Set initial position high up
      cameraControlRef.current.setLookAt(0, 50, 50, 0, 0, 0, false);
      
      // Animate down to establishing shot
      setTimeout(() => {
        cameraControlRef.current?.setLookAt(
          20, 15, 30, // Position
          10, 0, 10,   // Target
          true         // Animate
        );
      }, 500); // Small delay to let the Canvas render first
    }
  }, []);

  // Watch for deselection to reset camera
  useEffect(() => {
    if (selectedRepo === null && cameraControlRef.current) {
      cameraControlRef.current.setLookAt(
        20, 15, 30, // Position
        10, 0, 10,   // Target
        true         // Animate
      );
    }
  }, [selectedRepo]);

  const handleBuildingClick = (building: Building, position: THREE.Vector3) => {
    if (cameraControlRef.current) {
      // Calculate a cinematic "street level" camera position 
      // offset slightly back and up from the target building
      const offsetPos = new THREE.Vector3(
        position.x + 8,
        position.y + 6,
        position.z + 8
      );
      
      cameraControlRef.current.setLookAt(
        offsetPos.x, offsetPos.y, offsetPos.z, // Camera Position
        position.x, position.y / 2, position.z, // Look At Target (center of building)
        true // Animate
      );
    }
    
    // Bubble up to client page to show Inspector
    if (onBuildingClick) {
      onBuildingClick(building);
    }
  };

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows camera={{ position: [0, 50, 50], fov: 45 }}>
        {/* Night mode aesthetics */}
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 20, 100]} />
        
        {/* Environment and Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        
        <CameraControls 
          ref={cameraControlRef} 
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
          minDistance={5}
          maxDistance={100}
        />

        {/* The procedurally generated city */}
        <InstancedBuildings districts={cityData.districts} onBuildingClick={handleBuildingClick} />

        {/* Cinematic Particles */}
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

        {/* Glowing Cyberpunk Grid Floor */}
        <Grid 
          position={[0, -0.01, 0]} 
          args={[200, 200]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#06b6d4" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#3b82f6" 
          fadeDistance={50} 
          fadeStrength={1} 
        />
        
        {/* Add subtle contact shadows for depth */}
        <ContactShadows resolution={1024} scale={100} blur={2} opacity={0.5} far={10} color="#000000" />

        {/* Post Processing for Neon Bloom */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
