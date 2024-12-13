import {
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  EdgesGeometry,
  LineSegments,
  Group,
} from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

class Ground extends Group {
  constructor() {
    super(); // Group allows combining multiple meshes

    // Create the ground geometry and material
    const geometry = new PlaneGeometry(600, 10);
    const material = new MeshStandardMaterial({
      color: 0x000000, // Black faces
      side: 2, // Render both sides to ensure edges show up
    });

    // Base ground mesh
    const groundMesh = new Mesh(geometry, material);
    groundMesh.rotation.x = -Math.PI / 2; // Lay flat
    groundMesh.position.y = 0; // Align with the ground
    this.add(groundMesh); // Add the ground mesh to the group

    // Add thicker white edges
    const edges = new EdgesGeometry(geometry); // Generate edges from the same geometry
    const edgeGeometry = new LineGeometry();
    edgeGeometry.setPositions(edges.attributes.position.array);

    const edgeMaterial = new LineMaterial({
      color: 0xffffff, // White edges
      linewidth: 0.1, // Thicker lines (adjust this value for desired thickness)
    });
    edgeMaterial.resolution.set(window.innerWidth, window.innerHeight); // Set resolution for correct scaling

    const thickEdges = new LineSegments2(edgeGeometry, edgeMaterial);
    thickEdges.rotation.x = -Math.PI / 2; // Match ground rotation
    thickEdges.position.y = 0.01; // Slightly above the ground to avoid z-fighting
    this.add(thickEdges); // Add edges to the group
  }
}

export default Ground;
