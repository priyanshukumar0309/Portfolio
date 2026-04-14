import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Starfield from './Starfield';
import CameraController from './CameraController';
import { useSpace } from '@/context/SpaceContext';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function CosmosScene({ children }: { children?: React.ReactNode }) {
  const { activePanel, panelCollapsed } = useSpace();
  const isMobile = useIsMobile();
  const canvasHeight = isMobile && activePanel && !panelCollapsed ? '50dvh' : '100%';

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        // Match clear color to CSS background; sRGB output avoids muddy / banded darks when compositing with HUD layers.
        gl.setClearColor('#020408', 1);
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: canvasHeight,
        background: '#020408',
        touchAction: 'none',
      }}
      gl={{ antialias: true, alpha: false }}
    >
      <CameraController />
      <Starfield />
      {children}
    </Canvas>
  );
}
