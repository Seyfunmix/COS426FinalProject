import { Mesh, ConeGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class FloatingObstacle extends Mesh {
    constructor(parent, x, y, z) {
        // Create a pointed obstacle using ConeGeometry
        const geometry = new ConeGeometry(0.5, 2, 4); // Radius, Height, Sides
        const material = new MeshStandardMaterial({ color: 0xff0000 });

        super(geometry, material);

        // Set the obstacle's position
        this.position.set(x, y, z);

        // Rotate to point towards the player
        this.rotation.z = Math.PI / 2;

        // Add white edges
        const edges = new EdgesGeometry(geometry);
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
        const edgeLines = new LineSegments(edges, edgeMaterial);
        this.add(edgeLines);

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update() {
        // Floating obstacles remain stationary
    }
}

export default FloatingObstacle;
