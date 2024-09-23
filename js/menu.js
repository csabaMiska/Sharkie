let startMenu = document.getElementById('startMenu');
let leaderBoard = document.getElementById('leaderBoard');
let gameOptions = document.getElementById('gameOptions');
let gameInstructions = document.getElementById('gameInstructions');
let impressum = document.getElementById('impressum');
let gameOverBox = document.getElementById('gameOverBox');
let scoreInputBox = document.getElementById('scoreInputBox');
let gameMenuBox = document.getElementById('gameMenuBox');
let gameWinScreen = document.getElementById('gameWinScreen');

function showGameOptions() {
    leaderBoard.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    impressum.classList.add('d-none');
    gameOptions.classList.remove('d-none');
}

function hideGameOptions() {
    leaderBoard.classList.remove('d-none');
    gameOptions.classList.add('d-none');
}

function showGameInstructions() {
    leaderBoard.classList.add('d-none');
    gameOptions.classList.add('d-none');
    impressum.classList.add('d-none');
    gameInstructions.classList.remove('d-none');
}

function hideGameInstructions() {
    leaderBoard.classList.remove('d-none');
    gameInstructions.classList.add('d-none');
}

function showGameImpressum() {
    leaderBoard.classList.add('d-none');
    gameOptions.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    impressum.classList.remove('d-none');
}

function hideGameImpressum() {
    leaderBoard.classList.remove('d-none');
    impressum.classList.add('d-none');
}

function hideStartMenu() {
    startMenu.classList.add('d-none');
}

function cancelGame() {
    gameOverBox.classList.add('d-none');
    scoreInputBox.classList.remove('d-none');
}

function cancelSaveScore() {
    scoreInputBox.classList.add('d-none');
    startMenu.classList.remove('d-none');
}

function giveUpGame() {
    gameMenuBox.classList.add('d-none');
    startMenu.classList.remove('d-none');
}

let gameMenu = false;

function showGameMenü() {
    if (keyboard.ESC && !gameMenu) {
        pauseGame();
        keyboard.ESC = false;
        gameMenu = true;
        gameMenuBox.classList.remove('d-none');
    } 

    if (keyboard.ESC && gameMenu) {
        resumeGame();
        keyboard.ESC = false;
        gameMenu = false;
        gameMenuBox.classList.add('d-none');
    }
}
