import { Behaviour, serializable } from "@needle-tools/engine";
import { Matrix4, Object3D, Vector3 } from "three";

export class ConnectToScaledCorner extends Behaviour {
    @serializable(Object3D)
    target?: Object3D;

    @serializable(Object3D)
    helper_corner?: Object3D;

    private transformed = false;

    update(): void {
        if (this.transformed) {
            return;
        }

        if (!this.helper_corner || !this.target) {
            console.error('helper corner or target is not defined');
            return;
        }

        // do not connect invisible object
        if (!this.gameObject.visible || !this.target?.visible) {
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

        this.transformed = true;
    }
}
