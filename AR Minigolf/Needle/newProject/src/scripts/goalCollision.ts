import { Behaviour, Collision, Renderer } from "@needle-tools/engine"
import ScoreClient from "./score/score-client";
import { ScoreManager } from "./score/scoreManager";
import { RoundManager } from "./score/roundManager";

export class GoalCollision extends Behaviour {

    private scoreClient: ScoreClient = new ScoreClient();
    private scoreManager = ScoreManager.getInstance();
    private roundManager = new RoundManager();

    async onCollisionEnter(col: Collision) {
        if (col.gameObject.userData.name !== 'target') {
            return;
        }

        console.log(`${col.me.userData.name} has hit the target!`);
        col.me.visible = false;

        const score = await this.scoreManager.getScoreByPlayer();
        const currentRound = await this.scoreManager.getCurrentRound();

        const currentScore = score.scoreElementList.filter(x => x.round === currentRound)[0];
        if (!currentScore) {
            throw new Error('Current score not found');
        }

        currentScore.finished = true;
        await this.scoreClient.updateScore(score);
        await this.roundManager.checkForNewRound();
    }
}