/**
 * Represents a jellyfish enemy in the game.
 * The jellyfish can swim, play animations, and respond to being "killed" with sounds and animations.
 * 
 * @extends MovableObject
 */
class JellyFish extends MovableObject {
    /**
     * The width of the jellyfish.
     * @type {number}
     */
    width = 200;

    /**
     * The height of the jellyfish.
     * @type {number}
     */
    height = 280;

    /**
     * The horizontal swimming speed of the jellyfish.
     * @type {number}
     */
    speed = 1;

    /**
     * The vertical swimming speed of the jellyfish.
     * @type {number}
     */
    speedY = 1;

    /**
     * Indicates whether the jellyfish is dead.
     * @type {boolean}
     */
    jellyFishIsDead = false;

    /**
     * Indicates whether the jellyfish is swimming upwards.
     * @type {boolean}
     */
    swimmingUp = true;

    /**
     * Determines whether the jellyfish's animations should play.
     * @type {boolean}
     */
    playObjectAnimation = true;

    /**
     * Determines whether sound effects are enabled for the jellyfish.
     * @type {boolean}
     */
    playAnimationSounds = true;

    /**
     * Indicates whether the death sound has already been played.
     * @type {boolean}
     */
    soundPlayed = false;

    /**
     * Image paths for the swimming animation.
     * @type {string[]}
     */
    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    /**
     * Image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];

    /**
     * Collision offset boundaries for the jellyfish.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 36,
        bottom: 44,
        left: 32,
        right: 32
    };

    /**
     * The sound effect that plays when the jellyfish dies.
     * @type {Audio}
     */
    deadSound = new Audio('audio/game/jelly_fish_dead_sound.mp3');

    /**
     * Creates a new JellyFish instance with random position and speed values.
     */
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
