/**
 * Represents a coin bar in the game, typically used to display the player's collected coins.
 * This class extends the DrawableObject to inherit rendering capabilities.
 * 
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {

    /**
     * Creates a new CoinBar instance with a default image, position, and size.
     */
    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        /**
         * The x-coordinate of the coin bar on the screen.
         * @type {number}
         */
        this.x = 1680;

        /**
         * The y-coordinate of the coin bar on the screen.
         * @type {number}
         */
        this.y = 40;

        /**
         * The width of the coin bar.
         * @type {number}
         */
        this.width = 70;

        /**
         * The height of the coin bar.
         * @type {number}
         */
        this.height = 70;
    }
}
