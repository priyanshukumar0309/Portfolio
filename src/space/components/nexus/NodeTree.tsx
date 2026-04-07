import NodePoint from "@/space/components/nexus/NodePoint";
import { portfolioTree } from "@/space/data/portfolioData";
import type { NodeData } from "@/space/data/types";
import { useSpace } from "@/space/context/SpaceContext";

export default function NodeTree() {
  const { isActivated, expandedNodes, expandNode, openPanel, focusNode, returnToNexus } = useSpace();
  if (!isActivated) return null;

  const onNodeClick = (node: NodeData) => {
    if (node.id === "nexus") returnToNexus();
    if (node.level === 1) {
      expandNode(node);
      focusNode(node);
      openPanel(node);
      return;
    }
    openPanel(node);
  };

  return (
    <group>
      <NodePoint node={portfolioTree} onNodeClick={onNodeClick} />
      {(portfolioTree.children ?? []).map((l1) => (
        <group key={l1.id}>
          <NodePoint node={l1} onNodeClick={onNodeClick} />
          {expandedNodes.has(l1.id) &&
            (l1.children ?? []).map((l2) => <NodePoint key={l2.id} node={l2} onNodeClick={onNodeClick} />)}
        </group>
      ))}
    </group>
  );
}
