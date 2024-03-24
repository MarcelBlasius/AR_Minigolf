import { Behaviour, serializable } from "@needle-tools/engine"
import { Object3D } from "three";
import { GetTranslatedPosition } from "./utils";
import { ObjectPositionClient } from "./objectPosition/objectposition.client";

export class SyncObjects extends Behaviour {
    private objectPositionClient = new ObjectPositionClient();

    @serializable(Object3D)
    startRef?: Object3D

    @serializable(Object3D)
    startPoint?: Object3D

    @serializable(Object3D)
    finishPoint?: Object3D

    @serializable(Object3D)
    yellowRotator?: Object3D

    @serializable(Object3D)
    greenRotator?: Object3D

    @serializable(Object3D)
    house?: Object3D

    @serializable(Object3D)
    tree?: Object3D

    async start() {
        setInterval(this.getOtherObjectPositions.bind(this), 50);
    }
    private async getOtherObjectPositions() {
        const objectPositions = await this.objectPositionClient.getObjectPositions();

        objectPositions.forEach((position) => {
            this.changeDisplayedObjectPosition(position.id, position.x, position.y, position.z)
        });
    }

    private changeDisplayedObjectPosition(id: string, xi: number, yi: number, zi: number) {
        let { x, y, z } = GetTranslatedPosition(this.startRef!, xi, yi, zi);

        switch (id) {
            case "startPoint":
                this.startPoint!.position.set(x, y, z);
                break;
            case "finishPoint":
                this.finishPoint!.position.set(x, y, z);
                break;
            case "yellowRotator":
                this.yellowRotator!.position.set(x, y, z);
                break;
            case "greenRotator":
                this.greenRotator!.position.set(x, y, z);
                break;
            case "house":
                this.house!.position.set(x, y, z);
                break;
            case "tree":
                this.tree!.position.set(x, y, z);
        }
    }
}