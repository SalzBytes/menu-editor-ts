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
export declare const themes: Record<ThemeName, ThemeClasses>;
