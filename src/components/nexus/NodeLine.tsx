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
  /** Lit edge (bright) vs dim baseline. */
  active: boolean;
  /** When lit, use red saber along root→selection path; otherwise white/cool highlight for other expanded branches. */
  pathHighlight: boolean;
  progress: number;
  positionsRef: MutableRefObject<Record<string, [number, number, number]>>;
}

const DEFAULT_POS: [number, number, number] = [0, 0, 0];

export default function NodeLine({ startId, endId, active, pathHighlight, progress, positionsRef }: NodeLineProps) {
  const currentEnd = useRef(new THREE.Vector3(0, 0, 0));
  const activeRef = useRef(active);
  const pathRef = useRef(pathHighlight);
  activeRef.current = active;
  pathRef.current = pathHighlight;

  const coreGeo = useMemo(() => new LineGeometry(), []);
  const glowGeo = useMemo(() => new LineGeometry(), []);
  const bloomGeo = useMemo(() => new LineGeometry(), []);
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
  /** Extra-wide additive pass for path only — helps when `linewidth` is clamped to ~1px on some GPUs. */
  const bloomMat = useMemo(
    () =>
      new LineMaterial({
        color: '#ff050a',
        linewidth: 14,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }),
    [],
  );

  const core = useMemo(() => new Line2(coreGeo, coreMat), [coreGeo, coreMat]);
  const glow = useMemo(() => new Line2(glowGeo, glowMat), [glowGeo, glowMat]);
  const bloom = useMemo(() => new Line2(bloomGeo, bloomMat), [bloomGeo, bloomMat]);
  const dim = useMemo(() => new Line2(dimGeo, dimMat), [dimGeo, dimMat]);

  useFrame(({ size }, delta) => {
    const start = positionsRef.current[startId] ?? DEFAULT_POS;
    const end = positionsRef.current[endId] ?? DEFAULT_POS;
    const target = progress > 0.01 ? new THREE.Vector3(...end) : new THREE.Vector3(...start);
    currentEnd.current.lerp(target, delta * 6);

    coreMat.resolution.set(size.width, size.height);
    glowMat.resolution.set(size.width, size.height);
    bloomMat.resolution.set(size.width, size.height);
    dimMat.resolution.set(size.width, size.height);

    const positions = [start[0], start[1], start[2], currentEnd.current.x, currentEnd.current.y, currentEnd.current.z];
    coreGeo.setPositions(positions);
    glowGeo.setPositions(positions);
    bloomGeo.setPositions(positions);
    dimGeo.setPositions(positions);

    const isLit = activeRef.current;
    const onPath = pathRef.current;
    core.visible = isLit;
    glow.visible = isLit;
    bloom.visible = isLit && onPath;
    dim.visible = !isLit;

    // Path: red saber — wide deep-red bloom carries the read; thin core is saturated red (not near-white).
    // Non-path lit: white core + cool glow. (Line width may be ignored on some WebGL stacks; colors/opacity still help.)
    if (isLit) {
      if (onPath) {
        glowMat.linewidth = 10;
        coreMat.linewidth = 1.1;
        glowMat.color.setRGB(1, 0.04, 0.12);
        glowMat.opacity = 0.62;
        coreMat.color.setRGB(1, 0.22, 0.2);
        coreMat.opacity = 0.72;
      } else {
        glowMat.linewidth = 5;
        coreMat.linewidth = 1.4;
        coreMat.color.setRGB(1, 1, 1);
        glowMat.color.setRGB(0.96, 0.97, 1);
        coreMat.opacity = 0.95;
        glowMat.opacity = 0.32;
      }
    }
  });

  return (
    <group>
      <primitive object={bloom} />
      <primitive object={glow} />
      <primitive object={core} />
      <primitive object={dim} />
    </group>
  );
}
