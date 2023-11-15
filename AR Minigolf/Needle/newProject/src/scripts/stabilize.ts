import { Behaviour } from "@needle-tools/engine";
import { Vector3 } from "three";

export class Stabilize extends Behaviour {
    update(): void {
        this.gameObject.rotateX(-this.gameObject.rotation.x)
        this.gameObject.rotateZ(-this.gameObject.rotation.z);
    }
}

