class World {
    canvas;
    ctx;
    shark = new Shark();
    level = level1;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.level.enemies);

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
        mo.draw(this.ctx);
    }
}