class ThrowableObject extends MovableObject {
    offset = {
        top: 4,
        bottom: 4,
        left: 4,
        right: 4
    };

    bubbleDirection;

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
        if (!this.bubbleDirection) {
            setInterval(() => {
                this.x += this.speed;
            }, 1000 / 60);
        } else {
            setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
        }
    }
}
