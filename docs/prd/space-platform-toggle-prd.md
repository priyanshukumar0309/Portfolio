# PRD: Space Explorer Toggle Integration

## Objective
Integrate the Deep Space Node Explorer into the existing portfolio home page and allow users to switch between standard and space modes through a single toggle.

## Problem
The current portfolio has two disconnected experiences:
- Standard platform content in `src`
- Space visual presentation in `project/src`

Users cannot switch between these experiences in one unified product.

## Goals
- Provide one switch on `/` to toggle between standard and space experiences.
- Reuse and adapt existing space code from `project`.
- Replace mock right-sidebar node content with real platform data.
- Keep interaction smooth on desktop and mobile.

## Non-Goals
- No backend changes.
- No route expansion for the toggle feature.
- No deployment process changes.

## User Stories
- As a visitor, I can switch between standard and space views without leaving the page.
- As a visitor, when I open a space node, I see real content instead of placeholders.
- As the owner, I can update content from one structured source that powers both views.

## Functional Requirements
1. Home page includes a visible toggle (`standard` / `space`).
2. Toggle swaps full home rendering.
3. Space explorer uses real data from `src/data/portfolioContent.ts`.
4. Space detail sidebar renders title, subtitle/period, problem, solution, impact, and technologies.
5. Existing standard sections continue to render correctly.

## Success Metrics
- Toggle works reliably on first click.
- Space sidebar contains no placeholder content.
- No TypeScript/lint/build regressions introduced by integration.
