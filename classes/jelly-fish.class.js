class JellyFish extends MovableObject {
    width = 200;
    height = 280;
    speed = 1;
    jellyFishIsDead = false;

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];

    offset = {
        top: 36,
        bottom: 44,
        left: 32,
        right: 32
    }

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 900 + Math.random() * 3200;
        this.y = 900;
        this.speed = 1 + Math.random() * 2;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.swimm();
    }

    animate() {
        setInterval(() => {
            this.playSwimmAnimation();
            this.playDeadAnimation()
        }, 140)
    }

    swimm() {
        setInterval(() => {
            if (!this.jellyFishIsDead) {
                this.swimmUp(this.speed);
            }
        }, 1000 / 60);
    }

    playSwimmAnimation() {
        if (!this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }

    playDeadAnimation() {
        if (this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}