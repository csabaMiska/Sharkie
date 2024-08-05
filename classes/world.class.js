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
    counters = new MovableObject();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.swimming();
    }

    setWorld() {
        this.shark.world = this;
    }

    swimming() {
        setInterval(() => {
            this.checkCollisions();
        }, 200);
    }

    checkCollisions() {
        this.level.pufferFishes.forEach((pufferFish) => {
            if (this.shark.isColliding(pufferFish)) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
        });

        this.level.jellyFishes.forEach((jellyFish) => {
            if (this.shark.isColliding(jellyFish)) {
                this.shark.hit();
                this.statusBar.setPercentage(this.shark.energy);
            }
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
        this.ctx.font = "50px Bowlby One";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("X " + this.counters.coinsNumber, 1700, 84);
        this.ctx.fillText("X " + this.counters.poisonsNumber, 1300, 84);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.shark);
        this.addObjectsToMap(this.level.pufferFishes);
        this.addObjectsToMap(this.level.jellyFishes);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.level.endBoss);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}