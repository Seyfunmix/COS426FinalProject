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

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });


// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up AudioManager
const audioManager = new AudioManager(camera);
//audioManager.playBackgroundMusic('//testmusic.mp3', 0.5); // Specify the path to your music file



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

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();

    // Set the camera to the cube's POV
    const player = scene.player;
    camera.position.set(player.position.x, player.position.y + 0.1, player.position.z); // Slightly above the cube
    camera.lookAt(player.position.x + 1, player.position.y, player.position.z);

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


