import { resolve } from "path";
import { defineConfig } from "vite";

/**
 * Browser drop-in build → `dist/`. Single self-contained minified UMD bundle
 * (SortableJS included) + minified CSS, for use via <script>/CDN.
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
      formats: ["umd"],
      fileName: () => "menu-editor.min.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css") ? "styles.min.css" : "[name][extname]",
      },
    },
  },
});
