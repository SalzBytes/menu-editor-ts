# Menu Editor

## Changelog

#### Unreleased

* chore: migrated package manager to **Bun** (`bun.lock` is source of truth).
* feat: **theme option** (`bootstrap` | `tailwind`) via a class registry (`src/themes.ts`). Default `bootstrap`.
* refactor: split structural (`jme-*`) vs presentational classes; drag/level logic no longer depends on theme class names.
* feat: **Bootstrap is now optional** — the bundle ships only theme-agnostic structural styles (`src/scss/core.scss`); Bootstrap SCSS no longer imported into the library.
* feat: framework CSS (Bootstrap/Tailwind) are now **optional peer dependencies**.
* fix: structural styles scoped under the `.jme-editor` root class so the library no longer leaks styles into the host page or clashes with its CSS framework.
* chore: switched TypeScript node types to **Bun** (`@types/bun`).
* build: explicit minified JS + CSS output.
* refactor: moved core logic into `src/core/`.
* docs: clarified `src/` (source) vs `lib/` (generated, git-ignored build output).
* _Improvements by [@SalzBytes](https://github.com/SalzBytes)._

#### v1.2.0

* feat: Added a new onDragEnd event to handle the end of drag interactions (thanks to [@Sjohn21](https://github.com/Sjohn21))

#### v1.1.1

* Fix: import styles.css

#### v1.1.0

* **New feature:** maxLevel option (zero-based value, where zero indicates the first level of the nested menu).
* Improvements in the layout of items and buttons.

#### v1.0.0

* First release