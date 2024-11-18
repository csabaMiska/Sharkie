class EndBoss extends MovableObject {
    height = 640;
    width = 640;
    x = 8356;
    y = 120;
    speed = 2;
    speedY = 2;
    energy = 100;
    playInroduce = true;
    endBossIsDead = false;
    swimmingUp = true;
    swimmingLeft = true;
    playObjectAnimation = true;
    playAnimationSounds = true;
    soundPlayed = false;
    prizeCollected = false;
    coinCounter;

    offset = {
        top: 330,
        bottom: 140,
        left: 48,
        right: 56
    }

    damageSound = new Audio('audio/game/end_boss_damage_sound.mp3');
    deadSound = new Audio('audio/game/end_boss_dead_sound.mp3');

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
    IMAGES_DAMAGE = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

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

    animate() {
        setInterval(() => {
            if (this.playObjectAnimation) {
                this.playIntroduceAnimation();
                this.playSwimmAnimation();
                this.playDamageAnimation();
                this.playDeadAnimation();
                this.collectCoins();
            }
        }, 140)
    }

    playIntroduceAnimation() {
        if (this.playInroduce) {
            this.playAnimation(this.IMAGES_INTRODUCE);
            setTimeout(() => {
                this.playInroduce = false;
            }, 1000);
        }
    }

    playSwimmAnimation() {
        if (!this.endBossIsDead && !this.playInroduce) {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    playDamageAnimation() {
        if (this.isPoisoned() && !this.endBossIsDead) {
            this.playAnimation(this.IMAGES_DAMAGE);
            if (this.playAnimationSounds) {
                this.damageSound.play();
            }
        }
    }

    playDeadAnimation() {
        if (this.isDead() && !this.endBossIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.playDeadSound();
                this.endBossIsDead = true;
                this.loadImage('img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png');
                setInterval(() => {
                    this.y -= 1;
                }, 100)
            }, 500)
        }
    }

    collectCoins() {
        if (this.endBossIsDead && !this.prizeCollected) {
            this.coinCounter.collectPrize();
            this.prizeCollected = true;
        }
    }

    playDeadSound() {
        if (this.playAnimationSounds && !this.soundPlayed) {
            this.deadSound.play();
            this.soundPlayed = true;
        }
    }

    attack() {
        setTimeout(() => {
            setInterval(() => {
                if (!this.endBossIsDead && this.playObjectAnimation) {
                    this.moves();
                }
            }, 1000 / 60);
        }, 1000);
    }

    setRandomSpeed() {
        this.speed = 3 + Math.random() * 8;
        this.speedY = 3 + Math.random() * 8;
    }

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

    moveLeft() {
        this.swimmLeft(this.speed);
        this.otherDirection = false;
        if (this.x <= 6800) {
            this.swimmingLeft = false;
        }
    }

    moveRight() {
        this.swimmRight(this.speed);
        this.otherDirection = true;
        if (this.x >= 8350) {
            this.swimmingLeft = true;
        }
    }

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