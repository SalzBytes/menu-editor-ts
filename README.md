# Menu Editor

Vanilla Javascript Menu Editor Library (made with Typescript).

> **Personal fork.** This is my own reworked version of
> [davicotico/menu-editor](https://github.com/davicotico/menu-editor) — retooled
> for my purposes (Bun, optional CSS frameworks, a theme registry, structural
> `jme-*` classes). It is **not published to npm and has no CDN build yet**; the
> package will be available in the future. For now, use it straight from this
> repository. This **1.3.0** upgrade was done with the help of AI.

## Install

Not on npm/CDN yet — install straight from the GitHub repo.

### From GitHub (recommended)

Add it as a git dependency. The package's `prepare` script builds `lib/` and
`dist/` automatically on install, so the output is ready to import:

```shell
bun add github:SalzBytes/menu-editor-ts
# npm:  npm install github:SalzBytes/menu-editor-ts
# yarn: yarn add SalzBytes/menu-editor-ts
# pin a tag/branch/commit:  bun add github:SalzBytes/menu-editor-ts#v1.3.0
```

This adds an entry like this to your `package.json`:

```json
"dependencies": {
  "@SalzBytes/menu-editor-ts": "github:SalzBytes/menu-editor-ts"
}
```

Then import as usual:

```js
import '@SalzBytes/menu-editor-ts/lib/css/styles.css';
import { MenuEditor } from '@SalzBytes/menu-editor-ts';
```

### From a local clone

To hack on it or use the `dist/` browser bundle directly:

```shell
git clone https://github.com/SalzBytes/menu-editor-ts.git
cd menu-editor-ts
bun install
bun run build     # emits lib/ (package) and dist/ (browser bundle)
```

Then reference the built `lib/` from your project (link/path dependency), or
import the `src/` directly if you build it as part of your own toolchain.

## Required CSS framework

This plugin ships **only theme-agnostic structural styles** (`core.scss`, scoped
under `.jme-editor`). A presentational CSS framework is **required** for the
editor to look right — pick the one matching your `theme` option and load it
yourself:

| `theme` (default `bootstrap`) | Required framework CSS     |
| ----------------------------- | -------------------------- |
| `bootstrap`                   | Bootstrap **5.x**          |
| `tailwind`                    | Tailwind CSS **3.x / 4.x** |

Load the framework via its own CDN link or your build pipeline — the library
does **not** bundle it.

```html
<!-- example: Bootstrap theme -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
```

## How to use

Two ways to load it after `bun run build`.

#### A) ES module — from `lib/` (bundlers / TS projects)

Import the structural CSS and the `MenuEditor` class from the built library:

```js
import './lib/css/styles.css'; // structural styles only (framework CSS loaded separately)
import { MenuEditor } from './lib/index.js';
```

#### B) Browser `<script>` — from `dist/` (no bundler)

`bun run build` also emits a self-contained browser bundle in `dist/`
(`menu-editor.min.js` with SortableJS included, exposing the global
`MenuEditor`, plus `styles.min.css`). Drop the files in and use directly:

```html
<!-- required framework CSS (Bootstrap theme shown) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<!-- structural styles -->
<link rel="stylesheet" href="dist/styles.min.css">

<div id="element-id"></div>

<!-- the library (SortableJS bundled) -->
<script src="dist/menu-editor.min.js"></script>
<script>
  var menuEditor = new MenuEditor('element-id', { maxLevel: 3, theme: 'bootstrap' });
  // menuEditor.setArray([...]); menuEditor.mount();
</script>
```

See `examples/index.html` for a complete working `dist/` setup.

> The framework CSS (Bootstrap/Tailwind, see above) must be loaded separately in
> both cases — the library only provides structural styles.

### Themes

Pick a presentation theme via the `theme` option (default `bootstrap`).
Available: `bootstrap`, `tailwind`. Load that framework's CSS yourself (see
**Required CSS framework**).

```js
const menuEditor = new MenuEditor("element-id", {
  maxLevel: 3,
  theme: "tailwind",
});
```

Add your own by extending the registry — see `src/themes.ts`.

### Creating the object

HTML

```html
<div id="element-id"></div>
```

Javascript

```js
const menuEditor = new MenuEditor("element-id", { maxLevel: 3 });
```

### Options

`new MenuEditor(id, options)` — `id` is the target element's id; `options` is an
optional object:

