import { Behaviour, serializable, serializeable } from "@needle-tools/engine"
import { Object3D } from "three";
import { BallPositionClient } from "./ballposition/ballposition.client";

export class HideUntilPositionIsSet extends Behaviour {
    @serializeable(Object3D)
    object?: Object3D;

    // 0 = red
    // 1 = blue
    // 2 = green
    // 3 = purple
    @serializable()
    index: number = 0;
    ballClient = new BallPositionClient();

    start() {
        this.loop();
    }

    private async loop() {
        if (!this.object) {
            console.error('object is undefined')
            return;
        }

        const positions = await this.ballClient.getBallPositions();
        if (positions.length >= this.index + 1) {
            this.object.visible = true;
            return;
        } else {
            this.object.visible = false;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.loop();
    }
}