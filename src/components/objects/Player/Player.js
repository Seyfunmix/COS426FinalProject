import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

const initSpeed = 0.15

class Player extends Mesh {
    constructor(parent) {
        // Call parent Mesh() constructor
        super(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ color: 0x00ff00 }));

        // Init state
        this.state = {
            velocityY: 0, // Vertical velocity for jumping
            isJumping: false,
        };

        // Set initial position
        this.position.set(0, 1, 0); // Slightly above the ground

        this.speed = initSpeed; // Initial speed

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update() {
        // Apply gravity
        this.state.velocityY -= 0.01; // Gravity strength
        this.position.y += this.state.velocityY;

        // Prevent falling through the ground
        if (this.position.y < 1) {
            this.position.y = 1; // Reset to ground level
            this.state.velocityY = 0; // Stop downward velocity
            this.state.isJumping = false;
        }
    }

    jump() {
        if (this.position.y === 1 && !this.state.isJumping) {
            this.state.velocityY = 0.3; // Jump strength
            this.state.isJumping = true;
        }
    }

    resetPosition() {
        this.position.set(0, 0, 0);
        this.speed = initSpeed;
    }

    increaseSpeed(amount) {
        this.speed += amount;
    }
}

export default Player;
