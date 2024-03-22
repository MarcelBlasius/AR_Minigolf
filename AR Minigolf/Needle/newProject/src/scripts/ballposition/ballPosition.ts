import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine";

export abstract class BallPosition extends Behaviour {

    @serializable(Rigidbody)
    body?: Rigidbody

    setPosition(x: number, y: number, z: number) {
        this.body?.worldPosition.setX(x);
        this.body?.worldPosition.setY(y);
        this.body?.worldPosition.setZ(z);
    }
}