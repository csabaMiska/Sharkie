/**
 * Represents the game world, including the shark, level, status bars, and all objects within the world.
 * Handles game state, collisions, attacks, and rendering of all game elements.
 */
class World {
    /**
     * The shark character.
     * @type {Shark}
     */
    shark = new Shark();

    /**
     * The current level of the game.
     * @type {Object}
     */
    level = level1;

    /**
     * The canvas element where the game is drawn.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D drawing context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input handler for the game.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The x-coordinate of the camera (for camera movement).
     * @type {number}
     */
    camera_x = 0;

    /**
     * The status bar for tracking the shark's energy.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The status bar for tracking the end boss's energy.
     * @type {EndBossBar}
     */
    endBossStatusBar = new EndBossBar();

    /**
     * The poison bar for tracking poison status.
     * @type {PoisonBar}
     */
    poisonBar = new PoisonBar();

    /**
     * The poison counter for tracking poison items.
     * @type {PoisonCounter}
     */
    poisonCounter = new PoisonCounter();

    /**
     * The coin bar for tracking the player's coin count.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * The coin counter for tracking the collected coins.
     * @type {CoinCounter}
     */
    coinCounter = new CoinCounter();

    /**
     * A movable object for generic movement.
     * @type {MovableObject}
     */
    movableObject = new MovableObject();

    /**
     * Array of throwable objects (e.g., bubbles).
     * @type {Array<ThrowableObject>}
     */
    throwableObjects = [];

    /**
     * Flag indicating whether the final battle has started.
     * @type {boolean}
     */
    finalBattleStarted = false;

    /**
     * The current state of the game (e.g., running, paused, game over).
     * @type {string}
     */
    state;

    /**
     * Flag for whether the end boss animations are enabled.
     * @type {boolean}
     */
    animatedEndBoss = false;

    /**
     * Creates a new game world instance with the provided canvas and keyboard input handler.
     * Initializes the game environment, including sounds, state, and initial actions.
     * @param {HTMLCanvasElement} canvas - The canvas element for drawing the game.
     * @param {Keyboard} keyboard - The keyboard input handler for the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.shark.world = this;
        this.setGameState();
        this.playGameSounds();
        this.swimming();
        this.attack();
    }

    /**
     * Returns all objects that can make sound during gameplay.
     * @returns {Array<Object>} An array of game objects that play sounds.
     */
    getSoundObjects() {
        return [
            this.shark,
            this.poisonCounter,
            this.coinCounter,
            ...this.level.pufferFishes,
            ...this.level.jellyFishes,
            ...this.level.endBoss
        ];
    }

    /**
     * Mutes all game sounds by stopping animations for sound objects.
     */
    muteGameSounds() {
        this.animatedEndBoss = false;
        this.getSoundObjects().forEach((obj) => obj.setStopAnimationSounds());
    }

    /**
     * Plays all game sounds by enabling animations for sound objects.
     */
    playGameSounds() {
        this.animatedEndBoss = true;
        this.getSoundObjects().forEach((obj) => obj.setPlayAnimationSounds());
    }

    /**
     * Pauses the game by stopping all object animations.
     */
    setGamePaused() {
        this.getSoundObjects().forEach((obj) => obj.setStopObjectAnimation());
    }

    /**
     * Resumes the game by starting animations for all objects.
     */
    setGameResume() {
        this.getSoundObjects().forEach((obj) => obj.setPlayObjectAnimation());
    }

    /**
     * Sets the game state, periodically checking for game over, win, or give up conditions.
     */
    setGameState() {
        let gameStateInterval = setInterval(() => {
            this.setGameOver(gameStateInterval);
            this.setGameWin(gameStateInterval);
            this.setGameGiveUp(gameStateInterval);
            checkGameMenu();
            showMobilBtn();
        }, 50);
    }

    /**
     * Checks if the game should be set to 'GAME_OVER' based on the shark's energy.
     * @param {number} gameStateInterval - The interval ID for checking game state.
     */
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

    /**
     * Checks if the game should be set to 'GAME_WIN' based on the end boss's health.
     * @param {number} gameStateInterval - The interval ID for checking game state.
     */
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

