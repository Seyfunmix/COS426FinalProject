import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight } from 'three';
import { BasicLights } from 'lights';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import Orb from '../objects/Orb/Orb';
import Platform from '../objects/Platform/Platform';


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


        // Add Platforms
        const platforms = [];
        this.platforms = platforms;

        // Use an arrow function to preserve the `this` context
        const placePlatform = (x, y, z) => {
            // Create a new platform at the specified position
            const platform = new Platform(this, x, y, z);

            // Add the platform to the scene
            platforms.push(platform);
            this.add(platform);
        };



        placeObstacle(-1645, 0); // Place an obstacle
        placeObstacle(-1545, 0); // Place an obstacle
        placeObstacle(-1445, 0); // Place an obstacle
        
        placeObstacle(-1345, 0); // Place an obstacle
        placeObstacle(-1295, 0); // Place an obstacle
        placeObstacle(-1245, 0); // Place an obstacle
        placeObstacle(-1195, 0); // Place an obstacle
        
        placeObstacle(-1145, 0); // Place an obstacle
        placeObstacle(-1095, 0); // Place an obstacle
        placeObstacle(-1045, 0); // Place an obstacle
        placeObstacle(-995, 0); // Place an obstacle
        
        placeOrb(-940, 2.5, 0);
        placeObstacle(-945, 0); // Place an obstacle
        placeObstacle(-935, 0); // Place an obstacle
        placeObstacle(-925, 0); // Place an obstacle
        placeObstacle(-915, 0); // Place an obstacle
        
        placeOrb(-841, 2.5, 0);
        placeObstacle(-845, 0); // Place an obstacle
        placeObstacle(-835, 0); // Place an obstacle
        placeObstacle(-825, 0); // Place an obstacle
        placeObstacle(-815, 0); // Place an obstacle
        
        placeOrb(-740, 2.5, 0);
        placeObstacle(-745, 0); // Place an obstacle
        placeObstacle(-735, 0); // Place an obstacle
        placeObstacle(-725, 0); // Place an obstacle
        placeObstacle(-715, 0); // Place an obstacle
        
        placeOrb(-640, 2.5, 0);
        placeObstacle(-645, 0); // Place an obstacle
        placeObstacle(-635, 0); // Place an obstacle
        placeObstacle(-625, 0); // Place an obstacle
        placeObstacle(-615, 0); // Place an obstacle

        placeObstacle(-565, 0); // Place an obstacle
        placeObstacle(-565, -1); // Place an obstacle
        placeObstacle(-565, -2); // Place an obstacle
        placeObstacle(-565, -3); // Place an obstacle
        placeObstacle(-565, -4); // Place an obstacle
        placeObstacle(-565, -5); // Place an obstacle
        placeObstacle(-565, 1); // Place an obstacle
        placeObstacle(-565, 2); // Place an obstacle
        placeObstacle(-565, 3); // Place an obstacle
        placeObstacle(-565, 4); // Place an obstacle
        placeObstacle(-565, 5); // Place an obstacle
    

        placeObstacle(-515, 0); // Place an obstacle
        placeObstacle(-515, -1); // Place an obstacle
        placeObstacle(-515, -2); // Place an obstacle
        placeObstacle(-515, -3); // Place an obstacle
        placeObstacle(-515, -4); // Place an obstacle
        placeObstacle(-515, -5); // Place an obstacle
        placeObstacle(-515, 1); // Place an obstacle
        placeObstacle(-515, 2); // Place an obstacle
        placeObstacle(-515, 3); // Place an obstacle
        placeObstacle(-515, 4); // Place an obstacle
        placeObstacle(-515, 5); // Place an obstacle

        // big block of spikes
        placeOrb(-449, 2.5, 0);
        placeObstacle(-450, 5); // Place an obstacle
        placeObstacle(-450, 4); // Place an obstacle
        placeObstacle(-450, 3); // Place an obstacle
        placeObstacle(-450, 2); // Place an obstacle
        placeObstacle(-450, 1); // Place an obstacle
        placeObstacle(-450, 0); // Place an obstacle
        placeObstacle(-450, -1); // Place an obstacle
        placeObstacle(-450, -2); // Place an obstacle
        placeObstacle(-450, -3); // Place an obstacle
        placeObstacle(-450, -4); // Place an obstacle
        placeObstacle(-450, -5); // Place an obstacle
        
        placeObstacle(-440, 5); // Place an obstacle
        placeObstacle(-440, 4); // Place an obstacle
        placeObstacle(-440, 3); // Place an obstacle
        placeObstacle(-440, 2); // Place an obstacle
        placeObstacle(-440, 1); // Place an obstacle
        placeObstacle(-440, 0); // Place an obstacle
        placeObstacle(-440, -1); // Place an obstacle
        placeObstacle(-440, -2); // Place an obstacle
        placeObstacle(-440, -3); // Place an obstacle
        placeObstacle(-440, -4); // Place an obstacle
        placeObstacle(-440, -5); // Place an obstacle

        placeObstacle(-430, 5); // Place an obstacle
        placeObstacle(-430, 4); // Place an obstacle
        placeObstacle(-430, 3); // Place an obstacle
        placeObstacle(-430, 2); // Place an obstacle
        placeObstacle(-430, 1); // Place an obstacle
        placeObstacle(-430, 0); // Place an obstacle
        placeObstacle(-430, -1); // Place an obstacle
        placeObstacle(-430, -2); // Place an obstacle
        placeObstacle(-430, -3); // Place an obstacle
        placeObstacle(-430, -4); // Place an obstacle
        placeObstacle(-430, -5); // Place an obstacle
        
        placeObstacle(-420, 5); // Place an obstacle
        placeObstacle(-420, 4); // Place an obstacle
        placeObstacle(-420, 3); // Place an obstacle
        placeObstacle(-420, 2); // Place an obstacle
        placeObstacle(-420, 1); // Place an obstacle
        placeObstacle(-420, 0); // Place an obstacle
        placeObstacle(-420, -1); // Place an obstacle
        placeObstacle(-420, -2); // Place an obstacle
        placeObstacle(-420, -3); // Place an obstacle
        placeObstacle(-420, -4); // Place an obstacle
        placeObstacle(-420, -5); // Place an obstacle

        placeObstacle(-410, 5); // Place an obstacle
        placeObstacle(-410, 4); // Place an obstacle
        placeObstacle(-410, 3); // Place an obstacle
        placeObstacle(-410, 2); // Place an obstacle
        placeObstacle(-410, 1); // Place an obstacle
        placeObstacle(-410, 0); // Place an obstacle
        placeObstacle(-410, -1); // Place an obstacle
        placeObstacle(-410, -2); // Place an obstacle
        placeObstacle(-410, -3); // Place an obstacle
        placeObstacle(-410, -4); // Place an obstacle
        placeObstacle(-410, -5); // Place an obstacle


        placeObstacle(-350, 0); // Place an obstacle
        placeObstacle(-350, -1); // Place an obstacle
        placeObstacle(-350, -2); // Place an obstacle
        placeObstacle(-350, -3); // Place an obstacle
        placeObstacle(-350, -4); // Place an obstacle
        placeObstacle(-350, -5); // Place an obstacle
        placeObstacle(-350, 1); // Place an obstacle
        placeObstacle(-350, 2); // Place an obstacle
        placeObstacle(-350, 3); // Place an obstacle
        placeObstacle(-350, 4); // Place an obstacle
        placeObstacle(-350, 5); // Place an obstacle
    

        placeObstacle(-300, 0); // Place an obstacle
        placeObstacle(-300, -1); // Place an obstacle
        placeObstacle(-300, -2); // Place an obstacle
        placeObstacle(-300, -3); // Place an obstacle
        placeObstacle(-300, -4); // Place an obstacle
        placeObstacle(-300, -5); // Place an obstacle
        placeObstacle(-300, 1); // Place an obstacle
        placeObstacle(-300, 2); // Place an obstacle
        placeObstacle(-300, 3); // Place an obstacle
        placeObstacle(-300, 4); // Place an obstacle
        placeObstacle(-300, 5); // Place an obstacle

        // big block of spikes
        placeOrb(-249, 2.5, 0);
        placeObstacle(-250, 5); // Place an obstacle
        placeObstacle(-250, 4); // Place an obstacle
        placeObstacle(-250, 3); // Place an obstacle
        placeObstacle(-250, 2); // Place an obstacle
        placeObstacle(-250, 1); // Place an obstacle
        placeObstacle(-250, 0); // Place an obstacle
        placeObstacle(-250, -1); // Place an obstacle
        placeObstacle(-250, -2); // Place an obstacle
        placeObstacle(-250, -3); // Place an obstacle
        placeObstacle(-250, -4); // Place an obstacle
        placeObstacle(-250, -5); // Place an obstacle
        
        placeObstacle(-240, 5); // Place an obstacle
        placeObstacle(-240, 4); // Place an obstacle
        placeObstacle(-240, 3); // Place an obstacle
        placeObstacle(-240, 2); // Place an obstacle
        placeObstacle(-240, 1); // Place an obstacle
        placeObstacle(-240, 0); // Place an obstacle
        placeObstacle(-240, -1); // Place an obstacle
        placeObstacle(-240, -2); // Place an obstacle
        placeObstacle(-240, -3); // Place an obstacle
        placeObstacle(-240, -4); // Place an obstacle
        placeObstacle(-240, -5); // Place an obstacle

        placeObstacle(-230, 5); // Place an obstacle
        placeObstacle(-230, 4); // Place an obstacle
        placeObstacle(-230, 3); // Place an obstacle
        placeObstacle(-230, 2); // Place an obstacle
        placeObstacle(-230, 1); // Place an obstacle
        placeObstacle(-230, 0); // Place an obstacle
        placeObstacle(-230, -1); // Place an obstacle
        placeObstacle(-230, -2); // Place an obstacle
        placeObstacle(-230, -3); // Place an obstacle
        placeObstacle(-230, -4); // Place an obstacle
        placeObstacle(-230, -5); // Place an obstacle
        
        placeObstacle(-220, 5); // Place an obstacle
        placeObstacle(-220, 4); // Place an obstacle
        placeObstacle(-220, 3); // Place an obstacle
        placeObstacle(-220, 2); // Place an obstacle
        placeObstacle(-220, 1); // Place an obstacle
        placeObstacle(-220, 0); // Place an obstacle
        placeObstacle(-220, -1); // Place an obstacle
        placeObstacle(-220, -2); // Place an obstacle
        placeObstacle(-220, -3); // Place an obstacle
        placeObstacle(-220, -4); // Place an obstacle
        placeObstacle(-220, -5); // Place an obstacle

        placeObstacle(-210, 5); // Place an obstacle
        placeObstacle(-210, 4); // Place an obstacle
        placeObstacle(-210, 3); // Place an obstacle
        placeObstacle(-210, 2); // Place an obstacle
        placeObstacle(-210, 1); // Place an obstacle
        placeObstacle(-210, 0); // Place an obstacle
        placeObstacle(-210, -1); // Place an obstacle
        placeObstacle(-210, -2); // Place an obstacle
        placeObstacle(-210, -3); // Place an obstacle
        placeObstacle(-210, -4); // Place an obstacle
        placeObstacle(-210, -5); // Place an obstacle
       
        

        
       


        // Add Lights
        this.ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
        this.add(this.ambientLight);

        this.pointLight = new PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(0, 10, 0);
        this.add(this.pointLight);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

        // Add portal at the end of the level
        this.portal = new Portal(this, 1775);
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
                } else if (obj instanceof Player) {
                    // Pass platforms to the player's update method for collision detection
                    obj.update(this.platforms);
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
