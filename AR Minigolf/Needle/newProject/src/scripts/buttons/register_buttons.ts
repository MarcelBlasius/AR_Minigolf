import { ButtonClickHandler } from "./ButtonClickHandler";

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
        clickHandler.onClick(buttonId);
    });

    console.log(buttonId, 'registerd')
}