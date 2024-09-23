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
        this.pufferFishes = [
            new PufferFish(2000),
            new PufferFish(2000),
            new PufferFish(2000),
            new PufferFish(2000),
            new PufferFish(2000)
        ];
        this.jellyFishes = [
            new JellyFish(),
            new JellyFish()
        ];
        this.endBoss = []; 
        this.coins = [
            new Coin(650, 600),
            new Coin(750, 600),
            new Coin(850, 600),
            new Coin(950, 600),
            new Coin(1050, 600),
            new Coin(1150, 600)
        ];
        this.poisons = [
            new Poison(),
            new Poison(),
            new Poison(),
            new Poison(),
            new Poison(),
            new Poison(),
            new Poison()
        ];
        this.backgroundObjects = [
            new BackgroundObjects('img/3. Background/Layers/5. Water/D2.png', -1920, 0),
            new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D2.png', -1920, 0),
            new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D2.png', -1920, 0),
            new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', -1920, 0),
            new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', -1920, 0),
            new BackgroundObjects('img/3. Background/Layers/5. Water/D1.png', 0, 0),
            new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D1.png', 0, 0),
            new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0),
            new BackgroundObjects('img/3. Background/Layers/1. Light/1.png', 0, 0),
            new BackgroundObjects('img/3. Background/Layers/2. Floor/D1.png', 0, 0),
            new BackgroundObjects('img/3. Background/Layers/5. Water/D2.png', 1920, 0),
            new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D2.png', 1920, 0),
            new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D2.png', 1920, 0),
            new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', 1920, 0),
            new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', 1920, 0)
        ];
    }
}