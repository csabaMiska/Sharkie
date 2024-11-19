/**
 * Represents a coin counter that tracks the number of coins collected by the player.
 * This class extends MovableObject for potential movement or shared functionality.
 * 
 * @extends MovableObject
 */
class CoinCounter extends MovableObject {
    /**
     * The number of coins collected by the player.
     * @type {number}
     */
    coinsNumber = 0;

    /**
     * Determines whether sound effects should play when coins are collected.
     * @type {boolean}
     */
    playAnimationSounds = true;

    /**
     * The sound effect played when a coin is collected.
     * @type {Audio}
     */
    coinSound = new Audio('audio/game/coin_sound.mp3');

    /**
     * Creates a new CoinCounter instance.
     */
    constructor() {
        super();
    }

    /**
     * Increments the coin counter by one and plays a sound if enabled.
     */
    collectCoins() {
        this.coinsNumber += 1;
        if (this.playAnimationSounds) {
            this.coinSound.play();
        }
    }

    /**
     * Increments the coin counter by 50 (e.g., for a special prize) and plays a sound if enabled.
     */
    collectPrize() {
        this.coinsNumber += 50;
        if (this.playAnimationSounds) {
            this.coinSound.play();
        }
    }

    /**
     * Resets the coin counter to zero.
     */
    reset() {
        this.coinsNumber = 0;
    }
}
