let leaderBoard = document.getElementById('leaderBoard');
let gameOptions = document.getElementById('gameOptions');
let gameInstructions = document.getElementById('gameInstructions');

function showGameOptions() {
    leaderBoard.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    gameOptions.classList.remove('d-none');
}

function hideGameOptions() {
    leaderBoard.classList.remove('d-none');
    gameOptions.classList.add('d-none');
}

function showGameInstructions() {
    leaderBoard.classList.add('d-none');
    gameOptions.classList.add('d-none');
    gameInstructions.classList.remove('d-none');
}

function hideGameInstructions() {
    leaderBoard.classList.remove('d-none');
    gameInstructions.classList.add('d-none');
}