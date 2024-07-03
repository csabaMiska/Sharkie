class PufferFish extends MovableObject {
    width = 180;
    height = 180;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 500 + Math.random() * 1600;
        this.y = 40 + Math.random() * 900;
    }
}