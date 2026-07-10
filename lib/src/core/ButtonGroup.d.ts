import { ElementItem } from './ElementItem';
import { ItemEvent } from './ItemEvent';
import { ItemParameters } from '../types';
import { ThemeClasses } from '../themes';
declare class Button {
    private button;
    constructor(html: string);
    setTheme(className: string): void;
    onClick(f: EventListenerOrEventListenerObject): void;
    getElement(): HTMLElement;
    getParemtElement(): HTMLElement | null;
}
export declare class ButtonGroup {
    protected item: ElementItem;
    protected container: HTMLDivElement;
    protected eventEmitter: ItemEvent;
    protected theme: ThemeClasses;
    protected buttons: {
        edit: Button;
        delete: Button;
    };
    constructor(item: ElementItem);
    setTheme(theme: ThemeClasses): void;
    protected setEvents(): void;
    onClickDelete(listener: (params: ItemParameters) => void): void;
    onClickEdit(listener: (params: ItemParameters) => void): void;
    mount(): void;
    getElement(): HTMLDivElement;
}
export {};
