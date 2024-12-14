import { Mesh, CylinderGeometry, SphereGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial, Group } from 'three';

class Orb extends Group {
    constructor(parent, x, y, z) {
        super();

        // Create a cylinder base for the pad
        const baseGeometry = new CylinderGeometry(1.5, 1.5, 0.3, 32); // Radius, Height, Segments
        const baseMaterial = new MeshStandardMaterial({
            color: 0x000000,
            emissive: 0x000000,
            emissiveIntensity: 1.0,
        });
        const baseMesh = new Mesh(baseGeometry, baseMaterial);

        // Add edges to the base
        const baseEdges = new EdgesGeometry(baseGeometry);
        const baseEdgeMaterial = new LineBasicMaterial({ color: 0xffffff });
        const baseEdgeLines = new LineSegments(baseEdges, baseEdgeMaterial);
        baseMesh.add(baseEdgeLines);

        // Create a semi-sphere on top of the cylinder
        const sphereGeometry = new SphereGeometry(1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2); // Semi-sphere
        const sphereMaterial = new MeshStandardMaterial({
            color: 0x000000,
            emissive: 0x000000,
            emissiveIntensity: 1.0,
        });
        const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);

        // Add edges to the semi-sphere
        const sphereEdges = new EdgesGeometry(sphereGeometry);
        const sphereEdgeLines = new LineSegments(sphereEdges, baseEdgeMaterial);
        sphereMesh.add(sphereEdgeLines);

        // Position the semi-sphere on top of the cylinder
        sphereMesh.position.y = 0.15;

        // Combine the base and the semi-sphere into the group
        this.add(baseMesh);
        this.add(sphereMesh);

        // Set the orb's position
        this.position.set(x, y, z); // Allow y-value customization

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Store a reference to the parent scene
        this.parentScene = parent;

        // Flag to prevent multiple activations
        this.isActivated = false;
    }

    update(player) {
        // Optional: Add animation or visual feedback
        this.rotation.y += 0.01; // Rotate slightly for visual effect

        // Check if the player is within activation range
        this.checkActivation(player);
    }

    checkActivation(player) {
        //if (this.isActivated) return; // Prevent re-activating the same orb

        const distance = this.position.distanceTo(player.position);
        const activationRange = 5; // Distance within which the orb is activated

        if (distance <= activationRange) {
            // Apply a jump boost to the player, targeting the orb's height
            player.jumpBoost(this.position.y + 1); // Ensure the boost is slightly above the pad
            console.log("Orb activated! Jump boost applied.");

            // Prevent further activations
            this.isActivated = true;

            
        }
    }
}

export default Orb;
