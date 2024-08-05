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
}