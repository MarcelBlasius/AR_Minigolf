import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
import { ScoreManager } from "./score/scoreManager";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";
import { SensorReadingsHandler } from "./sensor/SensorReadingsHandler";
export class ShootBall extends Behaviour {

    private power = 5;
    private shot: boolean = false;
    private scoreManager = ScoreManager.getInstance();
    private clickHandler = ButtonClickHandler.getInstance();
    private shootTimer = new Date();

    @serializable(Object3D)
    directionIndicator?: Object3D;

    @serializable(Rigidbody)
    body?: Rigidbody

    start(): void {
        this.registerSensorEvents();
        this.registerButtonClick();
    }

    update(): void {
        if (!this.body) {
            console.error('body is undefined')
            return;
        }

        if (!this.shot) {
            return;
        }

        const velo = this.body.getVelocity();
        if (Math.abs(velo.x + velo.y + velo.z) < 0.01) {
            this.shot = false;
            this.setDirectionIndiactorVisibility(true);
        }
    }
    private registerButtonClick() {
        this.clickHandler.subscribe('shoot-button', (event) => {
            switch (event) {
                case (ButtonEvent.DOWN):
                    this.shootTimer = new Date();
                    break;
                case (ButtonEvent.UP):
                    const end = new Date();
                    let delta = end.getTime() - this.shootTimer.getTime();
                    if (delta > 3000) {
                        delta = 3000;
                    }

                    delta /= 1000;

                    console.log('shooting ball with', delta * this.power);
                    this.shoot(delta * this.power);
                    break;
            }
        })
    }

    private registerSensorEvents() {
        SensorReadingsHandler.getInstance().subscribe(data => {
            console.debug('shootBall: received', data);
            this.shoot((data.accX + data.accZ) / 2);
        })
    }

    // shoot the ball.
    private shoot(power: number) {
        if (this.shot) {
            return;
        }

        const direction = this.getDirection();
        direction.multiply(new Vector3(power, power, power));
        this.body?.setVelocity(direction);
        this.shot = true;
        this.setDirectionIndiactorVisibility(false);
        this.scoreManager.incrementScore();
    }

    // gets the normalized direction of the ball.
    private getDirection(): Vector3 {
        const direction = new Vector3();
        this.gameObject.getWorldDirection(direction);
        return direction.normalize();
    }

    private setDirectionIndiactorVisibility(visible: boolean) {
        if (!this.directionIndicator) throw new Error('direction indicator is undefined');

        this.directionIndicator.visible = visible;
    }
}