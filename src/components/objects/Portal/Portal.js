import { Mesh, PlaneGeometry, MeshStandardMaterial, DoubleSide } from 'three';

class Portal extends Mesh {
    constructor(parent, xPosition) {
        const geometry = new PlaneGeometry(2, 3);
        const material = new MeshStandardMaterial({
            color: 0x00ffff,       // Cyan-ish portal color
            emissive: 0x002222,    // Emissive glow
            emissiveIntensity: 1.5,
            side: DoubleSide
        });

        super(geometry, material);

        // Position the portal at the given x position, standing upright.
        // Assume the player travels in +x direction.
        this.position.set(xPosition, 1.5, 0); 
        // Rotate so it faces the player coming from negative X towards positive X
        this.rotation.y = Math.PI / 2; 

        parent.addToUpdateList(this);
    }

    update() {
        // Could animate the portal (e.g., rotate slightly) if desired
        //this.rotation.y += 0.01;
    }
}

export default Portal;