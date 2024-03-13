import { ButtonClickHandler } from "../buttons/ButtonClickHandler";
import { ButtonEvent } from "../buttons/buttonEvents";
import { ScoreElement } from "./ScoreElement.model";
import ScoreClient from "./score-client";
import { ScoreManager } from "./scoreManager";

export class RoundManager {
    private scoreClient = new ScoreClient();
    private scoreManager = ScoreManager.getInstance();
    private buttonClickHandler = ButtonClickHandler.getInstance();
    public async checkForNewRound() {
        const scores = await this.scoreClient.getScores();
        const currentRound = await this.scoreManager.getCurrentRound();

        await this.waitForRoundEnd(currentRound);

        // Create new Score for next round
        const playerScore = await this.scoreManager.getScoreByPlayer();
        playerScore.scoreElementList.push(new ScoreElement(0, currentRound + 1, false));
        await this.scoreClient.updateScore(playerScore);
        await this.scoreManager.notify();

        // reset ball
        this.buttonClickHandler.onClick('reset-button', ButtonEvent.CLICK);
    }

    async waitForRoundEnd(round: number) {
        const scores = await this.scoreClient.getScores();

        // Check if all players have finished the current round
        const roundScores = scores.map(score => score.scoreElementList.filter(x => x.round === round)[0]);
        if (!roundScores.every(r => r.finished)) {
            // wait till all players finished
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.waitForRoundEnd(round);
            return;
        }
    }
}