'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { gsap } from 'gsap';
import { Building, District } from '@/data/types';
import { GitBranch, Star, Activity } from 'lucide-react';

interface InstancedBuildingsProps {
  districts: District[];
  onBuildingClick?: (building: Building, position: THREE.Vector3) => void;
}

export function InstancedBuildings({ districts, onBuildingClick }: InstancedBuildingsProps) {
  const towerMeshRef = useRef<THREE.InstancedMesh>(null);
  const spireMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const [hoveredInstance, setHoveredInstance] = useState<number | null>(null);
  
  // Flatten all buildings
  const allBuildings = useMemo(() => {
    return districts.flatMap(district => district.buildings);
  }, [districts]);

  // Dummy objects for matrix math
  const dummyTower = useMemo(() => new THREE.Object3D(), []);
  const dummySpire = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // Pre-calculate target layouts
  const buildingData = useMemo(() => {
    const data: { targetScaleY: number; targetX: number; targetZ: number; baseColor: string; glow: number; spireHeight: number }[] = [];
    
    let districtOffsetX = 0;
    
    districts.forEach((district) => {
      // Create a more organic grid layout per district
      const gridSize = Math.ceil(Math.sqrt(district.buildings.length));
      const spacing = 2.5; // Wider streets
      
      district.buildings.forEach((building, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        const baseHeight = building.height * 8 + 1; // Taller buildings
        
        let hexColor = '#4B5563'; 
        if (building.material === 'javascript') hexColor = '#F59E0B';
        else if (building.material === 'typescript') hexColor = '#06B6D4';
        else if (building.material === 'python') hexColor = '#EC4899';
        else if (building.material === 'go') hexColor = '#06B6D4';
        else if (building.material === 'rust') hexColor = '#DEA584';
        else if (building.material === 'ruby') hexColor = '#8B5CF6';
        else if (building.material === 'html') hexColor = '#EF4444';
        else if (building.material === 'css') hexColor = '#3B82F6';
        
        data.push({
          targetScaleY: baseHeight,
          targetX: districtOffsetX + (col * spacing) + (Math.random() * 0.5 - 0.25),
          targetZ: (row * spacing) + (Math.random() * 0.5 - 0.25),
          baseColor: hexColor,
          glow: building.windowGlow,
          spireHeight: Math.max(0.2, (building.openPRs + building.contributors) * 0.5)
        });
      });
      
      districtOffsetX += gridSize * spacing + 8; // Major avenues between districts
    });
    
    return data;
  }, [districts]);

  const animStates = useMemo(() => {
    return buildingData.map(() => ({ scaleY: 0 })); 
  }, [buildingData]);

  // Initial rising animation
  useEffect(() => {
    gsap.to(animStates, {
      scaleY: (i) => buildingData[i].targetScaleY,
      duration: 2.0,
      ease: "elastic.out(1, 0.7)",
      stagger: {
        amount: 1.5,
        from: "center",
      },
      onUpdate: () => {
        if (!towerMeshRef.current || !spireMeshRef.current) return;
        
        animStates.forEach((state, i) => {
          const target = buildingData[i];
          
          // Update Tower
          dummyTower.position.set(target.targetX, state.scaleY / 2, target.targetZ); 
          dummyTower.scale.set(1.2, Math.max(0.01, state.scaleY), 1.2);
          dummyTower.updateMatrix();
          towerMeshRef.current!.setMatrixAt(i, dummyTower.matrix);

          // Update Spire
          const currentSpireHeight = (state.scaleY / target.targetScaleY) * target.spireHeight;
          dummySpire.position.set(target.targetX, state.scaleY + currentSpireHeight / 2, target.targetZ);
          dummySpire.scale.set(0.2, Math.max(0.01, currentSpireHeight), 0.2);
          dummySpire.updateMatrix();
          spireMeshRef.current!.setMatrixAt(i, dummySpire.matrix);
        });
        
        towerMeshRef.current.instanceMatrix.needsUpdate = true;
        spireMeshRef.current.instanceMatrix.needsUpdate = true;
      }
    });
  }, [animStates, buildingData, dummyTower, dummySpire]);

  // Handle dynamic coloring and hover states
  useEffect(() => {
    if (!towerMeshRef.current || !spireMeshRef.current) return;

    buildingData.forEach((data, i) => {
      const isHovered = hoveredInstance === i;
      
      // Calculate bloom intensity
      let intensity = data.glow * 2.5 + 0.5; // Base glow
      if (isHovered) intensity += 3.0; // Mega bloom on hover
      
      // Base tower color (darker, emitting slightly)
      color.set(data.baseColor).multiplyScalar(intensity * 0.3);
      if (isHovered) color.addScalar(0.2); // Brighten on hover
      towerMeshRef.current!.setColorAt(i, color);

      // Spire color (bright neon)
      color.set(data.baseColor).multiplyScalar(intensity);
      spireMeshRef.current!.setColorAt(i, color);
    });

    towerMeshRef.current.instanceColor!.needsUpdate = true;
    spireMeshRef.current.instanceColor!.needsUpdate = true;
  }, [buildingData, hoveredInstance, color]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.instanceId !== undefined) {
      setHoveredInstance(e.instanceId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredInstance(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.instanceId !== undefined && onBuildingClick) {
      const data = buildingData[e.instanceId];
      const position = new THREE.Vector3(data.targetX, data.targetScaleY + data.spireHeight, data.targetZ);
      onBuildingClick(allBuildings[e.instanceId], position);
    }
  };

  return (
    <group>
      {/* Main Towers */}
      <instancedMesh 
        ref={towerMeshRef} 
        args={[undefined, undefined, allBuildings.length]} 
        castShadow 
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          roughness={0.7} 
          metalness={0.8}
          color="#111" // Dark base
          toneMapped={false} // Required for bloom colors > 1
        />
      </instancedMesh>

      {/* Roof Spires (Neon details) */}
      <instancedMesh 
        ref={spireMeshRef} 
        args={[undefined, undefined, allBuildings.length]} 
      >
        <cylinderGeometry args={[0.5, 1, 1, 4]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Floating HTML HUD for hovered building */}
      {hoveredInstance !== null && (
        <Html 
          position={[
            buildingData[hoveredInstance].targetX, 
            buildingData[hoveredInstance].targetScaleY + buildingData[hoveredInstance].spireHeight + 1.5, 
            buildingData[hoveredInstance].targetZ
          ]}
          center
          distanceFactor={15}
          className="pointer-events-none"
        >
          <div className="bg-[#080e1a]/90 backdrop-blur-md border border-[#4ce0d2]/50 rounded-lg p-3 shadow-[0_0_20px_rgba(76,224,210,0.3)] min-w-[200px] flex flex-col gap-2">
            <h3 className="text-[#6ffdee] font-bold text-sm truncate">{allBuildings[hoveredInstance].repoName}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {allBuildings[hoveredInstance].stars}</span>
              <span className="flex items-center gap-1"><GitBranch className="w-3 h-3 text-[#4ce0d2]" /> {allBuildings[hoveredInstance].openPRs}</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-rose-400" /> {allBuildings[hoveredInstance].lastCommitDaysAgo}d</span>
            </div>
            <div className="text-[10px] font-mono uppercase text-slate-500 mt-1">
              LANG // <span className="text-white">{allBuildings[hoveredInstance].material}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
