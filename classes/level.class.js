class Level {
    pufferFishes;
    jellyFishes;
    backgroundObjects;
    level_end_x;
    final_battle_x;

    constructor(pufferFishes, jellyFishes, backgroundObjects, level_end_x, final_battle_x) {
        this.pufferFishes = pufferFishes;
        this.jellyFishes = jellyFishes;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.final_battle_x = final_battle_x;
    }
}