import { ElementItem } from "./core/ElementItem";
import { ThemeClasses, ThemeName } from "./themes";

export interface BaseItemData {
  text: string;
  href: string;
  icon: string;
  tooltip: string;
}

type ItemDataset = Record<string, string> & BaseItemData;

type ItemData = Record<string, string | undefined | Array<ItemData>> & BaseItemData;

interface NestedItemData extends ItemData {
  children?: Array<NestedItemData>;
}

interface ItemOptions {
  sortableClassname: string;
  theme: ThemeClasses;
}

interface ItemParameters {
  item: ElementItem;
}

type Itemlistener = (params: ItemParameters) => void;

interface MenuEditorOptions {
  maxLevel: number;
  theme?: ThemeName;
}

export type {
  NestedItemData,
  ItemOptions,
  Itemlistener,
  ItemParameters,
  ItemData,
  ItemDataset,
  MenuEditorOptions,
};
