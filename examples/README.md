# Menu Editor — live demo

Single-file demo (`index.html`) with a **theme switcher** (Bootstrap ⇄ Tailwind).
The page chrome is plain CSS; only the menu editor's item classes change with the
theme. The chosen framework's CSS is loaded on demand — the library bundles none.

### Build the bundle first (from the repo root)

```shell
bun install
bun run build
```

### Open the demo

Serve the repo root and open `/examples/`, e.g.:

```shell
bunx serve .
```

It loads `../dist/menu-editor.min.js` (SortableJS bundled, global `MenuEditor`)
and `../dist/styles.min.css`.
