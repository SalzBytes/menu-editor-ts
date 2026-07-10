import { ElementItem } from "./ElementItem";
import { ItemEvent } from "./ItemEvent";
import { DELETE_ICON, EDIT_ICON } from "../constants";
import { ItemParameters } from "../types";
import { ThemeClasses, themes } from "../themes";

class Button {
    private button = document.createElement('button');

    constructor(html: string) {
        this.button.innerHTML = html;
    }
    public setTheme(className: string) {
        this.button.className = '';
        className.split(/\s+/).filter(Boolean).forEach((c) => this.button.classList.add(c));
    }
    public onClick(f: EventListenerOrEventListenerObject) {
        this.button.addEventListener('click', f);
    }

    public getElement(): HTMLElement {
        return this.button;
    }

    public getParemtElement(): HTMLElement | null {
        return this.button.closest('.jme-item');
    }
}

export class ButtonGroup {
    protected item: ElementItem;
    protected container = document.createElement('div');
    protected eventEmitter = new ItemEvent();
    protected theme: ThemeClasses = themes.bootstrap;
    protected buttons = {
        edit: new Button(EDIT_ICON),
        delete: new Button(DELETE_ICON)
    };
    constructor(item: ElementItem) {
        this.item = item;
        this.setEvents();
    }
    public setTheme(theme: ThemeClasses): void {
        this.theme = theme;
    }
    protected setEvents(): void {
        this.buttons.delete.onClick(() => {
            this.eventEmitter.emit('clickDelete', { item: this.item });
        });
        this.buttons.edit.onClick(() => {
            this.eventEmitter.emit('clickEdit', { item: this.item });
        });
    }
    public onClickDelete(listener: (params: ItemParameters) => void) {
        this.eventEmitter.on('clickDelete', listener);
    }
    public onClickEdit(listener: (params: ItemParameters) => void) {
        this.eventEmitter.on('clickEdit', listener);
    }

    public mount() {
        this.container.className = 'jme-btn-group';
        this.theme.buttonGroup.split(/\s+/).filter(Boolean).forEach((c) => this.container.classList.add(c));
        this.buttons.edit.setTheme(this.theme.button);
        this.buttons.delete.setTheme(this.theme.button);
        this.container.append(this.buttons.edit.getElement());
        this.container.append(this.buttons.delete.getElement());
    }

    public getElement() {
        return this.container;
    }
}
