import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBNUzV1lkMJKJ1F2q3e3IBK9A9pxZFO4o",
    authDomain: "sharkie-3d375.firebaseapp.com",
    databaseURL: "https://sharkie-3d375-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sharkie-3d375",
    storageBucket: "sharkie-3d375.appspot.com",
    messagingSenderId: "504815727673",
    appId: "1:504815727673:web:8ce1792c3adfe3c07789e8"
};

import { doc, setDoc, getDocs, deleteDoc, updateDoc, collection } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Adds a player's score and poison information to the Firestore database.
 * @async
 * @function addPlayerScore
 * @returns {Promise<void>} Resolves when the player data has been added to Firestore.
 */
async function addPlayerScore() {
    try {
       const initialRef = collection(db, 'LeaderBord');
       const newDocRef = doc(initialRef);
       const docID = newDocRef.id;
       const playerData = {
        initialsofplayer: initialInput.value,
        scoreofplayer: playerScore.innerText,
        poisonsofplayer: playerPoisons.innerText,
        idofplayer: docID
       };
       await setDoc(newDocRef, playerData);
       initialInput.value = '';
       cancelSaveScore();
       await getBestPlayers();
    } catch (error) {
        console.error('Error adding player score:', error);
    }
}

/**
 * Fetches the best players from the Firestore database and renders the leaderboard.
 * @async
 * @function getBestPlayers
 * @returns {Promise<void>} Resolves when the leaderboard has been rendered.
 */
async function getBestPlayers() {
    let loadingSpinner = document.getElementById('loadingSpinner');
    try {
        loadingSpinner.style.display = 'flex';
        const initialRef = collection(db, 'LeaderBord');
        const querySnapshot = await getDocs(initialRef);
        if (!querySnapshot.empty) {
            let leaderBoard = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                leaderBoard.push(data);
            });
            renderLeaderBoard(leaderBoard);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

/**
 * Fetches all saved player data from the Firestore database and renders it.
 * @async
 * @function getAllSavedPlayers
 * @returns {Promise<void>} Resolves when all saved players have been rendered.
 */
async function getAllSavedPlayers() {
    let loadingSpinner = document.getElementById('loadingSpinner');
    try {
        loadingSpinner.style.display = 'flex';
        const initialRef = collection(db, 'LeaderBord');
        const querySnapshot = await getDocs(initialRef);
        if (!querySnapshot.empty) {
            let allSavedPlayer = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                allSavedPlayer.push(data);
            });
            renderAllSavedPlayer(allSavedPlayer);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

/**
 * Deletes a player's data from the Firestore database based on their player ID.
 * @async
 * @function deletePlayer
 * @param {string} playerID - The unique identifier of the player to delete.
 * @returns {Promise<void>} Resolves when the player data has been deleted.
 */
async function deletePlayer(playerID) {
    try {
        const docRef = doc(db, 'LeaderBord', playerID);
        await deleteDoc(docRef);
    } catch (error) {
        console.log(error);
    }
}

// Expose the functions globally for use in the HTML interface.
window.deletePlayer = deletePlayer;
window.addPlayerScore = addPlayerScore;
window.getBestPlayers = getBestPlayers;
window.getAllSavedPlayers = getAllSavedPlayers;
