import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  CylinderGeometry,
} from 'three';

const initSpeed = 0.5;

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

      // Create the ship geometry
      const shipGeometry = new CylinderGeometry(1.5, 1.5, 0.3, 12); // A flat cylinder for the "ship"
      const shipMaterial = new MeshStandardMaterial({ color: 0x333333 }); // Dark gray ship
      this.shipMesh = new Mesh(shipGeometry, shipMaterial);

      // Keep the ship horizontal (no rotation needed)
      this.shipMesh.rotation.x = 0; // Ensure it's horizontal

      // Position the ship slightly below the cube
      this.shipMesh.position.y = -0.8;

      // Add white edge lines for the ship
      const shipEdges = new EdgesGeometry(shipGeometry); // Generate edges for the ship geometry
      const shipEdgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges for the ship
      const shipEdgeLines = new LineSegments(shipEdges, shipEdgeMaterial); // Create the edge lines
      this.shipMesh.add(shipEdgeLines); // Add the edges as a child of the ship mesh

      // Initially hide the ship
      this.shipMesh.visible = false;

      // Add the ship mesh as a child of the player
      this.add(this.shipMesh);


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
      this.jumpStrength = 0.3
      this.shipSpeed = 0.1; // Speed of ascent
  }

  update(deltaTime, platforms, isShipMode, inputManager) {
      // Show or hide the ship based on the mode
      this.shipMesh.visible = isShipMode;

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
          this.position.y += this.state.velocityY * 120 * deltaTime;

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
          this.state.velocityY += this.gravity; // Gravity strength
          this.position.y += this.state.velocityY * 120 * deltaTime;

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

  // Jump function
  jump() {
      if (this.position.y === 1 && !this.state.isJumping) {
          this.state.velocityY = this.jumpStrength; // Jump strength
          this.state.isJumping = true;
      }
  }
  // Reset player position to beginning of map function
  resetPosition() {
      this.position.set(-1775, 1, 0);
  }
  // Reset speed function
  resetSpeed() {
      this.speed = initSpeed;
  }

  // Jump boost function for jump pads
  jumpBoost(targetY) {
    const heightDifference = targetY - this.position.y;
    const baseBoost = 0.6; // Increase base boost strength for more immediate impact
    const additionalBoost = Math.max(heightDifference * 0.3, 0); // Ensure positive boost

    // Directly update velocity for immediate jump
    this.state.velocityY = baseBoost + additionalBoost;
    this.state.isJumping = true;

    console.log(`Jump boost applied! VelocityY: ${this.state.velocityY}`);
}
}

export default Player;
