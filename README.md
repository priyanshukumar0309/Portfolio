
# Deep Space Node Explorer Portfolio

```text
src/
├── App.tsx                          # Root component, composes all layers
├── main.tsx                         # Entry point
├── index.css                        # Global styles + font imports
│
├── context/
│   └── SpaceContext.tsx             # Global state: activation, navigation, panel, logs
│
├── data/
│   ├── types.ts                     # TypeScript interfaces (NodeData, PMAttributes, etc.)
│   └── portfolioData.ts             # All portfolio content: nodes, positions, PSI data
│
├── hooks/
│   └── useIsMobile.ts               # Responsive breakpoint hook (default: 768px)
│
└── components/
    ├── loader/
    │   └── BootSequence.tsx         # Sequential boot-up text animation on first load
    │
    ├── cosmos/
    │   ├── CosmosScene.tsx          # React Three Fiber Canvas wrapper, responsive height
    │   ├── Starfield.tsx            # 6,500 procedurally-generated animated stars + warp FX
    │   └── CameraController.tsx     # Smooth camera follow, drag-pan, panel-aware offset
    │
    ├── nexus/
    │   ├── NodeTree.tsx             # Renders full 3-level node hierarchy + click handling
    │   ├── NodePoint.tsx            # Individual node label: hover, active, show/hide states
    │   └── NodeLine.tsx             # 4-layer glowing connection lines with progress animation
    │
    ├── cockpit/
    │   ├── HudFrame.tsx             # Decorative corner brackets + vignette + scanline overlay
    │   ├── StatusBar.tsx            # Top bar: name, breadcrumb path, system mode indicator
    │   ├── ContactBar.tsx           # Bottom bar: contact links, camera coordinates, return
    │   └── SpaceTerminal.tsx        # System log terminal with geo-IP, temperature display
    │
    ├── panels/
    │   └── DetailPanel.tsx          # Side panel (desktop) / bottom sheet (mobile) for node detail
    │
    └── resonance/
        └── Waveform.tsx             # Full-screen animated sine wave intro / click-to-activate
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npm run typecheck
```

### Lint
```bash
npm run lint
```

## How to Use the Portfolio
1. Boot screen waveform appears on load.
2. Activate explorer by click or auto-activation.
3. Navigate 3-level node tree (origin, categories, terminals).
4. Open detail panel to view problem/solution/impact/technologies.
5. Pan camera with drag.
6. Review status bar and contact bar for system context.

## Customizing Portfolio Content
- Primary content source: `src/data/portfolioData.ts`.
- Update owner details, node details, and positions there.
- Node positions are Three.js world coordinates `[x, y, z]`.

## Dependencies
```json
{
  "@react-three/drei": "^9.122.0",
  "@react-three/fiber": "^8.18.0",
  "@react-three/postprocessing": "^2.19.1",
  "@supabase/supabase-js": "^2.57.4",
  "framer-motion": "^12.38.0",
  "gsap": "^3.14.2",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "three": "^0.183.2"
}
```
