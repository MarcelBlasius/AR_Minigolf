import { Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class Rotate extends Behaviour {
    @serializeable(Object3D)
    object?: Object3D;

    update(): void {
        if (!this.object) throw new Error('object is undefined');

        this.gameObject.rotateZ(this.context.time.deltaTime * 2);
        this.gameObject.rotation.x = 1.5708;
        this.gameObject.rotation.y = 0;
    }
}