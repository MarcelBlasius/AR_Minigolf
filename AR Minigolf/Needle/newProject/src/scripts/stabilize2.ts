import { Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class Stabilize2 extends Behaviour {
    @serializeable(Object3D)
    object?: Object3D;

    update(): void {
        if (!this.object) throw new Error('object is undefined');

        if (!this.object.visible) {
            return;
        }
        this.gameObject.visible = true;

        const global = new Vector3();
        this.object.getWorldPosition(global);

        this.gameObject.position.copy(global);
        this.gameObject.position.y = global.y + this.gameObject.scale.y * 0.1
        //this.gameObject.setRotationFromAxisAngle(new Vector3(0, 0, 1), this.context.time.deltaTime * 2);
        //this.gameObject.position.y = global.y;
        //this.gameObject.rotation.y = this.object.rotation.y;
    }
}

