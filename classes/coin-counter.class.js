class CoinCounter extends MovableObject {
    coinsNumber = 0;
    playAnimationSounds = true;

    coinSound = new Audio('audio/game/coin_sound.mp3');

    constructor() {
        super();
    }

    collectCoins() {
        this.coinsNumber += 1;
        if (this.playAnimationSounds) {
            this.coinSound.play();
        }
    }

    collectPrize() {
        this.coinsNumber += 50;
        if (this.playAnimationSounds) {
            this.coinSound.play();
        }
    }

    reset() {
        this.coinsNumber = 0;
    }
}