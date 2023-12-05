import { Behaviour } from "@needle-tools/engine";

export class Stabilize extends Behaviour {
    public height: number = 0.5;

    update(): void {
        this.gameObject.position.setY(this.height);
        this.gameObject.rotation.x = 0;
        this.gameObject.rotation.z = 0;
    }
}

