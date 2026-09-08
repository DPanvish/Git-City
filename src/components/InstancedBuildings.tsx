'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Building, District } from '@/data/mockCitySchema';

interface InstancedBuildingsProps {
  districts: District[];
  onBuildingClick?: (building: Building) => void;
}

export function InstancedBuildings({ districts, onBuildingClick }: InstancedBuildingsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Flatten all buildings to know the total count for the InstancedMesh
  const allBuildings = useMemo(() => {
    return districts.flatMap(district => district.buildings);
  }, [districts]);

  // A helper dummy object to calculate matrix transformations
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-calculate target layouts and colors
  const buildingData = useMemo(() => {
    const data: { targetScaleY: number; targetX: number; targetZ: number; color: THREE.Color }[] = [];
    
    let districtOffsetX = 0;
    
    districts.forEach((district) => {
      // Simple grid layout per district for the prototype
      const gridSize = Math.ceil(Math.sqrt(district.buildings.length));
      const spacing = 1.5;
      
      district.buildings.forEach((building, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        // Base dimensions
        const baseHeight = building.height * 5 + 0.5; // Scale up the normalized value
        
        // Assign colors based on material (Stitch Telemetry Signatures)
        let hexColor = '#4B5563'; // Ghost grey fallback
        if (building.material === 'javascript') hexColor = '#F59E0B';
        if (building.material === 'typescript') hexColor = '#06B6D4';
        if (building.material === 'python') hexColor = '#EC4899';
        if (building.material === 'go') hexColor = '#06B6D4';
        if (building.material === 'rust') hexColor = '#DEA584';
        if (building.material === 'ruby') hexColor = '#8B5CF6';
        
        data.push({
          targetScaleY: baseHeight,
          targetX: districtOffsetX + (col * spacing) + (Math.random() * 0.4 - 0.2), // slight random jitter
          targetZ: (row * spacing) + (Math.random() * 0.4 - 0.2),
          color: new THREE.Color(hexColor),
        });
      });
      
      // Offset next district
      districtOffsetX += gridSize * spacing + 5;
    });
    
    return data;
  }, [districts]);

  // We need an array of state objects for GSAP to animate
  const animStates = useMemo(() => {
    return buildingData.map(() => ({ scaleY: 0 })); // Start completely flat
  }, [buildingData]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    // Set initial colors
    buildingData.forEach((data, i) => {
      meshRef.current!.setColorAt(i, data.color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;

    // Animate the buildings growing from the ground using GSAP
    gsap.to(animStates, {
      scaleY: (i) => buildingData[i].targetScaleY,
      duration: 1.5,
      ease: "power2.out",
      stagger: {
        amount: 1.0,
        from: "random",
      },
      onUpdate: () => {
        if (!meshRef.current) return;
        
        animStates.forEach((state, i) => {
          const target = buildingData[i];
          
          dummy.position.set(target.targetX, state.scaleY / 2, target.targetZ); // Center is half height
          // Fixed width/depth for the prototype
          dummy.scale.set(0.8, Math.max(0.01, state.scaleY), 0.8);
          dummy.updateMatrix();
          
          meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    });
  }, [animStates, buildingData, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, allBuildings.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        roughness={0.2} 
        metalness={0.1} 
      />
    </instancedMesh>
  );
}
