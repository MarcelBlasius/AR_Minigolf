import { Behaviour, GameObject, IPointerClickHandler, PointerEventData, Rigidbody, SyncedTransform, serializable } from "@needle-tools/engine"
import { sync } from "@needle-tools/engine/lib/engine/engine_networking_auto";
import { Object3D, Vector3 } from "three";
import { requestOwnership } from "./utils";
export class ShootBall extends Behaviour implements IPointerClickHandler {

    shot: boolean = false;
    force: Vector3 = new Vector3();
    power = 1;

    @serializable(Object3D)
    object?: Object3D;

    @serializable(Rigidbody)
    body?: Rigidbody

    _sync: SyncedTransform | undefined;

    start(): void {
        this._sync = GameObject.getComponent(this.gameObject, SyncedTransform) ?? undefined;
    }
    update(): void {
        if (!this.shot) {
            return;
        }

        this.force = new Vector3(0.95 * this.force.x, 0.95 * this.force.y, 0.95 * this.force.z)
        this.body?.setForce(this.force.x, this.force.y, this.force.z)
        if (this.force.x + this.force.y + this.force.z < 0.02) {
            this.shot = false;
        }
    }

    async onPointerClick(_args: PointerEventData) {
        if (!this.object) {
            console.error('object is undefined')
            return;
        }

        await requestOwnership(this._sync);

        let direction = new Vector3();
        this.object.getWorldDirection(direction);
        direction = direction.normalize();

        this.force = new Vector3(this.power * direction.x, this.power * direction.y, this.power * direction.z);
        this.body?.applyForce(this.force);
        this.shot = true;
    }
}