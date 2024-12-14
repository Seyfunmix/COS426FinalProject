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
      this.position.set(-3000, 1, 0);
    }
  
    increaseSpeed(amount) {
      this.speed += amount;
    }
  }
  
  export default Player;
  