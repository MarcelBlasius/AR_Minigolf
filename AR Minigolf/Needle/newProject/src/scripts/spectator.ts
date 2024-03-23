import { Behaviour } from "@needle-tools/engine"
import { ButtonVisibilityHandler } from "./buttons/ButtonVisibilityHandler";

export class Spectator extends Behaviour {

    private buttonVisbibilityHandler = new ButtonVisibilityHandler();
    async start() {
        const urlParams = new URLSearchParams(window.location.search);
        const ball = urlParams.get('ball');

        if (ball !== 'spectator'){
            return;
        }

        this.buttonVisbibilityHandler.showShootRelatedButtons(false);
        this.buttonVisbibilityHandler.setVisibility('reset-button', false);
        this.buttonVisbibilityHandler.setVisibility('connect-button', false)

        const h1 = document.getElementById("schlaege") as HTMLElement;
        h1.style.visibility = 'hidden';
    }
}