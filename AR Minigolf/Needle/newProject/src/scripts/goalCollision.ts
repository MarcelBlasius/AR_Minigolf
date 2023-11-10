import { Behaviour, Collision, Renderer } from "@needle-tools/engine"

export class GoalCollision extends Behaviour {

    onCollisionEnter(col: Collision) {
        if (col.gameObject.userData.name !== 'target') {
            return;
        }

        console.log(`${col.me.userData.name} has hit the target!`);
        col.me.visible = false;
    }
}