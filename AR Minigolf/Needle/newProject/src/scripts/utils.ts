import { SyncedTransform } from "@needle-tools/engine";

export async function requestOwnership(sync: SyncedTransform | undefined): Promise<boolean> {
    if (!sync) {
        console.error('sync is undefined');
        return false;
    }
    sync.requestOwnership();

    let trys = 0;
    do {
        await new Promise((resolve) => setTimeout(resolve, 100));
    } while (!sync.hasOwnership() && ++trys < 10);

    return sync.hasOwnership() === true;
}