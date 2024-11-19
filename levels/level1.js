/**
 * Represents the first level of the game with various objects, enemies, and background layers.
 * @class
 */
const level1 = new Level(
    /**
     * List of pufferfish enemies in the level.
     * @type {Array<Enemy>}
     */
    [
        // pufferFish
    ],
    
    /**
     * List of jellyfish enemies in the level.
     * @type {Array<Enemy>}
     */
    [
        // jellyFish
    ],
    
    /**
     * List of the end boss for the level.
     * @type {Array<Enemy>}
     */
    [
        // endBoss
    ],
    
    /**
     * List of coins scattered throughout the level.
     * @type {Array<Coin>}
     */
    [
        // coins
    ],
    
    /**
     * List of poisons scattered throughout the level.
     * @type {Array<Poison>}
     */
    [
        // poisons
    ],
    
    /**
     * List of background objects (layers) that move as the player progresses.
     * @type {Array<BackgroundObjects>}
     */
    [
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
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', 1920, 0),
    
        new BackgroundObjects('img/3. Background/Layers/5. Water/D1.png', 3840, 0),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D1.png', 3840, 0),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D1.png', 3840, 0),
        new BackgroundObjects('img/3. Background/Layers/1. Light/1.png', 3840, 0),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D1.png', 3840, 0),
    
        new BackgroundObjects('img/3. Background/Layers/5. Water/D2.png', 5760, 0),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D2.png', 5760, 0),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D2.png', 5760, 0),
        new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', 5760, 0),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', 5760, 0),
    
        new BackgroundObjects('img/3. Background/Layers/5. Water/D1.png', 7680, 0),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D1.png', 7680, 0),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D1.png', 7680, 0),
        new BackgroundObjects('img/3. Background/Layers/1. Light/1.png', 7680, 0),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D1.png', 7680, 0),
    
        new BackgroundObjects('img/3. Background/Layers/5. Water/D2.png', 9600, 0),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/D2.png', 9600, 0),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/D2.png', 9600, 0),
        new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', 9600, 0),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', 9600, 0)
    ],
    
    /**
     * X-coordinate at which the level ends.
     * @type {number}
     */
    [
        level_end_x = 8506,
    ],
    
    /**
     * X-coordinate marking the start of the final battle in the level.
     * @type {number}
     */
    [
        final_battle_x = 7680,
    ]
);
