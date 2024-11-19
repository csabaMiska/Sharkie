/**
 * @typedef {Object} Keyboard
 * @property {boolean} LEFT - Represents whether the left arrow key is pressed.
 * @property {boolean} UP - Represents whether the up arrow key is pressed.
 * @property {boolean} RIGHT - Represents whether the right arrow key is pressed.
 * @property {boolean} DOWN - Represents whether the down arrow key is pressed.
 * @property {boolean} SPACE - Represents whether the space bar is pressed.
 * @property {boolean} D - Represents whether the 'D' key is pressed.
 * @property {boolean} M - Represents whether the 'M' key is pressed.
 */

/**
 * The canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The world object representing the game world.
 * @type {World}
 */
let world;

/**
 * The keyboard state object to track key presses.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initializes the game, including fetching the best players and starting the game.
 */
function init() {
    getBestPlayers();
}

/**
 * Event listener for keydown events to track when keys are pressed.
 * @param {KeyboardEvent} e - The keydown event.
 */
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

/**
 * Event listener for keyup events to track when keys are released.
 * @param {KeyboardEvent} e - The keyup event.
 */
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

/**
 * Starts the game by initializing the canvas, creating the world object, and starting the game countdown.
 */
function startGame() {
    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    world = new World(canvas, keyboard);
    world.state = 'RUNNING';
    world.resetGame();
    world.draw();
    startCountdown();
    updateGameOptions();
}

/**
 * Updates game options such as hiding the start menu, setting the music status, and handling music playback.
 */
function updateGameOptions() {
    hideStartMenu();
    getMusicStatus();
    updateMusicIcon();
    updateSoundIcon();
    updateScreenIcon();
    if (MUSIC_ON) {
        gameMusic.play();
    }
}

/**
 * Checks and sets the music status from localStorage, and initializes default values if not set.
 */
function getMusicStatus() {
    let storedStatus = localStorage.getItem('musicStatus');
    if (storedStatus === null) {
        localStorage.setItem('musicStatus', true);
        localStorage.setItem('soundStatus', true);
        toggleSound();
        toggleMusic();
    }
}

/**
 * Pauses the game by changing the world state to 'PAUSED' and setting the game to paused.
 */
function pauseGame() {
    world.state = 'PAUSED';
    world.setGamePaused();
}

/**
 * Resumes the game by changing the world state to 'RUNNING', resuming the game, and hiding the game menu.
 */
function resumeGame() {
    world.state = 'RUNNING';
    world.setGameResume();
    gameMenuBox.classList.add('d-none');
    requestAnimationFrame(() => world.draw());
}

/**
 * Cancels the game, pauses the music, and displays the input box.
 */
function cancelGame() {
    hideGameOver();
    showInputBox();
    gameMusic.pause();
}

/**
 * Restarts the game by hiding the game over box and starting the game again.
 */
function restartGame() {
    gameOverBox.classList.add('d-none');
    startGame();
}

/**
 * Gives up the game, pauses the music, and hides the countdown.
 */
function giveUpGame() {
    world.state = 'GIVE_UP';
    gameMusic.pause();
    countdownElement.style.display = 'none';
    countdownIndex = 0;
    hideGameMenu();
}

/**
 * Event listener for the resume button, triggering the resumeGame function.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resumeBtn').addEventListener('click', function () {
        resumeGame();
    });
});

/**
 * Event listener for the restart game button, triggering the restartGame function.
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('restartGameBtn').addEventListener('click', function () {
        restartGame();
    });
});

/**
 * Event listener for fullscreen change events to pause the game when exiting fullscreen.
 */
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        if (world.state === 'PAUSED') {
            pauseGame();
        }
    } else {
        pauseGame();
    }
});

let countdownNumbers = [3, 2, 1, "Let's Go!"];
let countdownElement = document.getElementById('countdown');
let countdownIndex = 0;
let countdownActive = false;

/**
 * Starts the countdown sequence before the game begins.
 * Displays a countdown and resumes the game after the countdown.
 */
function startCountdown() {
    world.setGamePaused();
    countdownActive = true;
    countdownElement.style.display = 'flex';
    countdownElement.innerText = countdownNumbers[countdownIndex];

    let countdownInterval = setInterval(() => {
        countdownIndex++;
        if (countdownIndex < countdownNumbers.length) {
            countdownElement.innerText = countdownNumbers[countdownIndex];
        } else {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            countdownActive = false;
            countdownIndex = 0;
            if (world.state != 'PAUSED') {
                world.setGameResume();
            }
        }
    }, 1000);
}
