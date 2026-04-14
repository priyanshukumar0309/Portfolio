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
  const whiteEnd = useRef(new THREE.Vector3(0, 0, 0));
  const redEnd = useRef(new THREE.Vector3(0, 0, 0));
  const activeRef = useRef(active);
  const pathRef = useRef(pathHighlight);
  const prevStateRef = useRef({ isLit: false, onPath: false });
  const overlayWhiteRef = useRef(false);
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
  /** Path pass only — red saber body (no white center). */
  const bloomMat = useMemo(
    () =>
      new LineMaterial({
        color: '#ff050a',
        linewidth: 4,
        transparent: true,
        opacity: 0.78,
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
    const isLit = activeRef.current;
    const onPath = pathRef.current;
    const wasLit = prevStateRef.current.isLit;
    const wasOnPath = prevStateRef.current.onPath;
    prevStateRef.current = { isLit, onPath };

    // Path ignition always starts with a visible red segment so it never looks blank.
    if (isLit && onPath && (!wasLit || !wasOnPath)) {
      const transitionedFromWhite = wasLit && !wasOnPath;
      overlayWhiteRef.current = transitionedFromWhite;
      const stub = transitionedFromWhite ? 0.12 : 0.05;
      const sx = start[0];
      const sy = start[1];
      const sz = start[2];
      redEnd.current.set(
        sx + (end[0] - sx) * stub,
        sy + (end[1] - sy) * stub,
        sz + (end[2] - sz) * stub,
      );
    }

    const target = progress > 0.01 ? new THREE.Vector3(...end) : new THREE.Vector3(...start);
    // White channel follows normal branch visibility.
    whiteEnd.current.lerp(target, delta * 6);
    // Red channel animates selected path.
    if (isLit && onPath) redEnd.current.lerp(target, delta * 1.85);
    else redEnd.current.lerp(new THREE.Vector3(...start), delta * 8);

    coreMat.resolution.set(size.width, size.height);
    glowMat.resolution.set(size.width, size.height);
    bloomMat.resolution.set(size.width, size.height);
    dimMat.resolution.set(size.width, size.height);

    const whitePositions = [start[0], start[1], start[2], whiteEnd.current.x, whiteEnd.current.y, whiteEnd.current.z];
    const whiteRemainderPositions = [redEnd.current.x, redEnd.current.y, redEnd.current.z, target.x, target.y, target.z];
    const redPositions = [start[0], start[1], start[2], redEnd.current.x, redEnd.current.y, redEnd.current.z];
    const showWhiteRemainder = isLit && onPath && overlayWhiteRef.current;
    const redReachedTarget = redEnd.current.distanceTo(target) < 0.03;
    if (overlayWhiteRef.current && redReachedTarget) overlayWhiteRef.current = false;

    // Path stays red-only; optional white remainder is only ahead of the red tip during handoff.
    if (isLit && onPath) {
      coreGeo.setPositions(showWhiteRemainder ? whiteRemainderPositions : redPositions);
      glowGeo.setPositions(redPositions);
    } else {
      coreGeo.setPositions(whitePositions);
      glowGeo.setPositions(whitePositions);
    }
    bloomGeo.setPositions(redPositions);
    dimGeo.setPositions(whitePositions);

    core.visible = isLit && (!onPath || showWhiteRemainder);
    glow.visible = isLit;
    bloom.visible = isLit && onPath;
    dim.visible = !isLit;

    // Path: red-only saber pass. Non-path lit edges stay white/cool.
    if (isLit) {
      if (onPath) {
        if (showWhiteRemainder) {
          coreMat.linewidth = 1.15;
          coreMat.color.setRGB(1, 1, 1);
          coreMat.opacity = 0.78;
        } else {
          // Hidden by visibility rule; keep sane defaults.
          coreMat.linewidth = 0.9;
          coreMat.color.setRGB(1, 0.52, 0.5);
          coreMat.opacity = 0.92;
        }
        glowMat.linewidth = 2.7;
        glowMat.color.setRGB(1, 0.08, 0.16);
        glowMat.opacity = 0.86;
        bloomMat.linewidth = 4.8;
        bloomMat.color.setRGB(1, 0.03, 0.09);
        bloomMat.opacity = 0.58;
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
