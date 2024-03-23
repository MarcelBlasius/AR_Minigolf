import { Behaviour, GameObject, Rigidbody, serializable } from "@needle-tools/engine"
import { Object3D, Vector3 } from "three";
import { ScoreManager } from "./score/scoreManager";
import { ButtonClickHandler } from "./buttons/ButtonClickHandler";
import { ButtonEvent } from "./buttons/buttonEvents";
import { SensorReadingsHandler } from "./sensor/SensorReadingsHandler";
import { PowerBarHandler } from "./power-bar/PowerBarHandler";
import { ButtonVisibilityHandler } from "./buttons/ButtonVisibilityHandler";
import { BallPositionClient } from "./ballposition/ballposition.client";
import { BallPosition } from "./ballposition/ballposition.model";
import { DB_BASE_URL } from "../constants";
import { DisplayedBallPosition } from "./ballposition/displayedBallPosition";

export class ShootBall extends Behaviour {
    private shot: boolean = false;
    private scoreManager = ScoreManager.getInstance();
    private clickHandler = ButtonClickHandler.getInstance();
    private powerBarHandler = new PowerBarHandler();
    private buttonVisibilityHandler = new ButtonVisibilityHandler();
    private ballPosotionClient = new BallPositionClient();

    @serializable(Object3D)
    directionIndicator?: Object3D;

    @serializable(Rigidbody)
    body?: Rigidbody

    @serializable()
    public color: string = '';

    start(): void {
        this.getOtherBallPositions(true);

        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');
        if (ball !== this.color) {
            console.log(`destroyed direction indicator for ${this.color.toUpperCase()} ball`);
            this.directionIndicator?.removeFromParent();
            return;
        }

        this.registerSensorEvents();
        this.registerButtonClick();

        setInterval(this.getOtherBallPositions, 100);
        setInterval(this.uploadBallPosition, 100) 
    }

    update(): void {
        if (!this.body) {
            console.error('body is undefined')
            return;
        }

        if (!this.shot) {
            return;
        }

        const velo = this.body.getVelocity();

        if (Math.abs(velo.x + velo.y + velo.z) < 0.01) {
            this.shot = false;
            // TODO show correct shooting mode after shot
            this.setDirectionIndiactorVisibility(true);
            //   this.buttonVisibilityHandler.showShootRelatedButtons(true);
        }
    }
    private registerButtonClick() {
        this.clickHandler.subscribe('shoot-button', (event) => {
            switch (event) {
                case (ButtonEvent.DOWN):
                    this.powerBarHandler.startFill();
                    break;
                case (ButtonEvent.UP):
                    this.powerBarHandler.stopFill();
                    let power = this.powerBarHandler.getPower();
                    power /= 20;

                    this.shoot(power);
                    break;
            }
        })
    }

    private registerSensorEvents() {
        SensorReadingsHandler.getInstance().subscribe(data => {
            console.debug('shootBall: received', data);
            let power = parseFloat(data.accX) + parseFloat(data.accZ) / 2;
            power /= 10;
            this.shoot(power);
        })
    }

    // shoot the ball.
    private shoot(power: number) {
        if (this.shot) {
            return;
        }

        const direction = this.getDirection();
        console.log('shooting ball with', power);
        direction.multiply(new Vector3(power, power, power));
        this.body?.setVelocity(direction);
        this.shot = true;
        this.setDirectionIndiactorVisibility(false);
        //  this.buttonVisibilityHandler.showShootRelatedButtons(false);
        this.scoreManager.incrementScore();
    }

    // gets the normalized direction of the ball.
    private getDirection(): Vector3 {
        const direction = new Vector3();
        this.gameObject.getWorldDirection(direction);
        return direction.normalize();
    }

    private setDirectionIndiactorVisibility(visible: boolean) {
        if (!this.directionIndicator) throw new Error('direction indicator is undefined');

        this.directionIndicator.visible = visible;
    }

    private async getOtherBallPositions(includeOwn: boolean = false) {
        const urlParams = new URLSearchParams(window.location.search);
        const ownColor = urlParams.get('ball')
        const sessionId = urlParams.get('session') as string
        const session = await this.getSession(sessionId)

        const ballPositions = await this.ballPosotionClient.getBallPositions();

        ballPositions.forEach((position) => {
            const color = this.getBallColor(session.players.indexOf(position.player))
            if (color != ownColor) {

                this.changeDisplayedBallPosition(color, position.x, position.y, position.z)
            }
            if (includeOwn && color == ownColor) {
                this.changeDisplayedBallPosition(color, position.x, position.y, position.z)
            }
        });
    }

    private async getSession(id: string): Promise<any> {
        try {
            const response = await fetch(`${DB_BASE_URL}/session`);
            const responseData = await response.json();
            console.log('received sessions', responseData);
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
                const blueBallPosition: DisplayedBallPosition = new DisplayedBallPosition();
                blueBallPosition.setWorldPosition(x,y,z);
                break;
            case "green":
                const greenBallPosition: DisplayedBallPosition = new DisplayedBallPosition();
                greenBallPosition.setWorldPosition(x,y,z);
                break;
            case "red":
                const redBallPosition: DisplayedBallPosition = new DisplayedBallPosition();
                redBallPosition.setWorldPosition(x,y,z);
                break;
            case "purple":
                const purpleBallPosition: DisplayedBallPosition = new DisplayedBallPosition();
                purpleBallPosition.setWorldPosition(x,y,z);
                break;
        }
    }

    private uploadBallPosition(){
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('sessionId');
        const playerId = urlParams.get('playerId');

        if (this.shot) {
            const ballPosition: BallPosition = {
                id: null,
                sessionId: sessionId as string,
                player: playerId as string,
                x: this.body?.worldPosition.x as number,
                y: this.body?.worldPosition.y as number,
                z: this.body?.worldPosition.z as number,
            };
            this.ballPosotionClient.updateBallPosition(ballPosition);
        }
    }
}