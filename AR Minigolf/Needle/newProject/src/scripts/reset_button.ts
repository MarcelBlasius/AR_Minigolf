import { Behaviour, Rigidbody, serializeable } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
import { ScoreManager } from "./score/scoreManager";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";

export class ResetButton extends Behaviour {
  @serializeable(Object3D)
  reference?: Object3D;

  @serializeable(Object3D)
  object?: Object3D;

  @serializeable(Rigidbody)
  body?: Rigidbody;

  private scoreManager = ScoreManager.getInstance();
  private clickHandler = ButtonClickHandler.getInstance();

  start(): void {
    this.mapButtonClick();
    this.mapGolfClubClick();
  }

  private mapGolfClubClick() {
    const sourceReset = new EventSource('http://192.168.188.77:4200/Reset');

    sourceReset.addEventListener('open', function (e) {
      console.log("Reset Connected");
    }, false);

    sourceReset.addEventListener('error', function (e: any) {
      if (e.target.readyState != EventSource.OPEN) {
        console.log("Reset Disconnected");
      }
    }, false);

    sourceReset.addEventListener('reset', (e: any) => {
      console.log("reset", e.data);
      this.reset();
    }, false);
  }

  private mapButtonClick() {
    this.clickHandler.subscribe('reset-button', (event) => {
      if (event === ButtonEvent.CLICK) {
        this.reset();
      }
    });
  }

  private reset() {
    console.log('Resetting ball');

    if (!this.reference) throw new Error('Reference is undefined');
    if (!this.object) throw new Error('Object is undefined');

    this.object.visible = true;
    const refWorldPos = new Vector3();
    this.reference.getWorldPosition(refWorldPos);
    this.body?.teleport({ x: refWorldPos.x, y: refWorldPos.y + this.object.scale.y * 0.55, z: refWorldPos.z }, false)
    this.body?.setVelocity(0, 0, 0);
    this.scoreManager.resetScore();
  }
}