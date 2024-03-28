import { Behaviour } from "@needle-tools/engine"
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";
import { SensorDirectionHandler } from "./sensor/SensorDirectionHandler";

export class RotateBall extends Behaviour {
    private clickHandler = ButtonClickHandler.getInstance();

    public deg = 2.5;

    private rad = this.deg * Math.PI / 180;

    private rotatingRight = false;
    private rotatingLeft = false;

    start(): void {
        this.mapButtonClicks();
        this.registerDirectionEvents();
    }

    private mapButtonClicks() {
        this.clickHandler.subscribe('rotate-right-button', async (event) => {
            switch (event) {
                case (ButtonEvent.DOWN):
                    this.rotatingRight = true;
                    while (this.rotatingRight) {
                        this.rotateRight();
                        await new Promise(resolve => setTimeout(resolve, 25));
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
                        await new Promise(resolve => setTimeout(resolve, 25));
                    }
                    break;
                case (ButtonEvent.UP):
                    this.rotatingLeft = false;
                    break;
            }
        });
    }

    private registerDirectionEvents() {
        SensorDirectionHandler.getInstance().subscribe(data => {
            console.debug('rotate_Ball: received', data);
            if (data === "left") {
                this.rotateLeft();
            }
            if (data === "right") {
                this.rotateRight();
            }
        })
    }

    private rotateRight() {
        this.gameObject.rotateY(-this.rad);
    }

    private rotateLeft() {
        this.gameObject.rotateY(this.rad)
    }
}