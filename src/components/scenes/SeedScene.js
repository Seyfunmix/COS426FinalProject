import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight, Points, BufferGeometry, BufferAttribute, PointsMaterial } from 'three';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import * as THREE from 'three';

const particleCount = 100;

class SeedScene extends Scene {
    constructor() {
        super();

        this.state = {
            gui: new Dat.GUI(),
            rotationSpeed: 1,
            updateList: [],
            gameStarted: false,
            paused: false,
        };

        this.background = new Color(0x000000);

        // Add ground
        const ground = new Ground(this);
        this.add(ground);

        // Add player
        const player = new Player(this);
        this.player = player;
        this.add(player);

        // Add obstacles
        this.obstacles = [];
        const obstacleCount = 10;
        const startX = -140;
        const endX = 140;
        const obstacleSpacing = (endX - startX) / obstacleCount;
        for (let i = 0; i < obstacleCount; i++) {
            const xPosition = startX + i * obstacleSpacing;
            const zPosition = Math.random() * 4 - 2;
            const obstacle = new Obstacle(this, xPosition, zPosition);
            this.obstacles.push(obstacle);
            this.add(obstacle);
        }

        // Add lights
        this.ambientLight = new AmbientLight(0xffffff, 0.5);
        this.add(this.ambientLight);

        this.pointLight = new PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(0, 10, 0);
        this.add(this.pointLight);

        // Add portal
        this.portal = new Portal(this, 150);
        this.add(this.portal);

        // Initialize particles
        this.initParticles();

        // Variables to help detect beats
        this.previousLowFreq = 0;
        this.beatThreshold = 0.7; // Adjust as needed
        this.beatCooldown = 0.5; // Seconds between beats to prevent rapid triggers
        this.timeSinceLastBeat = 999; // Large initial number
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    setGameStarted(value) {
        this.state.gameStarted = value;
    }

    startGame() {
        this.state.gameStarted = true;
    }

    initParticles() {
        // Particle geometry
        this.particlesGeometry = new BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        this.particleVelocities = new Float32Array(particleCount * 3);
        this.particleLifetimes = new Float32Array(particleCount); // For fade/dissolve

        // Initialize positions around the player
        for (let i = 0; i < particleCount; i++) {
            this.resetParticle(i, positions, this.particleVelocities, this.particleLifetimes);
        }

        this.particlesGeometry.setAttribute('position', new BufferAttribute(positions, 3));
        this.particlesMaterial = new PointsMaterial({
            color: 0xffffff,
            size: 0.2,
            transparent: true,
            opacity: 0.8,
        });

        this.particles = new Points(this.particlesGeometry, this.particlesMaterial);
        this.add(this.particles);
    }

    resetParticle(i, positions, velocities, lifetimes) {
        // Place the particle around the player's CURRENT position
        const radius = 2.0; // Orbit radius
        const angle = Math.random() * Math.PI * 2;

        const px = this.player.position.x + Math.cos(angle) * radius;
        const py = this.player.position.y;
        const pz = this.player.position.z + Math.sin(angle) * radius;

        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = pz;

        // Give a small tangential velocity to keep them orbiting the player
        const speed = 0.01;
        velocities[i * 3] = -Math.sin(angle) * speed;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = Math.cos(angle) * speed;

        // Restore full lifetime
        lifetimes[i] = 1.0;
    }

    handleCollision(audioManager) {
        if (!this.state.paused) {
            this.state.paused = true;
            audioManager.sound.stop();
            audioManager.playSoundEffect('deathsound.mp3', 1.0);
            setTimeout(() => {
                this.player.resetPosition();
                audioManager.sound.play();
                this.state.paused = false;
            }, 1000);
        }
    }

    handlePortalCollision() {
        this.state.paused = true;

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
            document.body.removeChild(nextLevelOverlay);
            this.resetForNextLevel();
            this.state.paused = false;
        });
    }

    resetForNextLevel() {
        // Remove old obstacles
        this.obstacles.forEach((obstacle) => {
            this.remove(obstacle);
        });
        this.obstacles = [];

        // Create new obstacles
        const newObstacleCount = 10;
        const startX = this.portal.position.x - 200;
        const endX = this.portal.position.x;
        const obstacleSpacing = (endX - startX) / newObstacleCount;

        for (let i = 0; i < newObstacleCount; i++) {
            const xPosition = startX + i * obstacleSpacing;
            const zPosition = Math.random() * 4 - 2;
            const obstacle = new Obstacle(this, xPosition, zPosition);
            this.obstacles.push(obstacle);
            this.add(obstacle);
        }

        this.player.resetPosition();
    }

    update(timeStamp, audioManager) {
        const { updateList, gameStarted, paused } = this.state;

        if (!paused) {
            for (const obj of updateList) {
                obj.update(timeStamp);
            }

            if (gameStarted) {
                this.player.position.x += 0.5; // Move player forward
            }

            // Collision checks
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

            // Check portal
            if (
                Math.abs(this.player.position.x - this.portal.position.x) < 1.0 &&
                Math.abs(this.player.position.z - this.portal.position.z) < 1.0 &&
                this.player.position.y < 7.0
            ) {
                console.log('Player reached the portal!');
                this.handlePortalCollision();
            }

            this.timeSinceLastBeat += 1/60; // Assuming ~60fps, increment by frame time as needed

            // Apply audio effects (detect beats, color shifts)
            this.applyAudioEffects(audioManager);

            // Update particles every frame
            this.updateParticles();
        }
    }

    applyAudioEffects(audioManager) {
        const frequencyData = audioManager.getFrequencyData();
        const averageFrequency = audioManager.getAverageFrequency();

        // Define frequency bands
        const lowFreq = frequencyData.slice(0, 20);
        const highFreq = frequencyData.slice(80, 128);

        const avgLowFreq = lowFreq.reduce((sum, val) => sum + val, 0) / lowFreq.length;
        const avgHighFreq = highFreq.reduce((sum, val) => sum + val, 0) / highFreq.length;

        const normalizedLow = avgLowFreq / 255;
        const normalizedHigh = avgHighFreq / 255;

        this.pointLight.intensity = 1 + normalizedLow * 2;

        const blueShift = normalizedHigh;
        this.ambientLight.color.setRGB(1 - blueShift, 1 - blueShift, 1);

        const hue = (averageFrequency / 255) * 360;
        const saturation = 0.5;
        const lightness = 0.1 + (normalizedHigh * 0.4);
        this.background.setHSL(hue / 360, saturation, lightness);

        // Beat detection logic:
        // If normalizedLow is high and we've waited at least beatCooldown seconds since last beat
        if (normalizedLow > this.beatThreshold && this.timeSinceLastBeat > this.beatCooldown) {
            // Trigger particles outward
            this.triggerParticleBeat();
            this.timeSinceLastBeat = 0;
        }

        this.previousLowFreq = normalizedLow;
    }

    triggerParticleBeat() {
        console.log("Beat Detected!")
        // Give each particle an outward radial velocity and start their fade-out
        const positions = this.particlesGeometry.attributes.position.array;
        const velocities = this.particleVelocities;
        const lifetimes = this.particleLifetimes;

        for (let i = 0; i < particleCount; i++) {
            const px = positions[i * 3];
            const py = positions[i * 3 + 1];
            const pz = positions[i * 3 + 2];

            // Compute vector from player to particle
            const dx = px - this.player.position.x;
            const dz = pz - this.player.position.z;
            const dist = Math.sqrt(dx*dx + dz*dz);

            // Outward velocity (away from player)
            const outwardSpeed = 0.2; // Increase as desired
            if (dist > 0) {
                velocities[i * 3] = (dx / dist) * outwardSpeed;
                velocities[i * 3 + 1] = 0;
                velocities[i * 3 + 2] = (dz / dist) * outwardSpeed;
            } else {
                // If by some chance particle is at player position, give random direction
                const angle = Math.random() * Math.PI * 2;
                velocities[i * 3] = Math.cos(angle) * outwardSpeed;
                velocities[i * 3 + 1] = 0;
                velocities[i * 3 + 2] = Math.sin(angle) * outwardSpeed;
            }

            // Start fading out by reducing lifetime over time in update
            // We'll do that in updateParticles
        }
    }

    updateParticles() {
        const dt = 1/60; // Assuming ~60fps
        const positions = this.particlesGeometry.attributes.position.array;
        const velocities = this.particleVelocities;
        const lifetimes = this.particleLifetimes;
    
        // Update each particle
        for (let i = 0; i < particleCount; i++) {
            // Update position based on velocity
            positions[i * 3] += velocities[i * 3] * dt;
            positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
            positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;
    
            // Check particle state
            const vx = velocities[i * 3];
            const vy = velocities[i * 3 + 1];
            const vz = velocities[i * 3 + 2];
            const speed = Math.sqrt(vx*vx + vy*vy + vz*vz);
    
            if (speed > 0.05) {
                // Particle is in outburst mode (just after a beat)
                lifetimes[i] -= dt; // Fade out over about 1 second
                if (lifetimes[i] < 0) {
                    // Fully faded, reset near player
                    this.resetParticle(i, positions, velocities, lifetimes);
                }
            } else {
                // Orbiting mode
                // If lifetime is less than 1, restore it gradually
                if (lifetimes[i] < 1.0) {
                    lifetimes[i] = Math.min(1.0, lifetimes[i] + dt * 0.5);
                }
            }
        }
    
        // Compute average lifetime for opacity
        const avgLifetime = lifetimes.reduce((sum, val) => sum + val, 0) / particleCount;
        this.particlesMaterial.opacity = avgLifetime;
    
        // Let Three.js know we updated the particle positions
        this.particlesGeometry.attributes.position.needsUpdate = true;
    }
}

export default SeedScene;