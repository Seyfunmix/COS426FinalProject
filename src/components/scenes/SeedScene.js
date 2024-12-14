import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight, Points, BufferGeometry, BufferAttribute, PointsMaterial } from 'three';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import Orb from '../objects/Orb/Orb';
import * as THREE from 'three';

const particleCount = 100;

const vertexShader = `
varying vec3 v_worldPosition;
void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    v_worldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const fragmentShader = `
uniform float u_time;
uniform float u_beatIntensity;
uniform vec3 u_baseColor;
uniform vec2 u_resolution;

varying vec3 v_worldPosition;

void main() {
    // Base gradient from Y
    float yGradient = (v_worldPosition.y * 0.02) + 0.5;
    yGradient = clamp(yGradient, 0.0, 1.0);

    // Introduce a Z-based gradient
    // For example, use Z position to slightly tint the color:
    float zFactor = (v_worldPosition.z * 0.01) + 0.5;
    zFactor = clamp(zFactor, 0.0, 1.0);

    // Mix dark and bright versions of baseColor for the Y-based gradient
    vec3 darkColor = u_baseColor * 0.1;
    vec3 brightColor = u_baseColor;

    vec3 baseGradientColor = mix(darkColor, brightColor, yGradient);

    // Now add subtle variation based on Z:
    // For instance, make the color slightly richer in the positive Z direction.
    // Here we blend the baseGradientColor with a tinted version to add interest.
    vec3 zTint = vec3(
        baseGradientColor.r * (0.9 + 0.1 * zFactor),
        baseGradientColor.g * (0.85 + 0.15 * zFactor),
        baseGradientColor.b * (1.0 - 0.1 * zFactor)
    );

    // Blend the two colors: when zFactor is high, we get more of the zTint
    vec3 color = mix(baseGradientColor, zTint, 0.3 * zFactor);

    // Add a time-based oscillation that uses world position:
    // For example, a subtle wave pattern moving across the scene.
    // This will slightly modulate brightness over time and along the Z axis.
    float wave = sin(u_time * 0.5 + v_worldPosition.x * 0.2) * 0.05;
    //color += wave; // Adds a subtle brightness shift

    // You can also add a slow hue shift by mixing in another sine function:
    // Another approach is to slightly shift color based on time and x-position
    // to create horizontal "ripple" patterns.
    float ripple = sin(u_time * 0.3 + v_worldPosition.y * 0.01) * 0.05;
    color += ripple;

    // By stacking these sin-based variations, you get a slowly changing background.
    // Just make sure the variations are small to keep it subtle.

    // On beat, add a white flash. This remains the same.
    color = mix(color, vec3(1.0), u_beatIntensity);

    gl_FragColor = vec4(color, 1.0);
}
`;

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
        

        
       


        // Add Lights
        this.ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
        this.add(this.ambientLight);

        // Create two SpotLights to act like stage lights
        this.leftLight = new THREE.SpotLight(0xff0000, 0.5);
        this.rightLight = new THREE.SpotLight(0x0000ff, 0.5);

        // Set initial positions
        this.leftLight.position.set(
            this.player.position.x - 5,
            this.player.position.y + 10,
            this.player.position.z - 5
        );
        this.rightLight.position.set(
            this.player.position.x + 5,
            this.player.position.y + 10,
            this.player.position.z - 5
        );

        // Adjust the spotlight parameters for a more dramatic look
        this.leftLight.angle = Math.PI / 6; // narrower beam
        this.leftLight.penumbra = 0.3;
        this.rightLight.angle = Math.PI / 6;
        this.rightLight.penumbra = 0.3;


        // also set where they point (target)
        const leftTarget = new THREE.Object3D();
        leftTarget.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
        this.add(leftTarget);
        this.leftLight.target = leftTarget;

        const rightTarget = new THREE.Object3D();
        rightTarget.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
        this.add(rightTarget);
        this.rightLight.target = rightTarget;

        // Add them to the scene
        this.add(this.leftLight);
        this.add(this.rightLight);


        // Add portal
        this.portal = new Portal(this, 150);
        // Populate GUI
        //this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

        // Add portal at the end of the level
        this.portal = new Portal(this, 1775);
        this.add(this.portal);

        // Create a large sphere or a sky dome
        const geometry = new THREE.SphereGeometry(1200, 64, 64);
        //geometry.scale(-1, 1, 1); // Invert the sphere so we see the inside

        this.bgMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                u_time: { value: 0.0 },
                u_beatIntensity: { value: 0.0 },
                u_baseColor: { value: new THREE.Color(0.0, 0.0, 0.0) }, // start dark
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            side: THREE.BackSide // render inside of sphere
        });

        this.backgroundSphere = new THREE.Mesh(geometry, this.bgMaterial);
        this.add(this.backgroundSphere);

        // Initialize particles
        this.initParticles();

        // Variables to help detect beats
        this.previousLowFreq = 0;
        this.beatThreshold = 0.75; // Adjust as needed
        this.beatCooldown = 0.5; // Seconds between beats to prevent rapid triggers
        this.timeSinceLastBeat = 999; // Large initial number

        // Visualizer
        this.hue = 0;
        this.saturation = 0.5;
        this.lightness = 0;

  
        
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
            this.player.resetSpeed();
            audioManager.sound.stop();
            audioManager.playSoundEffect('deathsound.mp3', 1.0);
            setTimeout(() => {
                this.player.resetPosition();
                audioManager.sound.play();
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
            this.player.resetPosition();
            // Stop the music
            audioManager.sound.stop();
            this.state.paused = false;
            // Restart the music
            audioManager.sound.play();
        });
    }

    resetForNextLevel() {
        // Stop the music
        audioManager.sound.stop();
        this.state.paused = false;
        // Restart the music
        audioManager.sound.play();


        this.player.resetPosition();
        this.player.increaseSpeed(0.1);
    }

    update(timeStamp, audioManager) {
        const { updateList, gameStarted, paused } = this.state;

        if (!paused) {
            for (const obj of updateList) {
                obj.update(timeStamp);
            }

            if (gameStarted) {
                this.player.position.x += this.player.speed; // Move player forward
            }

            // Reposition lights relative to the player each frame
            this.leftLight.position.set(
                this.player.position.x - 5,
                this.player.position.y + 10,
                this.player.position.z - 5
            );
            this.rightLight.position.set(
                this.player.position.x + 5,
                this.player.position.y + 10,
                this.player.position.z - 5
            );

            // Update the targets too, so the spots still point at the player
            this.leftLight.target.position.set(this.player.position.x, this.player.position.y, this.player.position.z);
            this.rightLight.target.position.set(this.player.position.x, this.player.position.y, this.player.position.z);

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

            // Update the background shader uniforms

            // this.bgMaterial.uniforms.u_baseColor.value.set(1.0, 0.0, 0.0); // Bright red
            // this.bgMaterial.uniforms.u_beatIntensity.value = 1.0; // Force full flash
            this.bgMaterial.uniforms.u_time.value = timeStamp * 0.001; // convert ms to seconds if needed

            // Decay the beat intensity if it's > 0
            if (this.bgMaterial.uniforms.u_beatIntensity.value > 0) {
                this.bgMaterial.uniforms.u_beatIntensity.value = Math.max(
                    0,
                    this.bgMaterial.uniforms.u_beatIntensity.value - 0.02
                );
            }

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

        //this.pointLight.intensity = 1 + normalizedLow * 2;

        const blueShift = normalizedHigh;
        this.ambientLight.color.setRGB(1, 1 - blueShift, 1);

        this.hue = (averageFrequency / 255) * 360;
        this.lightness = Math.min(1, 0.05 + (normalizedHigh * 0.3));
        this.background.setHSL(this.hue / 360, this.saturation, this.lightness);

        // shader
        const hue = (averageFrequency / 255) * 360;
        const saturation = 0.7;
        const lightness = Math.min(1, 0.05 + (averageFrequency / 255) * 0.3);

        const color = new THREE.Color().setHSL(hue/360, saturation, lightness);
        this.bgMaterial.uniforms.u_baseColor.value.copy(color);

        // Beat detection logic:
        // If normalizedLow is high and we've waited at least beatCooldown seconds since last beat
        if (normalizedLow > this.beatThreshold && this.timeSinceLastBeat > this.beatCooldown) {
            // Trigger particles outward
            this.triggerParticleBeat();
            this.timeSinceLastBeat = 0;

            // Also spike the beat intensity for the background
            this.bgMaterial.uniforms.u_beatIntensity.value = 1.0;
        }

        this.previousLowFreq = normalizedLow;
    }

    triggerParticleBeat() {
        console.log("Beat Detected!");
        this.saturation = 1;
        this.lightness = 1;

        // Spike background flash
        this.bgMaterial.uniforms.u_beatIntensity.value = 1.0;

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