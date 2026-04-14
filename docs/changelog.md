# Changelog

## 2026-04-13 (L1 parent panels filled from subnode context)
- **`portfolioData.ts`:** Added full `detailPanel` content for the previously sparse parent nodes: **Skills** (`product-management`), **Projects**, and **History** (`career-history`) with heading icons, technologies, and 3-section narrative blocks (Overview/Business/Technology, Overview/Platforms/Prototyping, Overview/Progression/Impact).

## 2026-04-13 (path edges: red path + shrinking white remainder)
- **`NodeLine`:** Selected path stays red-only (no white center under red). When transitioning from already-lit white edges, a white remainder now exists only ahead of the red tip and shrinks as red advances, then disappears at completion.

## 2026-04-13 (path edges: stable red rise, no white overlay)
- **`NodeLine`:** Removed white-overlay handoff and pulse flicker. Selected path now renders as red-only core+glow+bloom during both rise and hold, with a visible red starter segment to avoid blank ignition.

## 2026-04-13 (path edges: saber shine + pulse)
- **`NodeLine`:** Red path hold now uses a hot core plus pulsing glow/bloom (animated opacity + linewidth), giving a brighter cinematic lightsaber shimmer after overtake completes.

## 2026-04-13 (path edges: shrinking white handoff)
- **`NodeLine`:** During white→red path transition, white no longer stays full-length in parallel. White now starts at the red tip and shrinks as red advances (`red-tip -> target`), then disappears when overtake completes.

## 2026-04-13 (path edges: white->red overtake transition)
- **`NodeLine`:** Added overlay transition mode for segments that were already white-lit. White remains visible while the red path grows over it, then white hides only after red reaches full length (no white→blank→red flicker).

## 2026-04-13 (path edges: no white-to-blank pop)
- **`NodeLine`:** When a segment transitions from pre-lit white to selected red path, it now snaps to full red length first (no collapse to blank), while brand-new path segments still ignite from an origin-side red stub and rise outward.

## 2026-04-13 (path edges: red ignition pass)
- **`NodeLine`:** Path ignition no longer pops from blank/white; on path-entry it now starts as a tiny **red stub** near origin and grows outward at slower speed. During rise, path uses red glow+bloom only (no white transition color).

## 2026-04-13 (path edges: cinematic saber rise)
- **`NodeLine`:** Path-highlight edges now render as a **single red saber pass** (no center white strip), with reduced thickness and slower growth speed. Path segments reset to their start when they newly join the selected route, so the beam visibly rises outward from origin.

## 2026-04-13 (path edges: slimmer pure-red saber)
- **`NodeLine`:** Path-highlight edges hide the white core entirely (`core.visible = isLit && !onPath`) and render with a slimmer red-only stack (glow + bloom), so the saber reads clean red from origin to selected node.

## 2026-04-13 (path edges: stronger red saber)
- **`NodeLine`:** Selection path uses a **wider deep-red glow**, **darker saturated core** (lower opacity so it doesn’t read white), plus an extra **bloom** `Line2` for additive red when line width is clamped.

## 2026-04-13 (career year chip: sleeker)
- **`NodePoint`:** Career year line uses **`rounded-sm`**, **`py-px`**, **`6px`** type, tighter stack **`gap`**; avoids tall **`rounded-full`** on short strings.
- **`DetailPanel`:** Career header years + **Sub Nodes** year lines use **`leading-none`**, smaller type, **`mt-px` / `mt-0.5`**, tighter list **`space-y`**.

## 2026-04-13 (career subheading: years only)
- **`careerYearRange.ts`:** `formatCareerYearRange(period)` extracts **start – end** years (or **Present**); `isCareerGraphNode(id)` matches `career-*` ids.
- **`NodePoint`:** Second-line pill **only** for career/history nodes, showing that year string (not subtitle/role).
- **`DetailPanel`:** Header subline for **`career-*`** panels shows years only; **Sub Nodes** list under career parents shows **child label + year line** when child id is `career-*`.

## 2026-04-13 (remove node subheadings in graph + panel)
- **`NodePoint`:** Dropped the secondary **subtitle / period** pill under labels for all levels (`showSubtitle` removed).
- **`DetailPanel`:** Header shows only the main title for graph nodes; **subtitle, period,** and extra meta lines removed. **Origin (`nexus`)** still shows **owner title** under the name. **Sub Nodes** list shows **labels only** (no subtitle · period).
- **`project/src` nexus:** Same subtitle removal for parity.

## 2026-04-13 (node type scale: L1 vs L2/L3)
- **`NodePoint`:** **L1** roots keep a **slightly larger** label (**10px** desktop) and pill; **L2 and L3** use **identical** font size (**9px** desktop) and capsule metrics so **leaves are not smaller** than other descendants of origin.

## 2026-04-13 (sleeker node microcopy capsule)
- **`NodePoint`:** Tighter vertical padding on **L3 / deep** label pills (`py-1`, no forced min-height); **subtitle** chip uses **`py-px`**, **`px-1.5`**, **`leading-none`**, slightly smaller mobile primary pill.

## 2026-04-13 (round capsules, red path edges)
- **Nodes:** Graph pills and subtitle chips back to **`rounded-full`**; origin chip in `NodeTree` **rounded-full** (keeps flex + `leading-none` alignment from prior pass).
- **Edges:** `NodeLine` adds **`pathHighlight`**; `NodeTree` computes root→selection chain and paints **red saber** on path segments only; other **active** edges stay **white / cool-white glow**.

