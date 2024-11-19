/**
 * Manages keyboard and touch inputs for controlling game actions.
 * Tracks the state of various keys and handles mobile button press events.
 */
class Keyboard {
    /**
     * Indicates whether the left arrow key is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates whether the right arrow key is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates whether the up arrow key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates whether the down arrow key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates whether the spacebar key is pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates whether the "D" key is pressed.
     * @type {boolean}
     */
    D = false;

    /**
     * Indicates whether the Escape key is pressed.
     * @type {boolean}
     */
    ESC = false;

    /**
     * Initializes a new instance of the `Keyboard` class and sets up event listeners for mobile button presses.
     */
    constructor() {
        this.mobileBtnPressEvent();
    }

    /**
     * Sets up touch event listeners for mobile buttons to simulate keyboard actions.
     * Handles the touchstart and touchend events for specific mobile buttons.
     */
    mobileBtnPressEvent() {
        document.addEventListener('DOMContentLoaded', () => {
            let btnD = document.getElementById('btnD');
            let btnSpace = document.getElementById('btnSpace');

            // Touch event for the "D" button
            btnD.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });

            btnD.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });

            // Touch event for the "SPACE" button
            btnSpace.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

            btnSpace.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
        });
    }
}
