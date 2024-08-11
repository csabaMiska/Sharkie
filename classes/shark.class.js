class Shark extends MovableObject {
    x = 50;
    y = 240;
    width = 450;
    height = 450;
    speed = 20;
    world;

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
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];
    IMAGES_DEAD = [
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

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.characterIsDead = false;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
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
            this.sharkPoisoned();
        }, 120);

        setInterval(() => {
            this.playFinSlap();
        }, 80)
    }

    moveRight() {
        if (this.world.keyboard.RIGHT && this.x <= this.world.level.level_end_x  && !this.characterIsDead) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0  && !this.characterIsDead) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    moveUp() {
        if (this.world.keyboard.UP && this.y > -200  && !this.characterIsDead) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.world.keyboard.DOWN && this.y < 720  && !this.characterIsDead) {
            this.y += this.speed;
        }
    }

    cameraSettings() {
        if (this.x >= 350 && this.x < this.world.level.final_battle_x) {
            this.world.camera_x = -this.x + 350;
        }
    }

    playIdle() {
        if (!this.characterIsDead) {
            this.playAnimation(this.IMAGES_IDLE);
        }  
    }

    playSwimm() {
        if (!this.characterIsDead) {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }
    }

    playFinSlap() {
        if (this.world.keyboard.SPACE && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_SLAP);
        }
    }

    sharkHurt() {
        if (this.isHurt() && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    sharkPoisoned() {
        if (this.isDead() && !this.characterIsDead) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.characterIsDead = true;
                this.loadImage('img/1.Sharkie/6.dead/1.Poisoned/12.png');
                setInterval(() => {
                    this.y -= 1;
                }, 1000 / 60)
            }, 400)
        }
    }
}