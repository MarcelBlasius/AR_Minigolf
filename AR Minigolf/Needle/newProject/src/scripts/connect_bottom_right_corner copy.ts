import { Behaviour, serializable } from "@needle-tools/engine";
import { Matrix4, Object3D } from "three";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";

export class ConnectBottomRightCorner extends Behaviour {
    @serializable(Object3D)
    target?: Object3D;

    @serializable(Object3D)
    helper_corner?: Object3D;

    @serializable(Object3D)
    helper_corner2?: Object3D;

    private clickHandler = ButtonClickHandler.getInstance();


    start(): void {
        this.registerButtonClick();
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
        if (!this.helper_corner || !this.target || !this.helper_corner2) {
            console.error('top right is not defined');
            return;
        }

        this.helper_corner.visible = true;

        this.helper_corner2?.position.copy(this.gameObject.position);

        const scaleX = this.gameObject.position.x - this.target.position.x;
        const moveX = 0.5 * scaleX;
        const absScaleX = Math.abs(scaleX);

        this.helper_corner2.translateX(-moveX);
        this.helper_corner2.scale.setX(absScaleX);

        // move top right corner on correct position
        this.helper_corner.position.set(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.position.z)
        this.helper_corner.translateX(-2 * moveX);

        // connect top right corner with lop left corner
        const scaleZ = this.helper_corner.position.z - this.target.position.z;
        const moveZ = 0.5 * scaleZ;
        const absScaleZ = Math.abs(scaleZ);

        this.helper_corner.translateZ(-moveZ);
        this.helper_corner.scale.setZ(absScaleZ);
    }
}
