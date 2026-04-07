export interface PMAttributes {
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
}

export interface NodeData {
  id: string;
  label: string;
  position: [number, number, number];
  level: number;
  children?: NodeData[];
  attributes?: PMAttributes;
  period?: string;
  subtitle?: string;
  image?: string;
}

export type CosmosMode = "idle" | "warp" | "focus";
