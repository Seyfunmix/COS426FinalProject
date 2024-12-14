import { Mesh, SphereGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class PowerUp extends Mesh {
    constructor(parent, x, y, z) {
        // Create a glowing golden sphere
        const geometry = new SphereGeometry(0.5, 32, 32); // Smooth sphere with finer detail
        const material = new MeshStandardMaterial({ 
            color: 0xffd700,       // Golden color
            emissive: 0xffd700,    // Glowing golden emissive effect
            emissiveIntensity: 2.0 // High emissive intensity for a glowing effect
        });
        super(geometry, material);

        // Set the power-up's position
        this.position.set(x, y, z);

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Add white edges for a defined outline
        const edges = new EdgesGeometry(geometry);
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
        const edgeLines = new LineSegments(edges, edgeMaterial);
        this.add(edgeLines);
    }

    update() {
        // Optional: Add rotation for visual effect
        this.rotation.y += 0.02; // Slowly rotate around the Y-axis
        this.rotation.x += 0.01; // Add a subtle X-axis rotation
    }
}

export default PowerUp;