| Option     | Type                        | Default       | Description                                                                              |
| ---------- | --------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `maxLevel` | `number`                    | `-1`          | Max nesting depth. `-1` = unlimited; e.g. `3` allows three levels.                       |
| `theme`    | `'bootstrap' \| 'tailwind'` | `'bootstrap'` | Presentation theme; load that framework's CSS yourself (see **Required CSS framework**). |

```js
const menuEditor = new MenuEditor("element-id", {
  maxLevel: 3,
  theme: "bootstrap",
});
```

### Setting the Events

```js
menuEditor.onClickDelete((event) => {
  if (
    confirm("Do you want to delete the item " + event.item.getDataset().text)
  ) {
    event.item.remove(); // remove the item
  }
});

menuEditor.onClickEdit((event) => {
  let itemData = event.item.getDataset();
  console.log(itemData);
  menuEditor.edit(event.item); // set the item in edit mode
});

menuEditor.onDragEnd((event) => {
  let output = editor.getString();
  console.log(output);
  // add logic here
});
```

### Setting the data

The data

```js
var nestedData = [
  {
    text: "Home",
    href: "/home",
    tooltip: "Go to home page",
    icon: "fa-solid fa-house",
    children: [],
  },
  {
    text: "About Us",
    href: "/about",
    tooltip: "Learn more about our company",
    icon: "fa-solid fa-address-card",
    children: [],
  },
  {
    text: "Services",
    href: "/services",
    tooltip: "Discover the services we offer",
    icon: "fa-solid fa-gear",
    children: [
      {
        text: "Service 1",
        href: "/services/1",
        tooltip: "Details for Service 1",
        icon: "cog",
        children: [],
      },
      {
        text: "Service 2",
        href: "/services/2",
        tooltip: "Details for Service 2",
        icon: "cog",
        children: [],
      },
    ],
  },
];
```

The method:

```js
menuEditor.setArray(nestedData);
```

### Mount the menu editor

```js
menuEditor.mount();
```

### Add a new item

```js
let newItem = {
  text: txtText.value, // required
  href: txtHref.value, // required
  icon: txtIcon.value, // required
  tooltip: txtTooltip.value, // required
  something: "Something", // custom attributes are optional
};
menuEditor.add(newItem);
```

### Update an item

The menu editor must have an item in edit mode. See `onClickEdit` event in **Events** section

```js
let data = {
  text: txtText.value,
  href: txtHref.value,
  icon: txtIcon.value,
  tooltip: txtTooltip.value,
};
menuEditor.update(data);
```

### Output

```js
let output = menuEditor.getString();
console.log(output);
```

### Remove all items

```js
menuEditor.empty();
```

## Accessibility

Each item has a drag handle (`.jme-handle`) that is keyboard-operable and
carries a `title="Drag to reorder"` tooltip plus an `aria-label`. Focus a handle
and reorder without a mouse:

- **↑ / ↓** — move the item up / down
- **→ / Enter** — nest under the previous sibling
- **←** — outdent one level

## `src/`, `lib/`, `dist/`

- **`src/`** — TypeScript source (edit this). Structural logic lives in `src/core/`.
- **`lib/`** — npm-package build (minified ESM + UMD + `.d.ts` + `css/styles.css`).
- **`dist/`** — browser drop-in build: `menu-editor.min.js` (SortableJS bundled,
  global `MenuEditor`) + `styles.min.css`, for local `<script>` use. (No CDN yet.)

`lib/` and `dist/` are both generated by `bun run build`, git-ignored, and
**not** edited by hand. Don't delete `src/` — the outputs cannot exist without it.
The `examples/index.html` (single-file demo with a live Bootstrap ⇄ Tailwind
theme switcher) loads the `dist/` bundle, so run `bun run build` before opening it.

## CSS framework peer dependencies

Bootstrap and Tailwind are declared as **optional peer dependencies** — optional
to _install_ because you pick only the one matching your `theme`, but the chosen
framework's CSS is **required at runtime** (see **Required CSS framework**). The
library itself ships only structural styles scoped under the `.jme-editor` root
class, so it won't clash with your framework or leak into your page.

## DEV mode

This project uses **[Bun](https://bun.sh)** as its package manager.

```shell
bun install
bun run dev
```

`bun run dev` builds the browser `dist/` bundle and serves the repo at
<http://localhost:3000> — which redirects straight to the single-file
**Material You** demo (`examples/`) with a live Bootstrap ⇄ Tailwind theme
switcher and keyboard reordering (↑/↓ move, →/Enter nest, ← outdent).

Build the library:

```shell
bun run build
```
