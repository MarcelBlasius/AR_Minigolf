export class BallPosition {
    id: string | null;
    sessionId: string;
    player: string;
    x: number;
    y: number;
    z: number;

    constructor(id: string | null, sessionId: string, player: string, x: number, y: number, z: number) {
        this.id = id;
        this.sessionId = sessionId;
        this.player = player;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}