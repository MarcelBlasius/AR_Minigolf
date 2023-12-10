export class ButtonClickHandler {
    private constructor() { }

    private static instance: ButtonClickHandler | undefined;
    private map: { [buttonId: string]: (() => void)[] } = {};


    public static getInstance(): ButtonClickHandler {
        if (!this.instance) {
            this.instance = new ButtonClickHandler();
        }

        return this.instance;
    }

    public subscribe(buttonId: string, callback: () => void): void {
        if (!this.map[buttonId]) {
            this.map[buttonId] = [];
        }

        this.map[buttonId].push(callback);
    }

    public onClick(buttonId: string) {
        if (!this.map[buttonId]) {
            console.warn('No receivers for', buttonId);
            return;
        }

        console.log(buttonId, 'was clicked');
        this.map[buttonId].forEach(callback => callback());
    }
}