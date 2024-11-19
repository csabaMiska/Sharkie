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
    };

    deadSound = new Audio('audio/game/jelly_fish_dead_sound.mp3');

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 7000 + Math.random() * (10000 - 7000);
        this.y = 900;
        this.speed = 1 + Math.random() * 4;
        this.speedY = 1 + Math.random() * 3;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moves();
    }

    /**
     * Starts the jellyfish's animation for swimming and death states.
     */
    animate() {
        setInterval(() => {
            if (this.playObjectAnimation) {
                this.playSwimmAnimation();
                this.playDeadAnimation();
            }
        }, 140);
    }

    /**
     * Handles the jellyfish's movement logic based on its state.
     */
    moves() {
        setInterval(() => {
            if (!this.jellyFishIsDead && this.playObjectAnimation) {
                this.swimming();
            }
        }, 1000 / 60);
    }

    /**
     * Controls the swimming behavior, alternating between upward and downward movement.
     */
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

    /**
     * Plays the swimming animation if the jellyfish is alive.
     */
    playSwimmAnimation() {
        if (!this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_SWIMMING);
        }
    }

    /**
     * Plays the death animation and triggers the death sound.
     */
    playDeadAnimation() {
        if (this.jellyFishIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            this.playDeadSound();
        }
    }

    /**
     * Plays the death sound effect if it hasn't already been played.
     */
    playDeadSound() {
        if (this.playAnimationSounds && !this.soundPlayed) {
            this.deadSound.play();
            this.soundPlayed = true;
        }
    }
}
