/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import { AudioManager } from './AudioManager';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { Vector2 } from 'three';
import * as THREE from 'three';
import InputManager from './InputManager'; 
import { Clock } from 'three';

const clock = new Clock();



// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up AudioManager
const audioManager = new AudioManager(camera);

// Ensure inputManager is properly initialized
const inputManager = new InputManager(); 

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Game state
let gameStarted = false;

// Load a blocky font (Google Fonts)
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Show a title screen overlay until the player clicks
const titleOverlay = document.createElement('div');
titleOverlay.style.position = 'absolute';
titleOverlay.style.top = '0';
titleOverlay.style.left = '0';
titleOverlay.style.width = '100%';
titleOverlay.style.height = '100%';
titleOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darker background for better contrast
titleOverlay.style.display = 'flex';
titleOverlay.style.flexDirection = 'column'; // Stack the texts vertically
titleOverlay.style.alignItems = 'center';
titleOverlay.style.justifyContent = 'center';
titleOverlay.style.zIndex = '999';

// Create the main title
const titleText = document.createElement('div');
titleText.innerText = 'Dash 3D';
titleText.style.color = 'black';
titleText.style.fontSize = '72px'; // Larger font size for the game title
titleText.style.textAlign = 'center';
titleText.style.fontWeight = 'bold';
titleText.style.fontFamily = '"Press Start 2P", sans-serif'; // Blocky cartoony font
titleText.style.textShadow = `
    0 0 5px white,
    0 0 10px white,
    0 0 20pxrgb(255, 255, 255),
    0 0 30pxrgb(255, 255, 255),
    0 0 40pxrgb(255, 255, 255),
    0 0 50pxrgb(255, 255, 255),
    0 0 75pxrgb(255, 255, 255)
`; // Neon glow effect
titleText.style.webkitTextStroke = '2px white'; // White outline for the text

// Create the subtitle
const subtitleText = document.createElement('div');
subtitleText.innerText = 'Click to Start / Jump';
subtitleText.style.color = 'black';
subtitleText.style.fontSize = '24px'; // Smaller font size for the subtitle
subtitleText.style.textAlign = 'center';
subtitleText.style.marginTop = '20px'; // Add spacing below the main title
subtitleText.style.fontFamily = '"Press Start 2P", sans-serif'; // Blocky cartoony font
subtitleText.style.webkitTextStroke = '1px white'; // White outline for the text
subtitleText.style.textShadow = `
    0 0 5px white,
    0 0 10px white,
    0 0 20pxrgb(255, 255, 255),
    0 0 30pxrgb(255, 255, 255),
    0 0 40pxrgb(255, 255, 255),
    0 0 50pxrgb(255, 255, 255),
    0 0 75pxrgb(255, 255, 255)
`; // Neon glow effect

// Append texts to the overlay
titleOverlay.appendChild(titleText);
titleOverlay.appendChild(subtitleText);

// Append the overlay to the document body
document.body.appendChild(titleOverlay);


// On click start game
function onClickToStart() {
    gameStarted = true;
    scene.setGameStarted(true); // Update SeedScene's state
    document.removeEventListener('click', onClickToStart);
    document.body.removeChild(titleOverlay);
}
document.addEventListener('click', onClickToStart);


// Variables to store normalized mouse position
let mouseX = 0, mouseY = 0;

// Event listener to update mouseX, mouseY
window.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates so that the center of the screen = 0,0
    // mouseX, mouseY will be in [-0.5, 0.5]
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Render loop
const onAnimationFrameHandler = (timeStamp) => {

    // Get elapsed time (seconds) since last frame
    const deltaTime = clock.getDelta();  // returns the time in seconds since the previous call

    // Update everything based on deltaTime
    updateScene(timeStamp, deltaTime);

    controls.update();

    const player = scene.player;

    // Check player position for camera switch
    const switchXPosition = 150; // X position to switch to first-person POV
    const isFirstPerson = player.position.x >= switchXPosition;

    // Check if player is in ship mode (x >= 950)
    const isShipMode = player.position.x >= 950;

    if (isShipMode) {
        // Side view in ship
        if (player.position.x <= 1350) {
        const playerPosition = player.position;
        camera.position.set(playerPosition.x - 5, playerPosition.y + 2, playerPosition.z + 5); // Dynamic position for ship mode
        camera.lookAt(playerPosition); 
        } else {
        // First person in ship
        camera.position.set(player.position.x, player.position.y + 0.1, player.position.z); // Slightly above the cube
        camera.lookAt(player.position.x + 1, player.position.y, player.position.z); // Adjust for movement direction
        }
    } else if (isFirstPerson) {
        // First-person POV
        camera.position.set(player.position.x, player.position.y + 0.1, player.position.z); // Slightly above the cube
        camera.lookAt(player.position.x + 1, player.position.y, player.position.z); // Adjust for movement direction
    } else {
        // Default third-person POV
        const baseOffsetX = -5;     // Behind player along X
        const baseOffsetY = 2;      // Above player
        const baseOffsetZ = 0;      // Centered on Z-axis

        const maxHorizontalOffset = 2.0; // Max horizontal shift due to mouse
        const maxVerticalOffset = 1.0;   // Max vertical shift due to mouse

        const offsetX = baseOffsetX;
        const offsetY = baseOffsetY - mouseY * maxVerticalOffset;
        const offsetZ = baseOffsetZ + mouseX * maxHorizontalOffset;

        camera.position.set(
            player.position.x + offsetX,
            player.position.y + offsetY,
            player.position.z + offsetZ
        );

        const lookAtAhead = 5; // How far ahead of the player to look
        const lookAtHeight = player.position.y + 0.5;

        camera.lookAt(
            player.position.x + lookAtAhead,
            lookAtHeight,
            player.position.z
        );
    }

    // Render and update scene
    renderer.render(scene, camera);
    //scene.update(deltaTime, audioManager, inputManager);

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);



// Instead of 'scene.update(...)' directly in the loop, 
// pass deltaTime to a function that updates the scene logic.
function updateScene(timeStamp, deltaTime) {
    scene.update(timeStamp, deltaTime, audioManager, inputManager);
}



// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    

    // Ensure the canvas is resized properly
    renderer.setPixelRatio(window.devicePixelRatio);
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

// Mouse click controls
window.addEventListener('mousedown', () => {
    scene.player.jump();
});



window.addEventListener('click', () => {
    audioManager.playBackgroundMusic('./finalmusic.mp3', 0.5);
}, { once: true });


