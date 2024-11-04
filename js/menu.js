let main = document.getElementById('main');
let startMenu = document.getElementById('startMenu');
let leaderBoard = document.getElementById('leaderBoard');
let gameRanking = document.getElementById('gameRanking');
let gameInstructions = document.getElementById('gameInstructions');
let impressum = document.getElementById('impressum');
let gameOverBox = document.getElementById('gameOverBox');
let scoreInputBox = document.getElementById('scoreInputBox');
let gameMenuBox = document.getElementById('gameMenuBox');
let gameWinScreen = document.getElementById('gameWinScreen');
let playerScore = document.getElementById('playerScore');
let landscapeWarning = document.getElementById('landscapeWarning');
let mobileOverlay = document.getElementById('mobileOverlay');


function showGameRanking() {
    leaderBoard.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    impressum.classList.add('d-none');
    gameRanking.classList.remove('d-none');
}

function hideGameRanking() {
    leaderBoard.classList.remove('d-none');
    gameRanking.classList.add('d-none');
}

function showGameInstructions() {
    leaderBoard.classList.add('d-none');
    gameRanking.classList.add('d-none');
    impressum.classList.add('d-none');
    gameInstructions.classList.remove('d-none');
}

function hideGameInstructions() {
    leaderBoard.classList.remove('d-none');
    gameInstructions.classList.add('d-none');
}

function showGameImpressum() {
    leaderBoard.classList.add('d-none');
    gameRanking.classList.add('d-none');
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

function hideGameOver() {
    gameOverBox.classList.add('d-none');
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
    MUSIC_ON = false;
    FULL_SCREEN = false;
    toggleMusicIcon();
    hideGameWin();
}

function hideGameMenu() {
    gameMenuBox.classList.add('d-none');
    mobileOverlay.classList.add('d-none');
    startMenu.classList.remove('d-none');
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

let musicIconContainer = document.getElementById('musicIconContainer');
let musicIcon = document.getElementById('musicIcon');
let musicIconOff = returnMusicOffSvg();
let musicIconOn = retunrMusicOnSvg();
let MUSIC_ON = true;
let gameMusic = new Audio('audio/game/game_sound.mp3');
gameMusic.loop = true; 

function toggleMusicIcon() {
    if (MUSIC_ON) {
        musicIcon.innerHTML = '';
        musicIcon.innerHTML = musicIconOn;
        musicIcon.style.fill = 'rgb(27, 20, 100)';
        musicIconContainer.style.backgroundColor = 'rgb(252, 238, 33)';
        MUSIC_ON = false;
        gameMusic.play();
    } else {
        musicIcon.innerHTML = '';
        musicIcon.innerHTML = musicIconOff;
        musicIcon.style.fill = 'white';
        musicIconContainer.style.backgroundColor = 'red';
        MUSIC_ON = true;
        gameMusic.pause();
    }
}

let soundIconContainer = document.getElementById('soundIconContainer');
let soundIcon = document.getElementById('soundIcon');
let soundIconOn = returnSoundOnSvg();
let soundIconOff = returnSoundOffSvg();
let SOUND_ON = false;

function toggleSoundIcon() {
    if (!SOUND_ON) {
        soundIcon.innerHTML = '';
        soundIcon.innerHTML = soundIconOn;
        soundIcon.style.fill = 'rgb(27, 20, 100)';
        soundIconContainer.style.backgroundColor = 'rgb(252, 238, 33)';
        SOUND_ON = true;
        world.playGameSounds();
    } else {
        soundIcon.innerHTML = '';
        soundIcon.innerHTML = soundIconOff;
        soundIcon.style.fill = 'white';
        soundIconContainer.style.backgroundColor = 'red';
        SOUND_ON = false;
        world.muteGameSounds();
    }
}

let screenIconContainer = document.getElementById('screenIcon');
let fullScreenIcon = returnFullScreenSvg();
let windowScreeIcon = returnWindowsScreenSvg();
let FULL_SCREEN = false;

function toggleScreenIcon() {
    if (!FULL_SCREEN) {
        screenIconContainer.innerHTML = '';
        screenIconContainer.innerHTML = fullScreenIcon;
        FULL_SCREEN = true;
        if (document.fullscreenElement) {
            exitFullscreen();
        }
    } else {
        screenIconContainer.innerHTML = '';
        screenIconContainer.innerHTML = windowScreeIcon;
        FULL_SCREEN = false;
        enterFullscreen(main);
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (document.mozRequestFullScreen) {
        document.mozRequestFullScreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}

function showMobilBtn() {
    if (world && world.state === 'RUNNING') {
        if (window.screen.height < 1080 && window.screen.width < 1920) {
            mobileOverlay.classList.remove('d-none');
        } else {
            mobileOverlay.classList.add('d-none');
        }
    }
}

let leaderBoardRow = document.getElementById('leaderBoardRow');

function renderLeaderBoard(leaderBoard) {
    leaderBoard.sort(function (a, b) {
        return parseInt(b.scoreofplayer) - parseInt(a.scoreofplayer);
    });

    leaderBoardRow.innerHTML = '';
    showBestPlayers(leaderBoard);
    //deletePlayers(leaderBoard);
}

function showBestPlayers(leaderBoard) {
    for (let i = 0; i < Math.min(10, leaderBoard.length); i++) {
        const player = leaderBoard[i];
        const place = i + 1;
        leaderBoardRow.innerHTML += createLeaderBoard(place, player);
    }
}

function deletePlayers(leaderBoard) {
    for (let i = 10; i < leaderBoard.length; i++) {
        const playerToDelete = leaderBoard[i];
        const playerID = playerToDelete.idofplayer;
        deletePlayer(playerID);
    }
}