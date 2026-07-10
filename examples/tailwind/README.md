# Menu Editor — Tailwind example

Static demo using the **built** browser bundle (`dist/`) with `theme: 'tailwind'`.
No build step, no npm.

### Build the bundle first (from the repo root)

```shell
bun install
bun run build
```

### Open the example

Open `index.html` in a browser (or serve the repo root):

```shell
bunx serve .
```

Loads `../../dist/menu-editor.min.js` + `../../dist/styles.min.css`. Tailwind
(via CDN) + Font Awesome provide the presentation.
