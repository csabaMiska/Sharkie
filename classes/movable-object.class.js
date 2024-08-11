class MovableObject extends DrawableObject {
    speed;
    currentImage = 0;
    otherDirection = false;
    characterIsDead = false;
    energy = 100;
    lastHit = 0;
    speedY = 0;
    acceleration = 1;
    poisonsNumber = 0;
    coinsNumber = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

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
            this.x -= 2;
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
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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

    deleteObject(ctx, object) {
        ctx.clearRect(object.x, object.y, object.width, object.height);
    }

    collectCoins() {
        this.coinsNumber += 1;
    }

    collectPoison() {
        this.poisonsNumber += 1;
    }
}