    /**
     * Checks if the game should be set to 'GIVE_UP', triggering a reset of the game.
     * @param {number} gameStateInterval - The interval ID for checking game state.
     */
    setGameGiveUp(gameStateInterval) {
        if (this.state === 'GIVE_UP') {
            clearInterval(gameStateInterval);
            this.state = 'GIVE_UP';
            this.clearAllIntervals();
            this.resetGame();
        }
    }

    /**
     * Resets the game state, including clearing level objects, coins, and poisons.
     */
    resetGame() {
        this.level.endBoss = [];
        this.level.reset();
        this.coinCounter.reset();
        this.poisonCounter.reset();
    }

    /**
     * Clears all intervals, stopping any ongoing actions or updates.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Handles the swimming actions of the shark by periodically checking for collisions and throwable objects.
     */
    swimming() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkCollisions();
                this.checkThrowableObjects();
            }, 200);
        }
    }

    /**
     * Handles the attacking actions of the shark by periodically checking for bubble and fin slap attacks.
     */
    attack() {
        if (!this.shark.characterIsDead) {
            setInterval(() => {
                this.checkBubbleAttack();
                this.checkFinSlap();
                this.createFinalBattle();
            }, 1000 / 60);
        }
    }

    /**
     * Checks for various types of collisions involving the shark.
     */
    checkCollisions() {
        this.collosionWithPufferFish();
        this.collosionWithJellyFish();
        this.collosionWithEndBoss();
        this.collosionWithCoins();
        this.collosionWithPoisons();
    }

    /**
     * Checks for collisions between the shark and pufferfish. If a collision occurs, the shark takes damage.
     */
    collosionWithPufferFish() {
        this.level.pufferFishes.forEach((pufferFish) => {
            if (this.shark.isColliding(pufferFish) && !pufferFish.pufferFishIsDead) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    /**
     * Checks for collisions between the shark and jellyfish. If a collision occurs, the shark takes damage.
     */
    collosionWithJellyFish() {
        this.level.jellyFishes.forEach((jellyFish) => {
            if (this.shark.isColliding(jellyFish) && !jellyFish.jellyFishIsDead) {
                this.shark.shock();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    /**
     * Checks for collisions between the shark and the end boss. If a collision occurs, the shark takes damage.
     */
    collosionWithEndBoss() {
        this.level.endBoss.forEach((endBoss) => {
            if (this.shark.isColliding(endBoss) && !endBoss.endBossIsDead) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });
    }

    /**
     * Checks for collisions between the shark and coins. If a collision occurs, the shark collects the coin.
     */
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

    /**
     * Checks for collisions between the shark and poisons. If a collision occurs, the shark collects the poison.
     */
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

    /**
     * Checks if the player pressed the spacebar to perform a fin slap on a pufferfish.
     */
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

    /**
     * Performs a fin slap on a pufferfish and creates a new poison.
     * @param {PufferFish} pufferFish - The pufferfish that was slapped.
     */
    finSlap(pufferFish) {
        setTimeout(() => {
            this.removePufferFish(pufferFish);
            this.createNewPoison(pufferFish);
        }, 1100);
    }

    /**
     * Creates a new poison item at the given location.
     * @param {PufferFish} enemy - The enemy that was defeated to create the poison.
     */
    createNewPoison(enemy) {
        let poison = new Poison(enemy.x, enemy.y);
        this.level.poisons.push(poison);
    }

    /**
     * Removes a pufferfish from the level and the game map.
     * @param {PufferFish} pufferFish - The pufferfish to remove.
     */
    removePufferFish(pufferFish) {
        this.level.pufferFishes = this.level.pufferFishes.filter(fish => fish !== pufferFish);
        this.movableObject.deleteObject(this.ctx, pufferFish);
    }

    /**
     * Checks if the player pressed the 'D' key to throw a bubble.
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.poisonCounter.poisonsNumber > 0 && this.state === 'RUNNING') {
            if (!this.shark.characterIsDead) {
                let bubble = new ThrowableObject(this.shark.x + (this.shark.otherDirection ? 20 : 340), this.shark.y + 240, this.shark.otherDirection);
                this.createBubble(bubble);
            }
        }
    }

    /**
     * Creates a new throwable object (bubble) and reduces the poison counter.
     * @param {ThrowableObject} bubble - The throwable object to create.
     */
    createBubble(bubble) {
        this.throwableObjects.push(bubble);
        this.poisonCounter.poisonsNumber -= 1;
    }

    /**
     * Checks if any throwable objects (bubbles) have collided with jellyfish or the end boss.
     */
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

    /**
     * Checks if a bubble has collided with a jellyfish.
     * @param {ThrowableObject} bubble - The bubble object to check for collisions.
     * @returns {boolean} True if the bubble has collided with a jellyfish.
     */
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

    /**
     * Checks if a bubble has collided with the end boss.
     * @param {ThrowableObject} bubble - The bubble object to check for collisions.
     * @returns {boolean} True if the bubble has collided with the end boss.
     */
    bubbleEndBossCollision(bubble) {
        let bubbleIsCollided = false;
        this.level.endBoss.forEach((endBoss) => {
            if (bubble.isColliding(endBoss) && !endBoss.endBossIsDead) {
                bubbleIsCollided = true;
                endBoss.hit();
                if (endBoss) {
                    this.endBossStatusBar.setPercentage(endBoss.energy);
                }
            }
        });
        return bubbleIsCollided;
    }

    /**
     * Handles the bubble attack on a jellyfish, removes the jellyfish and creates a coin and poison.
     * @param {JellyFish} jellyFish - The jellyfish to attack.
     */
    bubbleAttack(jellyFish) {
        setTimeout(() => {
            this.removeJellyFish(jellyFish);
            this.createNewCoin(jellyFish);
            this.createNewPoison(jellyFish);
        }, 600);
    }

    /**
     * Creates a new coin item at the given location.
     * @param {JellyFish} jellyFish - The jellyfish to create a coin from.
     */
    createNewCoin(jellyFish) {
        let coin = new Coin(jellyFish.x + 70, jellyFish.y + 100);
        this.level.coins.push(coin);
    }

    /**
     * Removes a jellyfish from the level and the game map.
     * @param {JellyFish} jellyFish - The jellyfish to remove.
     */
    removeJellyFish(jellyFish) {
        this.level.jellyFishes = this.level.jellyFishes.filter(fish => fish !== jellyFish);
        this.movableObject.deleteObject(this.ctx, jellyFish);
    }

    /**
     * Starts the final battle by adding the end boss to the level when the shark reaches a certain point.
     */
    createFinalBattle() {
        if (!this.finalBattleStarted && this.shark.x >= this.level.final_battle_x) {
            let finalEnemy = new EndBoss(this.coinCounter);
            this.level.endBoss.push(finalEnemy);
            this.finalBattleStarted = true;
            this.animateEndBoss();
        }
    }

    /**
     * Toggles the animation of the end boss.
     */
    animateEndBoss() {
        if (this.animatedEndBoss) {
            this.level.endBoss.forEach((endBoss) => {
                endBoss.setPlayAnimationSounds();
            });
        } else {
            this.level.endBoss.forEach((endBoss) => {
                endBoss.setStopAnimationSounds();
            });
        }
    }

    /**
     * Main draw loop for rendering the game state to the canvas.
     * Updates and renders all objects, including status bars, enemies, and the player.
     */
    draw() {
        if (this.state !== 'RUNNING') return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.createEndBossStatusBar();
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        this.ctx.font = "40px Bowlby One";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("X " + this.coinCounter.coinsNumber, 1780, 84);
        this.ctx.fillText("X " + this.poisonCounter.poisonsNumber, 1500, 84);
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

    /**
     * Creates and renders the end boss status bar if the end boss is present in the level.
     */
    createEndBossStatusBar() {
        if (this.level.endBoss[0]) {
            this.addToMap(this.endBossStatusBar);
        }
    }

    /**
     * Adds a list of objects to the map by rendering them.
     * @param {Array<Object>} objects - The objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /**
     * Adds a single object to the map and handles direction flipping if necessary.
     * @param {MovableObject} mo - The object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for objects facing the opposite direction.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of an object after it has been flipped.
     * @param {MovableObject} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
