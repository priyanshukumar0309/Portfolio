import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CosmosMode, NodeData } from '@/data/types';
import { portfolioTree } from '@/data/portfolioData';

export interface LogEntry {
  time: string;
  msg: string;
}

interface SpaceState {
  cosmosMode: CosmosMode;
  isActivated: boolean;
  currentNode: NodeData | null;
  expandedNodes: Set<string>;
  activePanel: NodeData | null;
  panelCollapsed: boolean;
  cameraTarget: [number, number, number];
  breadcrumb: string[];
  logs: LogEntry[];
}

interface SpaceActions {
  activate: () => void;
  deactivate: () => void;
  focusNode: (node: NodeData) => void;
  expandNode: (node: NodeData) => void;
  openPanel: (node: NodeData) => void;
  closePanel: () => void;
  setPanelCollapsed: (collapsed: boolean) => void;
  returnToNexus: () => void;
  navigateBack: () => void;
  setCosmosMode: (mode: CosmosMode) => void;
  addLog: (msg: string) => void;
}

type SpaceContextType = SpaceState & SpaceActions;

const SpaceContext = createContext<SpaceContextType | null>(null);

function findParent(tree: NodeData, targetId: string, parent: NodeData | null = null): NodeData | null {
  if (tree.id === targetId) return parent;
  if (tree.children) {
    for (const child of tree.children) {
      const result = findParent(child, targetId, tree);
      if (result) return result;
    }
  }
  return null;
}

export function SpaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SpaceState>({
    cosmosMode: 'idle',
    isActivated: false,
    currentNode: null,
    expandedNodes: new Set<string>(),
    activePanel: null,
    panelCollapsed: false,
    cameraTarget: [0, 0, 5],
    breadcrumb: [],
    logs: [],
  });

  const activate = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActivated: true,
      cosmosMode: 'warp',
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        cosmosMode: 'idle',
      }));
    }, 1200);
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        activePanel: portfolioTree,
      }));
    }, 1600);
  }, []);

  const deactivate = useCallback(() => {
    setState(prev => ({
      ...prev,
      cosmosMode: 'warp',
      currentNode: null,
      activePanel: null,
      panelCollapsed: false,
      expandedNodes: new Set<string>(),
      breadcrumb: [],
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isActivated: false,
        cosmosMode: 'idle',
        cameraTarget: [0, 0, 5],
      }));
    }, 800);
  }, []);

  const focusNode = useCallback((node: NodeData) => {
    const [x, y] = node.position;
    setState(prev => ({
      ...prev,
      currentNode: node,
      cosmosMode: 'warp',
      cameraTarget: [x, y, 5],
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        cosmosMode: 'focus',
      }));
    }, 800);
  }, []);

  const expandNode = useCallback((node: NodeData) => {
    setState(prev => {
      const newBreadcrumb = node.level === 1
        ? [node.label]
        : [...prev.breadcrumb, node.label];
      return {
        ...prev,
        expandedNodes: new Set<string>([node.id]),
        currentNode: node,
        breadcrumb: newBreadcrumb,
      };
    });
  }, []);

  const openPanel = useCallback((node: NodeData) => {
    setState(prev => ({
      ...prev,
      activePanel: node,
      currentNode: node,
    }));
  }, []);

  const closePanel = useCallback(() => {
    setState(prev => ({
      ...prev,
      activePanel: null,
      panelCollapsed: false,
    }));
  }, []);

  const setPanelCollapsed = useCallback((collapsed: boolean) => {
    setState(prev => ({ ...prev, panelCollapsed: collapsed }));
  }, []);

  const returnToNexus = useCallback(() => {
    setState(prev => ({
      ...prev,
      cosmosMode: 'warp',
      currentNode: null,
      expandedNodes: new Set<string>(),
      breadcrumb: [],
      activePanel: portfolioTree,
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        cosmosMode: 'idle',
        cameraTarget: [0, 0, 5],
      }));
    }, 800);
  }, []);

  const navigateBack = useCallback(() => {
    setState(prev => {
      if (!prev.currentNode) return prev;
      const parent = findParent(portfolioTree, prev.currentNode.id);
      if (!parent || parent.id === 'nexus') {
        return {
          ...prev,
          cosmosMode: 'warp' as CosmosMode,
          currentNode: null,
          expandedNodes: new Set<string>(),
          breadcrumb: [],
        };
      }
      const [px, py] = parent.position;
      const newBreadcrumb = parent.level === 1 ? [parent.label] : prev.breadcrumb.slice(0, -1);
      return {
        ...prev,
        cosmosMode: 'warp' as CosmosMode,
        currentNode: parent,
        cameraTarget: [px, py, 5] as [number, number, number],
        breadcrumb: newBreadcrumb,
      };
    });
    setTimeout(() => {
      setState(prev => {
        if (!prev.currentNode) {
          return { ...prev, cosmosMode: 'idle', cameraTarget: [0, 0, 5] };
        }
        return { ...prev, cosmosMode: 'focus' };
      });
    }, 800);
  }, []);

  const addLog = useCallback((msg: string) => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);
    setState(prev => ({
      ...prev,
      logs: [...prev.logs.slice(-49), { time, msg }],
    }));
  }, []);

  const setCosmosMode = useCallback((mode: CosmosMode) => {
    setState(prev => ({ ...prev, cosmosMode: mode }));
  }, []);

  return (
    <SpaceContext.Provider
      value={{
        ...state,
        activate,
        deactivate,
        focusNode,
        expandNode,
        openPanel,
        closePanel,
        setPanelCollapsed,
        returnToNexus,
        navigateBack,
        setCosmosMode,
        addLog,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
}

export function useSpace() {
  const ctx = useContext(SpaceContext);
  if (!ctx) throw new Error('useSpace must be used within SpaceProvider');
  return ctx;
}
