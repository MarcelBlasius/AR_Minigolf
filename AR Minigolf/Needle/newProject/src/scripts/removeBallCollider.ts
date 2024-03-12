import { Behaviour, SphereCollider, serializable } from "@needle-tools/engine"
export class removeBallCollider extends Behaviour {

    @serializable()
    public color: string = '';

    @serializable(SphereCollider)
    collider?: SphereCollider

    start(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');
        if (ball !== this.color) {
            console.log(`destroyed collider for ${this.color.toUpperCase()} ball`);
            this.collider?.destroy();
        }
    }
}