/**
 * Represents a level in the game. The level contains various objects such as puffer fishes, jelly fishes,
 * an end boss, coins, poisons, background objects, and information about the level's boundaries and final battle.
 */
class Level {
    /**
     * Creates a new level instance with specified objects and level boundaries.
     * 
     * @param {Array} pufferFishes - An array of PufferFish objects in the level.
     * @param {Array} jellyFishes - An array of JellyFish objects in the level.
     * @param {EndBoss} endBoss - The final boss of the level.
     * @param {Array} coins - An array of Coin objects in the level.
     * @param {Array} poisons - An array of Poison objects in the level.
     * @param {Array} backgroundObjects - An array of background objects that are part of the level's environment.
     * @param {number} level_end_x - The x-coordinate where the level ends.
     * @param {number} final_battle_x - The x-coordinate where the final battle begins.
     */
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
        for (let i = 0; i < 20; i++) {
            this.pufferFishes.push(new PufferFish());
        }
    }

    /**
     * Resets the jelly fishes by clearing the current array and re-creating 15 new JellyFish objects.
     */
    resetJellyFishes() {
        this.jellyFishes = [];
        for (let i = 0; i < 15; i++) {
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
