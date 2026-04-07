import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

interface NodeLineProps {
  startId: string;
  endId: string;
  active: boolean;
  progress: number;
  positionsRef: MutableRefObject<Record<string, [number, number, number]>>;
}

const DEFAULT_POS: [number, number, number] = [0, 0, 0];

export default function NodeLine({ startId, endId, active, progress, positionsRef }: NodeLineProps) {
  const currentEnd = useRef(new THREE.Vector3(0, 0, 0));

  const coreGeo = useMemo(() => new LineGeometry(), []);
  const glowGeo = useMemo(() => new LineGeometry(), []);
  const dimGeo = useMemo(() => new LineGeometry(), []);

  const coreMat = useMemo(
    () =>
      new LineMaterial({
        color: '#ffffff',
        linewidth: 1.4,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }),
    [],
  );
  const glowMat = useMemo(
    () =>
      new LineMaterial({
        color: '#9bd3ff',
        linewidth: 5,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }),
    [],
  );
  const dimMat = useMemo(
    () =>
      new LineMaterial({
        color: '#ffffff',
        linewidth: 1,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }),
    [],
  );

  const core = useMemo(() => new Line2(coreGeo, coreMat), [coreGeo, coreMat]);
  const glow = useMemo(() => new Line2(glowGeo, glowMat), [glowGeo, glowMat]);
  const dim = useMemo(() => new Line2(dimGeo, dimMat), [dimGeo, dimMat]);

  useFrame(({ size }, delta) => {
    const start = positionsRef.current[startId] ?? DEFAULT_POS;
    const end = positionsRef.current[endId] ?? DEFAULT_POS;
    const target = progress > 0.01 ? new THREE.Vector3(...end) : new THREE.Vector3(...start);
    currentEnd.current.lerp(target, delta * 6);

    coreMat.resolution.set(size.width, size.height);
    glowMat.resolution.set(size.width, size.height);
    dimMat.resolution.set(size.width, size.height);

    const positions = [start[0], start[1], start[2], currentEnd.current.x, currentEnd.current.y, currentEnd.current.z];
    coreGeo.setPositions(positions);
    glowGeo.setPositions(positions);
    dimGeo.setPositions(positions);

    core.visible = active;
    glow.visible = active;
    dim.visible = !active;
  });

  return (
    <group>
      <primitive object={glow} />
      <primitive object={core} />
      <primitive object={dim} />
    </group>
  );
}
