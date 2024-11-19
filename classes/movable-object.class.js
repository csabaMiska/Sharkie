/**
 * Represents a movable object in the game that can be drawn and animated. The object has properties such as speed,
 * energy, damage, gravity, and methods for performing various actions such as movement, collision detection, and animation.
 * It can also be affected by poison, shock, and gravity.
 */
class MovableObject extends DrawableObject {
    /**
     * The speed of the object.
     * @type {number}
     */
    speed;

    /**
     * The current image index for animation.
     * @type {number}
     */
    currentImage = 0;

    /**
     * A boolean indicating if the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The damage the object can inflict.
     * @type {number}
     */
    damage;

    /**
     * The energy level of the object.
     * @type {number}
     */
    energy;

    /**
     * The timestamp of the last hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The timestamp of the last shock.
     * @type {number}
     */
    lastShock = 0;

    /**
     * The vertical speed (used for gravity).
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration applied to the object's vertical movement.
     * @type {number}
     */
    acceleration = 1;

    /**
     * The offset for the object's collision boundaries (top, bottom, left, right).
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Enables animation sounds for the object.
     */
    setPlayAnimationSounds() {
        this.playAnimationSounds = true;
    }

    /**
     * Disables animation sounds for the object.
     */
    setStopAnimationSounds() {
        this.playAnimationSounds = false;
    }

    /**
     * Enables object animation.
     */
    setPlayObjectAnimation() {
        this.playObjectAnimation = true;
    }

    /**
     * Disables object animation.
     */
    setStopObjectAnimation() {
        this.playObjectAnimation = false;
    }

    /**
     * Plays the animation for the object based on a given array of image paths.
     * The current image index is used to determine the next image in the animation.
     * 
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object left by a certain speed.
     * 
     * @param {number} speed - The speed at which to move the object to the left.
     */
    swimmLeft(speed) {
        this.x -= speed;
    }

    /**
     * Moves the object right by a certain speed.
     * 
     * @param {number} speed - The speed at which to move the object to the right.
     */
    swimmRight(speed) {
        this.x += speed;
    }

    /**
     * Moves the object up and left by specified speeds.
     * 
     * @param {number} speed - The speed at which to move the object upward.
     * @param {number} speedY - The speed at which to move the object leftward.
     */
    swimmUpLeft(speed, speedY) {
        this.y -= speed;
        this.x -= speedY;
    }

    /**
     * Moves the object down and left by specified speeds.
     * 
     * @param {number} speed - The speed at which to move the object downward.
     * @param {number} speedY - The speed at which to move the object leftward.
     */
    swimmDownLeft(speed, speedY) {
        this.y += speed;
        this.x -= speedY;
    }

    /**
     * Moves the object up and right by specified speeds.
     * 
     * @param {number} speed - The speed at which to move the object upward.
     * @param {number} speedY - The speed at which to move the object rightward.
     */
    swimmUpRight(speed, speedY) {
        this.y -= speed;
        this.x += speedY;
    }

    /**
     * Moves the object down and right by specified speeds.
     * 
     * @param {number} speed - The speed at which to move the object downward.
     * @param {number} speedY - The speed at which to move the object rightward.
     */
    swimmDownRight(speed, speedY) {
        this.y += speed;
        this.x += speedY;
    }

    /**
     * Applies gravity to the object. This function continuously increases the vertical speed and moves the object down,
     * simulating the effects of gravity, as long as the object is above the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above the ground, considering whether it is shocked.
     * If the object is shocked, it will have a lower threshold for being considered "above ground."
     * 
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this.characterIsElektrShocked) {
            return this.y < 500;
        } else {
            return this.y < 700 + Math.random() * 200;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy by 20 units when it is hit. If energy drops below 0, it is set to 0.
     * Updates the timestamp of the last hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the object's energy by 20 units when it is shocked. If energy drops below 0, it is set to 0.
     * Updates the timestamp of the last shock.
     */
    shock() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastShock = new Date().getTime();
        }
    }

    /**
     * Checks if the object is poisoned by checking if the last hit occurred within the past 700ms.
     * 
     * @returns {boolean} True if the object is poisoned, otherwise false.
     */
    isPoisoned() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 700;
    }

    /**
     * Checks if the object is shocked by checking if the last shock occurred within the past 700ms.
     * 
     * @returns {boolean} True if the object is shocked, otherwise false.
     */
    isShocked() {
        let timePassed = new Date().getTime() - this.lastShock;
        return timePassed < 700;
    }

    /**
     * Checks if the object is dead. The object is considered dead if its energy reaches 0 and it is either poisoned or shocked.
     * 
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        if (this.energy == 0 && this.isPoisoned()) {
            return this.characterIsPoisoned = true;
        } else if (this.energy == 0 && this.isShocked()) {
            return this.characterIsElektrShocked = true;
        }
    }
}
