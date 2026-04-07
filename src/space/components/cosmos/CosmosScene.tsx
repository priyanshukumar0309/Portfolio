import { Canvas } from "@react-three/fiber";
import { useSpace } from "@/space/context/SpaceContext";
import { useIsMobile } from "@/space/hooks/useIsMobile";
import CameraController from "@/space/components/cosmos/CameraController";
import Starfield from "@/space/components/cosmos/Starfield";

export default function CosmosScene({ children }: { children?: React.ReactNode }) {
  const { activePanel, panelCollapsed } = useSpace();
  const isMobile = useIsMobile();
  const canvasHeight = isMobile && activePanel && !panelCollapsed ? "50dvh" : "100%";

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ position: "fixed", inset: 0, width: "100%", height: canvasHeight, background: "#020408" }}>
      <CameraController />
      <Starfield />
      {children}
    </Canvas>
  );
}
