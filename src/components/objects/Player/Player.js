import {
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
  } from 'three';
  
  const initSpeed = 0.15;
  
  class Player extends Mesh {
    constructor(parent) {
        // Create the player geometry and material
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({ color: 0x000000 }); // Black cube

        // Call parent Mesh() constructor
        super(geometry, material);

        // Add white edges
        const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
        const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
        const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
        this.add(edgeLines); // Add the edges as a child of the player mesh

        // Init state
        this.state = {
            velocityY: 0, // Vertical velocity for flying
            isJumping: false,
        };

        // Set initial position
        this.position.set(-1775, 1, 0); // Start at one end of the ground

        // Add self to parent's update list
        parent.addToUpdateList(this);

        this.maxHeight = 10; // Max height cap for ship mode
        this.gravity = -0.02; // Downward force when not flying
        this.shipSpeed = 0.1; // Speed of ascent
    }

    update(platforms, isShipMode, inputManager) {
        if (isShipMode) {
            // Ship mode logic
            if (inputManager.isMouseDown) {
                // Ascend while mouse is held down
                this.state.velocityY = this.shipSpeed;
            } else {
                // Apply gravity when the mouse is not clicked
                this.state.velocityY += this.gravity;
            }

            // Update the player's position
            this.position.y += this.state.velocityY;

            // Enforce the max height cap
            if (this.position.y > this.maxHeight) {
                this.position.y = this.maxHeight;
                this.state.velocityY = 0; // Stop upward movement at the height cap
            }

            // Prevent falling below ground level
            if (this.position.y < 1) {
                this.position.y = 1;
                this.state.velocityY = 0; // Reset velocity upon hitting the ground
            }
        } else {
            // Normal game mode (platform collision logic)
            this.state.velocityY -= 0.01; // Gravity strength
            this.position.y += this.state.velocityY;

            // Check collision with platforms
            let isOnPlatform = false;
            platforms.forEach(platform => {
                const isAbovePlatform =
                    this.position.y > platform.position.y &&
                    this.position.y - platform.position.y <= 0.5; // Allow a small buffer for landing
                const isWithinPlatformX =
                    Math.abs(this.position.x - platform.position.x) <= 0.75; // Match platform width
                const isWithinPlatformZ =
                    Math.abs(this.position.z - platform.position.z) <= 0.75; // Match platform depth

                if (isAbovePlatform && isWithinPlatformX && isWithinPlatformZ) {
                    // Place the player on the platform
                    this.position.y = platform.position.y + 0.5; // Adjust to stand on top of the platform
                    this.state.velocityY = 0; // Reset vertical velocity
                    this.state.isJumping = false; // Allow jumping again
                    isOnPlatform = true;
                }
            });

            // Check if player is on the ground if not on a platform
            if (!isOnPlatform && this.position.y < 1) {
                this.position.y = 1; // Reset to ground level
                this.state.velocityY = 0; // Stop downward velocity
                this.state.isJumping = false; // Allow jumping again
            }
        }
    }

    jump() {
        if (this.position.y === 1 && !this.state.isJumping) {
            this.state.velocityY = 0.3; // Jump strength
            this.state.isJumping = true;
        }
    }

    jumpBoost(targetY) {
      const heightDifference = targetY - this.position.y;
      const baseBoost = 0.5; // Increase base boost strength for more immediate impact
      const additionalBoost = Math.max(heightDifference * 0.3, 0); // Ensure positive boost
  
      // Directly update velocity for immediate jump
      this.state.velocityY = baseBoost + additionalBoost;
      this.state.isJumping = true;
  
      console.log(`Jump boost applied! VelocityY: ${this.state.velocityY}`);
  }

  resetPosition() {
    this.position.set(-1775, 1, 0);
  }
}

export default Player;
