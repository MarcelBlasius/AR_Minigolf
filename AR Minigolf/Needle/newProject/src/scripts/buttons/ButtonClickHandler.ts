import { ButtonEvent } from "./buttonEvents";

export class ButtonClickHandler {
    static ButtonEvent: any;
    private constructor() { }

    private static instance: ButtonClickHandler | undefined;
    private map: { [buttonId: string]: ((event: ButtonEvent) => void)[] } = {};

    public static getInstance(): ButtonClickHandler {
        if (!this.instance) {
            this.instance = new ButtonClickHandler();
        }

        return this.instance;
    }

    public subscribe(buttonId: string, callback: (event: ButtonEvent) => void): void {
        if (!this.map[buttonId]) {
            this.map[buttonId] = [];
        }

        this.map[buttonId].push(callback);
    }

    public onClick(buttonId: string, event: ButtonEvent) {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        if (button.disabled) {
            return;
        }
        if (!this.map[buttonId]) {
            console.warn('No receivers for', buttonId);
            return;
        }

        console.debug(buttonId, 'fired event:', ButtonEvent[event]);
        this.map[buttonId].forEach(callback => callback(event));
    }
}