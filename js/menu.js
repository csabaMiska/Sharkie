let startMenu = document.getElementById('startMenu');
let leaderBoard = document.getElementById('leaderBoard');
let gameOptions = document.getElementById('gameOptions');
let gameInstructions = document.getElementById('gameInstructions');
let impressum = document.getElementById('impressum');

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