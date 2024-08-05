class MovableObject extends DrawableObject {
    speed;
    currentImage = 0;
    otherDirection = false;
    energy;
    lastHit = 0;
    speedY = 0;
    acceleration = 1;
    poisonsNumber = 100;
    coinsNumber = 200;

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    swimmLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60)
    }

    swimmUp(speed) {
        setInterval(() => {
            this.y -= speed;
            this.x += 2;
        }, 1000 / 60)
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 700;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 700;
    }

    isDead() {
        return this.energy == 0;
    }
}