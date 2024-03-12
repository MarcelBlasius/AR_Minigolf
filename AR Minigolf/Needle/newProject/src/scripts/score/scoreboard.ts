// add score board logic

import { foreachComponent } from "@needle-tools/engine";
import { ButtonClickHandler } from "../buttons/ButtonClickHandler";
import { ButtonEvent } from "../buttons/buttonEvents";
import ScoreClient from "./score-client";
import { Score } from "./Score.model";

const handler = ButtonClickHandler.getInstance();
startBuildingLoop();

handler.subscribe('scoreboard-button', (event) => {
    if (event === ButtonEvent.CLICK) {
        const scoreboard: HTMLElement | null = document.querySelector('#scoreboard');
        if (!scoreboard) throw new Error("HTML Element not found: " + 'scoreboard');
        if (scoreboard.style.visibility === 'visible') {
            scoreboard.style.visibility = 'hidden';
        } else {
            scoreboard.style.visibility = 'visible';
            startBuildingLoop();
        }
    }
});

async function startBuildingLoop() {
    const scoreboard: HTMLElement | null = document.querySelector('#scoreboard');
    if (scoreboard?.style.visibility === 'hidden') {
        return;
    }

    await buildScoreBoard();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await startBuildingLoop();
}

async function buildScoreBoard() {
    const client = new ScoreClient();
    const scores = await client.getScores();

    const table = document.querySelector('#scoreboard table');
    if (!table) throw new Error("HTML Element not found: " + 'scoreboard table');

    // Destroy the old table
    table.innerHTML = '';

    const scoreboard: HTMLElement | null = document.querySelector('#scoreboard');
    if (!scoreboard) throw new Error("HTML Element not found: " + 'scoreboard');

    const maxRounds = Math.max(...scores.map(score => Math.max(...score.scoreElementList.map(x => x.round))));
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.textContent = 'Player';
    tr.appendChild(th);

    for (let round = 1; round <= maxRounds; round++) {
        const th = document.createElement('th');
        th.textContent = "Round " + round;
        tr.appendChild(th);
    }

    table.appendChild(tr);

    for (const score of scores) {
        addRow(score, maxRounds);
    }
}

function addRow(score: Score, maxRounds: number) {
    const table = document.querySelector('#scoreboard table');
    if (!table) throw new Error("HTML Element not found: " + 'scoreboard table');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = score.player;
    tr.appendChild(td);
    let currentRound = 1;
    for (const scoreElement of score.scoreElementList.sort((a, b) => a.round - b.round)) {
        if (currentRound < scoreElement.round) {
            const td = document.createElement('td');
            td.textContent = 'n / a';
            tr.append(td);
            currentRound++;
        }

        const td = document.createElement('td');
        td.textContent = scoreElement.score.toString();
        tr.appendChild(td);
        currentRound++;
    }

    while (currentRound <= maxRounds) {
        const td = document.createElement('td');
        td.textContent = 'n / a';
        tr.append(td);
        currentRound++;
    }

    table.appendChild(tr);
};
