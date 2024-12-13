import { Mesh, ConeGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class Obstacle extends Mesh {
    constructor(parent, x, z) {
        // Create a pyramid-like obstacle using ConeGeometry
        const geometry = new ConeGeometry(0.5, 1, 4); // Radius 0.5, Height 1, 4 sides for a pyramid
        const material = new MeshStandardMaterial({ color: 0x000000 }); // Red material

        super(geometry, material);

        // Set the obstacle's position
        this.position.set(x, 0.5, z); // Centered at the ground level
        this.rotation.y = Math.PI / 4; // Rotate to align as a pyramid (cone is flat by default)

        // Add self to parent's update list
        parent.addToUpdateList(this);
        
        // Add white edges
        const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
        const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
        this.add(edgeLines); // Add the edges as a child of the ground mesh
    }

    update() {
        // Obstacles remain stationary
    }
}

export default Obstacle;
