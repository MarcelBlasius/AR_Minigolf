export class ScoreElement {
    score: number;
    round: number;
    finished: boolean

    constructor(score: number, round: number, finished: boolean) {
        this.score = score;
        this.round = round;
        this.finished = finished;
    }
}