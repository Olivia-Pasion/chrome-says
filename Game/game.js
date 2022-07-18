import { getUser } from '../services/auth-service.js';
import { getProfile } from '../services/profile-service.js';
import { checkProfile, protectPage } from '../utils.js';





// const darkModeButton = document.querySelector('.dark-mode');
// const body = document.querySelector('body');
// darkModeButton.addEventListener('click', () => {
//     if (body.classList.contains('dark') === true) {
//         body.classList.remove('dark');  
//     } else {
//         body.classList.add('dark');
//     }
// });

let playerScore = 0;
let user = null;
let userOrder = [];
let correctOrder = [];
let gameStarted = false;
let profile = null;
let level = 0;

function gameRestart() {

    let playerScore = 0;
    let userOrder = [];
    let correctOrder = [];
    let gameStarted = false;
    let level = 0;

}

async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    profile = await getProfile();
    checkProfile(profile);
  
}

function checkOrder() {
    if (userOrder === correctOrder) {
        playerScore++;
    }
    else {
        gameRestart();
    }
}

function gameRead(playerScore) {
    level = playerScore++;

}

function generateOrder() {
    const randomNumber = Math.floor(Math.random() * 4) + 1;

    if (randomNumber === 1) {
        correctOrder.push('blue');
    } 
    if (randomNumber === 2) {
        correctOrder.push('red');
    }
    if (randomNumber === 3) {
        correctOrder.push('yellow');
    }
    if (randomNumber === 4) {
        correctOrder.push('green');
    }
        
}

function orderDisplay(level) {
    for (let i = 0; i < level; i++) {
        generateOrder();
    } 

    console.log(correctOrder);
}

function display() {
    gameRead();
    orderDisplay();
}

display();