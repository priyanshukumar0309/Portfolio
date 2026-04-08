# Changelog

## 2026-04-07 (space panel + origin legibility)
- Detail panel: forced light `color` on panel shells and `SectionBody` spans so copy does not inherit `body` `text-foreground` (dark in light mode). Link rows use explicit label/icon colors.
- Origin node: restored **cyan/indigo nebula** pill + soft blurred halo; graph nodes use inline **white** label colors and stronger borders.

## 2026-04-07 (CV sync, nodes, touch zoom)
- Refreshed `portfolioContent.ts` (owner headline, about, journey incl. Wipro, skills, certifications, Finafa AI / Socur) and aligned `portfolioData.ts` career panels with **impact**-first copy; sidebar highlights `**metrics**` in amber.
- **Links:** developer portal buttons only on **Paysafe PM** and **ICICI**; removed link rows from Volvo, Paysafe SPM, and IIT Bombay.
- **Nodes:** brighter labels/subtitles in `NodePoint`; origin chip in `NodeTree` uses white glass instead of cyan.
- **Camera:** two-finger **pinch** zoom on canvas, gentler one-finger pan on touch, stronger wheel zoom (`CameraController`).

## 2026-04-07 (sidebar link styling & labels)
- Detail panel link rows: white/neutral borders and typography; removed the **Egress** sub-label.
- Career and other nodes: **Links** sections in `portfolioData.ts` use data-driven button labels (e.g. product news, developer portals) instead of “Home Reference”.

## 2026-04-07 (flexible detail sections)
- Replaced fixed `heading`/`content` fields with **`key`**, **`title`**, and **`body`** on `DetailPanelSection`; updated `portfolioData.ts` and `DetailPanel` normalization for legacy JSON. Added `src/data/detailPanelSection.ts` helper.

## 2026-04-07 (data-driven panel icons)
- Added `src/data/detailPanelIconKeys.ts` and `src/data/detailPanelLucideRegistry.ts`; extended `DetailPanel*` types so icons come from `portfolioData` (`icon`, `headingIcon`, `technologiesHeadingIcon`, `technologyChipIcon`, `imageAccentIcon`) with inference fallback.
- Updated `project/src/components/panels/DetailPanel.tsx` to resolve Lucide components via the registry.

## 2026-04-07 (detail panel HUD)
- Replaced standard sidebar link buttons with Lucide-based HUD controls (egress rows, icon ports, cyan glow) in `project/src/components/panels/DetailPanel.tsx`.
- Updated cockpit-style close/collapse chrome and technology chips to match the spaceship aesthetic; documented in `docs/tech/space-platform-integration.md`.

## 2026-04-07
- Integrated `project` space explorer into main platform under `src/space`.
- Added a home toggle to switch between standard and space modes.
- Created shared data model in `src/data/portfolioContent.ts`.
- Replaced space sidebar mock content with mapped real platform content.
- Added PRD, tech documentation, and flow diagram for traceability.
- Updated README for Deep Space Node Explorer structure and usage.
