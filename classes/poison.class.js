/**
 * Represents a poison object in the game that is animated and positioned relative to a PufferFish.
 * The poison object plays an animation and moves across the screen.
 */
class Poison extends MovableObject {

    /**
     * Array of image paths for the animated poison.
     * @type {string[]}
     */
    IMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    /**
     * The offset used for collision detection and positioning of the poison object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 56,
        bottom: 8,
        left: 24,
        right: 24
    }

    /**
     * Creates a new instance of the Poison object.
     * @param {number} pufferFish_x - The x position of the PufferFish.
     * @param {number} pufferFish_y - The y position of the PufferFish.
     */
    constructor(pufferFish_x, pufferFish_y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.x = this.returnX(pufferFish_x);
        this.y = this.returnY(pufferFish_y);
        this.width = 100;
        this.height = 120;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Starts the animation of the poison object by cycling through its images.
     * The animation plays at intervals of 150 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }

    /**
     * Returns the x position of the poison object based on the PufferFish's x position.
     * If the provided x position is valid (greater than 0), it returns it; otherwise, it generates a random position.
     * @param {number} pufferFish_x - The x position of the PufferFish.
     * @returns {number} The calculated x position for the poison object.
     */
    returnX(pufferFish_x) {
        if (pufferFish_x > 0) {
            return pufferFish_x;
        } else {
            return 800 + Math.random() * 7680;
        }
    }

    /**
     * Returns the y position of the poison object based on the PufferFish's y position.
     * If the provided y position is valid (greater than 0), it applies gravity and returns it; otherwise, it generates a random position.
     * @param {number} pufferFish_y - The y position of the PufferFish.
     * @returns {number} The calculated y position for the poison object.
     */
    returnY(pufferFish_y) {
        if (pufferFish_y > 0) {
            this.applyGravity();
            return pufferFish_y;
        } else {
            return 850 + Math.random() * 80;
        }
    }
}
