import { Mesh, PlaneGeometry, MeshStandardMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

class Ground extends Mesh {
  constructor() {
    // Create the ground geometry and material
    const geometry = new PlaneGeometry(3550, 10);
    const material = new MeshStandardMaterial({
      color: 0x000000, // Black faces
    });

    // Create the base mesh
    super(geometry, material);

    // Rotate and position the ground
    this.rotation.x = -Math.PI / 2; // Lay flat
    this.position.y = 0; // Align with the ground

    // Add white edges
    const edges = new EdgesGeometry(geometry); // Generate edges for the geometry
    const edgeMaterial = new LineBasicMaterial({ color: 0xffffff }); // White edges
    const edgeLines = new LineSegments(edges, edgeMaterial); // Create the edge lines
    this.add(edgeLines); // Add the edges as a child of the ground mesh
  }
}

export default Ground;
