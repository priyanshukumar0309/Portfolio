import type { DetailPanelIconKey } from "../../../src/data/detailPanelIconKeys";

/** Re-export for space data modules that import from `project/src/data/types`. */
export type { DetailPanelIconKey };

export interface PMAttributes {
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
}

export interface DetailPanelButton {
  label: string;
  url: string;
  /** Lucide key from `src/data/detailPanelIconKeys.ts`; omitted => inferred in registry */
  icon?: DetailPanelIconKey;
}

export interface DetailPanelSection {
  /** Stable id for React keys, CMS mapping, and localStorage overrides (e.g. `origin_role`, `project_refs`). */
  key: string;
  /** Human-readable heading — fully data-driven; UI does not assume fixed labels. */
  title: string;
  /** Section body copy. */
  body: string;
  buttons?: DetailPanelButton[];
  /** Small marker next to section title in the HUD */
  headingIcon?: DetailPanelIconKey;
}

export interface DetailPanelConfig {
  headingName?: string;
  sections: DetailPanelSection[];
  /** Overrides default Cpu / Satellite markers for the technologies row and chips */
  technologiesHeadingIcon?: DetailPanelIconKey;
  technologyChipIcon?: DetailPanelIconKey;
  /** Accent over the hero image frame */
  imageAccentIcon?: DetailPanelIconKey;
}

export interface NodeData {
  id: string;
  label: string;
  position: [number, number, number];
  level: number;
  children?: NodeData[];
  attributes?: PMAttributes;
  detailPanel?: DetailPanelConfig;
  period?: string;
  subtitle?: string;
  image?: string;
}

export type CosmosMode = 'idle' | 'warp' | 'focus';

export interface NavigationState {
  cosmosMode: CosmosMode;
  isActivated: boolean;
  currentNode: NodeData | null;
  expandedNodes: Set<string>;
  activePanel: NodeData | null;
  cameraTarget: [number, number, number];
  breadcrumb: string[];
}

export interface CockpitMetric {
  label: string;
  value: string;
  icon?: string;
}
