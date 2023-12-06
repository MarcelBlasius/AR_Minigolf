import { Behaviour } from "@needle-tools/engine"
export class RotateBall extends Behaviour {
    public deg = 5;

    start(): void {
        window.addEventListener('keydown', (event) => {
            const rad = this.deg * Math.PI / 180;

            if (event.key === "ArrowLeft") {
                console.log(`Rotating ball ${this.deg} degree to the left.`);
                this.gameObject.rotateY(rad)
                return;
            }

            if (event.key === "ArrowRight") {
                console.log(`Rotating ball ${this.deg} degree to the right.`);
                this.gameObject.rotateY(-rad);
                return;
            }
        });
    }
}