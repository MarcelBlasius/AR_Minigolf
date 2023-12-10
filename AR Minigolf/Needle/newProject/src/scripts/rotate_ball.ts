import { Behaviour } from "@needle-tools/engine"
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
export class RotateBall extends Behaviour {
    private clickHandler = ButtonClickHandler.getInstance();

    public deg = 5;

    private rad = this.deg * Math.PI / 180;

    start(): void {
        this.clickHandler.subscribe('rotate-right-button', () => {
            this.rotateRight();
        });

        this.clickHandler.subscribe('rotate-left-button', () => {
            this.rotateLeft();
        });
    }

    rotateRight() {
        this.gameObject.rotateY(-this.rad);
    }

    rotateLeft() {
        this.gameObject.rotateY(this.rad)
    }
}