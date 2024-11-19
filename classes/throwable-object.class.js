/**
 * Represents an object that can be thrown, typically a bubble, which moves in a given direction.
 * This class extends from the `MovableObject` class and adds functionality to throw an object 
 * in a specified direction.
 */
class ThrowableObject extends MovableObject {
    /**
     * Defines the offset for collision detection or positioning of the object.
     */
    offset = {
        top: 4,
        bottom: 4,
        left: 4,
        right: 4
    };

    /**
     * Direction in which the bubble will be thrown. 
     * If `false`, the bubble will move to the right. 
     * If `true`, the bubble will move to the left.
     */
    bubbleDirection;

    /**
     * Creates an instance of a ThrowableObject (bubble), positioning it at the given coordinates 
     * and determining its throw direction.
     * 
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} bubbleDirection - The direction in which the object will move. 
     *                                     `false` for right, `true` for left.
     */
    constructor(x, y, bubbleDirection) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.bubbleDirection = bubbleDirection;
        this.throw();
    }

    /**
     * Initiates the throwing action, moving the object in the specified direction (left or right).
     * The object moves at a constant speed by updating its x-coordinate at regular intervals.
     */
    throw() {
        this.speed = 16;

        // If bubbleDirection is false, move the object to the right.
        if (!this.bubbleDirection) {
            setInterval(() => {
                this.x += this.speed;
            }, 1000 / 60);
        } 
        // If bubbleDirection is true, move the object to the left.
        else {
            setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
        }
    }
}
