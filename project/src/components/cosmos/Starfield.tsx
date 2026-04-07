import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpace } from '@/context/SpaceContext';

const STAR_COUNT = 6500;
const SPREAD = 80;

export default function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const { cosmosMode } = useSpace();
  const velocitiesRef = useRef<Float32Array>(new Float32Array(STAR_COUNT));
  const warpRef = useRef(0);

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const sz = new Float32Array(STAR_COUNT);
    const col = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = Math.pow(Math.random(), 0.5) * SPREAD * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;

      sz[i] = Math.pow(Math.random(), 2) * 1.2 + 0.15;

      const starType = Math.random();
      if (starType < 0.12) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
      } else if (starType < 0.22) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 0.7;
      } else if (starType < 0.28) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 0.6;
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0;
      }
    }
    return { positions: pos, sizes: sz, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const vels = velocitiesRef.current;

    const targetWarp = cosmosMode === 'warp' ? 1 : 0;
    warpRef.current += (targetWarp - warpRef.current) * delta * 3;
    const warpFactor = warpRef.current;

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      if (warpFactor > 0.1) {
        vels[i] += delta * 40 * warpFactor;
        vels[i] = Math.min(vels[i], 80);
      } else {
        vels[i] *= 0.93;
      }

      posArray[i3 + 2] += (vels[i] + 0.015) * delta;

      if (posArray[i3 + 2] > SPREAD / 2) {
        const r = Math.pow(Math.random(), 0.5) * SPREAD * 0.5;
        const theta = Math.random() * Math.PI * 2;
        posArray[i3] = r * Math.cos(theta);
        posArray[i3 + 1] = r * Math.sin(theta);
        posArray[i3 + 2] = -SPREAD / 2;
        vels[i] = 0;
      }
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.z += delta * 0.003;
  });

  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depth = smoothstep(-40.0, 0.0, position.z);
          gl_PointSize = size * (160.0 / -mvPosition.z) * (0.4 + depth * 0.6);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = depth * 0.7 + 0.06;
          vColor = color;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          float glow = smoothstep(0.5, 0.1, d) * 0.4;
          float alpha = (core + glow) * vAlpha;
          gl_FragColor = vec4(vColor * (0.9 + core * 0.1), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <points ref={pointsRef} material={starMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={STAR_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={STAR_COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-color" array={colors} count={STAR_COUNT} itemSize={3} />
      </bufferGeometry>
    </points>
  );
}
