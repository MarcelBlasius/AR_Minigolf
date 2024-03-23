import { Behaviour, Collision, Renderer, serializable } from "@needle-tools/engine"
import { Object3D } from "three";
import { DB_BASE_URL } from "../constants";
import { BallPositionClient } from "./ballposition/ballposition.client";

export class SyncBalls extends Behaviour {
    private ballPosotionClient = new BallPositionClient();

    @serializable(Object3D)
    blueBall?: Object3D

    @serializable(Object3D)
    redBall?: Object3D

    @serializable(Object3D)
    greenBall?: Object3D

    @serializable(Object3D)
    purpleBall?: Object3D

    async start() {
        setInterval(this.getOtherBallPositions.bind(this), 50);
    }
    private async getOtherBallPositions() {
        const urlParams = new URLSearchParams(window.location.search);
        const ownColor = urlParams.get('ball');
        const sessionId = urlParams.get('sessionId') as string
        const session = await this.getSession(sessionId);

        const ballPositions = await this.ballPosotionClient.getBallPositions();

        ballPositions.forEach((position) => {
            const index = session.players.indexOf(position.player);
            const color = this.getBallColor(index);
            if (color != ownColor) {

                this.changeDisplayedBallPosition(color, position.x, position.y, position.z);
            }
        });
    }

    private async getSession(id: string): Promise<any> {
        try {
            const response = await fetch(`${DB_BASE_URL}/session`);
            const responseData = await response.json();
            for (const session of responseData) {
                if (session.id === id) {
                    return session;
                }
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    }

    private getBallColor(playerIndex) {
        const colors = ['red', 'blue', 'green', 'purple'];

        return colors[playerIndex];
    }
    
    private changeDisplayedBallPosition(color: string, x: number, y: number, z: number) {
        switch (color) {
            case "blue":
                this.blueBall?.position.set(x,y,z);
                break;
            case "green":
                this.greenBall?.position.set(x,y,z);
                break;
            case "red":
                this.redBall?.position.set(x,y,z);
                break;
            case "purple":
                this.purpleBall?.position.set(x,y,z);
                break;
        }
    }
}