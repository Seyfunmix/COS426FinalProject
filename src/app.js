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
import { AudioManager } from './AudioManager'; // Import your AudioManager
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { Vector2 } from 'three';

import * as THREE from 'three';



// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });


// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up AudioManager
const audioManager = new AudioManager(camera);
//audioManager.playBackgroundMusic('//testmusic.mp3', 0.5);




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

// Show a title screen overlay until the player clicks
const titleOverlay = document.createElement('div');
titleOverlay.style.position = 'absolute';
titleOverlay.style.top = '0';
titleOverlay.style.left = '0';
titleOverlay.style.width = '100%';
titleOverlay.style.height = '100%';
titleOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
titleOverlay.style.display = 'flex';
titleOverlay.style.alignItems = 'center';
titleOverlay.style.justifyContent = 'center';
titleOverlay.style.color = 'white';
titleOverlay.style.fontSize = '48px';
titleOverlay.style.zIndex = '999';
titleOverlay.innerText = 'Click to Start';
document.body.appendChild(titleOverlay);

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
    controls.update();

    const player = scene.player; // Assuming you have a player object with a position

    // Baseline camera position: slightly behind and above the player
    // For example, place the camera a few units behind the player on the Z-axis
    // and a bit above them on the Y-axis.
    const baseOffsetX = -5;     // Behind player along X
    const baseOffsetY = 2;      // Above player
    const baseOffsetZ = 0;      // Centered on Z-axis

    // Maximum parallax offsets, i.e., how much the camera can move based on mouse
    const maxHorizontalOffset = 2.0; // Max horizontal shift due to mouse
    const maxVerticalOffset = 1.0;   // Max vertical shift due to mouse

    // Compute final offsets from mouse position
    const offsetX = baseOffsetX;
    const offsetY = baseOffsetY - mouseY * maxVerticalOffset;
    const offsetZ = baseOffsetZ + mouseX * maxHorizontalOffset;

    // Set the camera position relative to the player
    // For example, if your player is always moving along the x-axis, and facing forward,
    // you might want the camera behind it. Adjust logic as suits your coordinate system.
    camera.position.set(
        player.position.x + offsetX,
        player.position.y + offsetY,
        player.position.z + offsetZ
    );

    // Now adjust the lookAt point:
    // If your player moves along the x-axis, we can look slightly ahead of the player.
    // We can also factor in a small angle to see the horizon.
    // For instance, look slightly above the player's current position.
    const lookAtAhead = 5; // how far ahead of the player to look
    const lookAtHeight = player.position.y + 0.5; // a slight lift so we see horizon

    camera.lookAt(
        player.position.x + lookAtAhead,
        lookAtHeight,
        player.position.z
    );

    // Render and update scene
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp, audioManager);

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);



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
    audioManager.playBackgroundMusic('testmusic.mp3', 0.5);
}, { once: true });


