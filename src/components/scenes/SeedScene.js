import * as Dat from 'dat.gui';
import {
    Scene,
    Color,
    PointLight,
    AmbientLight,
    Points,
    BufferGeometry,
    BufferAttribute,
    PointsMaterial,
} from 'three';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import Orb from '../objects/Orb/Orb';
import Platform from '../objects/Platform/Platform';
import PowerUp from '../objects/PowerUp/PowerUp';
import FloatingObstacle from '../objects/FloatingObstacle/FloatingObstacle';
import * as THREE from 'three';

class SeedScene extends Scene {
    constructor() {
        super();

        this.state = {
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
        this.obstacles = obstacles; // Store a reference to obstacles for external access

        // Place obstacle function
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
        
        // Level layout 

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

        placeOrb(-935, 1, 0);
        placeObstacle(-945, 0); // Place an obstacle
        placeObstacle(-935, 0); // Place an obstacle
        placeObstacle(-925, 0); // Place an obstacle
        placeObstacle(-915, 0); // Place an obstacle

        placeOrb(-835, 1, 0);
        placeObstacle(-845, 0); // Place an obstacle
        placeObstacle(-835, 0); // Place an obstacle
        placeObstacle(-825, 0); // Place an obstacle
        placeObstacle(-815, 0); // Place an obstacle

        placeOrb(-735, 1, 0);
        placeObstacle(-745, 0); // Place an obstacle
        placeObstacle(-735, 0); // Place an obstacle
        placeObstacle(-725, 0); // Place an obstacle
        placeObstacle(-715, 0); // Place an obstacle

        placeOrb(-635, 1, 0);
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
        placeOrb(-445, 1, 0);
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
        placeOrb(-245, 1, 0);
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

        // Random obstacles section
        const obstacleCount = 10; // Number of obstacles
        const startX = -150; // Starting position of obstacles
        const endX = 150; // Ending position of obstacles
        const obstacleSpacing = (endX - startX) / obstacleCount;

        for (let i = 0; i < obstacleCount; i++) {
            const xPosition = startX + i * obstacleSpacing; // Evenly space obstacles
            const zPosition = Math.random() * 6 - 3; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }

        // Place the power-up in the scene function
        const placePowerUp = (x, y, z) => {
            const powerUp = new PowerUp(this, x, y, z);
            this.add(powerUp);
            this.powerUps.push(powerUp); // Store for update checks
        };

        this.powerUps = []; // Initialize array to track power-ups
        placePowerUp(150, 1.5, 0); // Place power-up at camera switch position

        //same sequence but in new pov

        // Adjusted obstacles and orbs with starting x position 200
        placeObstacle(200, 0); // Place an obstacle
        placeObstacle(200, -1); // Place an obstacle
        placeObstacle(200, -2); // Place an obstacle
        placeObstacle(200, -3); // Place an obstacle
        placeObstacle(200, -4); // Place an obstacle
        placeObstacle(200, -5); // Place an obstacle
        placeObstacle(200, 1); // Place an obstacle
        placeObstacle(200, 2); // Place an obstacle
        placeObstacle(200, 3); // Place an obstacle
        placeObstacle(200, 4); // Place an obstacle
        placeObstacle(200, 5); // Place an obstacle

        placeObstacle(250, 0); // Place an obstacle
        placeObstacle(250, -1); // Place an obstacle
        placeObstacle(250, -2); // Place an obstacle
        placeObstacle(250, -3); // Place an obstacle
        placeObstacle(250, -4); // Place an obstacle
        placeObstacle(250, -5); // Place an obstacle
        placeObstacle(250, 1); // Place an obstacle
        placeObstacle(250, 2); // Place an obstacle
        placeObstacle(250, 3); // Place an obstacle
        placeObstacle(250, 4); // Place an obstacle
        placeObstacle(250, 5); // Place an obstacle

        // Big block of spikes
        placeOrb(320, 1, 0);
        placeObstacle(315, 5); // Place an obstacle
        placeObstacle(315, 4); // Place an obstacle
        placeObstacle(315, 3); // Place an obstacle
        placeObstacle(315, 2); // Place an obstacle
        placeObstacle(315, 1); // Place an obstacle
        placeObstacle(315, 0); // Place an obstacle
        placeObstacle(315, -1); // Place an obstacle
        placeObstacle(315, -2); // Place an obstacle
        placeObstacle(315, -3); // Place an obstacle
        placeObstacle(315, -4); // Place an obstacle
        placeObstacle(315, -5); // Place an obstacle

        placeObstacle(325, 5); // Place an obstacle
        placeObstacle(325, 4); // Place an obstacle
        placeObstacle(325, 3); // Place an obstacle
        placeObstacle(325, 2); // Place an obstacle
        placeObstacle(325, 1); // Place an obstacle
        placeObstacle(325, 0); // Place an obstacle
        placeObstacle(325, -1); // Place an obstacle
        placeObstacle(325, -2); // Place an obstacle
        placeObstacle(325, -3); // Place an obstacle
        placeObstacle(325, -4); // Place an obstacle
        placeObstacle(325, -5); // Place an obstacle

        placeObstacle(335, 5); // Place an obstacle
        placeObstacle(335, 4); // Place an obstacle
        placeObstacle(335, 3); // Place an obstacle
        placeObstacle(335, 2); // Place an obstacle
        placeObstacle(335, 1); // Place an obstacle
        placeObstacle(335, 0); // Place an obstacle
        placeObstacle(335, -1); // Place an obstacle
        placeObstacle(335, -2); // Place an obstacle
        placeObstacle(335, -3); // Place an obstacle
        placeObstacle(335, -4); // Place an obstacle
        placeObstacle(335, -5); // Place an obstacle

        placeObstacle(345, 5); // Place an obstacle
        placeObstacle(345, 4); // Place an obstacle
        placeObstacle(345, 3); // Place an obstacle
        placeObstacle(345, 2); // Place an obstacle
        placeObstacle(345, 1); // Place an obstacle
        placeObstacle(345, 0); // Place an obstacle
        placeObstacle(345, -1); // Place an obstacle
        placeObstacle(345, -2); // Place an obstacle
        placeObstacle(345, -3); // Place an obstacle
        placeObstacle(345, -4); // Place an obstacle
        placeObstacle(345, -5); // Place an obstacle

        placeObstacle(405, 0); // Place an obstacle
        placeObstacle(405, -1); // Place an obstacle
        placeObstacle(405, -2); // Place an obstacle
        placeObstacle(405, -3); // Place an obstacle
        placeObstacle(405, -4); // Place an obstacle
        placeObstacle(405, -5); // Place an obstacle
        placeObstacle(405, 1); // Place an obstacle
        placeObstacle(405, 2); // Place an obstacle
        placeObstacle(405, 3); // Place an obstacle
        placeObstacle(405, 4); // Place an obstacle
        placeObstacle(405, 5); // Place an obstacle

        placeObstacle(455, 0); // Place an obstacle
        placeObstacle(455, -1); // Place an obstacle
        placeObstacle(455, -2); // Place an obstacle
        placeObstacle(455, -3); // Place an obstacle
        placeObstacle(455, -4); // Place an obstacle
        placeObstacle(455, -5); // Place an obstacle
        placeObstacle(455, 1); // Place an obstacle
        placeObstacle(455, 2); // Place an obstacle
        placeObstacle(455, 3); // Place an obstacle
        placeObstacle(455, 4); // Place an obstacle
        placeObstacle(455, 5); // Place an obstacle

        // Big block of spikes
        placeOrb(510, 1, 0);
        placeObstacle(505, 5); // Place an obstacle
        placeObstacle(505, 4); // Place an obstacle
        placeObstacle(505, 3); // Place an obstacle
        placeObstacle(505, 2); // Place an obstacle
        placeObstacle(505, 1); // Place an obstacle
        placeObstacle(505, 0); // Place an obstacle
        placeObstacle(505, -1); // Place an obstacle
        placeObstacle(505, -2); // Place an obstacle
        placeObstacle(505, -3); // Place an obstacle
        placeObstacle(505, -4); // Place an obstacle
        placeObstacle(505, -5); // Place an obstacle

        placeObstacle(515, 5); // Place an obstacle
        placeObstacle(515, 4); // Place an obstacle
        placeObstacle(515, 3); // Place an obstacle
        placeObstacle(515, 2); // Place an obstacle
        placeObstacle(515, 1); // Place an obstacle
        placeObstacle(515, 0); // Place an obstacle
        placeObstacle(515, -1); // Place an obstacle
        placeObstacle(515, -2); // Place an obstacle
        placeObstacle(515, -3); // Place an obstacle
        placeObstacle(515, -4); // Place an obstacle
        placeObstacle(515, -5); // Place an obstacle

        placeObstacle(525, 5); // Place an obstacle
        placeObstacle(525, 4); // Place an obstacle
        placeObstacle(525, 3); // Place an obstacle
        placeObstacle(525, 2); // Place an obstacle
        placeObstacle(525, 1); // Place an obstacle
        placeObstacle(525, 0); // Place an obstacle
        placeObstacle(525, -1); // Place an obstacle
        placeObstacle(525, -2); // Place an obstacle
        placeObstacle(525, -3); // Place an obstacle
        placeObstacle(525, -4); // Place an obstacle
        placeObstacle(525, -5); // Place an obstacle

        placeObstacle(535, 5); // Place an obstacle
        placeObstacle(535, 4); // Place an obstacle
        placeObstacle(535, 3); // Place an obstacle
        placeObstacle(535, 2); // Place an obstacle
        placeObstacle(535, 1); // Place an obstacle
        placeObstacle(535, 0); // Place an obstacle
        placeObstacle(535, -1); // Place an obstacle
        placeObstacle(535, -2); // Place an obstacle
        placeObstacle(535, -3); // Place an obstacle
        placeObstacle(535, -4); // Place an obstacle
        placeObstacle(535, -5); // Place an obstacle

        // Random obstacles section 2
        const obstacleCount2 = 10;
        const startX2 = 600; // Starting position of obstacles
        const endX2 = 800; // Ending position of obstacles
        const obstacleSpacing2 = (endX2 - startX2) / obstacleCount;

        for (let i = 0; i < obstacleCount2; i++) {
            const xPosition = startX2 + i * obstacleSpacing2; // Evenly space obstacles
            const zPosition = Math.random() * 6 - 3; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }

        // Last section before ship
        placeObstacle(810, 0); // Place an obstacle
        placeObstacle(810, -1); // Place an obstacle
        placeObstacle(810, -2); // Place an obstacle
        placeObstacle(810, -3); // Place an obstacle
        placeObstacle(810, -4); // Place an obstacle
        placeObstacle(810, -5); // Place an obstacle
        placeObstacle(810, 1); // Place an obstacle
        placeObstacle(810, 2); // Place an obstacle
        placeObstacle(810, 3); // Place an obstacle
        placeObstacle(810, 4); // Place an obstacle
        placeObstacle(810, 5); // Place an obstacle

        placeObstacle(860, 0); // Place an obstacle
        placeObstacle(860, -1); // Place an obstacle
        placeObstacle(860, -2); // Place an obstacle
        placeObstacle(860, -3); // Place an obstacle
        placeObstacle(860, -4); // Place an obstacle
        placeObstacle(860, -5); // Place an obstacle
        placeObstacle(860, 1); // Place an obstacle
        placeObstacle(860, 2); // Place an obstacle
        placeObstacle(860, 3); // Place an obstacle
        placeObstacle(860, 4); // Place an obstacle
        placeObstacle(860, 5); // Place an obstacle

        // Big block of spikes
        placeOrb(905, 1, 0);
        placeObstacle(900, 5); // Place an obstacle
        placeObstacle(900, 4); // Place an obstacle
        placeObstacle(900, 3); // Place an obstacle
        placeObstacle(900, 2); // Place an obstacle
        placeObstacle(900, 1); // Place an obstacle
        placeObstacle(900, 0); // Place an obstacle
        placeObstacle(900, -1); // Place an obstacle
        placeObstacle(900, -2); // Place an obstacle
        placeObstacle(900, -3); // Place an obstacle
        placeObstacle(900, -4); // Place an obstacle
        placeObstacle(900, -5); // Place an obstacle

        placeObstacle(910, 5); // Place an obstacle
        placeObstacle(910, 4); // Place an obstacle
        placeObstacle(910, 3); // Place an obstacle
        placeObstacle(910, 2); // Place an obstacle
        placeObstacle(910, 1); // Place an obstacle
        placeObstacle(910, 0); // Place an obstacle
        placeObstacle(910, -1); // Place an obstacle
        placeObstacle(910, -2); // Place an obstacle
        placeObstacle(910, -3); // Place an obstacle
        placeObstacle(910, -4); // Place an obstacle
        placeObstacle(910, -5); // Place an obstacle

        placeObstacle(920, 5); // Place an obstacle
        placeObstacle(920, 4); // Place an obstacle
        placeObstacle(920, 3); // Place an obstacle
        placeObstacle(920, 2); // Place an obstacle
        placeObstacle(920, 1); // Place an obstacle
        placeObstacle(920, 0); // Place an obstacle
        placeObstacle(920, -1); // Place an obstacle
        placeObstacle(920, -2); // Place an obstacle
        placeObstacle(920, -3); // Place an obstacle
        placeObstacle(920, -4); // Place an obstacle
        placeObstacle(920, -5); // Place an obstacle

        placeObstacle(930, 5); // Place an obstacle
        placeObstacle(930, 4); // Place an obstacle
        placeObstacle(930, 3); // Place an obstacle
        placeObstacle(930, 2); // Place an obstacle
        placeObstacle(930, 1); // Place an obstacle
        placeObstacle(930, 0); // Place an obstacle
        placeObstacle(930, -1); // Place an obstacle
        placeObstacle(930, -2); // Place an obstacle
        placeObstacle(930, -3); // Place an obstacle
        placeObstacle(930, -4); // Place an obstacle
        placeObstacle(930, -5); // Place an obstacle

        // Add Obstacles
        const FloatingObstacles = [];
        this.FloatingObstacles = FloatingObstacles; // Store a reference to obstacles for external access
  

        const placeFloatingObstacle = (x, y, z) => {
            const obstacle = new FloatingObstacle(this, x, y, z);
            this.add(obstacle);
            FloatingObstacles.push(obstacle);
        };

        placePowerUp(955, 1.5, 0); // Place power-up at camera switch position

        // Add floating obstacles in ship mode section
        
        placeFloatingObstacle(1000, 5, 0);

        placeFloatingObstacle(1050, 3, 0);

        placeFloatingObstacle(1100, 1, 0);

        placeFloatingObstacle(1150, 7, 0);

        placeFloatingObstacle(1200, 6, 0);
        placeFloatingObstacle(1200, 8, 0);


        placeFloatingObstacle(1250, 3, 0);
        placeFloatingObstacle(1250, 4, 0);

        placeFloatingObstacle(1300, 8, 0);
        placeFloatingObstacle(1300, 9, 0);
        placeFloatingObstacle(1300, 7, 0);


        placePowerUp(1340, 3, 0); // Place power-up at camera switch position

  
        
        placeFloatingObstacle(1450, 6, 0);
        placeFloatingObstacle(1475, 3, 0);

        placeFloatingObstacle(1500, 3, 0);
        placeFloatingObstacle(1525, 1, 0);

        placeFloatingObstacle(1550, 1, 0);
        placeFloatingObstacle(1555, 7, 0);

        placeFloatingObstacle(1600, 7, 0);
        placeFloatingObstacle(1625, 6, 0);

        placeFloatingObstacle(1650, 6, 0);
        placeFloatingObstacle(1650, 8, 0);
        placeFloatingObstacle(1675, 3, 0);
        placeFloatingObstacle(1675, 4, 0);


        placeFloatingObstacle(1700, 3, 0);
        placeFloatingObstacle(1700, 4, 0);
        placeFloatingObstacle(1725, 1, 0);
        placeFloatingObstacle(1725, 2, 0);

   
     


        placeFloatingObstacle(1750, 10, 0);
        placeFloatingObstacle(1750, 1, 0);
        placeFloatingObstacle(1750, 5, -3);
        placeFloatingObstacle(1750, 5, 3);
        placeFloatingObstacle(1750, 6, -3);
        placeFloatingObstacle(1750, 6, 3);
        // Level ends at x position 1775
        
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

        // Set where they point (target)
        const leftTarget = new THREE.Object3D();
        leftTarget.position.set(
            this.player.position.x,
            this.player.position.y,
            this.player.position.z
        );
        this.add(leftTarget);
        this.leftLight.target = leftTarget;

        const rightTarget = new THREE.Object3D();
        rightTarget.position.set(
            this.player.position.x,
            this.player.position.y,
            this.player.position.z
        );
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
        //const geometry = new THREE.SphereGeometry(1200, 64, 64);
        //geometry.scale(-1, 1, 1); // Invert the sphere so we see the inside

        // this.bgMaterial = new THREE.ShaderMaterial({
        //     vertexShader: vertexShader,
        //     fragmentShader: fragmentShader,
        //     uniforms: {
        //         u_time: { value: 0.0 },
        //         u_beatIntensity: { value: 0.0 },
        //         u_baseColor: { value: new THREE.Color(0.0, 0.0, 0.0) }, // start dark
        //         u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        //     },
        //     side: THREE.BackSide // render inside of sphere
        // });

        // this.backgroundSphere = new THREE.Mesh(geometry, this.bgMaterial);
        // this.add(this.backgroundSphere);

        // Variables to help detect beats
        this.previousLowFreq = 0;
        this.beatThreshold = 0.75; // Adjust as needed
        this.beatCooldown = 0.5; // Seconds between beats to prevent rapid triggers
        this.timeSinceLastBeat = 999; // Large initial number

        // Visualizer
        this.hue = 0;
        this.saturation = 0.5;
        this.lightness = 0;

        // Create a large plane behind the player for the EQ visualization
        this.visualizer = this.createEQVisualizer();
        this.add(this.visualizer.mesh);

        this.laserBeams = this.createLaserBeams();
    }

    // Add object to update list function
    addToUpdateList(object) {
        this.state.updateList.push(object);
    }
    // Has game started function
    setGameStarted(value) {
        this.state.gameStarted = value;
    }

    // Start game function
    startGame() {
        this.state.gameStarted = true;
    }
    // Handle death collision
    handleCollision(audioManager) {
        if (!this.state.paused) {
            this.state.paused = true;
            this.player.resetSpeed();
            audioManager.sound.stop();
            
            // Play the death sound effect
            audioManager.playSoundEffect('deathsound.mp3', 1.0);

            // Pause for 1 second before restarting
            setTimeout(() => {
                this.player.resetPosition();
                audioManager.sound.play();
                this.state.paused = false;
            }, 1000);
        }
    }
    
    // Update scene function
    update(timeStamp, audioManager, inputManager) {
        const { updateList, gameStarted, paused } = this.state;

        if (!paused) {
            // Determine if ship mode is active
            const isShipMode = this.player.position.x >= 950;

            // Update all objects in the update list
            for (const obj of updateList) {
                if (obj instanceof Orb) {
                    // Pass the player to the orb's update method
                    obj.update(this.player);
                } else if (obj instanceof Player) {
                    // Pass platforms to the player's update method for collision detection
                    obj.update(this.platforms, isShipMode, inputManager);
                } else {
                    obj.update(timeStamp);
                }
            }

            // Only move player if the game has started
            if (gameStarted) {
                this.player.position.x += 0.5; // Move player forward
            }

            // Example: Additional logic for other game interactions
            // Handle collision checks or specific triggers
            this.powerUps.forEach((powerUp) => {
                powerUp.update(this.player, () => {
                    // For example, trigger a power-up effect
                    console.log('Power-up effect activated!');
                });
            });

            // Collision check for obstacles
            this.obstacles.forEach((obstacle) => {
                if (
                    Math.abs(this.player.position.x - obstacle.position.x) <
                        0.5 &&
                    Math.abs(this.player.position.z - obstacle.position.z) <
                        0.5 &&
                    this.player.position.y - 2 < 0.5
                ) {
                    console.log('Collision detected! Pausing game...');
                    this.handleCollision(audioManager);
                }
            });

            // Collision check for flying obstacles
            this.FloatingObstacles.forEach((obstacle) => {
                const playerBounds = {
                    x: this.player.position.x,
                    y: this.player.position.y,
                    z: this.player.position.z,
                    sizeX: isShipMode ? 1.5 : 0.5, // Adjust width for ship mode
                    sizeY: isShipMode ? 0.3 : 0.5, // Adjust height for ship mode
                    sizeZ: 0.5, // Keep depth the same
                };

                const obstacleBounds = {
                    x: obstacle.position.x,
                    y: obstacle.position.y,
                    z: obstacle.position.z,
                    sizeX: 0.5,
                    sizeY: 0.5,
                    sizeZ: 0.5,
                };

                const collisionDetected =
                    Math.abs(playerBounds.x - obstacleBounds.x) < playerBounds.sizeX + obstacleBounds.sizeX &&
                    Math.abs(playerBounds.z - obstacleBounds.z) < playerBounds.sizeZ + obstacleBounds.sizeZ &&
                    Math.abs(playerBounds.y - obstacleBounds.y) < playerBounds.sizeY + obstacleBounds.sizeY;

                if (collisionDetected) {
                    console.log('Collision detected! Pausing game...');
                    this.handleCollision(audioManager);
                }
            });

            // Collision check with portal
            if (
                Math.abs(this.player.position.x - this.portal.position.x) < 4.5 && // Half the width of the portal (9 / 2)
                Math.abs(this.player.position.z - this.portal.position.z) < 1.0 && // Assuming portal thickness remains narrow
                this.player.position.y > 0 && // Bottom of the portal is at y=0
                this.player.position.y < 50 // Half the height of the portal (100 / 2)
            ) {
                console.log('Player reached the portal!');
                this.handlePortalCollision(audioManager);


            }

            // ----- Add Visual Effects Based on Music -----
            this.timeSinceLastBeat += 1 / 60; // Assuming ~60fps, increment by frame time as needed
            this.applyAudioEffects(audioManager);

            const frequencyData = audioManager.getFrequencyData();
            const avgFreq = audioManager.getAverageFrequency();
            const uniforms = this.visualizer.uniforms;

            // Pass frequency data to the shader
            for (let i = 0; i < 128; i++) {
                uniforms.u_frequencyData.value[i] = frequencyData[i];
            }

            uniforms.u_time.value = timeStamp * 0.001;
            uniforms.u_averageFreq.value = avgFreq;

            // If a beat is detected in applyAudioEffects, set a short-lived flash:
            // For example, you can gradually fade out u_beatFlash each frame
            if (this.timeSinceLastBeat < 0.1) {
                uniforms.u_beatFlash.value =
                    1.0 - this.timeSinceLastBeat * 10.0;
            } else {
                uniforms.u_beatFlash.value = 0.0;
            }

            // Update lasers: rotate them or change color based on high frequencies
            const highFreqSlice = frequencyData.slice(80, 128);
            const highAvg =
                highFreqSlice.reduce((a, b) => a + b, 0) / highFreqSlice.length;
            const highNormalized = highAvg / 255;

            this.laserBeams.forEach((beam, i) => {
                beam.position.x = this.player.position.x + 9;
                // Rotate beams slightly based on high frequencies
                if (beam.position.z < 0) {
                    beam.rotation.y -= 0.01 + (highAvg/127) * 0.05 + 0.01 * Math.random();
                } else {
                    beam.rotation.y += 0.01 + (highAvg/127) * 0.05 + 0.01 * Math.random();
                }
                
                beam.material.color.setHSL(
                    0.3 + highNormalized * 0.7,
                    1.0,
                    0.5 + highNormalized * 0.5
                );
            });
        }
    }

    // Apply background audio visual effects function
    applyAudioEffects(audioManager) {
        // Get frequency data
        const frequencyData = audioManager.getFrequencyData();
        const averageFrequency = audioManager.getAverageFrequency();

        // Example: Pulse the PointLight intensity based on low frequencies
        // Define frequency ranges (these are approximate and can be adjusted)
        const lowFreq = frequencyData.slice(0, 20); // Low frequencies
        const highFreq = frequencyData.slice(80, 128); // High frequencies

        // Calculate average low and high frequencies
        const avgLowFreq =
            lowFreq.reduce((sum, val) => sum + val, 0) / lowFreq.length;
        const avgHighFreq =
            highFreq.reduce((sum, val) => sum + val, 0) / highFreq.length;

        // Normalize values (0 to 1)
        const normalizedLow = avgLowFreq / 255;
        const normalizedHigh = avgHighFreq / 127;

        // Adjust PointLight intensity based on low frequencies
        //this.pointLight.intensity = 1 + normalizedLow * 2; // Base intensity + pulse

        // Adjust ambient light color based on high frequencies
        // For example, shift towards blue on high frequencies
        //const blueShift = normalizedHigh;
        //this.ambientLight.color.setRGB(1 - blueShift, 1 - blueShift, 1); // Shift towards blue
        this.ambientLight.color.setRGB(1, 1, 1);

        // Optionally, adjust the background color based on frequencies
        // For example, shift background color hue based on average frequency
        const hue = (averageFrequency / 255) * 360; // 0 to 360 degrees
        const saturation = 0.1 + avgHighFreq / 127; // 50%
        const lightness = 0.1 + normalizedHigh * (avgHighFreq/127); // Between 10% and 50%
        this.background.setHSL(hue / 360, saturation, lightness);

        // Beat detection logic:
        // If normalizedLow is high and we've waited at least beatCooldown seconds since last beat
        //console.log('Average: %d Low: %d -> %d High: %d -> %d', averageFrequency, avgLowFreq, normalizedLow, avgHighFreq, normalizedHigh)
        if (
            normalizedLow > this.beatThreshold &&
            this.timeSinceLastBeat > this.beatCooldown
        ) {
            this.triggerBeat();
            this.timeSinceLastBeat = 0;
        }

        this.previousLowFreq = normalizedLow;
    }

    // Ending screen function when player goes into portal
    handlePortalCollision(audioManager) {
        this.state.paused = true;
    
        // Create the overlay
        const nextLevelOverlay = document.createElement('div');
        nextLevelOverlay.style.position = 'absolute';
        nextLevelOverlay.style.top = '0';
        nextLevelOverlay.style.left = '0';
        nextLevelOverlay.style.width = '100%';
        nextLevelOverlay.style.height = '100%';
        nextLevelOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darker background for better contrast
        nextLevelOverlay.style.display = 'flex';
        nextLevelOverlay.style.flexDirection = 'column';
        nextLevelOverlay.style.alignItems = 'center';
        nextLevelOverlay.style.justifyContent = 'center';
        nextLevelOverlay.style.zIndex = '999';
    
        // Add the title
        const titleText = document.createElement('div');
        titleText.innerText = 'Level Complete!';
        titleText.style.color = 'black';
        titleText.style.fontSize = '72px';
        titleText.style.fontWeight = 'bold';
        titleText.style.fontFamily = '"Press Start 2P", sans-serif'; // Same blocky font
        titleText.style.textAlign = 'center';
        titleText.style.textShadow = `
            0 0 5px black,
            0 0 10px black,
            0 0 20px black,
            0 0 30px black,
            0 0 40px black,
            0 0 50px black,
            0 0 75px black
        `; // White neon glow effect
        titleText.style.webkitTextStroke = '2px white'; // White outline for the text
        nextLevelOverlay.appendChild(titleText);
    
        // Add the button
        const nextLevelBtn = document.createElement('button');
        nextLevelBtn.innerText = 'Play Again';
        nextLevelBtn.style.marginTop = '30px';
        nextLevelBtn.style.padding = '15px 30px'; // Increased padding for a larger button
        nextLevelBtn.style.fontSize = '24px';
        nextLevelBtn.style.fontFamily = '"Press Start 2P", sans-serif'; // Same blocky font
        nextLevelBtn.style.color = 'black';
        nextLevelBtn.style.backgroundColor = 'white'; // White button background
        nextLevelBtn.style.border = '2px solid black'; // Black border for contrast
        nextLevelBtn.style.borderRadius = '5px'; // Slightly rounded corners
        nextLevelBtn.style.textAlign = 'center';
        nextLevelBtn.style.textShadow = `
            0 0 5px white,
            0 0 10px white,
            0 0 20px white,
            0 0 30px white,
            0 0 40px white,
            0 0 50px white,
            0 0 75px white
        `; // White neon glow effect for the text
        nextLevelBtn.style.cursor = 'pointer';
        nextLevelBtn.style.boxShadow = `
            0 0 10px black,
            0 0 20px black,
            0 0 30px black
        `; // Glow effect around the button itself
        nextLevelOverlay.appendChild(nextLevelBtn);
    
        // Append the overlay to the document
        document.body.appendChild(nextLevelOverlay);
    
        // Add button click event
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
    
    // Possible next level function
    resetForNextLevel() {
        // Stop the music
        audioManager.sound.stop();
        this.state.paused = false;
        // Restart the music
        audioManager.sound.play();

        this.player.resetPosition();
        this.player.increaseSpeed(0.1);
    }
    // Color change function for beat detection
    triggerBeat() {
        console.log('Beat Detected!');
        this.saturation = 1;
        this.lightness = 1;
    }

    // Create EQ Visualizer function
    createEQVisualizer() {
        const width = 2000;
        const height = 3000;
        const segments = 128;
        const geometry = new THREE.PlaneGeometry(
            width,
            height,
            segments,
            segments
        );
        geometry.rotateX(-Math.PI / 2); // If you want it as a ground plane behind player

        const uniforms = {
            u_time: { value: 0 },
            u_frequencyData: { value: new Float32Array(128) }, // Assuming 128 bands from analyser
            u_averageFreq: { value: 0.0 },
            u_beatFlash: { value: 0.0 },
            u_colorShift: { value: 0.0 },
        };

        const vertexShader = `
            uniform float u_time;
            uniform float u_averageFreq;
            uniform float u_beatFlash;
            uniform float u_colorShift;
            uniform float u_frequencyData[128];
    
            varying float v_height;
            varying vec2 v_uv;
    
            void main() {
                v_uv = uv;
                // Map UV coordinates to frequency array index
                float freqIndex = floor(v_uv.x * 127.0);
                freqIndex = clamp(freqIndex, 0.0, 127.0);
                int iIndex = int(freqIndex);
    
                // Get frequency value and create some displacement
                float freqValue = u_frequencyData[iIndex] / 255.0;
                
                // Basic wave displacement: vertical movement influenced by frequency data
                float displacement = freqValue * 10.0 * (0.5 - abs(v_uv.y - 0.5)) 
                                     + sin((v_uv.x * 10.0 + u_time) * 2.0) * freqValue;
    
                vec3 newPosition = position + normal * displacement;
                v_height = displacement;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float u_time;
            uniform float u_averageFreq;
            uniform float u_beatFlash;
            varying float v_height;
            varying vec2 v_uv;
    
            void main() {
                // Basic color shift using HSL-like logic
                float hue = fract((u_time * 0.05) + v_uv.x + v_uv.y * 0.5 + u_averageFreq * 0.01);
                float saturation = 0.8 + u_averageFreq * 0.001;
                float lightness = 0.5 + (v_height * 0.05);
                
                // On beat flash
                lightness += u_beatFlash * 0.5;
    
                // Convert HSL to RGB (approximation or use a function)
                // For simplicity, let's do a quick and dirty hue-based coloring:
                vec3 color = vec3(hue, saturation, lightness);
                // A proper HSL to RGB conversion would be better, but omitted for brevity.
    
                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            this.player.position.x + 2000,
            this.player.position.y + 30,
            this.player.position.z
        );
        // Position it far behind the player and maybe rotate or orient it as needed

        return { mesh, uniforms };
    }

    // Create lasers function
    createLaserBeams() {
        const beams = [];
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 500, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const beam = new THREE.Mesh(geometry, material);
            beam.position.set(
                this.player.position.x + 9,
                this.player.position.y + 6,
                this.player.position.z - 15
            );
            beam.rotation.z = i * (Math.PI / 5);
            beams.push(beam);
            this.add(beam);
        }
        for (let i = 0; i < 5; i++) {
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 500, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const beam = new THREE.Mesh(geometry, material);
            beam.position.set(
                this.player.position.x + 9,
                this.player.position.y + 6,
                this.player.position.z + 15
            );
            beam.rotation.z = i * (Math.PI / 5);
            beams.push(beam);
            this.add(beam);
        }
        return beams;
    }
}

export default SeedScene;
