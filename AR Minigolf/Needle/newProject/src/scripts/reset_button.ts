import { Behaviour, GameObject, IPointerClickHandler, PointerEventData, Rigidbody, SyncedTransform, VERSION, serializeable, showBalloonMessage } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
import { requestOwnership } from "./utils";
export class ResetButton extends Behaviour implements IPointerClickHandler {
    @serializeable(Object3D)
    reference?: Object3D;

    @serializeable(Object3D)
    object?: Object3D;

    @serializeable(Rigidbody)
    body?: Rigidbody;

    _sync: SyncedTransform | undefined;

    start(): void {
        if (!this.object) {
            console.error('object is undefined')
            return;
        }

        this._sync = GameObject.getComponent(this.object, SyncedTransform) ?? undefined;
        this._sync?.requestOwnership();
    }

    async onPointerClick(_args: PointerEventData) {
        if (!this.object) {
            console.error('object is undefined')
            return;
        }
        if (!this.reference || !this.body) {
            console.error('Reference object is undefined');
            return;
        }

        this.object.visible = true;
        const velo = this.body.getVelocity();
        if (velo.x > 0 || velo.y > 0 || velo.z > 0){
            console.log('can not reset a ball that is in movement');
            return;
        }

        console.log('Resetting ball');

        const refWorldPos = new Vector3();
        this.reference.getWorldPosition(refWorldPos);
        this.body?.teleport({ x: refWorldPos.x, y: refWorldPos.y + this.object.scale.y * 0.55, z: refWorldPos.z }, false)

        this.object.setRotationFromEuler(this.reference.rotation);
        await requestOwnership(this._sync);
    }
}