class CoinCounter extends MovableObject {
    coinsNumber = 0;
    playAnimationSounds = true;

    coinSound = new Audio('audio/game/coin_sound.mp3');

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
