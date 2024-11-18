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
            this.coinSound.loop = true;
            this.coinSound.play();
            this.stopPlaySound();
        }
    }

    stopPlaySound() {
        setTimeout(() => {
            this.coinSound.pause();
        }, 2000);
    }

    reset() {
        this.coinsNumber = 0;
    }
}