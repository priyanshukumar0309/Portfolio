import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

const SABER_COLORS = [
  new THREE.Color(1.0, 0.18, 0.18),
  new THREE.Color(0.18, 0.52, 1.0),
];

let _edgeCounter = 0;

interface NodeLineProps {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
  progress: number;
}

export default function NodeLine({ start, end, active, progress }: NodeLineProps) {
  const currentEnd = useRef(new THREE.Vector3(...start));
  const targetEnd = useMemo(() => new THREE.Vector3(...end), [end]);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);

  const saberColorIdx = useRef(_edgeCounter++ % 2);

  const initPositions = useMemo(() => [start[0], start[1], start[2], start[0], start[1], start[2] + 0.001], []);

  const coreGeo = useMemo(() => { const g = new LineGeometry(); g.setPositions(initPositions); return g; }, []);
  const outerGeo = useMemo(() => { const g = new LineGeometry(); g.setPositions(initPositions); return g; }, []);
  const haloGeo = useMemo(() => { const g = new LineGeometry(); g.setPositions(initPositions); return g; }, []);
  const dimGeo = useMemo(() => { const g = new LineGeometry(); g.setPositions(initPositions); return g; }, []);

  const initialColor = SABER_COLORS[saberColorIdx.current];

  const coreMat = useMemo(() => new LineMaterial({
    color: '#ffffff',
    linewidth: 1.8,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  }), []);

  const outerMat = useMemo(() => new LineMaterial({
    color: initialColor,
    linewidth: 5,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  }), []);

  const haloMat = useMemo(() => new LineMaterial({
    color: initialColor,
    linewidth: 14,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  }), []);

  const dimMat = useMemo(() => new LineMaterial({
    color: '#ffffff',
    linewidth: 1,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  }), []);

  const coreL2 = useMemo(() => new Line2(coreGeo, coreMat), [coreGeo, coreMat]);
  const outerL2 = useMemo(() => new Line2(outerGeo, outerMat), [outerGeo, outerMat]);
  const haloL2 = useMemo(() => new Line2(haloGeo, haloMat), [haloGeo, haloMat]);
  const dimL2 = useMemo(() => new Line2(dimGeo, dimMat), [dimGeo, dimMat]);

  useFrame(({ size }, delta) => {
    const target = progress > 0.01 ? targetEnd : startVec;
    currentEnd.current.lerp(target, delta * 4);

    coreMat.resolution.set(size.width, size.height);
    outerMat.resolution.set(size.width, size.height);
    haloMat.resolution.set(size.width, size.height);
    dimMat.resolution.set(size.width, size.height);

    const positions = [
      start[0], start[1], start[2],
      currentEnd.current.x, currentEnd.current.y, currentEnd.current.z,
    ];

    coreGeo.setPositions(positions);
    outerGeo.setPositions(positions);
    haloGeo.setPositions(positions);
    dimGeo.setPositions(positions);

    coreMat.opacity = active ? 0.95 : 0;
    outerMat.opacity = active ? 0.65 : 0;
    haloMat.opacity = active ? 0.2 : 0;
    dimMat.opacity = active ? 0 : 0.1;

    coreL2.visible = active;
    outerL2.visible = active;
    haloL2.visible = active;
    dimL2.visible = !active;

  });

  return (
    <group>
      <primitive object={haloL2} />
      <primitive object={outerL2} />
      <primitive object={coreL2} />
      <primitive object={dimL2} />
    </group>
  );
}
