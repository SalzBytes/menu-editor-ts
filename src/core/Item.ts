import { ElementItem } from "./ElementItem";
import { ItemData, Itemlistener, NestedItemData, ItemOptions, ItemDataset } from "../types";
import { ButtonGroup } from "./ButtonGroup";
import { HANDLER_ICON } from "../constants";
import { themes } from "../themes";
import { Collection } from "./Collection";
import { itemDataToDataset, setDatasetToElement } from "../functions";

export class Item implements ElementItem {
  protected element = document.createElement("div");
  protected dataset: ItemDataset;
  protected collection: Collection;
  protected options: ItemOptions = { sortableClassname: 'nested-sortable', theme: themes.bootstrap };
  protected listenerEditButton: Itemlistener = () => {};
  protected listenerDeleteButton: Itemlistener = () => {};
  public buttonGroup: ButtonGroup;

  constructor(data: ItemData) {
    this.collection = new Collection();
    this.buttonGroup = new ButtonGroup(this);
    this.element.classList.add("jme-item");
    this.dataset = itemDataToDataset(data);
  }

  public setOptions(options: ItemOptions) {
    this.options = options;
    this.buttonGroup.setTheme(options.theme);
  }

  public setDataset(dataset: ItemDataset): void {
    this.dataset = dataset;
  }

  public getDataset(): ItemDataset {
    return this.dataset;
  }

  public setListenerEditButton(listener: Itemlistener) {
    this.listenerEditButton = listener;
  }

  public setListenerDeleteButton(listener: Itemlistener) {
    this.listenerDeleteButton = listener;
  }

  public add(item: ElementItem) {
    this.collection.add(item);
  }

  public remove(): void {
    this.getElement().remove();
  }

  public updateUI(data: ItemDataset): void {
    let textElement = this.element.querySelector('.item-text');
    let iconElement = this.element.querySelector('i');
    if (textElement != null) {
      textElement.innerHTML = data.text;
    }
    if (iconElement != null) {
      iconElement.className = data.icon;
    }
  }

  public addArray(data: Array<NestedItemData>) {
    data.forEach((item) => {
      let mi = new Item(item);
      mi.setOptions(this.options);
      mi.setListenerDeleteButton(this.listenerDeleteButton);
      mi.setListenerEditButton(this.listenerEditButton);
      mi.buttonGroup.onClickDelete(this.listenerDeleteButton);
      mi.buttonGroup.onClickEdit(this.listenerEditButton);
      setDatasetToElement(mi.getElement(), mi.getDataset());
      if (item.children != undefined && item.children.length > 0) {
        mi.addArray(item.children);
      }
      this.add(mi);
    });
  }

  protected createHandler(): HTMLSpanElement {
    let handler = document.createElement('span');
    handler.className = 'jme-handle';
    handler.setAttribute('tabindex', '0');
    handler.setAttribute('role', 'button');
    handler.setAttribute('title', 'Drag to reorder');
    handler.setAttribute('aria-label', 'Reorder item — arrow keys to move, Enter to nest');
    handler.innerHTML = HANDLER_ICON;
    return handler;
  }


  protected addClasses(el: HTMLElement, ...classNames: string[]): void {
    classNames.filter(Boolean).forEach((c) => el.classList.add(...c.split(/\s+/)));
  }

  public mount(): void {
    let theme = this.options.theme;
    this.addClasses(this.element, theme.item);
    let divTextActions = document.createElement("div");
    let span = document.createElement("span");
    span.className = 'jme-label';
    let icon = document.createElement('i');
    icon.className = this.dataset.icon;
    let handler = this.createHandler();
    let text = document.createElement('span');
    text.className = 'item-text';
    text.style.paddingLeft = "5px";
    text.innerHTML = this.dataset.text;
    let divGroup = document.createElement("div");
    divTextActions.className = 'jme-row';
    this.addClasses(divTextActions, theme.row);
    span.append(handler);
    span.append(icon);
    span.append(text);
    divGroup.classList.add("jme-list", this.options.sortableClassname);
    this.addClasses(divGroup, theme.list);
    divTextActions.append(span);
    this.buttonGroup.mount();
    divTextActions.append(this.buttonGroup.getElement());
    this.element.append(divTextActions);
    this.collection.getItems().forEach((item) => {
      item.mount();
      divGroup.appendChild(item.getElement());
    });
    this.element.append(divGroup);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
