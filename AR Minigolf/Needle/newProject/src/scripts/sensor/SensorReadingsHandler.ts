import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_READINGS_URL } from "./SensorUrls";
import { SensorStates } from "./SensorState";
import { SensorHandler } from "./SensorHandler";

export class SensorReadingsHandler extends SensorHandler {
    private state = SensorStates.DISCONNECTED
    private static instance: SensorReadingsHandler | undefined;
    private subscribers: ((data: any) => void)[] = [];
    private visibilityHandler = new ButtonVisibilityHandler();

    private constructor() {
        super(SENSOR_READINGS_URL);
    }

    public static getInstance(): SensorReadingsHandler {
        if (!this.instance) {
            this.instance = new SensorReadingsHandler();
        }

        return this.instance;
    }

    public subscribe(callback: (data: any) => void) {
        this.subscribers.push(callback);
    };

    protected initialize() {
        this.eventSource?.addEventListener('open', (_) => {
            if (this.state === SensorStates.CONNECTED) {
                return;
            }

            console.log("SensorReadings Connected");
            this.visibilityHandler.showAlternativeControlButtons(false);
        });

        this.eventSource?.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                if (this.state === SensorStates.DISCONNECTED) {
                    return;
                }
                console.log("SensorReadings Disconnected");
                this.visibilityHandler.showAlternativeControlButtons(true);
            }
        });

        this.eventSource?.addEventListener('readings', (e: any) => {
            console.log("readings", e.data);
            const data = JSON.parse(e.data);
            this.subscribers.forEach(c => c(data));
        });
    }
}