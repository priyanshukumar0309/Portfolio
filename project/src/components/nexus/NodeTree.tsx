import { useCallback, useState } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useSpace } from '@/context/SpaceContext';
import { portfolioTree } from '@/data/portfolioData';
import type { NodeData } from '@/data/types';
import NodePoint from './NodePoint';
import NodeLine from './NodeLine';

export default function NodeTree() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const nodeScale = isMobile ? 0.62 : 1;
  const [expandedL2, setExpandedL2] = useState<Set<string>>(new Set());

  const {
    isActivated,
    expandedNodes,
    currentNode,
    activePanel,
    expandNode,
    focusNode,
    openPanel,
    returnToNexus,
    addLog,
  } = useSpace();
  const l1Nodes = portfolioTree.children || [];

  const handleNodeClick = useCallback(
    (node: NodeData) => {
      const findL2ParentId = (targetId: string): string | null => {
        for (const l1 of l1Nodes) {
          for (const l2 of l1.children ?? []) {
            if (l2.id === targetId) return l2.id;
            if (l2.children?.some((c) => c.id === targetId)) return l2.id;
          }
        }
        return null;
      };

      if (activePanel) {
        addLog(`SWITCHING NODE :: ${node.label.toUpperCase()}`);
        openPanel(node);
        if (node.level === 1 && !expandedNodes.has(node.id)) {
          expandNode(node);
        }
        if (node.level === 2 && node.children?.length) {
          setExpandedL2(new Set([node.id]));
        } else if (node.level === 2) {
          setExpandedL2(new Set());
        } else if (node.level >= 3) {
          const parentL2 = findL2ParentId(node.id);
          if (parentL2) setExpandedL2(new Set([parentL2]));
        }
        return;
      }

      if (node.level === 1) {
        addLog(`NAVIGATING → ${node.label.toUpperCase()}`);
        if (!expandedNodes.has(node.id)) {
          expandNode(node);
        }
        setExpandedL2(new Set());
        focusNode(node);
      } else if (node.level === 2) {
        if (node.children?.length) {
          addLog(`EXPANDING NODE :: ${node.label.toUpperCase()}`);
          setExpandedL2(new Set([node.id]));
          openPanel(node);
        } else {
          addLog(`ACCESSING NODE :: ${node.label.toUpperCase()}`);
          setExpandedL2(new Set());
          openPanel(node);
        }
      } else if (node.level >= 3) {
        addLog(`ACCESSING NODE :: ${node.label.toUpperCase()}`);
        const parentL2 = findL2ParentId(node.id);
        if (parentL2) setExpandedL2(new Set([parentL2]));
        openPanel(node);
      }
    },
    [activePanel, expandedNodes, expandNode, focusNode, openPanel, addLog, l1Nodes],
  );

  const handleCenterClick = useCallback(() => {
    addLog('RETURNING TO ORIGIN');
    setExpandedL2(new Set());
    returnToNexus();
  }, [returnToNexus, addLog]);

  if (!isActivated) return null;

  return (
    <group scale={[nodeScale, nodeScale, nodeScale]}>
      {l1Nodes.map(l1 => {
        const isL1Expanded = expandedNodes.has(l1.id);
        const isL1Active = currentNode?.id === l1.id;
        const isChildActive = !!(
          currentNode &&
          l1.children?.some(c => c.id === currentNode.id || c.children?.some(gc => gc.id === currentNode.id))
        );
        const isL1OnPath = isL1Active || isChildActive;
        const isCareerBranch = l1.id === 'career-history';

        return (
          <group key={l1.id}>
            <NodeLine
              start={portfolioTree.position}
              end={l1.position}
              active={isL1OnPath}
              progress={1}
            />
            <NodePoint
              node={l1}
              visible
              onNodeClick={handleNodeClick}
              active={isL1Active}
              showSubtitle={false}
            />

            {l1.children?.map(l2 => {
              const isL2Active = currentNode?.id === l2.id;
              const isL2ChildActive = !!(currentNode && l2.children?.some(c => c.id === currentNode.id));
              const isL2OnPath = isL2Active || isL2ChildActive;
              const isL2Expanded = expandedL2.has(l2.id) || !!(currentNode && l2.children?.some(c => c.id === currentNode.id));
              return (
                <group key={l2.id}>
                  <NodeLine
                    start={l1.position}
                    end={l2.position}
                    active={isL2OnPath}
                    progress={isL1Expanded ? 1 : 0}
                  />
                  <NodePoint
                    node={l2}
                    visible={isL1Expanded}
                    onNodeClick={handleNodeClick}
                    active={isL2Active}
                    showSubtitle={isCareerBranch}
                  />
                  {l2.children?.map(l3 => {
                    const isL3Active = currentNode?.id === l3.id;
                    return (
                      <group key={l3.id}>
                        <NodeLine
                          start={l2.position}
                          end={l3.position}
                          active={isL3Active}
                          progress={isL1Expanded && isL2Expanded ? 1 : 0}
                        />
                        <NodePoint
                          node={l3}
                          visible={isL1Expanded && isL2Expanded}
                          onNodeClick={handleNodeClick}
                          active={isL3Active}
                          showSubtitle
                        />
                      </group>
                    );
                  })}
                </group>
              );
            })}
          </group>
        );
      })}

      <group position={[0, 0, 0]}>
        <Html center style={{ pointerEvents: 'auto', userSelect: 'none' }}>
          <div
            className="flex items-center gap-3 cursor-pointer group px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 bg-black/55 backdrop-blur-md transition-all duration-300 hover:bg-black/70 hover:border-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleCenterClick();
            }}
          >
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white/55 group-hover:text-white/85 uppercase transition-colors duration-300 whitespace-nowrap">
              KUMAR PRIYANSHU
            </span>
          </div>
        </Html>
      </group>
    </group>
  );
}
