class Level {
    enemies;
    backgroundObjects;
    level_end_x;
    final_battle_x;

    constructor(enemies, backgroundObjects, level_end_x, final_battle_x) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.final_battle_x = final_battle_x;
    }
}