export class ButtonVisibilityHandler {
    public setVisibility(buttonId: string, visible: boolean) {
        const button = document.getElementById(buttonId) as HTMLButtonElement;
        if (!button) {
            console.error('setVisibiltiy: button not found.', buttonId);
            return;
        }

        if (visible) {
            button.disabled = false;
            button.style.visibility = 'visible';
        } else {
            button.disabled = true;
            button.style.visibility = 'hidden';
        }
    }

    public showAlternativeControlButtons(visible: boolean) {
        this.setVisibility('rotate-left-button', visible);
        this.setVisibility('rotate-right-button', visible);
        this.setVisibility('reset-button', visible);
        this.showShootRelatedButtons(visible);
    }

    public showShootRelatedButtons(visible: boolean) {
        this.setVisibility('shoot-button', visible);
        this.setVisibility('rotate-left-button', visible);
        this.setVisibility('rotate-right-button', visible);
        this.setVisibility('connect-button', visible);
    }
}