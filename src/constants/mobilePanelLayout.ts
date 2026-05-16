/** Mobile bottom detail sheet — shared by `DetailPanel` and `CosmosScene` so node viewport tracks sheet height. */
export const MOBILE_PANEL_HEIGHT_DEFAULT = 52;
export const MOBILE_PANEL_HEIGHT_MIN = 34;
export const MOBILE_PANEL_HEIGHT_MAX = 90;
export const MOBILE_PANEL_HEIGHT_STORAGE_KEY = 'space-detail-panel-mobile-height-vh';

export function clampMobilePanelHeightVh(vh: number): number {
  return Math.min(MOBILE_PANEL_HEIGHT_MAX, Math.max(MOBILE_PANEL_HEIGHT_MIN, vh));
}

/** Restore last drag size; safe when `localStorage` is unavailable. */
export function readStoredMobilePanelHeight(): number {
  try {
    const raw = localStorage.getItem(MOBILE_PANEL_HEIGHT_STORAGE_KEY);
    const parsed = raw ? Number.parseFloat(raw) : NaN;
    if (Number.isFinite(parsed)) return clampMobilePanelHeightVh(parsed);
  } catch {
    /* private mode */
  }
  return MOBILE_PANEL_HEIGHT_DEFAULT;
}
