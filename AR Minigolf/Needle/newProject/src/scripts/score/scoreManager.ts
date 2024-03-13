import { Score } from "./Score.model";
import { ScoreElement } from "./ScoreElement.model";
import ScoreClient from "./score-client";

export class ScoreManager {
    private constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.player = urlParams.get('playerId') ?? '';
        this.sessionId = urlParams.get('sessionId') ?? '';
    }

    private scoreClient: ScoreClient = new ScoreClient();
    private sessionId = '';
    private player = '';
    private static instance: ScoreManager | undefined;
    private subscriber: ((score: number) => void)[] = []

    public static getInstance(): ScoreManager {
        if (!this.instance) {
            this.instance = new ScoreManager();
        }

        return this.instance;
    }

    async getScoreNumberByPlayer(): Promise<number> {
        const scores = await this.scoreClient.getScores();
        const filtered = scores.filter(score => score.player === this.player);
        if (filtered.length === 0) {
            await this.createScore(this.player);
            // try again after creating a score
            return await this.getScoreNumberByPlayer();
        }
        const round = await this.getCurrentRound();

        const playerScore = filtered[0].scoreElementList.filter(x => x.round === round)[0];
        if (!playerScore) {
            throw new Error('Player score not found');
        }
        return playerScore.score;
    }

    async getCurrentRound(): Promise<number> {
        const scores = await this.scoreClient.getScores();
        if (scores.length === 0) {
            return 1;
        }
        const highestRound = Math.max(...scores.map(score => Math.max(...score.scoreElementList.map(x => x.round))));
        return highestRound;
    }

    async incrementScore(): Promise<void> {
        const score = await this.getScoreByPlayer();
        console.log('score', score)
        const currentRound = await this.getCurrentRound();
        score.scoreElementList.filter(x => x.round === currentRound)[0].score++;

        await this.scoreClient.updateScore(score);
        this.notify();
    }

    subscribe(callback: (score: number) => void) {
        this.subscriber.push(callback);
        this.getScoreNumberByPlayer().then(s => callback(s));
    }

    async notify() {
        const score = await this.getScoreNumberByPlayer();
        this.subscriber.forEach(s => s(score));
    }

    public async getScoreByPlayer(): Promise<Score> {
        const scores = await this.scoreClient.getScores() ?? [];
        const filtered = scores.filter(score => score.player === this.player);
        if (filtered.length === 0) {
            await this.createScore(this.player);
            // try again after creating a score
            return await this.getScoreByPlayer();
        }

        return filtered[0];
    }

    private async createScore(player: string): Promise<void> {
        const round = await this.getCurrentRound();
        const scoreElement: ScoreElement = {
            round: round,
            score: 0,
            finished: false,
        }

        const score: Score = {
            id: null,
            sessionId: this.sessionId,
            player: player,
            scoreElementList: [scoreElement]
        }
        await this.scoreClient.createScore(score);
    }
}