class Level {

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

    /**
     * Resets the level objects, clearing and re-initializing them for the next attempt.
     * This includes resetting puffer fishes, jelly fishes, coins, and poisons.
     */
    reset() {
        this.resetPufferFishes();
        this.resetJellyFishes();
        this.resetCoins();
        this.resetPoisons();
    }

    /**
     * Resets the puffer fishes by clearing the current array and re-creating 20 new PufferFish objects.
     */
    resetPufferFishes() {
        this.pufferFishes = [];
        for (let i = 0; i < 15; i++) {
            this.pufferFishes.push(new PufferFish());
        }
    }

    /**
     * Resets the jelly fishes by clearing the current array and re-creating 15 new JellyFish objects.
     */
    resetJellyFishes() {
        this.jellyFishes = [];
        for (let i = 0; i < 10; i++) {
            this.jellyFishes.push(new JellyFish());
        }
    }

    /**
     * Resets the coins by clearing the current array and re-adding coins from a predefined array (`level1Coins`).
     */
    resetCoins() {
        this.coins = [];
        for (let i = 0; i < level1Coins.length; i++) {
            const level1Coin = level1Coins[i];
            this.coins.push(level1Coin);
        }
    }

    /**
     * Resets the poisons by clearing the current array and re-creating 25 new Poison objects.
     */
    resetPoisons() {
        this.poisons = [];
        for (let i = 0; i < 25; i++) {
            this.poisons.push(new Poison());
        }
    }
}
