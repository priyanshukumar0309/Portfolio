import type { DetailPanelButton, DetailPanelSection } from "@/data/types";
import type { DetailPanelIconKey } from "@/data/detailPanelIconKeys";

/**
 * Builds one sidebar section: stable `key`, human `title`, and `body` copy.
 * Use this (or plain objects matching `DetailPanelSection`) in `portfolioData.ts`
 * so headings are not hardcoded by the UI — only the data defines labels.
 */
export function detailSection(
  key: string,
  title: string,
  body: string,
  options?: {
    headingIcon?: DetailPanelIconKey;
    buttons?: DetailPanelButton[];
  }
): DetailPanelSection {
  const section: DetailPanelSection = { key, title, body };
  if (options?.headingIcon) section.headingIcon = options.headingIcon;
  if (options?.buttons?.length) section.buttons = options.buttons;
  return section;
}
