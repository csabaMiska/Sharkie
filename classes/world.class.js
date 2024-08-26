class World {
    shark = new Shark();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    movableObject = new MovableObject();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.swimming();
        this.attack()
    }

    setWorld() {
        this.shark.world = this;
    }

    swimming() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkCollisions();
                this.checkThrowableObjects();
            }, 300);
        }
    }

    attack() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkBubbleAttack();
                this.checkFinSlap();
            }, 1000 / 60);
        }
    }

    checkCollisions() {
        this.collosionWithPufferFish();
        this.collosionWithJellyFish();
        this.collosionWithEndBoss();
        this.collosionWithCoins();
        this.collosionWithPoisons();
    }

    collosionWithPufferFish() {
        this.level.pufferFishes.forEach((pufferFish) => {
            if (this.shark.isColliding(pufferFish) && !pufferFish.pufferFishIsDead) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    collosionWithJellyFish() {
        this.level.jellyFishes.forEach((jellyFish) => {
            if (this.shark.isColliding(jellyFish)) {
                this.shark.shock();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    collosionWithEndBoss() {
        this.level.endBoss.forEach((endBoss) => {
            if (this.shark.isColliding(endBoss)) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    collosionWithCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.shark.isColliding(coin)) {
                this.movableObject.collectCoins();
                this.movableObject.deleteObject(this.ctx, coin);
                return false;
            }
            return true;
        });
    }

    collosionWithPoisons() {
        this.level.poisons = this.level.poisons.filter((poison) => {
            if (this.shark.isColliding(poison)) {
                this.movableObject.collectPoison();
                this.movableObject.deleteObject(this.ctx, poison);
                return false;
            }
            return true;
        });
    }

    checkFinSlap() {
        if (this.keyboard.SPACE) {
            this.level.pufferFishes.forEach((pufferFish) => {
                if (this.shark.isColliding(pufferFish) && !pufferFish.pufferFishIsDead) {
                    pufferFish.pufferFishIsDead = true;
                    this.finSlap(pufferFish);
                }
            });
        }
    }

    finSlap(pufferFish) {
        setTimeout(() => {
            this.removePufferFish(pufferFish);
            this.createNewPoison(pufferFish);   
        }, 1100);
    }

    createNewPoison(pufferFish) {
        let poison = new Poison(pufferFish.x, pufferFish.y);
        this.level.poisons.push(poison);
    }

    removePufferFish(pufferFish) {
        this.level.pufferFishes = this.level.pufferFishes.filter(fish => fish !== pufferFish);
        this.movableObject.deleteObject(this.ctx, pufferFish);
    }

    
    checkThrowableObjects() {
        if (this.keyboard.D && this.movableObject.poisonsNumber > 0) {
            if (!this.shark.otherDirection) {
                let bubble = new ThrowableObject(this.shark.x + 340, this.shark.y + 240, this.shark.otherDirection);
                this.createBubble(bubble);
            } else {
                let bubble = new ThrowableObject(this.shark.x + 20, this.shark.y + 240, this.shark.otherDirection);
                this.createBubble(bubble);
            }
        }
    }

    createBubble(bubble) {
        this.throwableObjects.push(bubble);
        this.movableObject.poisonsNumber -= 1;
    }

    checkBubbleAttack() {
        this.throwableObjects = this.throwableObjects.filter((bubble) => {
            let hasCollided = false;

            this.level.jellyFishes = this.level.jellyFishes.filter((jellyFish) => {
                if (bubble.isColliding(jellyFish)) {
                    this.movableObject.deleteObject(this.ctx, jellyFish);
                    hasCollided = true;
                    return false;
                }
                return true;
            });

            if (hasCollided) {
                this.movableObject.deleteObject(this.ctx, bubble);
                return false;
            }
            return true;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        this.ctx.font = "40px Bowlby One";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("X " + this.movableObject.coinsNumber, 1700, 84);
        this.ctx.fillText("X " + this.movableObject.poisonsNumber, 1300, 84);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.shark);
        this.addObjectsToMap(this.level.pufferFishes);
        this.addObjectsToMap(this.level.jellyFishes);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}