/**
 * CDN / browser-global entry. The UMD global `MenuEditor` IS the class itself
 * (so `new MenuEditor(...)` works from a <script> tag). `themes` is attached
 * as a static for convenience.
 */
import './scss/core.scss';
import MenuEditor from './core/MenuEditor';
import { themes } from './themes';

(MenuEditor as unknown as { themes: typeof themes }).themes = themes;

export default MenuEditor;
