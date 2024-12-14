import * as Dat from 'dat.gui';
import { Scene, Color, PointLight, AmbientLight, Points, BufferGeometry, BufferAttribute, PointsMaterial } from 'three';
import Player from '../objects/Player/Player';
import Ground from '../objects/Ground/Ground';
import Obstacle from '../objects/Obstacle/Obstacle';
import Portal from '../objects/Portal/Portal';
import Orb from '../objects/Orb/Orb';
import Platform from '../objects/Platform/Platform';
import PowerUp from '../objects/PowerUp/PowerUp';
import FloatingObstacle from '../objects/FloatingObstacle/FloatingObstacle';


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
        this.obstacles = obstacles; // Store a reference to obstacles for external access

  
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
        placeOrb(-449, 1, 0);
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
        placeOrb(-249, 1, 0);
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
       

        // random obstacles section. 10 obstacles for every 200 x positions
        const obstacleCount = 10; // Number of obstacles
        const startX = -150; // Starting position of obstacles
        const endX = 150; // Ending position of obstacles
        const obstacleSpacing = (endX - startX) / obstacleCount;

        for (let i = 0; i < obstacleCount; i++) {
            const xPosition = startX + i * obstacleSpacing; // Evenly space obstacles
            const zPosition = Math.random() * 4 - 2; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }
        

        // Place the power-up in the scene
        const placePowerUp = (x, y, z) => {
            const powerUp = new PowerUp(this, x, y, z);
            this.add(powerUp);
            this.powerUps.push(powerUp); // Store for update checks
        };

        this.powerUps = []; // Initialize array to track power-ups
        placePowerUp(150, 1, 0); // Place power-up at camera switch position

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
        placeOrb(316, 1, 0);
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
        placeOrb(504, 1, 0);
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


        // random obstacles section 2
        const obstacleCount2 = 7
        const startX2 = 600; // Starting position of obstacles
        const endX2 = 800; // Ending position of obstacles
        const obstacleSpacing2 = (endX2 - startX2) / obstacleCount;

        for (let i = 0; i < obstacleCount2; i++) {
            const xPosition = startX2 + i * obstacleSpacing2; // Evenly space obstacles
            const zPosition = Math.random() * 4 - 2; // Random z-offset for variety
            const obstacle = new Obstacle(this, xPosition, zPosition);
            obstacles.push(obstacle);
            this.add(obstacle);
        }
        
       // last section before ship
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
       placeOrb(901, 1, 0);
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

        const placeFloatingObstacle = (x, y, z) => {
            const obstacle = new FloatingObstacle(this, x, y, z);
            this.add(obstacle);
        };
    
        // Add floating obstacles in ship mode area
        placeFloatingObstacle(960, 3, 0);
        placeFloatingObstacle(970, 2, 0);
        placeFloatingObstacle(980, 4, 0);
        placeFloatingObstacle(990, 1, 0);
        placeFloatingObstacle(1000, 5, 0);
       



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
            this.powerUps.forEach(powerUp => {
                powerUp.update(this.player, () => {
                    // For example, trigger a power-up effect
                    console.log("Power-up effect activated!");
                });
            });


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
