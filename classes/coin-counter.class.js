class CoinCounter extends DrawableObject {
    coinsNumber = 0;

    constructor() {
        super();
    }

    collectCoins() {
        this.coinsNumber += 1;
    }
}