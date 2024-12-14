class InputManager {
    constructor() {
        this.isMouseDown = false;

        // Add event listeners for mouse input
        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseDown(event) {
        this.isMouseDown = true;
    }

    handleMouseUp(event) {
        this.isMouseDown = false;
    }

    dispose() {
        // Remove event listeners when no longer needed
        window.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        window.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    }
}

export default InputManager;
