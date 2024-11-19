/**
 * Represents the End Boss in the game, with various states including introduction, swimming, damage, and death.
 * Handles animations, movement, damage, and prize collection logic for the final enemy in the game.
 */
class EndBoss extends MovableObject {
    /**
     * The height of the EndBoss.
     * @type {number}
     */
    height = 640;

    /**
     * The width of the EndBoss.
     * @type {number}
     */
    width = 640;

    /**
     * The x position of the EndBoss on the game canvas.
     * @type {number}
     */
    x = 8356;

    /**
     * The y position of the EndBoss on the game canvas.
     * @type {number}
     */
    y = 120;

    /**
     * The speed of the EndBoss in the horizontal direction.
     * @type {number}
     */
    speed = 2;

    /**
     * The speed of the EndBoss in the vertical direction.
     * @type {number}
     */
    speedY = 2;

    /**
     * The energy of the EndBoss, used to track its health.
     * @type {number}
     */
    energy = 100;

    /**
     * Whether the EndBoss is in the introduction animation state.
     * @type {boolean}
     */
    playInroduce = true;

    /**
     * Whether the EndBoss is dead.
     * @type {boolean}
     */
    endBossIsDead = false;

    /**
     * Whether the EndBoss is swimming upwards.
     * @type {boolean}
     */
    swimmingUp = true;

    /**
     * Whether the EndBoss is swimming left.
     * @type {boolean}
     */
    swimmingLeft = true;

    /**
     * Whether the object should play animations.
     * @type {boolean}
     */
    playObjectAnimation = true;

    /**
     * Whether the object should play animation sounds.
     * @type {boolean}
     */
    playAnimationSounds = true;

    /**
     * Whether a sound has been played for the EndBoss.
     * @type {boolean}
     */
    soundPlayed = false;

    /**
     * Whether the prize has been collected from the EndBoss.
     * @type {boolean}
     */
    prizeCollected = false;

