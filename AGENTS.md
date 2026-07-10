# Agent Guidelines

Read before coding. Concept first, then implement.

## Project

Vanilla JS menu editor lib, built with TypeScript + Vite. Drag/drop nested menu
via SortableJS. Two build outputs, both git-ignored, both from `bun run build`:
- `lib/` — package build (ESM + UMD + `.d.ts` + `css/styles.css`).
- `dist/` — browser drop-in (`menu-editor.min.js` w/ SortableJS bundled, global
  `MenuEditor`, + `styles.min.css`). No CDN yet.

Not on npm — installed from GitHub (`bun add github:SalzBytes/menu-editor-ts`).
The `prepare` script runs `bun run build` so git-installs produce outputs.
Fork of `davicotico/menu-editor`. Bump `package.json` version + `CHANGELOG.md`
together on release.

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
  - `jme-editor` — root container; structural CSS is scoped under it so the lib
    doesn't leak styles into the host page.
  - `jme-item`   — each menu node (replaces reliance on `.list-group-item`)
  - `jme-handle` — drag handle (keyboard-operable, has `aria-label`)
  - `jme-list`   — nested list container
  - `ghost`, `chosen` — SortableJS drag state
- **Presentational**: theme class names (Bootstrap/Tailwind). Live ONLY in the
  theme registry (`src/themes.ts`). Swapping theme must not touch logic.

## Themes

`src/themes.ts` exports a map: theme name → class strings for item, list, button,
buttonGroup, layout. `MenuEditorOptions.theme` selects one (default `bootstrap`).
Adding a theme = add one entry. No code branches per theme.

## Styles

- Framework CSS (Bootstrap/Tailwind) is OPTIONAL to install (optional peer deps)
  but REQUIRED at runtime for the chosen `theme`. Lib must NOT import a full
  framework SCSS into its bundle.
- `src/scss/core.scss` — theme-agnostic structural styles only (handle, ghost,
  spacing), scoped under `.jme-editor`. Always safe to ship.
- Consumers load their framework themselves (CDN or their build).
- `src/index.ts` imports only `core.scss`.

## Structure

```
src/
  index.ts        entry (exports + core css)
  themes.ts       theme class registry
  constants.ts    icons + defaults
  types.ts        shared types
  functions.ts    dataset/level helpers
  core/           logic: MenuEditor, MenuContainer, Item, ButtonGroup, Collection, ElementItem, ItemEvent
  scss/core.scss  structural styles
examples/         single-file dist/ demo (Bootstrap ⇄ Tailwind switcher, Bootstrap via CDN)
serve.json        `bun run dev` redirect: / -> /examples/
```

## Dev / build

- `bun run dev` — builds `dist/`, serves repo root; `serve.json` redirects `/` to
  the `examples/` demo (loads the `dist/` bundle, so it needs a build first).
- `bun run build` — emits `lib/` + `dist/`.

## Verify

`bun run build` must pass (tsc + vite). Run before completion.
