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

let initialInput = document.getElementById('initialInput');
let playerScore = document.getElementById('playerScore');
let playerPoisons = document.getElementById('playerPoisons');

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
       
    }
}

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
        } else {
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

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
        } else {
        }
    } catch (error) {
        console.log(error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

async function deletePlayer(playerID) {
    try {
        const docRef = doc(db, 'LeaderBord', playerID);
        await deleteDoc(docRef);
    } catch (error) {
        console.log(error);
    }
}

window.deletePlayer = deletePlayer;
window.addPlayerScore = addPlayerScore;
window.getBestPlayers = getBestPlayers;
window.getAllSavedPlayers = getAllSavedPlayers;