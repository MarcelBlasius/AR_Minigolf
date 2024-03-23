import { SyncedTransform } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import { BallPosition } from "./ballposition/ballposition.model";

export async function requestOwnership(sync: SyncedTransform | undefined): Promise<boolean> {
    if (!sync) {
        console.error('sync is undefined');
        return false;
    }
    sync.requestOwnership();

    let trys = 0;
    do {
        await new Promise((resolve) => setTimeout(resolve, 100));
    } while (!sync.hasOwnership() && ++trys < 10);

    return sync.hasOwnership() === true;
}

export async function GetTranslatedBallPosition(start: Object3D, ballPosition: BallPosition) {
    const { x, y, z } = GetTranslatedPosition(start, ballPosition.x, ballPosition.y, ballPosition.z);
    ballPosition.x = x;
    ballPosition.y = y;
    ballPosition.z = z;
}

export function GetTranslatedPosition(start: Object3D, x, y, z) {
    const vec3 = new Vector3();
    const position = start.getWorldPosition(vec3); 
    const startToBall = new Vector3(position.x - x, position.y - y, position.z - z);
    const negate = startToBall.negate().negate();
    return { x: negate.x, y: negate.y, z: negate.z }
}