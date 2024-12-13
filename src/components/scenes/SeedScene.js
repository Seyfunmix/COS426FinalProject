import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee); // Light blue

        // Add Ground
        const ground = new Ground(this); // Ground added with update capability
        this.add(ground);

        // Add Player
        const player = new Player(this); // Player added with update capability
        this.player = player; // Store a reference to the player for external access
        this.add(player);

        // Add Obstacles (randomly placed along the path)
        const obstacles = [];
        for (let i = 1; i <= 10; i++) {
            const xPosition = i * 5; // Space obstacles evenly along the path
            const zPosition = Math.random() * 4 - 2; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }
        this.obstacles = obstacles; // Store a reference to obstacles for external access

        // Add Lights
        const lights = new BasicLights();
        this.add(lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }

        // Move the player forward along the x-axis
        this.player.position.x -= 0.05; // Adjust speed as needed

        // Check for collisions with obstacles
        this.obstacles.forEach((obstacle) => {
            if (
                Math.abs(this.player.position.x - obstacle.position.x) < 0.5 && // Adjust collision radius
                Math.abs(this.player.position.z - obstacle.position.z) < 0.5
            ) {
                console.log('Collision detected! Game over!');
                // Add logic to stop the game or reset the player's position
            }
        });
    }
}

export default SeedScene;
