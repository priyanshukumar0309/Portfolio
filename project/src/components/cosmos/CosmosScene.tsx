import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Starfield from './Starfield';
import CameraController from './CameraController';
import { useSpace } from '@/context/SpaceContext';
import { useIsMobile } from '@/hooks/useIsMobile';

/** Approximate mobile `StatusBar` stack height so nodes sit in the band between HUD and the detail sheet. */
const MOBILE_TOP_HUD_OFFSET = '4.75rem';

export default function CosmosScene({ children }: { children?: React.ReactNode }) {
  const { activePanel, panelCollapsed, mobilePanelHeightVh } = useSpace();
  const isMobile = useIsMobile();

  // Mobile: node canvas fills only the strip above the bottom sheet; desktop stays full viewport.
  const mobileSheetOpen = isMobile && activePanel && !panelCollapsed;
  const canvasStyle: React.CSSProperties = mobileSheetOpen
    ? {
        position: 'fixed',
        top: MOBILE_TOP_HUD_OFFSET,
        left: 0,
        width: '100%',
        height: `calc(100dvh - ${MOBILE_TOP_HUD_OFFSET} - ${mobilePanelHeightVh}dvh)`,
        background: '#020408',
        touchAction: 'none',
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#020408',
        touchAction: 'none',
      };

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        // Match clear color to CSS background; sRGB output avoids muddy / banded darks when compositing with HUD layers.
        gl.setClearColor('#020408', 1);
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      style={canvasStyle}
      gl={{ antialias: true, alpha: false }}
    >
      <CameraController />
      <Starfield />
      {children}
    </Canvas>
  );
}
