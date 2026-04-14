# Space Platform Integration

PRD: [space-platform-toggle-prd.md](../prd/space-platform-toggle-prd.md)

## What Changed
- Space explorer UI lives in `project/src` and is embedded via `src/components/ProjectSpaceMode.tsx` (full app bridge).
- Added a home-page toggle in `src/pages/Index.tsx` to switch between standard and space views.
- Introduced shared content model in `src/data/portfolioContent.ts`.
- Updated standard sections (`Hero`, `Skills`, `ProjectGrid`, part of `About`) to consume shared data.
- Mapped shared data into space node/sidebar model in `src/data/portfolioData.ts`.

## Boot sequence and waveform intro

- **Goal:** On first paint, users see a **solid space-black boot layer** only (no resonance canvas): brief **title-case** loading lines plus **Nexus sync** progress (`project/src/components/loader/BootSequence.tsx`, `z-index` above HUD and canvas). Durations use a **`SPEED` factor (0.75)** so the sequence runs slower than real-time baselines. Copy hints at PM/nexus data without names or long sentences.
- **Handoff:** When the scripted lines finish, the overlay **fades out**; `onExitComplete` runs **`SpaceContext.activate()`** from `SpaceShell` in `project/src/App.tsx` so the user lands **immediately** in the expanded nexus (nodes + warp timing + origin panel) — the former two-step “boot → waveform → click” path is merged for first load.
- **Waveform (optional second gate):** `Waveform` mounts only if the user has **finished boot** and later hits **standby** (`!isActivated`), e.g. after `deactivate()`, so they still get the resonance “click to initialize” layer on re-entry.
- **Wave motion:** When `Waveform` is shown, it uses a short **settle window (~1s)** with low amplitude, then ramps undulation and vertical breath before click or auto-`activate()`.
- **Edge cases:** `BootSequence` uses a ref guard so React **Strict Mode** double-mount in dev does not stack duplicate timers.

## Detail panel sections (key / title / body)
- **`DetailPanelSection`** in `project/src/data/types.ts` uses **`key`** (stable id), **`title`** (display heading — fully data-driven), and **`body`** (copy). The UI does not hardcode labels like “Role” or “Overview”; those strings live only in `src/data/portfolioData.ts` (or `localStorage` overrides).
- **Legacy:** Panels still accept older `{ heading, content }` objects; `DetailPanel.tsx` normalizes them and synthesizes a `key` when missing.
- **Helper:** `src/data/detailPanelSection.ts` exports `detailSection(key, title, body, options?)` for ergonomic authoring; plain objects are also valid.

## Favicon and shell
- **Favicon** / **iOS home screen:** `index.html` uses `public/ChatGPT reduced image.png` (URL-encoded path in the link `href`).

## Typography (fonts)
- **Space Grotesk** (`font-display`): graph **node labels** (`NodePoint`), **origin** chip in `NodeTree`, and **detail panel titles** (`h2`).
- **Inter** (`font-sans`): sidebar **body**, **section headings**, **technologies** list, **links**, and other **microcopy**. Loaded from Google Fonts in `index.html`; families extended in `tailwind.config.ts`.

## Node graph typography (`NodePoint`)
- Labels use **Space Grotesk**, **uppercase**, **`font-semibold`**, **`leading-none`** / **`lineHeight: 1`** so text centers vertically; capsule uses **`rounded-full`**, **`flex items-center justify-center`**. **L1** (Skills / Projects / History) uses a **slightly larger** font (**10px** desktop, **8px** mobile) and **taller** pill; **L2 and L3** share the **same** size (**9px** / **7px**) and **same** padding so leaf nodes match intermediate nodes. **Second line under the label** appears **only** for **`career-*`** nodes, as **years-only** from `period` (see `careerYearRange.ts`).
- **Detail panel:** Most graph nodes show **title only** in the header; **Origin** keeps **name + owner title**. **Career / History** nodes (`id` prefix `career-`) show a **subheading of years only** (`formatCareerYearRange` from `period`). **Sub Nodes** for career parents list **child label + year range** per `career-*` child.
- **Graph:** Under labels, a **compact chip** (`rounded-sm`, minimal **`py`**, **6px** text) shows the **year-only** string for `career-*` nodes (`NodePoint` + `src/data/careerYearRange.ts`) — avoids bulky **`rounded-full`** pills on short dates.
- **Origin spokes:** When the active panel is the **nexus / ORIGIN** node (`activePanel.id === portfolioTree.id`), edges from center → each **L1** child (Skills, Projects, History) are **lit** (white / cool glow). None use the red path treatment until a non-origin node is selected.
- **Selection path (red saber):** For the **active panel** (or `currentNode`) id, `NodeTree` walks **`portfolioTree`** to build the ancestor chain and marks each parent→child segment. **`NodeLine`** takes **`pathHighlight`**; when both **lit** and **`pathHighlight`**, the selected segment itself is red-only (**glow + bloom**). If that segment was previously white-lit, only the **remaining ahead segment** stays white and shrinks from red-tip → target as red advances, then disappears at completion. Ignition starts from a visible red starter segment so the path never appears blank before rising. All other **lit** edges stay **white / cool glow**.

