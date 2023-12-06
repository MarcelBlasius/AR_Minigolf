export class ScoreManager {
    private constructor() { }

    private static instance: ScoreManager | undefined;
    private score = 0;
    private subscriber: ((score: number) => void)[] = []

    public static getInstance(): ScoreManager {
        if (!this.instance) {
            this.instance = new ScoreManager();
        }

        return this.instance;
    }

    getScore(): number {
        return this.score;
    }

    resetScore(): void {
        this.score = 0;
        this.notify();
    }

    incrementScore(): void {
        ++this.score;
        this.notify();
    }

    subscribe(callback: (score: number) => void) {
        this.subscriber.push(callback);
        callback(this.score);
    }

    private notify() {
        this.subscriber.forEach(s => s(this.score));
    }
}