let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    getBestPlayers();
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
    if (e.code === 'KeyM') {
        keyboard.M = true;
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

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.resetGame();
    world.state = 'RUNNING';
    world.draw();
    hideStartMenu();
    getMusicStatus();
    updateMusicIcon();
    updateSoundIcon();
    updateScreenIcon();
    if (MUSIC_ON) {
        gameMusic.play();
    }
}

function getMusicStatus() {
    let storedStatus = localStorage.getItem('musicStatus');
    if (storedStatus === null) {
        localStorage.setItem('musicStatus', true);
        localStorage.setItem('soundStatus', true);
        toggleSoundIcon();
        toggleMusicIcon();
    }
}

function pauseGame() {
    world.state = 'PAUSED';
    world.setGamePaused();
}

function resumeGame() {
    world.state = 'RUNNING';
    world.setGameResume();
    gameMenuBox.classList.add('d-none');
    requestAnimationFrame(() => world.draw());
}

function cancelGame() {
    hideGameOver();
    showInputBox();
    gameMusic.pause();
}

function restartGame() {
    gameOverBox.classList.add('d-none');
    startGame();
}

function giveUpGame() {
    world.state = 'GIVE_UP';
    gameMusic.pause();
    hideGameMenu();
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

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        if (world.state === 'PAUSED') {
            pauseGame();
        }
    } else {
        pauseGame();
    }
});
