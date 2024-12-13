import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

class Obstacle extends Mesh {
    constructor(parent, x, z) {
        super(new BoxGeometry(1, 2, 1), new MeshStandardMaterial({ color: 0xff0000 })); // Red obstacle
        this.position.set(x, 1, z); // Set obstacle position
        parent.addToUpdateList(this); // Add to update list
    }

    update() {
        // Obstacles remain stationary
    }
}

export default Obstacle;
