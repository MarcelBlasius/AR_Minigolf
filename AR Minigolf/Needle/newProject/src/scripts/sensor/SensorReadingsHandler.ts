import ReconnectingEventSource from "reconnecting-eventsource";
import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_READINGS_URL } from "./SensorUrls";
import { SensorStates } from "./SensorState";

export class SensorReadingsHandler {
    private state = SensorStates.DISCONNECTED

    private constructor() {
        this.initialize();
    }

    private static instance: SensorReadingsHandler | undefined;
    private subscribers: ((data: any) => void)[] = [];
    private readingsSensor = new ReconnectingEventSource(SENSOR_READINGS_URL);
    private visibilityHandler = new ButtonVisibilityHandler();

    public static getInstance(): SensorReadingsHandler {
        if (!this.instance) {
            this.instance = new SensorReadingsHandler();
        }

        return this.instance;
    }

    public subscribe(callback: (data: any) => void) {
        this.subscribers.push(callback);
    };

    private initialize() {
        this.readingsSensor.addEventListener('open', (_) => {
            if (this.state === SensorStates.CONNECTED) {
                return;
            }

            console.log("SensorReadings Connected");
            this.visibilityHandler.showAlternativeControlButtons(false);
        });

        this.readingsSensor.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                if (this.state === SensorStates.DISCONNECTED) {
                    return;
                }
                console.log("SensorReadings Disconnected");
                this.visibilityHandler.showAlternativeControlButtons(true);
            }
        });

        this.readingsSensor.addEventListener('readings', (e: any) => {
            console.log("readings", e.data);
            const data = JSON.parse(e.data);
            this.subscribers.forEach(c => c(data));
        });
    }
}