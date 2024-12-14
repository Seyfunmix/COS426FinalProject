import { Mesh, EdgesGeometry, LineBasicMaterial, LineSegments, PlaneGeometry, MeshStandardMaterial, DoubleSide } from 'three';

class Portal extends Mesh {
    constructor(parent, xPosition) {
        const geometry = new PlaneGeometry(3, 7);
        const material = new MeshStandardMaterial({
            color: 0x000000,       // Bright red for visibility
            emissive: 0x000000,    // Emissive red glow
            emissiveIntensity: 2.0,
            side: DoubleSide,      // Visible from both sides
        });

        super(geometry, material);

        // Position the portal at the given x position, standing upright.
        // Assume the player travels in +x direction.
        this.position.set(xPosition, 1.5, 0); // Ensure it's at ground level and on the path
        console.log("Portal Position:", this.position); // Debug: Log portal position

        // Rotate so it faces the player coming from negative X towards positive X
        this.rotation.y = Math.PI / 2; 
                // Add white edges
                const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
                const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
                const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
                this.add(edgeLines); // Add the edges as a child of the ground mesh
        parent.addToUpdateList(this);
    }

    update() {
        // Could animate the portal (e.g., rotate slightly) if desired
        //this.rotation.y += 0.01;
    }
}

export default Portal;