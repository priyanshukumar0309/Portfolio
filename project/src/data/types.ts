export interface PMAttributes {
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
}

export interface DetailPanelButton {
  label: string;
  url: string;
}

export interface DetailPanelSection {
  heading: string;
  content: string;
  buttons?: DetailPanelButton[];
}

export interface DetailPanelConfig {
  headingName?: string;
  sections: DetailPanelSection[];
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
