import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { portfolioTree } from "@/space/data/portfolioData";
import type { CosmosMode, NodeData } from "@/space/data/types";

interface SpaceState {
  cosmosMode: CosmosMode;
  isActivated: boolean;
  currentNode: NodeData | null;
  expandedNodes: Set<string>;
  activePanel: NodeData | null;
  panelCollapsed: boolean;
  cameraTarget: [number, number, number];
  breadcrumb: string[];
}

interface SpaceActions {
  activate: () => void;
  focusNode: (node: NodeData) => void;
  expandNode: (node: NodeData) => void;
  openPanel: (node: NodeData) => void;
  closePanel: () => void;
  setPanelCollapsed: (collapsed: boolean) => void;
  returnToNexus: () => void;
}

type SpaceContextType = SpaceState & SpaceActions;
const SpaceContext = createContext<SpaceContextType | null>(null);

export function SpaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SpaceState>({
    cosmosMode: "idle",
    isActivated: false,
    currentNode: null,
    expandedNodes: new Set<string>(),
    activePanel: null,
    panelCollapsed: false,
    cameraTarget: [0, 0, 5],
    breadcrumb: [],
  });

  const activate = useCallback(() => {
    setState((prev) => ({ ...prev, isActivated: true, cosmosMode: "warp" }));
    setTimeout(() => setState((prev) => ({ ...prev, cosmosMode: "idle", activePanel: portfolioTree })), 1200);
  }, []);

  const focusNode = useCallback((node: NodeData) => {
    const [x, y] = node.position;
    setState((prev) => ({ ...prev, currentNode: node, cameraTarget: [x, y, 5], cosmosMode: "focus" }));
  }, []);

  const expandNode = useCallback((node: NodeData) => {
    setState((prev) => ({ ...prev, expandedNodes: new Set<string>([node.id]), currentNode: node, breadcrumb: [node.label] }));
  }, []);

  const openPanel = useCallback((node: NodeData) => {
    setState((prev) => ({ ...prev, activePanel: node, currentNode: node }));
  }, []);
  const closePanel = useCallback(() => setState((prev) => ({ ...prev, activePanel: null, panelCollapsed: false })), []);
  const setPanelCollapsed = useCallback((collapsed: boolean) => setState((prev) => ({ ...prev, panelCollapsed: collapsed })), []);
  const returnToNexus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentNode: null,
      expandedNodes: new Set<string>(),
      breadcrumb: [],
      activePanel: portfolioTree,
      cameraTarget: [0, 0, 5],
      cosmosMode: "idle",
    }));
  }, []);

  return <SpaceContext.Provider value={{ ...state, activate, focusNode, expandNode, openPanel, closePanel, setPanelCollapsed, returnToNexus }}>{children}</SpaceContext.Provider>;
}

export function useSpace() {
  const ctx = useContext(SpaceContext);
  if (!ctx) throw new Error("useSpace must be used within SpaceProvider");
  return ctx;
}
