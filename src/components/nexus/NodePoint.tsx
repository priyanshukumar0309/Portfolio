import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeData } from '@/data/types';
import { formatCareerYearRange, isCareerGraphNode } from '@/data/careerYearRange';

interface NodePointProps {
  node: NodeData;
  visible: boolean;
  onNodeClick: (node: NodeData) => void;
  active: boolean;
  onPositionUpdate?: (id: string, position: [number, number, number]) => void;
}

export default function NodePoint({ node, visible, onNodeClick, active, onPositionUpdate }: NodePointProps) {
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
  /** L1 = Skills / Projects / History only — slightly larger type + pill; L2 and L3 share one scale so leaves match intermediates. */
  const isL1Root = node.level === 1;
  /** History branch only: second line is years from `period`, nothing else. */
  const careerYearSub = isCareerGraphNode(node.id) ? formatCareerYearRange(node.period) : null;

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
          className={`flex cursor-pointer flex-col items-center transition-all duration-300 ${
            careerYearSub ? "gap-0.5" : isMobile ? "gap-0.5" : "gap-1"
          } ${hovered && !isMobile ? "scale-105" : ""}`}
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
          {/* Rounded pill + flex centering + tight line-height so label stays vertically centered. */}
          <div
            className={`flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
              isMobile
                ? isL1Root
                  ? "min-h-[26px] rounded-full px-2.5 py-1"
                  : "min-h-[24px] rounded-full px-2.5 py-1"
                : isL1Root
                  ? "min-h-[38px] rounded-full px-3.5 py-2"
                  : "min-h-[32px] rounded-full px-3 py-1.5"
            } ${
              active
                ? "border-red-300/75 bg-black/70 shadow-[0_0_24px_rgba(248,113,113,0.35)]"
                : hovered
                  ? "border-white/35 bg-black/60"
                  : "border-white/28 bg-black/50"
            }`}
          >
            <span
              style={{
                fontSize: isMobile ? (isL1Root ? "8px" : "7px") : isL1Root ? "10px" : "9px",
                lineHeight: 1,
                color: active ? "rgb(254 242 242)" : hovered ? "rgb(255 255 255)" : "rgb(255 255 255 / 0.94)",
                textShadow: active ? "0 0 16px rgba(248,113,113,0.35)" : "0 0 12px rgba(255,255,255,0.2)",
              }}
              className={`font-display font-semibold uppercase whitespace-nowrap transition-colors duration-300 ${
                isMobile ? "tracking-[0.06em]" : isL1Root ? "tracking-[0.12em]" : "tracking-[0.1em]"
              }`}
            >
              {node.label}
            </span>
          </div>
          {careerYearSub && (
            /* Squat chip: small radius + ~1px vertical inset — avoids tall rounded-full pills on short year strings. */
            <div className="inline-flex items-center justify-center rounded-sm border border-white/16 bg-black/55 px-[5px] py-px backdrop-blur-sm">
              <span className="font-sans text-[6px] font-normal leading-none tracking-[0.05em] text-white/68">
                {careerYearSub}
              </span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
