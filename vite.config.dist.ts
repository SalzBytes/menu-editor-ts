import { resolve } from "path";
import { defineConfig } from "vite";

/**
 * Browser drop-in build → `dist/`. Self-contained minified bundle (SortableJS
 * included) + minified CSS. Ships both:
 *   - UMD  `menu-editor.min.js`      — <script> use, global `MenuEditor`.
 *   - ESM  `menu-editor.esm.min.js`  — `import { MenuEditor }` (bundlers/TS).
 * The npm package build lives in `vite.config.ts` (→ `lib/`).
 */
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, "src/dist-entry.ts"),
      name: "MenuEditor",
      formats: ["umd", "es"],
      fileName: (format) =>
        format === "es" ? "menu-editor.esm.min.js" : "menu-editor.min.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css") ? "styles.min.css" : "[name][extname]",
      },
    },
  },
});
