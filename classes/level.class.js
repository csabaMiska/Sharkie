class Level {
    pufferFishes;
    jellyFishes;
    endBoss;
    coins;
    poisons;
    backgroundObjects;
    level_end_x;
    final_battle_x;

    constructor(pufferFishes, jellyFishes, endBoss, coins, poisons, backgroundObjects, level_end_x, final_battle_x) {
        this.pufferFishes = pufferFishes;
        this.jellyFishes = jellyFishes;
        this.endBoss = endBoss;
        this.coins = coins;
        this.poisons = poisons;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.final_battle_x = final_battle_x;
    }

    reset() {
        this.resetPufferFishes();
        this.resetJellyFishes();
        this.resetCoins();
        this.resetPoisons();
    }

    resetPufferFishes() {
        this.pufferFishes = [];
        for (let i = 0; i < 20; i++) {
            this.pufferFishes.push(new PufferFish());
        }
    }

    resetJellyFishes() {
        this.jellyFishes = [];
        for (let i = 0; i < 15; i++) {
            this.jellyFishes.push(new JellyFish());
        }
    }

    resetCoins() {
        this.coins = [];
        for (let i = 0; i < level1Coins.length; i++) {
            const level1Coin = level1Coins[i];
            this.coins.push(level1Coin);
        }
    }

    resetPoisons() {
        this.poisons = [];
        for (let i = 0; i < 25; i++) {
            this.poisons.push(new Poison());
        }
    }
}