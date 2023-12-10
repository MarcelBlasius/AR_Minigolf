import { Behaviour } from "@needle-tools/engine"
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";
export class RotateBall extends Behaviour {
    private clickHandler = ButtonClickHandler.getInstance();

    public deg = 1;

    private rad = this.deg * Math.PI / 180;

    private rotatingRight = false;
    private rotatingLeft = false;

    start(): void {
        this.mapButtonClicks();
    }

    private mapButtonClicks() {
        this.clickHandler.subscribe('rotate-right-button', async (event) => {
            switch (event) {
                case (ButtonEvent.DOWN):
                    this.rotatingRight = true;
                    while (this.rotatingRight) {
                        this.rotateRight();
                        await new Promise(resolve => setTimeout(resolve, 1));
                    }
                    break;
                case (ButtonEvent.UP):
                    this.rotatingRight = false;
                    break;
            }
        });

        this.clickHandler.subscribe('rotate-left-button', async (event) => {
            switch (event) {
                case (ButtonEvent.DOWN):
                    this.rotatingLeft = true;
                    while (this.rotatingLeft) {
                        this.rotateLeft();
                        await new Promise(resolve => setTimeout(resolve, 1));
                    }
                    break;
                case (ButtonEvent.UP):
                    this.rotatingLeft = false;
                    break;
            }
        });
    }

    private rotateRight() {
        this.gameObject.rotateY(-this.rad);
    }

    private rotateLeft() {
        this.gameObject.rotateY(this.rad)
    }
}