import { ButtonClickHandler } from "./ButtonClickHandler";
import { ButtonVisibilityHandler } from "./ButtonVisibilityHandler";
import { ButtonEvent } from "./buttonEvents";

console.log('registering ui buttons');

const clickHandler = ButtonClickHandler.getInstance();

registerButton('rotate-left-button');
registerButton('rotate-right-button');
registerButton('reset-button');
registerButton('connect-button');
registerButton('shoot-button');

function registerButton(buttonId: string) {
    const button: HTMLElement | null = document.querySelector(`#${buttonId}`);
    if (!button) throw new Error("HTML Element not found: " + buttonId);

    button.addEventListener("click", () => {
        clickHandler.onClick(buttonId, ButtonEvent.CLICK);
    });

    button.addEventListener("pointerdown", () => {
        clickHandler.onClick(buttonId, ButtonEvent.DOWN);
    });

    button.addEventListener("pointerup", () => {
        clickHandler.onClick(buttonId, ButtonEvent.UP);
    });

    console.log(buttonId, 'registerd')
}