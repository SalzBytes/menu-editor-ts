/**
 * Browser drop-in build → `dist/`. Self-contained minified bundle (SortableJS
 * included) + minified CSS. Ships both:
 *   - UMD  `menu-editor.min.js`      — <script> use, global `MenuEditor`.
 *   - ESM  `menu-editor.esm.min.js`  — `import { MenuEditor }` (bundlers/TS).
 * The npm package build lives in `vite.config.ts` (→ `lib/`).
 */
declare const _default: import('vite').UserConfig;
export default _default;
