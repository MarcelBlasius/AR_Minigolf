import { Behaviour, serializable } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";

export class ConnectBottomRightCorner extends Behaviour {
    @serializable(Object3D)
    object?: Object3D;

    update(): void {
    }
}
