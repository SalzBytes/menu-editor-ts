/**
 * Presentational class registry. Structural `jme-*` classes live in the DOM
 * logic and NEVER here. Adding a theme = add one entry, no code branches.
 */
export interface ThemeClasses {
  /** wrapper list container (root + nested) */
  list: string;
  /** each menu node */
  item: string;
  /**
   * row holding label + actions. Layout (flex, alignment, padding) is owned by
   * the structural `.jme-row` rule in core.scss — put ONLY visual theme classes
   * here (usually none), never flex/spacing, to avoid double layout.
   */
  row: string;
  /** action button group wrapper */
  buttonGroup: string;
  /** individual action button */
  button: string;
}

export type ThemeName = "bootstrap" | "tailwind";

export const themes: Record<ThemeName, ThemeClasses> = {
  bootstrap: {
    list: "list-group",
    item: "list-group-item",
    row: "",
    buttonGroup: "btn-group btn-group-sm",
    button: "btn btn-secondary",
  },
  tailwind: {
    list: "flex flex-col gap-2",
    item: "border border-gray-200 rounded p-2 bg-white",
    row: "",
    buttonGroup: "inline-flex gap-1",
    button:
      "inline-flex items-center px-2 py-1 text-sm rounded bg-gray-600 text-white hover:bg-gray-700",
  },
};

// self-check: every theme exposes the same keys
const keys = Object.keys(themes.bootstrap).sort().join(",");
for (const name in themes) {
  const k = Object.keys(themes[name as ThemeName]).sort().join(",");
  if (k !== keys) throw new Error(`theme "${name}" missing keys`);
}
