import { Behaviour, GameObject, IPointerClickHandler, PointerEventData, Rigidbody, serializable } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
export class ShootBall extends Behaviour implements IPointerClickHandler {

    private power = 5;
    private shot: boolean = false;

    @serializable(Object3D)
    directionIndicator?: Object3D;

    @serializable(Rigidbody)
    body?: Rigidbody

    start(): void {
        this.registerSensorEvents();
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

    // shoot the ball on click
    async onPointerClick(_args: PointerEventData) {
        if (this.shot) {
            return;
        }

        this.shoot(this.power);
    }

    // connects and registers sensor events.
    private registerSensorEvents() {
        var sourceSensor = new EventSource('http://192.168.188.77:4200/SensorReadings');

        sourceSensor.addEventListener('open', function (e) {
            console.log("SensorReadings Connected");
        }, false);

        sourceSensor.addEventListener('error', function (e: any) {
            if (e.target.readyState != EventSource.OPEN) {
                console.log("SensorReadings Disconnected");
            }
        }, false);

        sourceSensor.addEventListener('readings', (e: any) => {
            console.log("readings", e.data);
            const data = JSON.parse(e.data);
            this.shoot((data.accX + data.accZ) / 2);
        }, false);
    }

    // shoot the ball.
    private shoot(power: number) {
        const direction = this.getDirection();
        direction.multiply(new Vector3(power, power, power));
        this.body?.setVelocity(direction);
        this.shot = true;
        this.setDirectionIndiactorVisibility(false);
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