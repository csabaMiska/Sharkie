/**
 * Represents a poison bar that is drawn on the screen. It is a visual indicator of the poison status in the game.
 * The poison bar is an animated object that will be displayed in the game, with a set position, size, and image.
 */
class PoisonBar extends DrawableObject {

    /**
     * Creates a new instance of the PoisonBar object, loading an initial image and setting the position and dimensions.
     * The poison bar is positioned at a fixed location on the screen.
     */
    constructor() {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        
        /**
         * The x-coordinate of the poison bar's position.
         * @type {number}
         */
        this.x = 1400;

        /**
         * The y-coordinate of the poison bar's position.
         * @type {number}
         */
        this.y = 0;

        /**
         * The width of the poison bar.
         * @type {number}
         */
        this.width = 90;

        /**
         * The height of the poison bar.
         * @type {number}
         */
        this.height = 110;
    }
}
