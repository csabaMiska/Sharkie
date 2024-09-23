let canvas;
let world;
let keyboard = new Keyboard();

function init() {

}

window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = true;
    }
    if (e.code === 'KeyD') {
        keyboard.D = true;
    }
    if (e.code === 'Escape') {
        keyboard.ESC = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = false;
    }
    if (e.code === 'KeyD') {
        keyboard.D = false;
    }
});

function checkGameState() {
    let gameStateInterval = setInterval(() => {
        gameOver(gameStateInterval);
        gameWin(gameStateInterval);
        showGameMenü();
    }, 1000 / 60);
}

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.state = 'RUNNING';
    world.draw();
    hideStartMenu();
    checkGameState()
}

function gameOver(gameStateInterval) {
    if (world.shark.energy <= 0) {
        clearInterval(gameStateInterval);
        setTimeout(() => {
            world.state = 'GAME_OVER';
            console.log(world.state);
            gameOverBox.classList.remove('d-none');
        }, 2000);
    }
}

function gameWin(gameStateInterval) {
    let endBoss = world.level.endBoss[0];

    if (endBoss && endBoss.energy <= 0) {
        clearInterval(gameStateInterval);
        setTimeout(() => {
            world.state = 'GAME_WIN';
            console.log(world.state);
            gameWinScreen.classList.remove('d-none'); 
        }, 2000);
    }
}

function pauseGame() {
    world.state = 'PAUSED';
}

function restartGame() {
    state = 'RESTART_GAME';
    gameOverBox.classList.add('d-none');
    resetGame();
    startGame();
}

function resetGame() {
    world.level.reset();
    world.coinCounter.reset();
    world.poisonCounter.reset();
}

function resumeGame() {
    if (world.state === 'PAUSED') {
        world.state = 'RUNNING';
        gameMenuBox.classList.add('d-none');
        requestAnimationFrame(() => world.draw());
    }
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resumeBtn').addEventListener('click', function () {
        resumeGame();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('restartGameBtn').addEventListener('click', function () {
        restartGame();
    });
});