## 2026-04-13 (typography, node capsules, tech list)
- **Fonts:** Google Fonts **Inter** + **Space Grotesk** in `index.html`; Tailwind **`font.display`** for Space Grotesk; **`font-sans`** remains Inter-first.
- **Nodes:** `NodePoint` + origin chip in `NodeTree` use **Space Grotesk**, **squarer corners** (`rounded-lg` / `md`), **flex-centered** label with **`lineHeight: 1`** for vertical alignment; subtitle microcopy uses **Inter**.
- **Detail panel:** Titles **`font-display`**; sections, technologies, links, meta → **`font-sans`**. Technologies back to a **single-column** stack with calmer borders; desktop/mobile panel backgrounds slightly **more opaque**, lighter highlight overlay.

## 2026-04-13 (skills tree, origin edges, panel density)
- **Skills graph:** Under **Skills**, replaced six flat L2 nodes with **Business** and **Technology** groups (L2) and **six L3** leaves (`skill-0`…`skill-5` unchanged) in `src/data/portfolioData.ts`; helper `skillCategoryLeaf` centralizes leaf authoring.
- **Origin → L1 edges:** `src/components/nexus/NodeTree.tsx` treats **nexus / ORIGIN** as on-path so the three main spokes get the **glow / saber** line style when Origin is selected.
- **Detail panel:** `project/src/components/panels/DetailPanel.tsx` — **wrap + compact** link buttons; **2-column** technologies grid with **heading-only** icon; removed unused per-chip icon variable.
- **Docs:** `docs/tech/space-platform-integration.md` (skills section, origin spokes, panel bullets), `docs/tech/skills-node-tree.mmd`.

## 2026-04-13 (favicon, node type, glass tech chips)
- **Favicon:** `index.html` points to `/ChatGPT%20reduced%20image.png` (plus `apple-touch-icon`).
- **Graph nodes:** Smaller label/subtitle type, **`font-normal`** (no semibold/bold weight on pill text).
- **Detail panel technologies:** Larger gaps, **`rounded-xl`**, **`backdrop-blur-md`**, light border and soft shadow for a glass tile feel.

## 2026-04-13 (detail panel: multiline bullets)
- **`SectionBody`:** Newline-separated copy renders as a **disc** list (`list-disc`); single-line sections stay a plain paragraph.

## 2026-04-13 (portfolio tree: detailPanel-only nodes)
- **`DetailPanelConfig.technologies`:** Chip lists live on the panel config; **`DetailPanel`** uses `getPanelTechnologies()` (`detailPanel` first, then legacy `attributes`).
- **`portfolioData.ts`:** Removed redundant **`attributes`** blocks from all nodes; copy and tech chips come only from **`detailPanel`**.

## 2026-04-13 (detail sidebar: no bold)
- **`DetailPanel`:** Section bodies strip `**` and render plain prose (`stripSidebarEmphasis`); removed `inlineBold` from the node sidebar so all node panels match plain styling.

## 2026-04-13 (career: drop Wipro, plain text)
- Removed **Wipro** from **`journeyItems`** and the space career graph; dropped the **`wiproCareerNodeFromJourney`** helper from `portfolioData.ts`.
- Career timeline and career detail panels use **plain copy** (no `**…**` emphasis) in `portfolioContent.ts` / `portfolioData.ts` career sections.

## 2026-04-13 (space backdrop: remove scanline banding)
- **`HudFrame`:** Dropped the full-screen **repeating horizontal scanline** layer (looked like dirty lines over the starfield); softened the **vignette** with extra gradient stops.
- **`CosmosScene`:** Clear color + **sRGB** output on the WebGL renderer for cleaner compositing with HUD layers.

## 2026-04-13 (content parity: panel bold, grid ids, Wipro node)
- **Detail panel:** `SectionBody` now uses **`inlineBold`** so `**metrics**` match About / data instead of stripping asterisks.
- **Project grid:** Finafa animations keyed by **`finafa-eu`**; icons for **Socur** and **AI demo**; fallback icon when `id` is unknown.
- **Space graph:** **Wipro** career node generated from **`journeyItems`** in `portfolioContent.ts` (timeline and graph stay aligned). Documented under *Content parity* in `docs/tech/space-platform-integration.md`.

## 2026-04-13 (chore: remove unused Vite starter CSS)
- Deleted `src/App.css` (never imported; default `#root` / logo styles conflicted with full-bleed layout).

## 2026-04-13 (space entry: boot-only, then nexus)
- **Boot UX:** Title-case lines and **Nexus sync** label; timings scaled by **0.75× speed** (`SPEED` in `BootSequence`).
- **Boot copy:** Short loading lines (nexus channel, career graph, product context, build nodes, panels, origin ready) — minimal HUD text, no name.
- **First paint:** Pitch-black **`BootSequence`** with staged lines (no starfield peek, no **`Waveform`** on that layer); overlay fades via **`AnimatePresence` `onExitComplete`**, then **`activate()`** runs so warp + origin panel match the old “after waveform” state in one step.
- **`Waveform`** only mounts when boot is done and **`!isActivated`** (standby / `deactivate()`), with the existing settle-then-undulate intro and click or auto-activate.
- Boot copy is **PM / portfolio-specific** (channel lock, career graph, program signals, build manifest, nexus bind); progress reads **NEXUS SYNC**; **`BootSequence`** keeps a Strict Mode guard on the timer loop.
- **`SpaceShell`** in `project/src/App.tsx` owns boot + conditional waveform; `docs/tech/space-platform-integration.md` and `docs/tech/space-platform-flow.mmd` updated.

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
