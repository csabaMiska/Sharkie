/**
 * Creates an HTML structure for a leaderboard entry.
 * @param {number} place - The ranking position of the player (1st, 2nd, etc.).
 * @param {Object} player - The player object containing player information.
 * @param {string} player.initialsofplayer - The player's initials.
 * @param {number} player.scoreofplayer - The player's score.
 * @returns {string} - The HTML structure for the leaderboard entry.
 */
function createLeaderBoard(place, player) {
    return `<div class="leader_board_place">
                <div class="leader_board_place_player_row">
                    <div class="place_number leader_board_place_text_style">${place + '.'}</div>
                    <div class="player_id leader_board_place_text_style">${player.initialsofplayer.toUpperCase()}</div>
                </div>
                <div class="leader_board_place_score_row">
                    <div class="score leader_board_place_text_style">${player.scoreofplayer}</div>
                    <div class="total_pt leader_board_place_text_style">pt.</div>
                </div>
            </div>`;
}

/**
 * Creates an HTML structure for a ranking entry with score and poison points.
 * @param {number} place - The ranking position of the player (1st, 2nd, etc.).
 * @param {Object} player - The player object containing player information.
 * @param {string} player.initialsofplayer - The player's initials.
 * @param {number} player.poisonsofplayer - The player's poison points.
 * @param {number} player.scoreofplayer - The player's score.
 * @returns {string} - The HTML structure for the ranking entry.
 */
function createRanking(place, player) {
    return `<div class="ranking_place">
                <div class="leader_board_place_player_row">
                    <div class="place_number leader_board_place_text_style">${place + '.'}</div>
                    <div class="player_id leader_board_place_text_style">${player.initialsofplayer.toUpperCase()}</div>
                </div>
                <div class="leader_board_place_score_row">
                    <div class="score leader_board_place_text_style">${player.poisonsofplayer}</div>
                    <div class="total_pt leader_board_place_text_style">poi.</div>
                </div>
                <div class="leader_board_place_score_row">
                    <div class="score leader_board_place_text_style">${player.scoreofplayer}</div>
                    <div class="total_pt leader_board_place_text_style">pt.</div>
                </div>
            </div>`;
}

/**
 * Returns an SVG path for a full-screen icon.
 * @returns {string} - The SVG path data for the full-screen icon.
 */
function returnFullScreenSvg() {
    return `<path xmlns="http://www.w3.org/2000/svg" d="M120-120v-200h80v120h120v80H120Zm520 
    0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640
    0v-120H640v-80h200v200h-80Z"/>`;
}

/**
 * Returns an SVG path for a windows-screen icon.
 * @returns {string} - The SVG path data for the windows-screen icon.
 */
function returnWindowsScreenSvg() {
    return `<path xmlns="http://www.w3.org/2000/svg" d="M240-120v-120H120v-80h200v200h-80Zm400 
    0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 
    0v-200h80v120h120v80H640Z"/>`;
}

/**
 * Returns an SVG path for the sound-on icon.
 * @returns {string} - The SVG path data for the sound-on icon.
 */
function returnSoundOnSvg() {
    return `<path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 
    127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 
    86H200v80h114l86 86v-252ZM300-480Z" />`;
}

/**
 * Returns an SVG path for the sound-off icon.
 * @returns {string} - The SVG path data for the sound-off icon.
 */
function returnSoundOffSvg() {
    return `<path xmlns="http://www.w3.org/2000/svg" d="M280-360v-240h160l200-200v640L440-360H280Zm80-80h114l86 86v-252l-86 86H360v80Zm100-40Z"/>`;
}

/**
 * Returns an SVG path for the music-on icon.
 * @returns {string} - The SVG path data for the music-on icon.
 */
function retunrMusicOnSvg() {
    return `<path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z" />`;
}

/**
 * Returns an SVG path for the music-off icon.
 * @returns {string} - The SVG path data for the music-off icon.
 */
function returnMusicOffSvg() {
    return `<path xmlns="http://www.w3.org/2000/svg" d="M792-56 56-792l56-56 736 736-56 56ZM560-514l-80-80v-246h240v160H560v166ZM400-120q-66 
    0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-62l80 80v120q0 66-47 113t-113 47Z"/>`;
}
