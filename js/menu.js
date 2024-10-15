let main = document.getElementById('main');
let startMenu = document.getElementById('startMenu');
let leaderBoard = document.getElementById('leaderBoard');
let gameOptions = document.getElementById('gameOptions');
let gameInstructions = document.getElementById('gameInstructions');
let impressum = document.getElementById('impressum');
let gameOverBox = document.getElementById('gameOverBox');
let scoreInputBox = document.getElementById('scoreInputBox');
let gameMenuBox = document.getElementById('gameMenuBox');
let gameWinScreen = document.getElementById('gameWinScreen');
let playerScore = document.getElementById('playerScore');
let landscapeWarning = document.getElementById('landscapeWarning');
let mobileOverlay = document.getElementById('mobileOverlay');

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

function showGameOver() {
    gameOverBox.classList.remove('d-none');
}

function cancelGame() {
    gameOverBox.classList.add('d-none');
    showInputBox();
}

function showGameWin() {
    gameWinScreen.classList.remove('d-none');
    setTimeout(() => {
        showInputBox();
    }, 3000);
}

function hideGameWin() {
    gameWinScreen.classList.add('d-none');
}

function showInputBox() {
    showPlayerScore();
    scoreInputBox.classList.remove('d-none');
}

function cancelSaveScore() {
    scoreInputBox.classList.add('d-none');
    mobileOverlay.classList.add('d-none');
    startMenu.classList.remove('d-none');
    hideGameWin();
}

function hideGameMenu() {
    gameMenuBox.classList.add('d-none');
    mobileOverlay.classList.add('d-none');
    startMenu.classList.remove('d-none');
}

function saveSettings() {
    fullScreen();
    // Hier kommmt die mehrere Optionen rein.
    hideGameOptions();
}


function fullScreen() {
    let fullScreen = document.getElementById('fullScreen');
    let window = document.getElementById('window');

    if (fullScreen.checked) {
        enterFullscreen(main);
    } else if (window.checked) {
        exitFullscreen();
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

let gameMenu = false;

function checkGameMenu() {
    if (keyboard.M && !gameMenu) {
        pauseGame();
        keyboard.M = false;
        gameMenu = true;
        gameMenuBox.classList.remove('d-none');
    }

    if (keyboard.M && gameMenu) {
        resumeGame();
        keyboard.M = false;
        gameMenu = false;
        gameMenuBox.classList.add('d-none');
    }
}

function showGameMenu() {
    pauseGame();
    gameMenu = true;
    gameMenuBox.classList.remove('d-none');
}

window.addEventListener('resize', function () {
    if (window.innerHeight > window.innerWidth) {
        landscapeWarning.style.display = 'flex';
        main.style.display = 'none';
        if (world) {
            world.setGamePaused();
        }
    } else {
        landscapeWarning.style.display = 'none';
        main.style.display = 'flex';
        if (world) {
            world.setGameResume();
        }
    }
});

let musicIconContainer = document.getElementById('musicIcon');
let musicIconOff = `<path xmlns="http://www.w3.org/2000/svg" d="M792-56 56-792l56-56 736 736-56 56ZM560-514l-80-80v-246h240v160H560v166ZM400-120q-66 
0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-62l80 80v120q0 66-47 113t-113 47Z"/>`;
let musicIconOn = `<path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />`;
let MUSIC_ON = false;

function toggleMusicIcon() {
    if (!MUSIC_ON) {
        musicIconContainer.innerHTML = '';
        musicIconContainer.innerHTML = musicIconOn;
        MUSIC_ON = true;
    } else {
        musicIconContainer.innerHTML = '';
        musicIconContainer.innerHTML = musicIconOff;
        MUSIC_ON = false;
    }
}

let soundIconContainer = document.getElementById('soundIcon');
let soundIconOn = `<path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 
127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 
86H200v80h114l86 86v-252ZM300-480Z" />`;
let soundIconOff = `<path xmlns="http://www.w3.org/2000/svg" d="M280-360v-240h160l200-200v640L440-360H280Zm80-80h114l86 86v-252l-86 86H360v80Zm100-40Z"/>`;
let SOUND_ON = false;

function toggleSoundIcon() {
    if (!SOUND_ON) {
        soundIconContainer.innerHTML = '';
        soundIconContainer.innerHTML = soundIconOn;
        SOUND_ON = true;
    } else {
        soundIconContainer.innerHTML = '';
        soundIconContainer.innerHTML = soundIconOff;
        SOUND_ON = false;
    }
}

window.addEventListener('resize', showMobilBtn);

function showMobilBtn() {
    if (world) {
        if (window.screen.height < 1080 && window.screen.width < 1920) {
            mobileOverlay.classList.remove('d-none');
        } else {
            mobileOverlay.classList.add('d-none');
        }
    }
}