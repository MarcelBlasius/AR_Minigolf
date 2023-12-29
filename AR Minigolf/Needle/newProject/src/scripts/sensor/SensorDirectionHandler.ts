import ReconnectingEventSource from "reconnecting-eventsource";
import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_DIRECTION_URL } from "./SensorUrls";

export class SensorDirectionHandler {
    private constructor() {
        this.initialize();
    }

    private static instance: SensorDirectionHandler | undefined;
    private subscribers: ((data: any) => void)[] = [];
    private source = new ReconnectingEventSource(SENSOR_DIRECTION_URL);
    private visibilityHandler = new ButtonVisibilityHandler();

    public static getInstance(): SensorDirectionHandler {
        if (!this.instance) {
            this.instance = new SensorDirectionHandler();
        }

        return this.instance;
    }

    public subscribe(callback: (data: any) => void) {
        this.subscribers.push(callback);
    };

    private initialize() {
        this.source.addEventListener('open', (_) => {
            console.log("Direction Connected");
            this.visibilityHandler.setVisibility('rotate-left-button', false);
            this.visibilityHandler.setVisibility('rotate-right-button', false);
        });

        this.source.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                console.log("Direction Disconnected");
                this.visibilityHandler.setVisibility('rotate-left-button', true);
                this.visibilityHandler.setVisibility('rotate-right-button', true);
            }
        });

        this.source.addEventListener('direction', (e: any) => {
            console.log("direction", e.data);
            this.subscribers.forEach(c => c(e.data));
        });
    }
}