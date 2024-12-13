import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight } from 'three';
import { BasicLights } from 'lights';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';


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

        // Add Obstacles (spaced evenly along the ground's length)
        const obstacles = [];
        const obstacleCount = 10; // Number of obstacles
        const startX = -140; // Starting position of obstacles
        const endX = 140; // Ending position of obstacles
        const obstacleSpacing = (endX - startX) / obstacleCount;

        for (let i = 0; i < obstacleCount; i++) {
            const xPosition = startX + i * obstacleSpacing; // Evenly space obstacles
            const zPosition = Math.random() * 4 - 2; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }
        this.obstacles = obstacles; // Store a reference to obstacles for external access

        // Add Lights
        this.ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
        this.add(this.ambientLight);

        this.pointLight = new PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(0, 10, 0);
        this.add(this.pointLight);

        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

        // Add portal at the end of the level (e.g., at x=150)
        this.portal = new Portal(this, 150);
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

        // Update all objects in the update list
        if (!paused) {
            for (const obj of updateList) {
                obj.update(timeStamp);
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
                this.handlePortalCollision();
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


    handlePortalCollision() {
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
            this.resetForNextLevel();
            this.state.paused = false;
        });
    }

    resetForNextLevel() {
        // Example of moving the portal and resetting player
        this.player.resetPosition();
        //this.portal.position.x += 200; // Move the portal further down the track
        // Potentially generate new obstacles here as well
    }

    setGameStarted(value) {
        this.state.gameStarted = value; // Sync gameStarted state
    }
}

export default SeedScene;
