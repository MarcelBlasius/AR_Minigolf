import { Behaviour, Rigidbody, serializable, serializeable } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";
import { SensorResetHandler } from "./sensor/SensorResetHandler";
import { BallPositionClient } from "./ballposition/ballposition.client";
import { BallPosition } from "./ballposition/ballposition.model";

export class ResetButton extends Behaviour {
  @serializeable(Object3D)
  reference?: Object3D;

  @serializeable(Object3D)
  object?: Object3D;

  @serializeable(Rigidbody)
  body?: Rigidbody;

  @serializable()
  public color: string = '';

  private clickHandler = ButtonClickHandler.getInstance();
  private ballPostionClient = new BallPositionClient();

  start(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const ball = urlParams.get('ball');
    if (ball !== this.color) {
      return;
    }

    this.mapButtonClick();
    this.mapGolfClubClick();
  }

  private mapGolfClubClick() {
    SensorResetHandler.getInstance().subscribe(() => {
      console.debug('reset_button received sensor reset click');
      this.reset();
    })
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

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId');
    const playerId = urlParams.get('playerId');

    const ballposition: BallPosition = {
      id: null,
      sessionId: sessionId as string,
      player: playerId as string,
      x: 0,
      y: 0 - this.object.scale.y * 0.55,
      z: 0
    }

    this.ballPostionClient.updateBallPosition(ballposition)
  }
}