import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpace } from '@/context/SpaceContext';
import type { NodeData } from '@/data/types';

const PANEL_WIDTH = 420;
const FOV_DEG = 75;

function collectVisibleNodes(node: NodeData | null): NodeData[] {
  if (!node) return [];
  const nodes: NodeData[] = [node];
  if (node.children?.length) {
    nodes.push(...node.children);
    // If this is a level-2 branch (e.g., Paysafe / Platforms / Demos), include leaf nodes too.
    if (node.level >= 2) {
      for (const child of node.children) {
        if (child.children?.length) nodes.push(...child.children);
      }
    }
  }
  return nodes;
}

export default function CameraController() {
  const { camera, gl, size } = useThree();
  const { cameraTarget, activePanel, currentNode } = useSpace();

  const currentPos = useRef(new THREE.Vector3(0, 0, 5));
  const panOffset = useRef(new THREE.Vector2(0, 0));
  const smoothViewOffset = useRef(0);
  const isDragging = useRef(false);
  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const prevTarget = useRef<[number, number, number]>([0, 0, 5]);
  const zoomOffset = useRef(0);

  const framedTarget = useMemo(() => {
    const [fallbackX, fallbackY, fallbackZ] = cameraTarget;
    const aspect = Math.max(size.width / Math.max(size.height, 1), 0.6);
    const nodes = collectVisibleNodes(currentNode);
    if (nodes.length < 2) return [fallbackX, fallbackY, fallbackZ] as [number, number, number];

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const n of nodes) {
      minX = Math.min(minX, n.position[0]);
      maxX = Math.max(maxX, n.position[0]);
      minY = Math.min(minY, n.position[1]);
      maxY = Math.max(maxY, n.position[1]);
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const width = Math.max(maxX - minX, 0.8) * 1.35;
    const height = Math.max(maxY - minY, 0.8) * 1.4;
    const fovRad = FOV_DEG * (Math.PI / 180);
    const zForHeight = (height * 0.5) / Math.tan(fovRad * 0.5);
    const zForWidth = (width * 0.5) / (Math.tan(fovRad * 0.5) * aspect);
    const z = Math.max(4.4, Math.min(10.8, Math.max(zForHeight, zForWidth)));
    return [cx, cy, z] as [number, number, number];
  }, [cameraTarget, currentNode, size.width, size.height]);

  useEffect(() => {
    const [x, y] = framedTarget;
    if (x !== prevTarget.current[0] || y !== prevTarget.current[1]) {
      panOffset.current.set(0, 0);
      prevTarget.current = [...framedTarget] as [number, number, number];
    }
  }, [framedTarget]);

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      lastPointer.current.set(e.clientX, e.clientY);
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;

      const fovRad = FOV_DEG * (Math.PI / 180);
      const tz = framedTarget[2];
      const worldHeight = 2 * Math.tan(fovRad / 2) * tz;
      const worldWidth = worldHeight * (size.width / size.height);

      panOffset.current.x -= (dx / size.width) * worldWidth;
      panOffset.current.y += (dy / size.height) * worldHeight;
      lastPointer.current.set(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomOffset.current = Math.min(7, Math.max(-2.5, zoomOffset.current + e.deltaY * 0.0025));
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('wheel', onWheel);
    };
  }, [gl, size, framedTarget]);

  useFrame((_, delta) => {
    const [tx, ty, baseTz] = framedTarget;
    const tz = Math.max(2.0, Math.min(12, baseTz + zoomOffset.current));
    const isMobile = size.width < 768;

    let targetViewOffset = 0;
    if (!isMobile && activePanel) {
      const fovRad = FOV_DEG * (Math.PI / 180);
      const worldWidth = 2 * Math.tan(fovRad / 2) * tz * (size.width / size.height);
      targetViewOffset = ((PANEL_WIDTH * 0.95) / size.width) * worldWidth;
    }

    smoothViewOffset.current += (targetViewOffset - smoothViewOffset.current) * Math.min(delta * 4, 1);
    const finalX = tx + panOffset.current.x + smoothViewOffset.current;
    const finalY = ty + panOffset.current.y;

    const targetPos = new THREE.Vector3(finalX, finalY, tz);
    currentPos.current.lerp(targetPos, delta * 2);
    camera.position.copy(currentPos.current);
    camera.lookAt(finalX, finalY, 0);
  });

  return null;
}
