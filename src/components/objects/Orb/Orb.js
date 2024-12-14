import { Mesh, SphereGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class Orb extends Mesh {
    constructor(parent, x, y, z) {
        // Create a spherical orb
        const geometry = new SphereGeometry(0.5, 16, 16); // Radius 0.5, smooth sphere
        const material = new MeshStandardMaterial({ color: 0x000000, emissive: 0x000000, emissiveIntensity: 1.0 }); 
        super(geometry, material);

        // Set the orb's position
        this.position.set(x, y, z); // Allow y-value customization

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Add white edges
        const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
        const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
        this.add(edgeLines); // Add the edges as a child of the orb mesh

        // Store a reference to the parent scene
        this.parentScene = parent;

        // Flag to prevent multiple activations
        this.isActivated = false;
    }

    update(player) {
        // Optional: Add animation or visual feedback, e.g., slight rotation or glow pulsation
        this.rotation.y += 0.01; // Rotate slightly for visual effect

        // Check if the player is within activation range
        this.checkActivation(player);
    }

    checkActivation(player) {
        if (this.isActivated) return; // Prevent re-activating the same orb

        const distance = this.position.distanceTo(player.position);
        const activationRange = 10; // Distance within which the orb is activated

        if (distance <= activationRange) {
            // Apply a jump boost to the player, targeting the orb's height
            player.jumpBoost(this.position.y);
            console.log("Orb activated! Jump boost applied.");

            // Prevent further activations
            this.isActivated = true;

            // Optional: Change the orb's appearance to indicate activation
            this.material.emissive.setHex(0x555555); // Dim the emissive glow
        }
    }
}

export default Orb;
