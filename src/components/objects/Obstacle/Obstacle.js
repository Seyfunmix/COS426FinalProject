import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

class Obstacle extends Mesh {
  constructor(x, z) {
    super(new BoxGeometry(1, 2, 1), new MeshStandardMaterial({ color: 0xff0000 }));
    this.position.set(x, 1, z); // Set position
  }
}

export default Obstacle;
