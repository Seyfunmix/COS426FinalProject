import { Mesh, CircleGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class PowerUp extends Mesh {
    constructor(parent, x, y, z) {
        // Create a glowing flat circle
        const geometry = new CircleGeometry(5, 32); // Radius 5, 32 segments for smooth edges
        const material = new MeshStandardMaterial({ 
            color: 0x000000,       
            emissive: 0x00000,    // Glowing yellow emissive color
            emissiveIntensity: 2.0 // High emissive intensity for a glowing effect
        });
        super(geometry, material);

        // Rotate to face player
        this.rotation.y = Math.PI / 2 + Math.PI;

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

    }
}

export default PowerUp;
