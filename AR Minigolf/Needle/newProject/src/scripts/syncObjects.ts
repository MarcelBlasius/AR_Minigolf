import { Behaviour, serializable } from "@needle-tools/engine"
import { Object3D } from "three";
import { GetTranslatedPosition } from "./utils";
import { ObjectPositionClient } from "./objectPosition/objectposition.client";
import { ObjectPosition } from "./objectPosition/objectposition.model";

export class SyncObjects extends Behaviour {
    private objectPositionClient = new ObjectPositionClient();

    @serializable(Object3D)
    startRef?: Object3D

    @serializable(Object3D)
    object?: Object3D

    @serializable(Number)
    id: number = 0;

    async start() {
        setInterval(this.getOtherObjectPositions.bind(this), 1000);
    }

    private async getOtherObjectPositions() {
        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');
        const sessionId = urlParams.get('sessionId') as string

        const objectPositions = await this.objectPositionClient.getObjectPositions();
        let position = objectPositions.find(x => x.name === this.id);
        if (!position && ball === 'red') {
            position = this.CreateObjectPosition(sessionId);
            this.objectPositionClient.createObjectPosition(position);
        }

        if (!position) {
            return;
        }

        if (this.id === 5){
            console.log(this)
            console.log('copy', position.rotationX, position.rotationY, position.rotationZ);
        }

        if (ball === 'red') {
            position = this.CreateObjectPosition(sessionId);
            this.objectPositionClient.updateObjectPosition(position);
        } else {
            this.changeDisplayedObjectPosition(position.x, position.y, position.z, position.rotationX, position.rotationY, position.rotationZ);
        }
    }

    private CreateObjectPosition(sessionId: string) {
        let { x, y, z } = GetTranslatedPosition(this.startRef!, this.object!.position.x, this.object!.position.y, this.object!.position.z);

        return new ObjectPosition(
            null,
            this.id,
            sessionId,
            x,
            y,
            z,
            this.object!.rotation.x,
            this.object!.rotation.y,
            this.object!.rotation.z);
    }

    private changeDisplayedObjectPosition(xi: number, yi: number, zi: number, rotationX, rotationY, rotationZ) {
        let { x, y, z } = GetTranslatedPosition(this.startRef!, xi, yi, zi);
        this.object!.position.set(x, y, z);
       // this.object!.rotation.x = rotationX;
       // this.object!.rotation.y = rotationY;
       // this.object!.rotation.z = rotationZ;
    }
}