import ReconnectingEventSource from "reconnecting-eventsource";
import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_RESET_URL } from "./SensorUrls";

export class SensorResetHandler {
    private constructor() {
        this.initialize();
    }

    private static instance: SensorResetHandler | undefined;
    private subscribers: (() => void)[] = [];
    private source = new ReconnectingEventSource(SENSOR_RESET_URL);
    private visibilityHandler = new ButtonVisibilityHandler();

    public static getInstance(): SensorResetHandler {
        if (!this.instance) {
            this.instance = new SensorResetHandler();
        }

        return this.instance;
    }

    public subscribe(callback: () => void) {
        this.subscribers.push(callback);
    };

    private initialize() {
        this.source.addEventListener('open', (_) => {
            console.log("Reset Connected");
            this.visibilityHandler.setVisibility('reset-button', false);
        });

        this.source.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                console.log("Reset Disconnected");
                this.visibilityHandler.setVisibility('reset-button', true);
            }
        });

        this.source.addEventListener('reset', (e: any) => {
            console.log("reset", e.data);
            this.subscribers.forEach(c => c());
        });
    }
}