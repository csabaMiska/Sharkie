class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.trow();
    }

    trow() {
        this.speed = 30;
        //this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
    }
}