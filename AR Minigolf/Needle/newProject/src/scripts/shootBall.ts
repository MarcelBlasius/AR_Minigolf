import { Behaviour, GameObject, IPointerClickHandler, PointerEventData, Rigidbody, SyncedTransform, serializable } from "@needle-tools/engine"
import { sync } from "@needle-tools/engine/lib/engine/engine_networking_auto";
import { Object3D, Vector3 } from "three";
import { requestOwnership } from "./utils";
export class ShootBall extends Behaviour implements IPointerClickHandler {

    shot: boolean = false;
    force: Vector3 = new Vector3();
    power = 5;

    @serializable(Object3D)
    object?: Object3D;

    @serializable(Rigidbody)
    body?: Rigidbody

    update(): void {
        if (!this.body) {
            console.error('object is undefined')
            return;
        }
        if (!this.shot) {
            return;
        }


        const velo = this.body.getVelocity();
        if (velo.x + velo.y + velo.z < 0.01) {
            this.shot = false;
        }
    }

    async onPointerClick(_args: PointerEventData) {
        if (!this.object) {
            console.error('object is undefined')
            return;
        }

        let direction = new Vector3();
        this.object.getWorldDirection(direction);
        direction = direction.normalize();

        this.force = new Vector3(this.power * direction.x, 0, this.power * direction.z);
        this.body?.setVelocity(this.force);
        this.shot = true;
    }

    start():void{
        var sourceSensor = new EventSource('http://192.168.188.77:4200/SensorReadings');

    sourceSensor.addEventListener('open', function(e) {
      console.log("SensorReadings Connected");
    }, false);
   
    sourceSensor.addEventListener('error', function(e: any) {
      if (e.target.readyState != EventSource.OPEN) {
        console.log("SensorReadings Disconnected");
      }
    }, false);
  

    sourceSensor.addEventListener('readings', (e : any) =>  {
        console.log("readings", e.data);
        var data = JSON.parse(e.data);
        console.log(data);
        let direction = new Vector3();
        this.object?.getWorldDirection(direction);
        direction = direction.normalize();
        this.body?.setVelocity(data.accX * direction.x, 0, data.accZ * direction.z);
        
      }, false);

    }
}