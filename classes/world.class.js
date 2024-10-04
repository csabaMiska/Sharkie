class World {
    shark = new Shark();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    poisonCounter = new PoisonCounter();
    coinBar = new CoinBar();
    coinCounter = new CoinCounter();
    movableObject = new MovableObject();
    throwableObjects = [];
    finalBattleStarted = false;
    state;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.shark.world = this;
        this.setGameState();
        this.swimming();
        this.attack();
    }

    setGameState() {
        let gameStateInterval = setInterval(() => {
            this.setGameOver(gameStateInterval);
            this.setGameWin(gameStateInterval);
            this.setGameGiveUp(gameStateInterval);
            showGameMenu();
        }, 1000 / 60);
    }

    setGameOver(gameStateInterval) {
        if (this.shark.energy <= 0) {
            clearInterval(gameStateInterval);
            setTimeout(() => {
                this.state = 'GAME_OVER';
                this.clearAllIntervals();
                showGameOver();
            }, 2000);
        }
    }

    setGameWin(gameStateInterval) {
        let endBoss = this.level.endBoss[0];
        if (endBoss && endBoss.energy <= 0) {
            clearInterval(gameStateInterval);
            setTimeout(() => {
                this.state = 'GAME_WIN';
                this.clearAllIntervals();
                showGameWin();
            }, 2000);
        }
    }

    setGameGiveUp(gameStateInterval) {
        if (this.state === 'GIVE_UP') {
            clearInterval(gameStateInterval);
            this.state = 'GAME_OVER';
            this.clearAllIntervals();
            hideGameMenu();
        }
    }

    resetGame() {
        this.level.pufferFishes = [];
        this.level.jellyFishes = [];
        this.level.endBoss = [];
        this.level.reset();
        this.coinCounter.reset();
        this.poisonCounter.reset();
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    setGamePaused() {
        this.stopPufferFishesAnimation();
        this.stopJellyFishesAnimation();
        this.stopEndBossAnimation();
    }

    setGameResume() {
        this.playPufferFishesAnimation();
        this.playJellyFishesAnimation();
        this.playEndBossAnimation();
    }

    stopPufferFishesAnimation() {
        this.level.pufferFishes.forEach((pufferFish) => {
            pufferFish.setStopObjectAnimation();
        });
    }

    playPufferFishesAnimation() {
        this.level.pufferFishes.forEach((pufferFish) => {
            pufferFish.setPlayObjectAnimation();
        });
    }

    stopJellyFishesAnimation() {
        this.level.jellyFishes.forEach((jellyFish) => {
            jellyFish.setStopObjectAnimation();
        });
    }

    playJellyFishesAnimation() {
        this.level.jellyFishes.forEach((jellyFish) => {
            jellyFish.setPlayObjectAnimation();
        });
    }

    stopEndBossAnimation() {
        this.level.endBoss.forEach((endBoss) => {
            endBoss.setStopObjectAnimation();
        });
    }

    playEndBossAnimation() {
        this.level.endBoss.forEach((endBoss) => {
            endBoss.setPlayObjectAnimation();
        });
    }

    swimming() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkCollisions();
                this.checkThrowableObjects();
            }, 200);
        }
    }

    attack() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkBubbleAttack();
                this.checkFinSlap();
                this.createFinalBattle();
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
            if (this.shark.isColliding(jellyFish) && !jellyFish.jellyFishIsDead) {
                this.shark.shock();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    collosionWithEndBoss() {
        this.level.endBoss.forEach((endBoss) => {
            if (this.shark.isColliding(endBoss) && !endBoss.endBossIsDead) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    collosionWithCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.shark.isColliding(coin)) {
                this.coinCounter.collectCoins();
                this.movableObject.deleteObject(this.ctx, coin);
                return false;
            }
            return true;
        });
    }

    collosionWithPoisons() {
        this.level.poisons = this.level.poisons.filter((poison) => {
            if (this.shark.isColliding(poison)) {
                this.poisonCounter.collectPoison();
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
        if (this.keyboard.D && this.poisonCounter.poisonsNumber > 0 && this.state === 'RUNNING') {
            if (!this.shark.characterIsDead) {
                if (!this.shark.otherDirection) {
                    let bubble = new ThrowableObject(this.shark.x + 340, this.shark.y + 240, this.shark.otherDirection);
                    this.createBubble(bubble);
                } else {
                    let bubble = new ThrowableObject(this.shark.x + 20, this.shark.y + 240, this.shark.otherDirection);
                    this.createBubble(bubble);
                }
            }
        }
    }

    createBubble(bubble) {
        this.throwableObjects.push(bubble);
        this.poisonCounter.poisonsNumber -= 1;
    }

    checkBubbleAttack() {
        this.throwableObjects = this.throwableObjects.filter((bubble) => {
            let bubbleIsCollided = this.bubbleJellyFishCollision(bubble) || this.bubbleEndBossCollision(bubble);

            if (bubbleIsCollided) {
                this.movableObject.deleteObject(this.ctx, bubble);
                return false;
            }
            return true;
        });
    }

    bubbleJellyFishCollision(bubble) {
        let bubbleIsCollided = false;

        this.level.jellyFishes.forEach((jellyFish) => {
            if (bubble.isColliding(jellyFish) && !jellyFish.jellyFishIsDead) {
                jellyFish.jellyFishIsDead = true;
                bubbleIsCollided = true;
                this.bubbleAttack(jellyFish);
            }
        });

        return bubbleIsCollided;
    }

    bubbleEndBossCollision(bubble) {
        let bubbleIsCollided = false;

        this.level.endBoss.forEach((endBoss) => {
            if (bubble.isColliding(endBoss) && !endBoss.endBossIsDead) {
                bubbleIsCollided = true;
                endBoss.hit();
            }
        });

        return bubbleIsCollided;
    }

    bubbleAttack(jellyFish) {
        setTimeout(() => {
            this.removeJellyFish(jellyFish);
            this.createNewCoin(jellyFish);
        }, 600);
    }

    createNewCoin(jellyFish) {
        let coin = new Coin(jellyFish.x + 70, jellyFish.y + 100);
        this.level.coins.push(coin);
    }

    removeJellyFish(jellyFish) {
        this.level.jellyFishes = this.level.jellyFishes.filter(fish => fish !== jellyFish);
        this.movableObject.deleteObject(this.ctx, jellyFish);
    }

    createFinalBattle() {
        if (!this.finalBattleStarted && this.shark.x >= this.level.final_battle_x) {
            let finalEnemy = new EndBoss();
            this.level.endBoss.push(finalEnemy);
            this.finalBattleStarted = true;
        }
    }

    draw() {
        if (this.state !== 'RUNNING') return;

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
        this.ctx.fillText("X " + this.coinCounter.coinsNumber, 1700, 84);
        this.ctx.fillText("X " + this.poisonCounter.poisonsNumber, 1300, 84);
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