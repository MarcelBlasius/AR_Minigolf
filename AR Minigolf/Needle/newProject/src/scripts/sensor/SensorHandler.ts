import ReconnectingEventSource from "reconnecting-eventsource";

export abstract class SensorHandler {
    private url = '';
    protected eventSource: ReconnectingEventSource | undefined;

    constructor(url: string) {
        this.url = url;
    }

    // to register events
    protected abstract initialize(): void;

    connect(): void {
        console.log('Enabled auto connect to sensors.')
        this.eventSource = new ReconnectingEventSource(this.url);
        this.initialize();
    }

    disconnect(): void {
        console.log('Disabled auto connect to sensors.')
        this.eventSource?.close();
        this.eventSource = undefined;
    }
}