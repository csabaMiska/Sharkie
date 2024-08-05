const level1 = new Level(
    [
        new PufferFish(1000),
        new PufferFish(1000),
        new PufferFish(2000),
        new PufferFish(2000),
        new PufferFish(3000),
        new PufferFish(3000)
    ],
    [
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish()
    ],
    [
        new EndBoss()
    ],
    [
        new Coin(650, 600),
        new Coin(750, 600),
        new Coin(850, 600),
        new Coin(950, 600),
        new Coin(1050, 600),
        new Coin(1150, 600)
    ],
    [
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison()
    ],
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
        new BackgroundObjects('img/3. Background/Layers/2. Floor/D2.png', 1920, 0)
    ],
    [
        level_end_x = 3100,
    ],
    [
        final_battle_x = 1920,
    ]
);