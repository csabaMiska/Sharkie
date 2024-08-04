class JellyFish extends MovableObject {
    width = 200;
    height = 280;
    speed = 1;
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 900 + Math.random() * 3200;
        this.y = 900;
        this.loadImages(this.IMAGES_SWIMMING);
        this.speed = 1 + Math.random() * 2;
        this.animate();
    }

    animate() {
        this.swimmUp(this.speed);
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 140)
    }
}