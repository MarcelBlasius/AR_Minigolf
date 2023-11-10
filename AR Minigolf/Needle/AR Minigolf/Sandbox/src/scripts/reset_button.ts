import { Behaviour, IPointerClickHandler, PointerEventData, showBalloonMessage } from "@needle-tools/engine"
export class ResetButton extends Behaviour implements IPointerClickHandler {
    start(): void {
        console.log('Foo script works!')
    }

    onPointerClick(args: PointerEventData) {
        showBalloonMessage('Clicked' + this.name);
    }
}