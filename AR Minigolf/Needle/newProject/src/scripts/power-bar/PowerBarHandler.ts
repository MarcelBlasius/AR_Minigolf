import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";

export class PowerBarHandler {
    private bar: HTMLElement;
    private stop = false;
    private buttonVisibilityHandler = new ButtonVisibilityHandler();

    constructor() {
        const el = document.getElementById('progressFiller');
        if (!el) {
            throw new Error('could not find progressFiller');
        }

        this.bar = el;
    }

    public startFill() {
        this.buttonVisibilityHandler.setVisibility('progressbar', true);
        this.buttonVisibilityHandler.setVisibility('progressFiller', true);

        this.stop = false;
        this.bar.style.height = `0px`;
        this.fill();
    }

    public getPower(): number {
        const heightAsString: string = window.getComputedStyle(this.bar).height;
        return parseFloat(heightAsString);
    }

    private fill() {
        // if stopped in the mean time
        if (this.stop) {
            return;
        }
        const heightAsString: string = window.getComputedStyle(this.bar).height;
        const heightAsNumber: number = parseFloat(heightAsString);
        const newHeight = heightAsNumber + 5;
        this.bar.style.height = `${newHeight > 100 ? 100 : newHeight}px`;
        if (!this.stop && newHeight < 100) {
            setTimeout(this.fill.bind(this), 50);
        }
    }

    public stopFill() {
        this.stop = true;
        this.buttonVisibilityHandler.setVisibility('progressbar', false);
        this.buttonVisibilityHandler.setVisibility('progressFiller', false);
    }
}
