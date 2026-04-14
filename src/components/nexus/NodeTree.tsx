import { useCallback, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useSpace } from '@/context/SpaceContext';
import { portfolioTree } from '@/data/portfolioData';
import type { NodeData } from '@/data/types';
import NodePoint from '@/components/nexus/NodePoint';
import NodeLine from '@/components/nexus/NodeLine';

/** Root-to-node id chain (inclusive); null if `targetId` is not under `root`. */
function findNodePathFromRoot(root: NodeData, targetId: string): string[] | null {
  if (root.id === targetId) return [root.id];
  for (const child of root.children ?? []) {
    const sub = findNodePathFromRoot(child, targetId);
    if (sub) return [root.id, ...sub];
  }
  return null;
}

/** Undirected parent|child keys for each step on the selection path (for edge matching). */
function pathParentChildKeys(chain: string[] | null): Set<string> {
  if (!chain || chain.length < 2) return new Set();
  const s = new Set<string>();
  for (let i = 0; i < chain.length - 1; i++) {
    s.add(`${chain[i]}|${chain[i + 1]}`);
  }
  return s;
}

export default function NodeTree() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const nodeScale = isMobile ? 0.62 : 1;
  const [expandedL2, setExpandedL2] = useState<Set<string>>(new Set());
  const [expandedL1, setExpandedL1] = useState<string | null>(null);

  const { isActivated, expandedNodes, currentNode, activePanel, expandNode, focusNode, openPanel, returnToNexus, addLog } = useSpace();
  const l1Nodes = portfolioTree.children || [];
  const nodePositionsRef = useRef<Record<string, [number, number, number]>>({});

  useMemo(() => {
    const map: Record<string, [number, number, number]> = {};
    const walk = (node: NodeData) => {
      map[node.id] = node.position;
      node.children?.forEach(walk);
    };
    walk(portfolioTree);
    nodePositionsRef.current = map;
  }, []);

  const onPositionUpdate = useCallback((id: string, pos: [number, number, number]) => {
    nodePositionsRef.current[id] = pos;
  }, []);

  const handleNodeClick = useCallback((node: NodeData) => {
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
      if (node.level === 1) {
        if (!expandedNodes.has(node.id)) expandNode(node);
        setExpandedL1(node.id);
        setExpandedL2(new Set());
      }
      if (node.level === 2 && node.children?.length) setExpandedL2(new Set([node.id]));
      else if (node.level === 2) setExpandedL2(new Set());
      else if (node.level >= 3) {
        const parentL2 = findL2ParentId(node.id);
        if (parentL2) setExpandedL2(new Set([parentL2]));
        for (const l1 of l1Nodes) {
          if (l1.children?.some((c) => c.id === parentL2)) {
            setExpandedL1(l1.id);
            break;
          }
        }
      }
      return;
    }

    if (node.level === 1) {
      addLog(`NAVIGATING → ${node.label.toUpperCase()}`);
      if (!expandedNodes.has(node.id)) expandNode(node);
      setExpandedL1(node.id);
      setExpandedL2(new Set());
      focusNode(node);
      openPanel(node);
    } else if (node.level === 2) {
      for (const l1 of l1Nodes) {
        if (l1.children?.some((c) => c.id === node.id)) {
          setExpandedL1(l1.id);
          break;
        }
      }
      if (node.children?.length) {
        addLog(`EXPANDING NODE :: ${node.label.toUpperCase()}`);
        setExpandedL2(new Set([node.id]));
      } else {
        addLog(`ACCESSING NODE :: ${node.label.toUpperCase()}`);
        setExpandedL2(new Set());
      }
      openPanel(node);
    } else if (node.level >= 3) {
      addLog(`ACCESSING NODE :: ${node.label.toUpperCase()}`);
      const parentL2 = findL2ParentId(node.id);
      if (parentL2) setExpandedL2(new Set([parentL2]));
      for (const l1 of l1Nodes) {
        if (l1.children?.some((c) => c.id === parentL2)) {
          setExpandedL1(l1.id);
          break;
        }
      }
      openPanel(node);
    }
  }, [activePanel, addLog, expandNode, expandedNodes, focusNode, l1Nodes, openPanel]);

  const handleCenterClick = useCallback(() => {
    addLog('RETURNING TO ORIGIN');
    setExpandedL1(null);
    setExpandedL2(new Set());
    returnToNexus();
  }, [returnToNexus, addLog]);

  const activeId = activePanel?.id ?? currentNode?.id;
  const pathEdges = useMemo(() => {
    if (!activeId || activeId === portfolioTree.id) return new Set<string>();
    const chain = findNodePathFromRoot(portfolioTree, activeId);
    return pathParentChildKeys(chain);
  }, [activeId]);

  if (!isActivated) return null;

  return (
    <group scale={[nodeScale, nodeScale, nodeScale]}>
      {l1Nodes.map((l1) => {
        const isOriginView = activePanel?.id === portfolioTree.id;
        const isL1Expanded = expandedL1 === l1.id || expandedNodes.has(l1.id);
        const isL1Active = activeId === l1.id;
        const isChildActive = !!(activeId && l1.children?.some(c => c.id === activeId || c.children?.some(gc => gc.id === activeId)));
        const isL1OnPath = isL1Active || isChildActive;
        return (
          <group key={l1.id}>
            <NodeLine
              startId={portfolioTree.id}
              endId={l1.id}
              active={isOriginView || isL1OnPath || isL1Expanded}
              pathHighlight={pathEdges.has(`${portfolioTree.id}|${l1.id}`)}
              progress={1}
              positionsRef={nodePositionsRef}
            />
            <NodePoint node={l1} visible onNodeClick={handleNodeClick} active={isL1Active} onPositionUpdate={onPositionUpdate} />
            {l1.children?.map((l2) => {
              const isL2Active = activeId === l2.id;
              const isL2ChildActive = !!(activeId && l2.children?.some(c => c.id === activeId));
              const isL2OnPath = isL2Active || isL2ChildActive;
              const isL2Expanded = expandedL2.has(l2.id) || isL2ChildActive;
              return (
                <group key={l2.id}>
                  <NodeLine
                    startId={l1.id}
                    endId={l2.id}
                    active={isL2OnPath || isL1Expanded}
                    pathHighlight={pathEdges.has(`${l1.id}|${l2.id}`)}
                    progress={isL1Expanded ? 1 : 0}
                    positionsRef={nodePositionsRef}
                  />
                  <NodePoint node={l2} visible={isL1Expanded} onNodeClick={handleNodeClick} active={isL2Active} onPositionUpdate={onPositionUpdate} />
                  {l2.children?.map((l3) => {
                    const isL3Active = activeId === l3.id;
                    return (
                      <group key={l3.id}>
                        <NodeLine
                          startId={l2.id}
                          endId={l3.id}
                          active={isL3Active || (isL1Expanded && isL2Expanded)}
                          pathHighlight={pathEdges.has(`${l2.id}|${l3.id}`)}
                          progress={isL1Expanded && isL2Expanded ? 1 : 0}
                          positionsRef={nodePositionsRef}
                        />
                        <NodePoint node={l3} visible={isL1Expanded && isL2Expanded} onNodeClick={handleNodeClick} active={isL3Active} onPositionUpdate={onPositionUpdate} />
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
          {/* Nebula halo + cyan/indigo pill so origin reads as the energy source (not flat white). */}
          <div className="relative flex items-center justify-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-400/35 via-indigo-500/25 to-cyan-300/20 blur-2xl opacity-90"
              aria-hidden
            />
            <div
              className="relative flex min-h-[40px] cursor-pointer items-center justify-center gap-3 rounded-full border border-cyan-200/35 bg-gradient-to-r from-cyan-300/22 via-white/14 to-indigo-400/20 px-4 py-2.5 shadow-[0_0_32px_rgba(56,189,248,0.35),0_0_60px_rgba(99,102,241,0.18)] backdrop-blur-md transition-all duration-300 hover:border-cyan-100/45 hover:from-cyan-200/30 hover:to-indigo-300/28 hover:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
              onClick={(e) => {
                e.stopPropagation();
                handleCenterClick();
              }}
            >
              <span
                className="whitespace-nowrap font-display text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-cyan-50 transition-colors duration-300"
                style={{
                  color: "rgb(236 254 255)",
                  textShadow: "0 0 14px rgba(103,232,249,0.75), 0 0 28px rgba(99,102,241,0.35)",
                }}
              >
                KUMAR PRIYANSHU
              </span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
