'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Building, District } from '@/data/mockCitySchema';

interface InstancedBuildingsProps {
  districts: District[];
  onBuildingClick?: (building: Building, position: THREE.Vector3) => void;
}

export function InstancedBuildings({ districts, onBuildingClick }: InstancedBuildingsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredInstance, setHoveredInstance] = useState<number | null>(null);
  
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
      const gridSize = Math.ceil(Math.sqrt(district.buildings.length));
      const spacing = 1.5;
      
      district.buildings.forEach((building, i) => {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        const baseHeight = building.height * 5 + 0.5; 
        
        let hexColor = '#4B5563'; 
        if (building.material === 'javascript') hexColor = '#F59E0B';
        if (building.material === 'typescript') hexColor = '#06B6D4';
        if (building.material === 'python') hexColor = '#EC4899';
        if (building.material === 'go') hexColor = '#06B6D4';
        if (building.material === 'rust') hexColor = '#DEA584';
        if (building.material === 'ruby') hexColor = '#8B5CF6';
        
        data.push({
          targetScaleY: baseHeight,
          targetX: districtOffsetX + (col * spacing) + (Math.random() * 0.4 - 0.2),
          targetZ: (row * spacing) + (Math.random() * 0.4 - 0.2),
          color: new THREE.Color(hexColor),
        });
      });
      
      districtOffsetX += gridSize * spacing + 5;
    });
    
    return data;
  }, [districts]);

  const animStates = useMemo(() => {
    return buildingData.map(() => ({ scaleY: 0 })); 
  }, [buildingData]);

  useEffect(() => {
    if (!meshRef.current) return;
    
    buildingData.forEach((data, i) => {
      meshRef.current!.setColorAt(i, data.color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;

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
          dummy.position.set(target.targetX, state.scaleY / 2, target.targetZ); 
          dummy.scale.set(0.8, Math.max(0.01, state.scaleY), 0.8);
          dummy.updateMatrix();
          meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        
        meshRef.current.instanceMatrix.needsUpdate = true;
      }
    });
  }, [animStates, buildingData, dummy]);

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
      // Pass the top-center position of the building for camera focus
      const position = new THREE.Vector3(data.targetX, data.targetScaleY, data.targetZ);
      onBuildingClick(allBuildings[e.instanceId], position);
    }
  };

  return (
    <>
      <instancedMesh 
        ref={meshRef} 
        args={[undefined, undefined, allBuildings.length]} 
        castShadow 
        receiveShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          roughness={0.2} 
          metalness={0.1} 
        />
      </instancedMesh>

      {/* Hover Highlight Overlay */}
      {hoveredInstance !== null && (
        <mesh
          position={[
            buildingData[hoveredInstance].targetX,
            animStates[hoveredInstance].scaleY / 2,
            buildingData[hoveredInstance].targetZ
          ]}
          scale={[0.9, animStates[hoveredInstance].scaleY + 0.1, 0.9]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial 
            color={buildingData[hoveredInstance].color} 
            transparent 
            opacity={0.4} 
            depthTest={false}
          />
        </mesh>
      )}
    </>
  );
}
