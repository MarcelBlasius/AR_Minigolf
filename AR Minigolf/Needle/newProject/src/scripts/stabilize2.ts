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

        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');

        console.log('rotations');
        console.log(this.gameObject.rotation.x, this.gameObject.rotation.y, this.gameObject.rotation.z);
        if (ball === 'red') {
            this.gameObject.rotation.y = this.object.rotation.y;
        }
    }
}

