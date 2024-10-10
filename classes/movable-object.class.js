class MovableObject extends DrawableObject {
    speed;
    currentImage = 0;
    otherDirection = false;
    damage;
    energy;
    lastHit = 0;
    lastShock = 0;
    speedY = 0;
    acceleration = 1;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    setPlayObjectAnimation() {
        this.playObjectAnimation = true;
    }

    setStopObjectAnimation() {
        this.playObjectAnimation = false;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    swimmLeft(speed) {
        this.x -= speed;
    }

    swimmRight(speed) {
        this.x += speed;
    }

    swimmUpLeft(speed, speedY) {
        this.y -= speed;
        this.x -= speedY;
    }

    swimmDownLeft(speed, speedY) {
        this.y += speed;
        this.x -= speedY;
    }

    swimmUpRight(speed, speedY) {
        this.y -= speed;
        this.x += speedY;
    }

    swimmDownRight(speed, speedY) {
        this.y += speed;
        this.x += speedY;
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
        if (this.characterIsElektrShocked) {
            return this.y < 500;
        } else {
            return this.y < 700 + Math.random() * 200;
        }
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

    shock() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastShock = new Date().getTime();
        }
    }

    isPoisoned() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 700;
    }

    isShocked() {
        let timePassed = new Date().getTime() - this.lastShock;
        return timePassed < 700;
    }

    isDead() {
        if (this.energy == 0 && this.isPoisoned()) {
            return this.characterIsPoisoned = true;
        } else if (this.energy == 0 && this.isShocked()) {
            return this.characterIsElektrShocked = true;
        }
    }
}