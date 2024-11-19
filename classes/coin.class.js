/**
 * Represents a coin object in the game that can animate between different images.
 * This class extends MovableObject to inherit movement and animation capabilities.
 * 
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /**
     * An array of image paths used for the coin's animation.
     * @type {string[]}
     */
    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    /**
     * Defines the offset for the coin's collision detection boundaries.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
    };

    /**
     * Creates a new Coin instance at the specified position.
     * 
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.x = x;
        this.y = y;

        /**
         * The width of the coin.
         * @type {number}
         */
        this.width = 70;

        /**
         * The height of the coin.
         * @type {number}
         */
        this.height = 70;

        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animates the coin by cycling through its images at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}
