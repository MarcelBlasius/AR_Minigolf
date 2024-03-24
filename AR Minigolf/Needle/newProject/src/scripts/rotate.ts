import { Behaviour } from "@needle-tools/engine";

export class Rotate extends Behaviour {
    update(): void {

        const rotation = this.context.time.deltaTime * 2
        this.gameObject.rotateY(rotation);
    }
}