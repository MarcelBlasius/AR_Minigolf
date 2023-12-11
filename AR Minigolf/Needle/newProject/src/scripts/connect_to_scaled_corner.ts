import { Behaviour, serializable } from "@needle-tools/engine";
import { Matrix4, Object3D, Vector3 } from "three";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";

export class ConnectToScaledCorner extends Behaviour {
    @serializable(Object3D)
    target?: Object3D;

    @serializable(Object3D)
    helper_corner?: Object3D;

    private clickHandler = ButtonClickHandler.getInstance();

    start(): void {
    }

    private registerButtonClick() {
        this.clickHandler.subscribe('connect-button', (event) => {
            switch (event) {
                case (ButtonEvent.CLICK):
                    console.log('here');
                    this.stabilize();
                    break;
            }
        })
    }

    private stabilize() {
        if (!this.helper_corner || !this.target) {
            console.error('helper corner or target is not defined');
            return;
        }
        this.helper_corner.visible = true;

        const scaleX = this.gameObject.position.x - this.target.position.x;
        const moveX = scaleX;
        const absScaleX = Math.abs(scaleX);

        this.gameObject.transform.translateX(-moveX);
        this.gameObject.transform.scale.setX(2 * absScaleX);

        // move top right corner on correct position
        this.helper_corner.position.set(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.position.z)
        this.helper_corner.translateX(-moveX);

        // connect top right corner with lop left corner
        const scaleZ = this.helper_corner.position.z - this.target.position.z;
        const moveZ = 0.5 * scaleZ;
        const absScaleZ = Math.abs(scaleZ);

        this.helper_corner.translateZ(-moveZ);
        this.helper_corner.scale.setZ(absScaleZ);
    }
}
