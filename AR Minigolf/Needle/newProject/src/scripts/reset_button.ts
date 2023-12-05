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
        console.log('Resetting ball');

        const refWorldPos = new Vector3();
        this.reference.getWorldPosition(refWorldPos);
        this.body?.teleport({ x: refWorldPos.x, y: refWorldPos.y + this.object.scale.y * 0.55, z: refWorldPos.z }, false)
        this.body?.setVelocity(0, 0, 0);
    }

    start():void{
    var sourceReset = new EventSource('http://192.168.188.77:4200/Reset');

    
    sourceReset.addEventListener('open', function(e) {
        console.log("Reset Connected");
      }, false);
  
    
  
    sourceReset.addEventListener('error', function(e: any) {
        if (e.target.readyState != EventSource.OPEN) {
          console.log("Reset Disconnected");
        }
      }, false);

      sourceReset.addEventListener('reset', (e : any) => {
        console.log("reset", e.data);
        if (!this.object) {
            console.error('object is undefined')
            return;
        }
        if (!this.reference || !this.body) {
            console.error('Reference object is undefined');
            return;
        }
        this.object.visible = true;
        console.log('Resetting ball');

        const refWorldPos = new Vector3();
        this.reference.getWorldPosition(refWorldPos);
        this.body?.teleport({ x: refWorldPos.x, y: refWorldPos.y + this.object.scale.y * 0.55, z: refWorldPos.z }, false)
        this.body?.setVelocity(0, 0, 0);
      }, false);
    }
}