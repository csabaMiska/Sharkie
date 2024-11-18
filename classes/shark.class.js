class Shark extends MovableObject {
    x = 50;
    y = 240;
    width = 450;
    height = 450;
    speed = 12;
    energy = 100;
    world;
    lastActiveTime = new Date().getTime();
    playObjectAnimation = true;
    playAnimationSounds = true;
    slapSound = new Audio('audio/game/slap_sound.mp3');
    bubbleSound = new Audio('audio/game/bubble_sound.mp3');
    poisonedSound = new Audio('audio/game/poisoned_sound.mp3');
    electricSound = new Audio('audio/game/electric_sound.mp3');
    gameOverSound = new Audio('audio/game/game_over.mp3');
    snoreSound = new Audio('audio/game/snore_sound.mp3')

    offset = {
        top: 240,
        bottom: 100,
        left: 100,
        right: 100
    }

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_SLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];
    IMAGES_BUBBLE_TRAP = [
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png'
    ];
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];
    IMAGES_SHOCK = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];
    IMAGES_POISONED = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_ELEKTRO_SHOCK = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.characterIsDead = false;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_BUBBLE_TRAP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHOCK);
        this.loadImages(this.IMAGES_POISONED);
        this.loadImages(this.IMAGES_ELEKTRO_SHOCK);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.cameraSettings();
            this.moveRight();
            this.moveLeft();
            this.moveUp();
            this.moveDown();
        }, 1000 / 60);

        setInterval(() => {
            this.playIdle();
            this.playSwimm();
            this.sharkHurt();
            this.sharkShock();
            this.sharkPoisoned();
            this.sharkElektroShocked();
        }, 120);

        setInterval(() => {
            this.playFinSlap();
            this.playBubbleAttack();
        }, 80)
    }

    moveRight() {
        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x && !this.characterIsDead && this.playObjectAnimation) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0 && !this.characterIsDead && this.playObjectAnimation) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    moveUp() {
        if (this.world.keyboard.UP && this.y > -100 && !this.characterIsDead && this.playObjectAnimation) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.world.keyboard.DOWN && this.y < 720 && !this.characterIsDead && this.playObjectAnimation) {
            this.y += this.speed;
        }
    }

    cameraSettings() {
        if (this.x >= 700 && this.x < this.world.level.final_battle_x) {
            this.world.camera_x = -this.x + 700;
        }
    }

    playIdle() {
        if (!this.characterIsDead) {
            this.checkIdleState();
        }
    }

    checkIdleState() {
        let now = new Date().getTime();
        let idleDuration = 8000;

        if (!this.characterIsDead) {
            if (now - this.lastActiveTime >= idleDuration) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                if (this.playAnimationSounds) {
                    this.snoreSound.play();
                }
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }

    resetIdleTimer() {
        this.lastActiveTime = new Date().getTime();
    }

    playSwimm() {
        if (!this.characterIsDead && this.playObjectAnimation) {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.resetIdleTimer();
            }
        }
    }

    playFinSlap() {
        if (this.world.keyboard.SPACE && !this.characterIsDead && this.playObjectAnimation) {
            this.playAnimation(this.IMAGES_SLAP);
            if (this.playAnimationSounds) {
                this.slapSound.play();
            }
            this.resetIdleTimer();
        }
    }

    playBubbleAttack() {
        if (!this.characterIsDead && this.playObjectAnimation) {
            if (this.world.keyboard.D && this.world.poisonCounter.poisonsNumber > 0) {
                this.playAnimation(this.IMAGES_BUBBLE_TRAP);
                if (this.playAnimationSounds) {
                    this.bubbleSound.play();
                }
                this.resetIdleTimer();
            }
        }
    }

    sharkHurt() {
        if (this.isPoisoned() && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_HURT);
            if (this.playAnimationSounds) {
                this.poisonedSound.play();
            }
        }
    }

    sharkShock() {
        if (this.isShocked() && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_SHOCK);
            if (this.playAnimationSounds) {
                this.electricSound.play();
            }
        }
    }

    sharkPoisoned() {
        if (this.isDead() && this.characterIsPoisoned && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_POISONED);
            this.playGameOverSound();
            setTimeout(() => {
                this.characterIsDead = true;
                this.loadImage('img/1.Sharkie/6.dead/1.Poisoned/12.png');
                setInterval(() => {
                    this.y -= 1;
                }, 140)
            }, 400)
        }
    }

    sharkElektroShocked() {
        if (this.isDead() && this.characterIsElektrShocked && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_ELEKTRO_SHOCK);
            this.playGameOverSound();
            setTimeout(() => {
                this.characterIsDead = true;
                this.loadImage('img/1.Sharkie/6.dead/2.Electro_shock/10.png');
                this.applyGravity();
            }, 380)
        }
    }

    playGameOverSound() {
        if (this.playAnimationSounds) {
            this.gameOverSound.play();
        }
    }
}