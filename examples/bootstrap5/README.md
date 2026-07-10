# Menu Editor — Bootstrap 5 example

Static demo using the **built** browser bundle (`dist/`). No build step, no npm.

### Build the bundle first (from the repo root)

```shell
bun install
bun run build
```

### Open the example

Just open `index.html` in a browser (or serve the repo root), e.g.:

```shell
bunx serve .
```

It loads `../../dist/menu-editor.min.js` (SortableJS bundled) and
`../../dist/styles.min.css`. Bootstrap 5 + Font Awesome come from CDN.
Set `theme: 'bootstrap'` (default) or `'tailwind'` in `main.js`.
