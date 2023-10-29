import { Behaviour } from "@needle-tools/engine"
export class Foo extends Behaviour {
    start(): void {
        console.log('Foo script works!')
    }
}