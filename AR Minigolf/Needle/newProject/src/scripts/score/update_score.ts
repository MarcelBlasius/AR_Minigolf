import { ScoreManager } from "./scoreManager";

const scoreManager = ScoreManager.getInstance();

const scoreElement: HTMLElement | null = document.querySelector('#score');

if (!scoreElement) throw new Error("Score HTML Element not found");

scoreManager.subscribe((score => scoreElement.innerHTML = score.toString()));