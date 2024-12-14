import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight } from 'three';
import { BasicLights } from 'lights';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import Orb from '../objects/Orb/Orb';


class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            gameStarted: false, // Track whether the game has started
        };

        // Set background to a nice color
        this.background = new Color(0x000000); // Light blue

        // Add Ground
        const ground = new Ground(this); // Ground added with update capability
        this.add(ground);

        // Add Player
        const player = new Player(this); // Player added with update capability
        this.player = player; // Store a reference to the player for external access
        this.add(player);

        // Add Obstacles 
        const obstacles = [];

        // Use an arrow function to preserve the `this` context
        const placeObstacle = (x, z) => {
        // Create a new obstacle at the specified position
        const obstacle = new Obstacle(this, x, z);

        // Add the obstacle to the scene
        obstacles.push(obstacle);
        this.add(obstacle);
};

const orbs = [];

        // Place an orb function
        const placeOrb = (x, y, z) => {
            // Create a new orb at the specified position
            const orb = new Orb(this, x, y, z);

            // Add the orb to the scene
            orbs.push(orb);
            this.add(orb);
        };

        // Store a reference to orbs for external access
        this.orbs = orbs;

        this.obstacles = obstacles; // Store a reference to obstacles for external access
        placeObstacle(-2870, 0); // Place an obstacle
        placeObstacle(-2770, 0); // Place an obstacle
        placeObstacle(-2670, 0); // Place an obstacle

        placeObstacle(-2570, 0); // Place an obstacle
        placeObstacle(-2520, 0); // Place an obstacle
        placeObstacle(-2470, 0); // Place an obstacle
        placeObstacle(-2420, 0); // Place an obstacle

        placeObstacle(-2370, 0); // Place an obstacle
        placeObstacle(-2320, 0); // Place an obstacle
        placeObstacle(-2270, 0); // Place an obstacle
        placeObstacle(-2220, 0); // Place an obstacle

        placeOrb(-2165, 2.5, 0);
        placeObstacle(-2170, 0); // Place an obstacle
        placeObstacle(-2160, 0); // Place an obstacle
        placeObstacle(-2150, 0); // Place an obstacle
        placeObstacle(-2140, 0); // Place an obstacle

        placeOrb(-2066, 2.5, 0);
        placeObstacle(-2070, 0); // Place an obstacle
        placeObstacle(-2060, 0); // Place an obstacle
        placeObstacle(-2050, 0); // Place an obstacle
        placeObstacle(-2040, 0); // Place an obstacle

        placeOrb(-1965, 2.5, 0);
        placeObstacle(-1970, 0); // Place an obstacle
        placeObstacle(-1960, 0); // Place an obstacle
        placeObstacle(-1950, 0); // Place an obstacle
        placeObstacle(-1940, 0); // Place an obstacle

        placeOrb(-1865, 2.5, 0);
        placeObstacle(-1870, 0); // Place an obstacle
        placeObstacle(-1860, 0); // Place an obstacle
        placeObstacle(-1850, 0); // Place an obstacle
        placeObstacle(-1840, 0); // Place an obstacle

        
       


        // Add Lights
        this.ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
        this.add(this.ambientLight);

        this.pointLight = new PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(0, 10, 0);
        this.add(this.pointLight);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

        // Add portal at the end of the level (e.g., at x=150)
        this.portal = new Portal(this, 3000);
        this.add(this.portal);

  
        
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    startGame() {
        this.state.gameStarted = true; // Start the game
    }


    handleCollision(audioManager) {
        if (!this.state.paused) {
            this.state.paused = true; // Pause the game

            // Stop the music
            audioManager.sound.stop();
            
            // Play the death sound effect
            audioManager.playSoundEffect('deathsound.mp3', 1.0);

            // Pause for 1 second before restarting
            setTimeout(() => {
                // Reset player position
                this.player.resetPosition();

                // Restart the music
                audioManager.sound.play();

                // Resume the game
                this.state.paused = false;
            }, 1000);
        }
    }

    update(timeStamp, audioManager) {
        const { updateList, gameStarted, paused } = this.state;

        if (!paused) {
            // Update all objects in the update list
            for (const obj of updateList) {
                if (obj instanceof Orb) {
                    // Pass the player to the orb's update method
                    obj.update(this.player);
                } else {
                    obj.update(timeStamp);
                }
            }

            // Only move player if the game has started
            if (gameStarted) {
                this.player.position.x += 0.5; // Move player forward
            }

            // Collision check
            this.obstacles.forEach((obstacle) => {
                if (
                    Math.abs(this.player.position.x - obstacle.position.x) < 0.5 &&
                    Math.abs(this.player.position.z - obstacle.position.z) < 0.5 &&
                    this.player.position.y - 2 < 0.5
                ) {
                    console.log('Collision detected! Pausing game...');
                    this.handleCollision(audioManager);
                }
            });

            // Collision check with portal
            if (
                Math.abs(this.player.position.x - this.portal.position.x) < 1.0 &&
                Math.abs(this.player.position.z - this.portal.position.z) < 1.0 &&
                this.player.position.y < 3.0 // Portal is 3 units tall and centered around y=1.5
            ) {
                console.log('Player reached the portal!');
                this.handlePortalCollision(audioManager);
            }
        }

        // ----- Add Visual Effects Based on Music -----
        this.applyAudioEffects(audioManager);
    }

    applyAudioEffects(audioManager) {
        // Get frequency data
        const frequencyData = audioManager.getFrequencyData();
        const averageFrequency = audioManager.getAverageFrequency();

        // Example: Pulse the PointLight intensity based on low frequencies
        // Define frequency ranges (these are approximate and can be adjusted)
        const lowFreq = frequencyData.slice(0, 20); // Low frequencies
        const highFreq = frequencyData.slice(80, 128); // High frequencies

        // Calculate average low and high frequencies
        const avgLowFreq = lowFreq.reduce((sum, val) => sum + val, 0) / lowFreq.length;
        const avgHighFreq = highFreq.reduce((sum, val) => sum + val, 0) / highFreq.length;

        // Normalize values (0 to 1)
        const normalizedLow = avgLowFreq / 255;
        const normalizedHigh = avgHighFreq / 255;

        // Adjust PointLight intensity based on low frequencies
        this.pointLight.intensity = 1 + normalizedLow * 2; // Base intensity + pulse

        // Adjust ambient light color based on high frequencies
        // For example, shift towards blue on high frequencies
        const blueShift = normalizedHigh;
        this.ambientLight.color.setRGB(1 - blueShift, 1 - blueShift, 1); // Shift towards blue

        // Optionally, adjust the background color based on frequencies
        // For example, shift background color hue based on average frequency
        const hue = (averageFrequency / 255) * 360; // 0 to 360 degrees
        const saturation = 0.5; // 50%
        const lightness = 0.1 + (normalizedHigh * 0.4); // Between 10% and 50%
        this.background.setHSL(hue / 360, saturation, lightness);
    }


    handlePortalCollision(audioManager) {
        this.state.paused = true;

        // Show a "Next Level" overlay
        const nextLevelOverlay = document.createElement('div');
        nextLevelOverlay.style.position = 'absolute';
        nextLevelOverlay.style.top = '0';
        nextLevelOverlay.style.left = '0';
        nextLevelOverlay.style.width = '100%';
        nextLevelOverlay.style.height = '100%';
        nextLevelOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        nextLevelOverlay.style.display = 'flex';
        nextLevelOverlay.style.alignItems = 'center';
        nextLevelOverlay.style.justifyContent = 'center';
        nextLevelOverlay.style.color = 'white';
        nextLevelOverlay.style.fontSize = '48px';
        nextLevelOverlay.style.zIndex = '999';
        nextLevelOverlay.innerHTML = '<div>Level Complete!<br><button id="nextLevelBtn">Continue</button></div>';

        document.body.appendChild(nextLevelOverlay);

        const nextLevelBtn = document.getElementById('nextLevelBtn');
        nextLevelBtn.addEventListener('click', () => {
            // Cleanup overlay
            document.body.removeChild(nextLevelOverlay);

            // Proceed to next level logic:
            // For example, reset player position, move portal further, or load a new scene
            this.player.resetPosition();
            // Stop the music
            audioManager.sound.stop();
            this.state.paused = false;
            // Restart the music
            audioManager.sound.play();
        });
    }

    


    setGameStarted(value) {
        this.state.gameStarted = value; // Sync gameStarted state
    }
}

export default SeedScene;
