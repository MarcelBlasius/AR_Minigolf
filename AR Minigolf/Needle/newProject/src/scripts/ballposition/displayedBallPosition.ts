import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine";

export class DisplayedBallPosition extends Behaviour {

    @serializable(Rigidbody)
    body?: Rigidbody

    setPosition(x: number, y: number, z: number) {
        this.body?.worldPosition.setX(x);
        this.body?.worldPosition.setY(y);
        this.body?.worldPosition.setZ(z);
    }
}