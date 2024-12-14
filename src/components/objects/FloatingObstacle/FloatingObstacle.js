import { Mesh, ConeGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class FloatingObstacle extends Mesh {
    constructor(parent, x, y, z) {
        // Create a pointed obstacle using ConeGeometry
        const geometry = new ConeGeometry(0.5, 1, 4); // Radius, Height, Sides
        const material = new MeshStandardMaterial({ color: 0x000000 });

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
        this.rotation.y += 0.02; // Slowly rotate around the Y-axis
        this.rotation.x += 0.01; // Add a subtle X-axis rotation
    }
}

export default FloatingObstacle;
