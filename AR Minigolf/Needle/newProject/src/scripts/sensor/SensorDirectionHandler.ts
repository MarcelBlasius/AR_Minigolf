import { ButtonVisibilityHandler } from "../buttons/ButtonVisibilityHandler";
import { SENSOR_DIRECTION_URL } from "./SensorUrls";
import { SensorStates } from "./SensorState";
import { SensorHandler } from "./SensorHandler";

export class SensorDirectionHandler extends SensorHandler {
    private state = SensorStates.DISCONNECTED
    private static instance: SensorDirectionHandler | undefined;
    private subscribers: ((data: any) => void)[] = [];
    private visibilityHandler = new ButtonVisibilityHandler();

    private constructor() {
        super(SENSOR_DIRECTION_URL);
    }

    public static getInstance(): SensorDirectionHandler {
        if (!this.instance) {
            this.instance = new SensorDirectionHandler();
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
            console.log("Direction Connected");
            this.visibilityHandler.setVisibility('rotate-left-button', false);
            this.visibilityHandler.setVisibility('rotate-right-button', false);
        });

        this.eventSource?.addEventListener('error', (e: any) => {
            if (e.target.readyState != EventSource.OPEN) {
                if (this.state === SensorStates.DISCONNECTED) {
                    return;
                }
                console.log("Direction Disconnected");
                this.visibilityHandler.setVisibility('rotate-left-button', true);
                this.visibilityHandler.setVisibility('rotate-right-button', true);
            }
        });

        this.eventSource?.addEventListener('direction', (e: any) => {
            console.log("direction", e.data);
            this.subscribers.forEach(c => c(e.data));
        });
    }
}