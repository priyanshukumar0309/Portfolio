import { useMemo } from "react";

export default function Starfield() {
  const stars = useMemo(
    () =>
      new Array(1200).fill(0).map(() => [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
      ]),
    [],
  );

  return (
    <group>
      {stars.map((s, idx) => (
        <mesh key={idx} position={[s[0], s[1], s[2]]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}
