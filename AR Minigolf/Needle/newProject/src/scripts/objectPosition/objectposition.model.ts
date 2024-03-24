export class ObjectPosition {
    id: string | null;
    sessionId: string;
    name: number;
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;

    constructor(id: string | null, name: number, sessionId: string, x: number, y: number, z: number, rotationX: number, rotationY: number, rotationZ: number) {
        this.id = id;
        this.sessionId = sessionId;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
    }
}