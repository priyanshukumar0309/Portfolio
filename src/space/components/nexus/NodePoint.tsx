import { Html } from "@react-three/drei";
import type { NodeData } from "@/space/data/types";

interface NodePointProps {
  node: NodeData;
  onNodeClick: (node: NodeData) => void;
}

export default function NodePoint({ node, onNodeClick }: NodePointProps) {
  return (
    <group position={node.position}>
      <Html center>
        <button
          className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white/80 font-mono text-[11px] tracking-[0.12em] uppercase"
          onClick={(e) => {
            e.stopPropagation();
            onNodeClick(node);
          }}
        >
          {node.label}
        </button>
      </Html>
    </group>
  );
}
