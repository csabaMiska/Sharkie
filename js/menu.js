// Get DOM elements
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
let playerPoisons = document.getElementById('playerPoisons');
let landscapeWarning = document.getElementById('landscapeWarning');
let mobileOverlay = document.getElementById('mobileOverlay');

// Functions for showing and hiding different game sections

/**
 * Displays the game ranking section and fetches all saved players.
 * @function showGameRanking
 */
function showGameRanking() {
    leaderBoard.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    impressum.classList.add('d-none');
    gameRanking.classList.remove('d-none');
    getAllSavedPlayers();
}

/**
 * Hides the game ranking section and shows the leaderboard.
 * @function hideGameRanking
 */
function hideGameRanking() {
    leaderBoard.classList.remove('d-none');
    gameRanking.classList.add('d-none');
}

/**
 * Displays the game instructions section.
 * @function showGameInstructions
 */
function showGameInstructions() {
    leaderBoard.classList.add('d-none');
    gameRanking.classList.add('d-none');
    impressum.classList.add('d-none');
    gameInstructions.classList.remove('d-none');
}

/**
 * Hides the game instructions section and shows the leaderboard.
 * @function hideGameInstructions
 */
function hideGameInstructions() {
    leaderBoard.classList.remove('d-none');
    gameInstructions.classList.add('d-none');
}

/**
 * Displays the impressum (credits) section.
 * @function showGameImpressum
 */
function showGameImpressum() {
    leaderBoard.classList.add('d-none');
    gameRanking.classList.add('d-none');
    gameInstructions.classList.add('d-none');
    impressum.classList.remove('d-none');
}

/**
 * Hides the impressum (credits) section and shows the leaderboard.
 * @function hideGameImpressum
 */
function hideGameImpressum() {
    leaderBoard.classList.remove('d-none');
    impressum.classList.add('d-none');
}

/**
 * Hides the start menu.
 * @function hideStartMenu
 */
function hideStartMenu() {
    startMenu.classList.add('d-none');
}

/**
 * Displays the game over screen.
 * @function showGameOver
 */
function showGameOver() {
    gameOverBox.classList.remove('d-none');
}

/**
 * Hides the game over screen.
 * @function hideGameOver
 */
function hideGameOver() {
    gameOverBox.classList.add('d-none');
}

/**
 * Displays the game win screen, waits for 3 seconds, then shows the input box.
 * @function showGameWin
 */
function showGameWin() {
    gameWinScreen.classList.remove('d-none');
    setTimeout(() => {
        showInputBox();
    }, 3000);
}

/**
 * Hides the game win screen.
 * @function hideGameWin
 */
function hideGameWin() {
    gameWinScreen.classList.add('d-none');
}

/**
 * Displays the score input box and updates player score and poison values.
 * @function showInputBox
 */
function showInputBox() {
    showPlayerScore();
    showPlayerPoisons();
    scoreInputBox.classList.remove('d-none');
}

/**
 * Updates and displays the player's score.
 * @function showPlayerScore
 */
function showPlayerScore() {
    let score = world.coinCounter.coinsNumber;
    playerScore.innerHTML = score;
}

/**
 * Updates and displays the player's poisons.
 * @function showPlayerPoisons
 */
function showPlayerPoisons() {
    let poisons = world.poisonCounter.poisonsNumber;
    playerPoisons.innerHTML = poisons;
}

/**
 * Hides the score input box and overlay, and shows the start menu.
 * @function cancelSaveScore
 */
function cancelSaveScore() {
    scoreInputBox.classList.add('d-none');
    mobileOverlay.classList.add('d-none');
    startMenu.classList.remove('d-none');
    hideGameWin();
}

/**
 * Hides the game menu and shows the start menu.
 * @function hideGameMenu
 */
function hideGameMenu() {
    gameMenuBox.classList.add('d-none');
    mobileOverlay.classList.add('d-none');
    startMenu.classList.remove('d-none');
}

// Game menu toggle functionality

let gameMenu = false;

/**
 * Toggles the game menu on/off using the 'M' key.
 * @function checkGameMenu
 */
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

/**
 * Displays the game menu and pauses the game.
 * @function showGameMenu
 */
function showGameMenu() {
    pauseGame();
    gameMenu = true;
    gameMenuBox.classList.remove('d-none');
}

// Landscape warning on resize

/**
 * Adjusts the UI when the window is resized. Displays a landscape warning on mobile.
 * @function
 */
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
        if (world && !countdownActive) {
            world.setGameResume();
        }
    }
});

// Music and sound control

/**
 * Updates the music icon and background color based on the music status.
 * @function updateMusicIcon
 */
function updateMusicIcon() {
    if (MUSIC_ON) {
        musicIcon.innerHTML = musicIconOn;
        musicIcon.style.fill = 'rgb(27, 20, 100)';
        musicIconContainer.style.backgroundColor = 'rgb(252, 238, 33)';
    } else {
        musicIcon.innerHTML = musicIconOff;
        musicIcon.style.fill = 'white';
        musicIconContainer.style.backgroundColor = 'red';
    }
}

/**
 * Toggles the game music on/off and updates the icon.
 * @function toggleMusic
 */
