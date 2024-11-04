class JellyFish extends MovableObject {
    width = 200;
    height = 280;
    speed = 1;
    speedY = 1;
    jellyFishIsDead = false;
    swimmingUp = true;
    playObjectAnimation = true;
    playAnimationSounds = true;
    soundPlayed = false;

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

    deadSound = new Audio('audio/game/jelly_fish_dead_sound.mp3');

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 900 + Math.random() * 3200;
        this.y = 900;
        this.speed = 1 + Math.random() * 4;
        this.speedY = 1 + Math.random() * 3;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moves();
    }

    animate() {
        setInterval(() => {
            if (this.playObjectAnimation) {
                this.playSwimmAnimation();
                this.playDeadAnimation();
            }
        }, 140)
    }

    moves() {
        setInterval(() => {
            if (!this.jellyFishIsDead && this.playObjectAnimation) {
                this.swimming();
            }
        }, 1000 / 60);
    }

    swimming() {
        if (this.swimmingUp) {
            this.swimmUpLeft(this.speed, this.speedY);
            if (this.y <= 120) {
                this.swimmingUp = false;
            }
        } else {
            this.swimmDownLeft(this.speed, this.speedY);
            if (this.y >= 900) {
                this.swimmingUp = true;
            }
        }
    }

    playSwimmAnimation() {
        if (!this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }

    playDeadAnimation() {
        if (this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            this.playDeadSound();
        }
    }

    playDeadSound() {
        if (this.playAnimationSounds && !this.soundPlayed) { 
            this.deadSound.play();
            this.soundPlayed = true;
        }
    }
}