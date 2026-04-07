import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpace } from '@/context/SpaceContext';

const PANEL_WIDTH = 420;
const FOV_DEG = 75;

export default function CameraController() {
  const { camera, gl, size } = useThree();
  const { cameraTarget, activePanel } = useSpace();

  const currentPos = useRef(new THREE.Vector3(0, 0, 5));
  const panOffset = useRef(new THREE.Vector2(0, 0));
  const smoothViewOffset = useRef(0);
  const isDragging = useRef(false);
  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const prevTarget = useRef<[number, number, number]>([0, 0, 5]);
  const zoomOffset = useRef(0);

  useEffect(() => {
    const [x, y] = cameraTarget;
    if (x !== prevTarget.current[0] || y !== prevTarget.current[1]) {
      panOffset.current.set(0, 0);
      prevTarget.current = [...cameraTarget] as [number, number, number];
    }
  }, [cameraTarget]);

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
      const tz = cameraTarget[2];
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
      // Works for mouse wheel and trackpad pinch (deltaY-based zoom).
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
  }, [gl, size, cameraTarget]);

  useFrame((_, delta) => {
    const [tx, ty, baseTz] = cameraTarget;
    const tz = Math.max(2.0, Math.min(12, baseTz + zoomOffset.current));
    const isMobile = size.width < 768;

    let targetViewOffset = 0;
    if (!isMobile && activePanel) {
      const fovRad = FOV_DEG * (Math.PI / 180);
      const worldWidth = 2 * Math.tan(fovRad / 2) * tz * (size.width / size.height);
      // Shift camera so nodes travel left when the right panel opens.
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