function toggleMusic() {
    MUSIC_ON = !MUSIC_ON; 
    localStorage.setItem('musicStatus', MUSIC_ON); 

    updateMusicIcon();

    if (MUSIC_ON) {
        gameMusic.play();
    } else {
        gameMusic.pause();
    } 
}

/**
 * Updates the sound icon and background color based on the sound status.
 * @function updateSoundIcon
 */
function updateSoundIcon() {
    if (SOUND_ON) {
        soundIcon.innerHTML = soundIconOn;
        soundIcon.style.fill = 'rgb(27, 20, 100)';
        soundIconContainer.style.backgroundColor = 'rgb(252, 238, 33)';
    } else {
        soundIcon.innerHTML = soundIconOff;
        soundIcon.style.fill = 'white';
        soundIconContainer.style.backgroundColor = 'red';
        world.muteGameSounds();
    }
}

/**
 * Toggles the game sound on/off and updates the icon.
 * @function toggleSound
 */
function toggleSound() {
    SOUND_ON = !SOUND_ON; 
    localStorage.setItem('soundStatus', SOUND_ON); 

    updateSoundIcon(); 

    if (SOUND_ON) {
        world.playGameSounds();
    } else {
        world.muteGameSounds();
    }
}

// Full-screen control

/**
 * Updates the screen icon based on the fullscreen status.
 * @function updateScreenIcon
 */
function updateScreenIcon() {
    if (document.fullscreenElement) {
        screenIconContainer.innerHTML = windowScreenIcon;
        FULL_SCREEN = true;
    } else {
        screenIconContainer.innerHTML = fullScreenIcon;
        FULL_SCREEN = false;
    }
}

/**
 * Toggles the fullscreen mode on/off.
 * @function toggleScreen
 */
function toggleScreen() {
    if (!FULL_SCREEN) {
        screenIconContainer.innerHTML = windowScreenIcon;
        FULL_SCREEN = true;
        enterFullscreen(main);
    } else {
        screenIconContainer.innerHTML = fullScreenIcon;
        FULL_SCREEN = false;
        exitFullscreen();
    }
}

/**
 * Enters fullscreen mode for the given element.
 * @function enterFullscreen
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
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

/**
 * Exits fullscreen mode.
 * @function exitFullscreen
 */
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

/**
 * Shows or hides the mobile overlay based on the game state and screen size.
 * @function showMobilBtn
 */
function showMobilBtn() {
    if (world && world.state === 'RUNNING') {
        if (window.screen.height < 1080 && window.screen.width < 1920) {
            mobileOverlay.classList.remove('d-none');
        } else {
            mobileOverlay.classList.add('d-none');
        }
    }
}

// Leaderboard rendering

/**
 * Renders and displays the leader board by sorting and showing the top players.
 * @function renderLeaderBoard
 * @param {Array} leaderBoard - The leaderboard data to display.
 */
function renderLeaderBoard(leaderBoard) {
    leaderBoard.sort(function (a, b) {
        let scoreComparison = parseInt(b.scoreofplayer) - parseInt(a.scoreofplayer);
        if (scoreComparison === 0) {
            return parseInt(b.poisonsofplayer) - parseInt(a.poisonsofplayer);
        }
        return scoreComparison;
    });

    leaderBoardRow.innerHTML = '';
    showBestPlayers(leaderBoard);
}

/**
 * Displays the top players in the leaderboard.
 * @function showBestPlayers
 * @param {Array} leaderBoard - The leaderboard data to display.
 */
function showBestPlayers(leaderBoard) {
    for (let i = 0; i < Math.min(10, leaderBoard.length); i++) {
        const player = leaderBoard[i];
        const place = i + 1;
        leaderBoardRow.innerHTML += createLeaderBoard(place, player);
    }
}

/**
 * Renders and displays all saved players in the ranking section.
 * @function renderAllSavedPlayer
 * @param {Array} allSavedPlayer - The list of all saved players.
 */
function renderAllSavedPlayer(allSavedPlayer) {
    allSavedPlayer.sort(function (a, b) {
        let scoreComparison = parseInt(b.scoreofplayer) - parseInt(a.scoreofplayer);
        if (scoreComparison === 0) {
            return parseInt(b.poisonsofplayer) - parseInt(a.poisonsofplayer);
        }
        return scoreComparison;
    });

    gameRankingContent.innerHTML = '';
    showAllSavedPlayer(allSavedPlayer);
    deletePlayers(leaderBoard);
}

/**
 * Displays all saved players in the ranking content.
 * @function showAllSavedPlayer
 * @param {Array} allSavedPlayer - The list of all saved players.
 */
function showAllSavedPlayer(allSavedPlayer) {
    for (let i = 0; i < allSavedPlayer.length; i++) {
        const player = allSavedPlayer[i];
        const place = i + 1;
        gameRankingContent.innerHTML += createRanking(place, player);
    }
}

/**
 * Deletes players from the leaderboard if they exceed the maximum length.
 * @function deletePlayers
 * @param {Array} leaderBoard - The leaderboard data to manage.
 */
function deletePlayers(leaderBoard) {
    for (let i = 500; i < leaderBoard.length; i++) {
        const playerToDelete = leaderBoard[i];
        const playerID = playerToDelete.idofplayer;
        deletePlayer(playerID);
    }
}
