import { ScoreElement } from "./ScoreElement.model";

export class Score {
    id: string | null;
    sessionId: string;
    player: string;
    scoreElementList: ScoreElement[];

    constructor(id: string | null, sessionId: string, player: string, scoreElementList: ScoreElement[]) {
        this.id = id;
        this.sessionId = sessionId;
        this.player = player;
        this.scoreElementList = scoreElementList;
    }
}

