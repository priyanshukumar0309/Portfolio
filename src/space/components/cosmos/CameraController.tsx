import { useFrame } from "@react-three/fiber";
import { useSpace } from "@/space/context/SpaceContext";

export default function CameraController() {
  const { cameraTarget } = useSpace();

  useFrame(({ camera }, delta) => {
    camera.position.x += (cameraTarget[0] - camera.position.x) * delta * 2;
    camera.position.y += (cameraTarget[1] - camera.position.y) * delta * 2;
    camera.position.z += (cameraTarget[2] - camera.position.z) * delta * 2;
    camera.lookAt(cameraTarget[0], cameraTarget[1], 0);
  });

  return null;
}
