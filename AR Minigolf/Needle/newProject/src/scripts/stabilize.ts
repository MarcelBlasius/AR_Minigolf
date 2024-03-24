import { Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class Stabilize extends Behaviour {
    @serializeable(Object3D)
    object?: Object3D;

    update(): void {
        if (!this.object) throw new Error('object is undefined');

        if (!this.object.visible) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');

        if (ball !== 'red') {
            return;
        }

        this.gameObject.visible = true;

        const global = new Vector3();
        this.object.getWorldPosition(global);

        this.gameObject.position.copy(global);
        this.gameObject.position.y = global.y;
        this.gameObject.rotation.y = this.object.rotation.y;
    }
}

