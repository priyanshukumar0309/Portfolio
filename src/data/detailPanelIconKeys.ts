/**
 * Allowed Lucide icon keys for space detail panel UI. Resolved to components in
 * `detailPanelLucideRegistry.ts`. Content authors set these in `portfolioData.ts`.
 */
export const DETAIL_PANEL_ICON_KEYS = [
  "github",
  "linkedin",
  "mail",
  "globe",
  "externalLink",
  "rocket",
  "building2",
  "graduationCap",
  "car",
  "landmark",
  "factory",
  "flaskConical",
  "orbit",
  "wallet",
  "code",
  "send",
  "cpu",
  "satellite",
  "sparkles",
  "bot",
  "layers",
  "book-text",
] as const;

export type DetailPanelIconKey = (typeof DETAIL_PANEL_ICON_KEYS)[number];