## Skills branch (L1 → L2 → L3)
- **`product-management` (Skills)** expands to two **L2** groups: **Business** and **Technology**.
- **L3** leaves reuse stable ids **`skill-0` … `skill-5`**, mapped from `skillCategories` in `portfolioContent.ts`:
  - **Business:** Product Management (0), Platforms & scale (2), Certifications (5).
  - **Technology:** Fintech (1), Technical (3), AI (4).
- Structure diagram: `docs/tech/skills-node-tree.mmd`.
- **Parent panel content:** L1 nodes **Skills**, **Projects**, and **History** now carry explicit `detailPanel` narratives (technologies + three sections each) so opening these parent nodes shows meaningful context even before drilling down.

## Space backdrop (canvas + `HudFrame`)

- **`HudFrame`** (`project/src/components/cockpit/HudFrame.tsx`) draws corner brackets and a **vignette only**. A former **full-screen repeating 1px scanline** overlay was removed: at common device pixel ratios it read as horizontal stripes/banding over the WebGL starfield. The vignette uses **multi-stop** `radial-gradient` for a softer edge and less color stepping.
- **`CosmosScene`** sets `gl.setClearColor('#020408')` and **`outputColorSpace = SRGB`** so the canvas black matches the CSS background and composites cleanly with HTML overlays.

## Detail panel data shape

- **Section bodies:** `DetailPanel` `SectionBody` splits on newlines; **two or more** non-empty lines render as a **`list-disc`** bulleted list (single line stays a paragraph).
- **`DetailPanelConfig`** may include **`technologies`** (string array) for the chip row; the UI reads **`detailPanel.technologies`** first, then falls back to legacy **`NodeData.attributes.technologies`** for old `localStorage` overrides.
- Default **`portfolioData.ts`** tree uses **`detailPanel` only** (no `attributes`) for authored nodes.

## Detail panel (HUD) and Lucide icons
- **Files:** `project/src/components/panels/DetailPanel.tsx`, `src/data/detailPanelIconKeys.ts`, `src/data/detailPanelLucideRegistry.ts`
- **Data-driven icons:** `DetailPanelButton.icon`, `DetailPanelSection.headingIcon`, and optional `DetailPanelConfig` fields `technologiesHeadingIcon`, `technologyChipIcon`, and `imageAccentIcon` are set in `src/data/portfolioData.ts`. Allowed keys are listed in `detailPanelIconKeys.ts`; the registry maps each key to a Lucide component.
- **Fallback:** If `icon` is omitted (e.g. old `localStorage` JSON), `detailPanelLucideRegistry.inferDetailPanelIconKey(url, label)` picks a reasonable icon so links still look correct.
- **Behavior:** Sidebar link rows use a white/neutral chrome (icon port + label from `DetailPanelButton` + `ExternalLink` affordance). Icons resolve from **`icon`** in data first, then URL/label inference. Multiple links use **`flex flex-wrap`** with **`w-fit`** rows so buttons stay **compact** rather than one full-width row each.
- **Technologies:** **One chip per row** (single column); simple **border + dark fill** (`border-white/10`, `bg-black/35`), **Inter** 12px — only the **section heading** shows **`technologiesHeadingIcon`**. Panel shell uses a **slightly denser / less glossy** gradient than the earlier heavy glass pass.
- **Impact copy:** Section bodies may use `**double asterisks**` around metrics; `DetailPanel` renders those spans with emphasis. Career **Links** (outbound buttons) are only on **Paysafe PM** and **ICICI** in `portfolioData.ts` unless you add more.
- **Camera (touch):** `src/components/cosmos/CameraController.tsx` — pinch-to-zoom via `touchmove` (two touches), reduced touch pan gain, faster wheel zoom.
- **Light-mode legibility:** `body` uses `text-foreground` (dark when not in `.dark`). Space `DetailPanel` sets explicit `color` / `rgb(...)` on panel roots and section spans so glass sidebar copy never inherits black. Origin nebula UI lives in `src/components/nexus/NodeTree.tsx`.
- **Chrome:** Close/collapse controls use bordered icon buttons (cyan glow on hover) and the mobile “open bay” affordance uses `PanelLeftOpen` + `ChevronUp` for a cockpit read.

## Content parity (`portfolioContent` ↔ UI)

- **About vs space:** The standard **About** timeline reads **`journeyItems`** in `src/data/portfolioContent.ts`. The space **Career History** graph is authored in `src/data/portfolioData.ts` (Volvo, Paysafe nested roles, ICICI, IIT). Career copy intentionally avoids `**bold**` markers so descriptions read as plain text in both surfaces.
- **Bold markers:** Source data may still contain `**segment**` for the standard site; the **node detail sidebar** strips asterisks and uses **`font-normal`** body text only (`DetailPanel` → `stripSidebarEmphasis` / `SectionBody`).
- **Featured projects grid:** Effects and layout keys use **`project.id`** (e.g. `finafa-eu`), not `title`, so renaming “Finafa AI” does not break Finafa-specific styling in `ProjectGrid`.

## Why
- Unifies two parallel implementations into one product experience.
- Reduces content drift by centralizing data.
- Replaces mock node detail text with real portfolio content.

## Edge Cases Handled
- Space mode closed state still allows switching back to standard instantly.
- Root node panel content falls back to owner metadata.
- Sidebar handles non-terminal nodes with safe fallback text.

## Flow Diagram
See `docs/tech/space-platform-flow.mmd` (app boot) and `docs/tech/skills-node-tree.mmd` (Skills L1–L3).
