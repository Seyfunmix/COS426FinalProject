import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
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
        const lights = new BasicLights();
        this.add(lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

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
        this.portal.position.x += 200; // Move the portal further down the track
        // Potentially generate new obstacles here as well
    }

    setGameStarted(value) {
        this.state.gameStarted = value; // Sync gameStarted state
    }
}

export default SeedScene;
