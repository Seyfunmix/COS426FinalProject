import { Mesh, BoxGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class Platform extends Mesh {
    constructor(parent, x, y, z) {
        // Create a rectangular platform using BoxGeometry
        const geometry = new BoxGeometry(100, 0.5, 1.5); // Width, Height, Depth
        const material = new MeshStandardMaterial({ color: 0x000000 }); // Black platform

        super(geometry, material);

        // Set the platform's position
        this.position.set(x, y, z); // Allow y-value customization

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Add white edges
        const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
        const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
        this.add(edgeLines); // Add the edges as a child of the platform mesh
    }

    update() {
        // Platforms remain stationary
    }
}

export default Platform;
