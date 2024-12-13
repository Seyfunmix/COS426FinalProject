import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';

class Ground extends Mesh {
  constructor() {
    super(new PlaneGeometry(600, 10), new MeshStandardMaterial({ color: 0x000000}));
    this.rotation.x = -Math.PI / 2; // Lay flat
    this.position.y = 0; // Align with the ground
  }
}

export default Ground;
