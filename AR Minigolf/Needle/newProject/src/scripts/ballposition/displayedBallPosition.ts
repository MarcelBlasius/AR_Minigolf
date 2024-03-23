import { Behaviour, Rigidbody, serializable } from "@needle-tools/engine";
import { Object3D } from "three";

export class DisplayedBallPosition extends Behaviour {

    @serializable(Object3D)
    body?: Object3D

    setPosition(x: number, y: number, z: number) {
        this.body?.position.setX(x);
        this.body?.position.setY(y);
        this.body?.position.setZ(z);
    }
}