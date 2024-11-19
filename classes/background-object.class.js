/**
 * Represents background objects in the game, such as scenery or static elements.
 * This class extends the MovableObject to leverage shared functionality.
 * 
 * @extends MovableObject
 */
class BackgroundObjects extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 1920;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 1080;

    /**
     * Creates a new BackgroundObjects instance.
     * 
     * @param {string} imagePath - The file path to the image used for the background object.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} y - The y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}
