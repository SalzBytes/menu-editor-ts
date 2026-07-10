# Agent Guidelines

Read before coding. Concept first, then implement.

## Project

Vanilla JS menu editor lib, built with TypeScript + Vite. Drag/drop nested menu
via SortableJS. Ships ESM + UMD + `.d.ts` + CSS to `lib/`.

## Package manager

**Bun only.** `bun.lock` is source of truth. No `npm`/`yarn`/`pnpm`.
Delete `package-lock.json`. Scripts run via `bun run <script>`.

## Core rules (lazy senior)

- Stop at first rung: YAGNI → stdlib → native platform → installed dep → one line → minimal code.
- No new dependency for what a few lines do.
- No abstraction with one implementation. Boring over clever. Shortest diff wins.
- Never simplify away: input validation at trust boundaries, error handling,
  security, accessibility, explicitly-requested behavior.
- Non-trivial logic leaves ONE runnable self-check (assert-based, no framework).

## Structural vs presentational classes

Critical distinction. Do not mix.

- **Structural** (`jme-*`): drive JS logic — SortableJS handle/ghost, level
  traversal, querySelectors. NEVER theme-dependent. Never rename without updating
  every selector.
  - `jme-item`   — each menu node (replaces reliance on `.list-group-item`)
  - `jme-handle` — drag handle
  - `jme-list`   — nested list container
  - `ghost`, `chosen` — SortableJS drag state
- **Presentational**: theme class names (Bootstrap/Tailwind). Live ONLY in the
  theme registry (`src/themes.ts`). Swapping theme must not touch logic.

## Themes

`src/themes.ts` exports a map: theme name → class strings for item, list, button,
buttonGroup, layout. `MenuEditorOptions.theme` selects one (default `bootstrap`).
Adding a theme = add one entry. No code branches per theme.

## Styles

- Bootstrap is OPTIONAL. Lib must NOT import full Bootstrap SCSS into its bundle.
- `src/scss/core.scss` — theme-agnostic structural styles only (handle, ghost,
  spacing). Always safe to ship.
- Bootstrap consumers load Bootstrap themselves (CDN or their build).
- `src/index.ts` imports only `core.scss`.

## Structure

```
src/
  index.ts        entry (exports + core css)
  themes.ts       theme class registry
  constants.ts    icons + defaults
  types.ts        shared types
  core/           logic: MenuEditor, MenuContainer, Item, ButtonGroup, Collection, ElementItem, ItemEvent
  scss/core.scss  structural styles
dev/              local playground (Bootstrap via CDN)
```

## Verify

`bun run build` must pass (tsc + vite). Run before completion.
