# Space Platform Integration

PRD: [space-platform-toggle-prd.md](../prd/space-platform-toggle-prd.md)

## What Changed
- Space explorer UI lives in `project/src` and is embedded via `src/components/ProjectSpaceMode.tsx` (full app bridge).
- Added a home-page toggle in `src/pages/Index.tsx` to switch between standard and space views.
- Introduced shared content model in `src/data/portfolioContent.ts`.
- Updated standard sections (`Hero`, `Skills`, `ProjectGrid`, part of `About`) to consume shared data.
- Mapped shared data into space node/sidebar model in `src/data/portfolioData.ts`.

## Detail panel sections (key / title / body)
- **`DetailPanelSection`** in `project/src/data/types.ts` uses **`key`** (stable id), **`title`** (display heading — fully data-driven), and **`body`** (copy). The UI does not hardcode labels like “Role” or “Overview”; those strings live only in `src/data/portfolioData.ts` (or `localStorage` overrides).
- **Legacy:** Panels still accept older `{ heading, content }` objects; `DetailPanel.tsx` normalizes them and synthesizes a `key` when missing.
- **Helper:** `src/data/detailPanelSection.ts` exports `detailSection(key, title, body, options?)` for ergonomic authoring; plain objects are also valid.

## Detail panel (HUD) and Lucide icons
- **Files:** `project/src/components/panels/DetailPanel.tsx`, `src/data/detailPanelIconKeys.ts`, `src/data/detailPanelLucideRegistry.ts`
- **Data-driven icons:** `DetailPanelButton.icon`, `DetailPanelSection.headingIcon`, and optional `DetailPanelConfig` fields `technologiesHeadingIcon`, `technologyChipIcon`, and `imageAccentIcon` are set in `src/data/portfolioData.ts`. Allowed keys are listed in `detailPanelIconKeys.ts`; the registry maps each key to a Lucide component.
- **Fallback:** If `icon` is omitted (e.g. old `localStorage` JSON), `detailPanelLucideRegistry.inferDetailPanelIconKey(url, label)` picks a reasonable icon so links still look correct.
- **Behavior:** Sidebar link rows use a white/neutral chrome (icon port + label from `DetailPanelButton` + `ExternalLink` affordance). Icons resolve from **`icon`** in data first, then URL/label inference.
- **Impact copy:** Section bodies may use `**double asterisks**` around metrics; `DetailPanel` renders those spans with emphasis. Career **Links** (outbound buttons) are only on **Paysafe PM** and **ICICI** in `portfolioData.ts` unless you add more.
- **Camera (touch):** `src/components/cosmos/CameraController.tsx` — pinch-to-zoom via `touchmove` (two touches), reduced touch pan gain, faster wheel zoom.
- **Light-mode legibility:** `body` uses `text-foreground` (dark when not in `.dark`). Space `DetailPanel` sets explicit `color` / `rgb(...)` on panel roots and section spans so glass sidebar copy never inherits black. Origin nebula UI lives in `src/components/nexus/NodeTree.tsx`.
- **Chrome:** Close/collapse controls use bordered icon buttons (cyan glow on hover) and the mobile “open bay” affordance uses `PanelLeftOpen` + `ChevronUp` for a cockpit read.

## Why
- Unifies two parallel implementations into one product experience.
- Reduces content drift by centralizing data.
- Replaces mock node detail text with real portfolio content.

## Edge Cases Handled
- Space mode closed state still allows switching back to standard instantly.
- Root node panel content falls back to owner metadata.
- Sidebar handles non-terminal nodes with safe fallback text.

## Flow Diagram
See `docs/tech/space-platform-flow.mmd`.
