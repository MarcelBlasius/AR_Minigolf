import { ButtonClickHandler } from "../buttons/ButtonClickHandler";
import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { ButtonEvent } from "../buttons/buttonEvents";
import { SensorDirectionHandler } from "./SensorDirectionHandler";
import { SensorHandler } from "./SensorHandler";
import { SensorReadingsHandler } from "./SensorReadingsHandler";
import { SensorResetHandler } from "./SensorResetHandler";

export class ConnectionHandler {
    private static instance: ConnectionHandler | undefined;
    private buttonVisibilityHandler = new ButtonVisibilityHandler();
    private handlers: SensorHandler[] = [
        SensorDirectionHandler.getInstance(),
        SensorReadingsHandler.getInstance(),
        SensorResetHandler.getInstance(),
    ];

    private constructor() {
        this.listenOnButtonClick();
    }

    public static getInstance(): ConnectionHandler {
        if (!this.instance) {
            this.instance = new ConnectionHandler();
        }

        return this.instance;
    }

    connect() {
        const connectButton = document.getElementById('connect-button') as HTMLButtonElement;
        const disconnectButton = document.getElementById('disconnect-button') as HTMLButtonElement;
        this.buttonVisibilityHandler.setVisibility('disconnect-button', true);
        this.buttonVisibilityHandler.setVisibility('connect-button', false);

        disconnectButton.style.display = 'block';
        connectButton.style.display = 'none';
        this.handlers.forEach(h => h.connect());
    }

    disconnect() {
        const connectButton = document.getElementById('connect-button') as HTMLButtonElement;
        const disconnectButton = document.getElementById('disconnect-button') as HTMLButtonElement;

        disconnectButton.style.display = 'none';
        connectButton.style.display = 'block';

        this.buttonVisibilityHandler.setVisibility('connect-button', true);
        this.buttonVisibilityHandler.setVisibility('disconnect-button', false);
        this.handlers.forEach(h => h.disconnect());
    }

    listenOnButtonClick() {
        const buttonClickHandler = ButtonClickHandler.getInstance();
        buttonClickHandler.subscribe('connect-button', (event) => {
            if (event === ButtonEvent.CLICK) {
                this.connect();
            }
        })

        buttonClickHandler.subscribe('disconnect-button', (event) => {
            if (event === ButtonEvent.CLICK) {
                this.disconnect();
            }
        })
    }
}