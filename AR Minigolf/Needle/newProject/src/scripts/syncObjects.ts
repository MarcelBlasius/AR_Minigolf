import { Behaviour, serializable } from "@needle-tools/engine"
import { Object3D } from "three";
import { GetTranslatedPosition } from "./utils";
import { ObjectPositionClient } from "./objectPosition/objectposition.client";
import { ObjectPosition } from "./objectPosition/objectposition.model";

export class SyncObjects extends Behaviour {
    private objectPositionClient = new ObjectPositionClient();

    @serializable(Object3D)
    startRef?: Object3D

    async start() {
        setInterval(this.getOtherObjectPositions.bind(this), 50);
    }
    private async getOtherObjectPositions() {
        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');
        const sessionId = urlParams.get('sessionId') as string

        const objectPositions = await this.objectPositionClient.getObjectPositions();
        let position = objectPositions.find(x => x.objectId === this.gameObject.id);
        if (!position && ball === 'red') {
            position = this.CreateObjectPosition(sessionId);
            this.objectPositionClient.createObjectPosition(position);
        }

        if (!position) {
            console.error('Position not found for object', this.gameObject.id);
            return;
        }

        if (ball === 'red') {
            position = this.CreateObjectPosition(sessionId);
            this.objectPositionClient.updateObjectPosition(position);
        } else {
            this.changeDisplayedObjectPosition(position.x, position.y, position.z)
        }
    }

    private CreateObjectPosition(sessionId: string) {
        return new ObjectPosition(
            null,
            this.gameObject.id,
            sessionId,
            this.gameObject.position.x,
            this.gameObject.position.y,
            this.gameObject.position.z,
            this.gameObject.rotation.x,
            this.gameObject.rotation.y,
            this.gameObject.rotation.z);
    }

    private changeDisplayedObjectPosition(xi: number, yi: number, zi: number) {
        let { x, y, z } = GetTranslatedPosition(this.startRef!, xi, yi, zi);
        this.gameObject.position.set(x, y, z);
    }
}