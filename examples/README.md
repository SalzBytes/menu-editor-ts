# Menu Editor — Material You demo

Single-file demo (`index.html`) styled with the **Material Design 3 (Material You)**
design system, featuring a live **Bootstrap ⇄ Tailwind** theme switcher for the
menu editor. The page chrome uses the MD3 token system (via Tailwind Play CDN);
only the menu editor's item classes change with the selected theme, and that
theme's framework CSS is loaded on demand — the library bundles none.

### Run it

From the repo root:

```shell
bun install
bun run dev      # builds the dist bundle, then serves the repo
```

`bun run dev` builds `dist/menu-editor.min.js` (SortableJS bundled, global
`MenuEditor`) + `dist/styles.min.css`, then serves the repo root at
<http://localhost:3000> — open **`/examples/`**.

### Keyboard reordering

Focus a drag handle (Tab) and use the arrow keys: **↑/↓** reorder among
siblings, **→ / Enter** nest into the item above, **←** outdent.
