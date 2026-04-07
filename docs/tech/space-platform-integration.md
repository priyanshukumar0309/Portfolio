# Space Platform Integration

PRD: [space-platform-toggle-prd.md](../prd/space-platform-toggle-prd.md)

## What Changed
- Added `src/space` namespace and moved/adapted space explorer modules into the main app.
- Added a home-page toggle in `src/pages/Index.tsx` to switch between standard and space views.
- Introduced shared content model in `src/data/portfolioContent.ts`.
- Updated standard sections (`Hero`, `Skills`, `ProjectGrid`, part of `About`) to consume shared data.
- Mapped shared data into space node/sidebar model in `src/space/data/portfolioData.ts`.

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
