import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeData } from '@/data/types';

interface NodePointProps {
  node: NodeData;
  visible: boolean;
  onNodeClick: (node: NodeData) => void;
  active: boolean;
}

export default function NodePoint({ node, visible, onNodeClick, active }: NodePointProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const { size } = useThree();
  const isMobile = size.width < 768;

  const targetPos = node.position;
  const isDeepNode = node.level >= 3;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (visible) {
      currentPos.current.lerp(
        new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]),
        delta * 3,
      );
    } else {
      const parent = node.level === 1
        ? new THREE.Vector3(0, 0, 0)
        : new THREE.Vector3(targetPos[0] * 0.3, targetPos[1] * 0.3, 0);
      currentPos.current.lerp(parent, delta * 3);
    }

    groupRef.current.position.copy(currentPos.current);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <Html
        center
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          className={`cursor-pointer transition-all duration-300 flex flex-col items-center ${isMobile ? 'gap-0.5' : 'gap-1'} ${hovered && !isMobile ? 'scale-105' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onNodeClick(node);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`rounded-full border transition-all duration-300 backdrop-blur-md ${
              isMobile ? 'px-1.5 py-px' : isDeepNode ? 'px-2.5 py-0.5' : 'px-3 py-1'
            } ${
              active
                ? 'bg-black/70 border-white/25'
                : hovered
                  ? 'bg-black/65 border-white/18'
                  : 'bg-black/50 border-white/10'
            }`}
          >
            <span
              style={{ fontSize: isMobile ? '7px' : isDeepNode ? '10px' : '12px' }}
              className={`font-mono font-semibold ${isMobile ? 'tracking-[0.06em]' : isDeepNode ? 'tracking-[0.1em]' : 'tracking-[0.14em]'} uppercase whitespace-nowrap transition-colors duration-300 ${
                active ? 'text-white' : hovered ? 'text-white/90' : 'text-white/60'
              }`}
            >
              {node.label}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