    /**
     * The coin counter instance, used to manage the player's collected coins.
     * @type {CoinCounter}
     */
    coinCounter;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 330,
        bottom: 140,
        left: 48,
        right: 56
    };

    /**
     * The sound effect played when the EndBoss is damaged.
     * @type {HTMLAudioElement}
     */
    damageSound = new Audio('audio/game/end_boss_damage_sound.mp3');

    /**
     * The sound effect played when the EndBoss is dead.
     * @type {HTMLAudioElement}
     */
    deadSound = new Audio('audio/game/end_boss_dead_sound.mp3');

    /**
     * The images for the introduction animation of the EndBoss.
     * @type {string[]}
     */
    IMAGES_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    /**
     * The images for the floating (active) animation of the EndBoss.
     * @type {string[]}
     */
    IMAGES_FLOATING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    /**
     * The images for the damage (hurt) animation of the EndBoss.
     * @type {string[]}
     */
    IMAGES_DAMAGE = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    /**
     * The images for the death animation of the EndBoss.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    /**
     * Creates a new EndBoss instance.
     * @param {CoinCounter} coinCounter - The coin counter instance used to manage the coins.
     */
    constructor(coinCounter) {
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.speed = 3 + Math.random() * 5;
        this.speedY = 3 + Math.random() * 5;
        this.coinCounter = coinCounter;
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_DAMAGE);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.attack();
    }

    /**
 * Handles the animation logic for the EndBoss, including introduction, swimming, damage, death, and coin collection.
 */
    animate() {
        setInterval(() => {
            if (this.playObjectAnimation) {
                this.playIntroduceAnimation();
                this.playSwimmAnimation();
                this.playDamageAnimation();
                this.playDeadAnimation();
                this.collectCoins();
            }
        }, 140);
    }

    /**
     * Plays the introduction animation for the EndBoss.
     * The animation is played only if the EndBoss is not dead and it's in the introduction state.
     */
    playIntroduceAnimation() {
        if (this.playInroduce) {
            this.playAnimation(this.IMAGES_INTRODUCE);
            setTimeout(() => {
                this.playInroduce = false;
            }, 1000);
        }
    }

    /**
     * Plays the swimming animation for the EndBoss when it's not dead and the introduction animation has finished.
     */
    playSwimmAnimation() {
        if (!this.endBossIsDead && !this.playInroduce) {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    /**
     * Plays the damage animation for the EndBoss when it's poisoned.
     * It also plays a damage sound if the animation sounds are enabled.
     */
    playDamageAnimation() {
        if (this.isPoisoned() && !this.endBossIsDead) {
            this.playAnimation(this.IMAGES_DAMAGE);
            if (this.playAnimationSounds) {
                this.damageSound.play();
            }
        }
    }

    /**
     * Plays the death animation for the EndBoss when it's dead.
     * The EndBoss's image is changed and a death sound is played.
     * The EndBoss slowly sinks downward after death.
     */
    playDeadAnimation() {
        if (this.isDead() && !this.endBossIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.playDeadSound();
                this.endBossIsDead = true;
                this.loadImage('img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png');
                setInterval(() => {
                    this.y -= 1; // Slowly move the EndBoss downward after death
                }, 100);
            }, 500);
        }
    }

    /**
     * Collects the prize (coins) after the EndBoss dies.
     * This is called only once to avoid multiple prize collections.
     */
    collectCoins() {
        if (this.endBossIsDead && !this.prizeCollected) {
            this.coinCounter.collectPrize();
            this.prizeCollected = true;
        }
    }

    /**
     * Plays the death sound when the EndBoss dies, if the animation sounds are enabled.
     */
    playDeadSound() {
        if (this.playAnimationSounds && !this.soundPlayed) {
            this.deadSound.play();
            this.soundPlayed = true;
        }
    }

    /**
     * Starts the attack sequence for the EndBoss.
     * The EndBoss moves around in a set interval based on its speed and direction.
     */
    attack() {
        setTimeout(() => {
            setInterval(() => {
                if (!this.endBossIsDead && this.playObjectAnimation) {
                    this.moves();
                }
            }, 1000 / 60);
        }, 1000);
    }

    /**
     * Sets random speeds for the EndBoss in both horizontal and vertical directions.
     */
    setRandomSpeed() {
        this.speed = 3 + Math.random() * 8;
        this.speedY = 3 + Math.random() * 8;
    }

    /**
     * Handles the movement of the EndBoss by setting random speeds and calling the appropriate movement methods.
     */
    moves() {
        this.setRandomSpeed();

        if (this.swimmingLeft) {
            this.moveLeft();
        } else {
            this.moveRight();
        }

        if (this.swimmingUp) {
            this.moveUp();
        } else {
            this.moveDown();
        }
    }

    /**
     * Moves the EndBoss to the left, and changes its swimming direction if it reaches a boundary.
     */
    moveLeft() {
        this.swimmLeft(this.speed);
        this.otherDirection = false;
        if (this.x <= 6800) {
            this.swimmingLeft = false;
        }
    }

    /**
     * Moves the EndBoss to the right, and changes its swimming direction if it reaches a boundary.
     */
    moveRight() {
        this.swimmRight(this.speed);
        this.otherDirection = true;
        if (this.x >= 8350) {
            this.swimmingLeft = true;
        }
    }

    /**
     * Moves the EndBoss upwards when swimming left. 
     * The swimming direction changes based on boundaries and vertical movement.
     */
    moveUp() {
        if (this.swimmingLeft) {
            this.swimmUpLeft(this.speed, this.speedY);
            if (this.y <= -100) {
                this.swimmingUp = false;
            }
            if (this.x <= 6800) {
                this.swimmingLeft = false;
            }
        } else {
            this.swimmUpRight(this.speed, this.speedY);
            if (this.y <= -100) {
                this.swimmingUp = false;
            }
            if (this.x >= 8350) {
                this.swimmingLeft = true;
            }
        }
    }

    /**
     * Moves the EndBoss downwards when swimming left.
     * The swimming direction changes based on boundaries and vertical movement.
     */
    moveDown() {
        if (this.swimmingLeft) {
            this.swimmDownLeft(this.speed, this.speedY);
            if (this.y >= 600) {
                this.swimmingUp = true;
            }
            if (this.x <= 6800) {
                this.swimmingLeft = false;
            }
        } else {
            this.swimmDownRight(this.speed, this.speedY);
            if (this.y >= 600) {
                this.swimmingUp = true;
            }
            if (this.x >= 8350) {
                this.swimmingLeft = true;
            }
        }
    }

}