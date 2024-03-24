export class ObjectPosition {
    id: string;
    sessionId: string;
    x: number;
    y: number;
    z: number;

    constructor(id: string, sessionId: string, x: number, y: number, z: number) {
        this.id = id;
        this.sessionId = sessionId;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}