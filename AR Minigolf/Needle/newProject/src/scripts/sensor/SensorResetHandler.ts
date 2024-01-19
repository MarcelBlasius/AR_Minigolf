import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_RESET_URL } from "./SensorUrls";
import { SensorStates } from "./SensorState";
import { SensorHandler } from "./SensorHandler";

export class SensorResetHandler extends SensorHandler {
    private state = SensorStates.DISCONNECTED

    private constructor() {
        super(SENSOR_RESET_URL)
    }

    private static instance: SensorResetHandler | undefined;
    private subscribers: (() => void)[] = [];
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

    protected initialize() {
        this.eventSource?.addEventListener('open', (_) => {
            if (this.state === SensorStates.CONNECTED) {
                return;
            }
            console.log("Reset Connected");
            this.visibilityHandler.setVisibility('reset-button', false);
        });

        this.eventSource?.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                if (this.state === SensorStates.DISCONNECTED) {
                    return;
                }
                console.log("Reset Disconnected");
                this.visibilityHandler.setVisibility('reset-button', true);
            }
        });

        this.eventSource?.addEventListener('reset', (e: any) => {
            console.log("reset", e.data);
            this.subscribers.forEach(c => c());
        });
    }
}