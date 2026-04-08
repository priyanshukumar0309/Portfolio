import { useCallback, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useSpace } from '@/context/SpaceContext';
import { portfolioTree } from '@/data/portfolioData';
import type { NodeData } from '@/data/types';
import NodePoint from '@/components/nexus/NodePoint';
import NodeLine from '@/components/nexus/NodeLine';

export default function NodeTree() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const nodeScale = isMobile ? 0.62 : 1;
  const [expandedL2, setExpandedL2] = useState<Set<string>>(new Set());

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
      if (node.level === 1 && !expandedNodes.has(node.id)) expandNode(node);
      if (node.level === 2 && node.children?.length) setExpandedL2(new Set([node.id]));
      else if (node.level === 2) setExpandedL2(new Set());
      else if (node.level >= 3) {
        const parentL2 = findL2ParentId(node.id);
        if (parentL2) setExpandedL2(new Set([parentL2]));
      }
      return;
    }

    if (node.level === 1) {
      addLog(`NAVIGATING → ${node.label.toUpperCase()}`);
      if (!expandedNodes.has(node.id)) expandNode(node);
      setExpandedL2(new Set());
      focusNode(node);
    } else if (node.level === 2) {
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
      openPanel(node);
    }
  }, [activePanel, addLog, expandNode, expandedNodes, focusNode, l1Nodes, openPanel]);

  const handleCenterClick = useCallback(() => {
    addLog('RETURNING TO ORIGIN');
    setExpandedL2(new Set());
    returnToNexus();
  }, [returnToNexus, addLog]);

  if (!isActivated) return null;

  return (
    <group scale={[nodeScale, nodeScale, nodeScale]}>
      {l1Nodes.map((l1) => {
        const isL1Expanded = expandedNodes.has(l1.id);
        const isL1Active = currentNode?.id === l1.id;
        const isChildActive = !!(currentNode && l1.children?.some(c => c.id === currentNode.id || c.children?.some(gc => gc.id === currentNode.id)));
        const isL1OnPath = isL1Active || isChildActive;
        const isCareerBranch = l1.id === 'career-history';

        return (
          <group key={l1.id}>
            <NodeLine startId={portfolioTree.id} endId={l1.id} active={isL1OnPath} progress={1} positionsRef={nodePositionsRef} />
            <NodePoint node={l1} visible onNodeClick={handleNodeClick} active={isL1Active} showSubtitle={false} onPositionUpdate={onPositionUpdate} />
            {l1.children?.map((l2) => {
              const isL2Active = currentNode?.id === l2.id;
              const isL2ChildActive = !!(currentNode && l2.children?.some(c => c.id === currentNode.id));
              const isL2OnPath = isL2Active || isL2ChildActive;
              const isL2Expanded = expandedL2.has(l2.id) || isL2ChildActive;
              return (
                <group key={l2.id}>
                  <NodeLine startId={l1.id} endId={l2.id} active={isL2OnPath} progress={isL1Expanded ? 1 : 0} positionsRef={nodePositionsRef} />
                  <NodePoint node={l2} visible={isL1Expanded} onNodeClick={handleNodeClick} active={isL2Active} showSubtitle={isCareerBranch} onPositionUpdate={onPositionUpdate} />
                  {l2.children?.map((l3) => {
                    const isL3Active = currentNode?.id === l3.id;
                    return (
                      <group key={l3.id}>
                        <NodeLine startId={l2.id} endId={l3.id} active={isL3Active} progress={isL1Expanded && isL2Expanded ? 1 : 0} positionsRef={nodePositionsRef} />
                        <NodePoint node={l3} visible={isL1Expanded && isL2Expanded} onNodeClick={handleNodeClick} active={isL3Active} showSubtitle onPositionUpdate={onPositionUpdate} />
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
              className="relative flex cursor-pointer items-center gap-3 rounded-full border border-cyan-200/35 bg-gradient-to-r from-cyan-300/22 via-white/14 to-indigo-400/20 px-4 py-2 shadow-[0_0_32px_rgba(56,189,248,0.35),0_0_60px_rgba(99,102,241,0.18)] backdrop-blur-md transition-all duration-300 hover:border-cyan-100/45 hover:from-cyan-200/30 hover:to-indigo-300/28 hover:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
              onClick={(e) => {
                e.stopPropagation();
                handleCenterClick();
              }}
            >
              <span
                className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-50 transition-colors duration-300"
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
