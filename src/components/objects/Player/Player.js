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
      const material = new MeshStandardMaterial({ color: 0x000000 }); // Green material
  
      // Call parent Mesh() constructor
      super(geometry, material);
  
      // Add white edges
      const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
      const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
      const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
      this.add(edgeLines); // Add the edges as a child of the player mesh
  
      // Init state
      this.state = {
        velocityY: 0, // Vertical velocity for jumping
        isJumping: false,
      };
  
      // Set initial position
      this.position.set(-1775, 1, 0); // Start at one end of the ground
  
      this.speed = initSpeed; // Initial speed
  
      // Add self to parent's update list
      parent.addToUpdateList(this);
    }
  
    update(platforms) {
      // Apply gravity
      this.state.velocityY -= 0.01; // Gravity strength
      this.position.y += this.state.velocityY;
  
      // Check collision with platforms
      let isOnPlatform = false;
      platforms.forEach(platform => {
          const platformTop = platform.position.y + 0.25; // Platform top surface (height / 2)
          const isAbovePlatform = this.position.y > platformTop && this.position.y - platformTop <= 0.25;
          const isWithinPlatformX = Math.abs(this.position.x - platform.position.x) <= 50; // Half the width
          const isWithinPlatformZ = Math.abs(this.position.z - platform.position.z) <= 0.75; // Half the depth
  
          if (isAbovePlatform && isWithinPlatformX && isWithinPlatformZ) {
              // Place the player on the platform
              this.position.y = platformTop; // Adjust to stand on top of the platform
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
  
    increaseSpeed(amount) {
      this.speed += amount;
    }
  }
  
  export default Player;
  