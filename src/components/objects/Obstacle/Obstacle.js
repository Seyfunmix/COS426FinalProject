import { Mesh, ConeGeometry, MeshStandardMaterial } from 'three';

class Obstacle extends Mesh {
    constructor(parent, x, z) {
        // Create a pyramid-like obstacle using ConeGeometry
        const geometry = new ConeGeometry(0.5, 1, 4); // Radius 0.5, Height 1, 4 sides for a pyramid
        const material = new MeshStandardMaterial({ color: 0xff0000 }); // Red material

        super(geometry, material);

        // Set the obstacle's position
        this.position.set(x, 0.5, z); // Centered at the ground level
        this.rotation.y = Math.PI / 4; // Rotate to align as a pyramid (cone is flat by default)

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update() {
        // Obstacles remain stationary
    }
}

export default Obstacle;
