export class ButtonVisibilityHandler {
    public setVisibility(buttonId: string, visible: boolean) {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        if (!button) {
            console.error('setVisibiltiy: button not found.');
            return;
        }

        if (visible) {
            button.style.visibility = 'visible';
        } else {
            button.style.visibility = 'hidden';
        }
    }

    public showAlternativeControlButtons(visible: boolean) {
        this.setVisibility('rotate-left-button', visible);
        this.setVisibility('rotate-right-button', visible);
        this.setVisibility('reset-button', visible);
        this.setVisibility('shoot-button', visible);
    }
}