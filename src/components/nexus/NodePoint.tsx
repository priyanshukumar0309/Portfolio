import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeData } from '@/data/types';

interface NodePointProps {
  node: NodeData;
  visible: boolean;
  onNodeClick: (node: NodeData) => void;
  active: boolean;
  showSubtitle?: boolean;
  onPositionUpdate?: (id: string, position: [number, number, number]) => void;
}

export default function NodePoint({ node, visible, onNodeClick, active, showSubtitle = false, onPositionUpdate }: NodePointProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const dragOffset = useRef(new THREE.Vector2(0, 0));
  const targetDragOffset = useRef(new THREE.Vector2(0, 0));
  const dragging = useRef(false);
  const dragStart = useRef(new THREE.Vector2(0, 0));
  const dragNodeStart = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();
  const isMobile = size.width < 768;
  const isDeepNode = node.level >= 3;

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = (e.clientX - dragStart.current.x) / Math.max(size.width, 1);
      const dy = (e.clientY - dragStart.current.y) / Math.max(size.height, 1);
      targetDragOffset.current.set(dragNodeStart.current.x + dx * 3.2, dragNodeStart.current.y - dy * 2.4);
    };
    const onPointerUp = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [size.width, size.height]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const t = performance.now() * 0.001;
    const phase = ((node.position[0] + node.position[1]) * 0.6) % (Math.PI * 2);
    const floatX = Math.sin(t * 0.7 + phase) * 0.035;
    const floatY = Math.cos(t * 0.9 + phase) * 0.045;
    const floatZ = Math.sin(t * 0.5 + phase) * 0.015;

    if (!dragging.current) {
      targetDragOffset.current.lerp(new THREE.Vector2(0, 0), Math.min(delta * 4, 1));
    }
    dragOffset.current.lerp(targetDragOffset.current, Math.min(delta * 10, 1));

    const target = visible
      ? new THREE.Vector3(node.position[0] + floatX + dragOffset.current.x, node.position[1] + floatY + dragOffset.current.y, node.position[2] + floatZ)
      : (node.level === 1 ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(node.position[0] * 0.3, node.position[1] * 0.3, 0));

    currentPos.current.lerp(target, delta * 3);
    groupRef.current.position.copy(currentPos.current);
    onPositionUpdate?.(node.id, [currentPos.current.x, currentPos.current.y, currentPos.current.z]);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <Html center style={{ pointerEvents: 'auto', userSelect: 'none', whiteSpace: 'nowrap' }}>
        <div
          className={`flex cursor-pointer flex-col items-center transition-all duration-300 ${isMobile ? "gap-0.5" : "gap-1"} ${hovered && !isMobile ? "scale-105" : ""}`}
          style={{ color: "rgb(250 250 250)" }}
          onClick={(e) => {
            e.stopPropagation();
            onNodeClick(node);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
            dragStart.current.set(e.clientX, e.clientY);
            dragNodeStart.current.set(dragOffset.current.x, dragOffset.current.y);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`rounded-full border backdrop-blur-md transition-all duration-300 ${
              isMobile ? "px-1.5 py-px" : isDeepNode ? "px-2.5 py-0.5" : "px-3 py-1"
            } ${
              active ? "border-white/45 bg-black/65" : hovered ? "border-white/35 bg-black/60" : "border-white/28 bg-black/50"
            }`}
          >
            <span
              style={{
                fontSize: isMobile ? "7px" : isDeepNode ? "10px" : "12px",
                color: active || hovered ? "rgb(255 255 255)" : "rgb(255 255 255 / 0.94)",
                textShadow: "0 0 12px rgba(255,255,255,0.2)",
              }}
              className={`font-mono font-semibold uppercase whitespace-nowrap transition-colors duration-300 ${
                isMobile ? "tracking-[0.06em]" : isDeepNode ? "tracking-[0.1em]" : "tracking-[0.14em]"
              }`}
            >
              {node.label}
            </span>
          </div>
          {!isMobile && showSubtitle && (node.subtitle || node.period) && (
            <div className="rounded-full border border-white/22 bg-black/50 px-2 py-0.5 backdrop-blur-sm">
              <div
                className="flex items-center justify-center gap-1.5 whitespace-nowrap font-mono text-[9px] font-medium tracking-[0.06em]"
                style={{ color: "rgb(255 255 255 / 0.78)" }}
              >
                {node.subtitle && <span style={{ color: "rgb(255 255 255 / 0.82)" }}>{node.subtitle}</span>}
                {node.subtitle && node.period && <span style={{ color: "rgb(255 255 255 / 0.4)" }}>|</span>}
                {node.period && <span style={{ color: "rgb(255 255 255 / 0.65)" }}>{node.period}</span>}
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
