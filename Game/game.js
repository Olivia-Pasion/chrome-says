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


//State
let playerScore = 0;
let user = null;
let userOrder = [];
let correctOrder = [];
let gameStarted = false;
let profile = null;
let level = 0;

function gameRestart() {

    playerScore = 0;
    userOrder = [];
    correctOrder = [];
    gameStarted = false;
    level = 0;

}

async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    profile = await getProfile();
    checkProfile(profile);
  
}

const buttonSelector = document.getElementById('full-game');
const [blueButton, redButton, yellowButton, greenButton] = buttonSelector.querySelectorAll('button');

//clean up later if get a chance

//Players-Input
blueButton.addEventListener('click', () => {
    userOrder.push('blue');
    checkLength();
    console.log(userOrder);
});
redButton.addEventListener('click', () => {
    userOrder.push('red');
    checkLength();
    console.log(userOrder);
});
yellowButton.addEventListener('click', () => {
    userOrder.push('yellow');
    checkLength();
    console.log(userOrder);
});
greenButton.addEventListener('click', () => {
    userOrder.push('green');
    checkLength();
    console.log(userOrder);
});

//Calculators

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

function checkLength() {

    if (userOrder.length === correctOrder.length) {
        checkOrder();
        console.log(userOrder.length, correctOrder.length);
    } else if (userOrder.length > correctOrder.length) {
        gameRestart();
    }
}


async function checkOrder() {
    console.log(playerScore);
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            gameRestart();
            return;
        }
    }
    playerScore++;
    await orderDisplay();
    console.log(playerScore);
}

async function gameRead() {
    level = playerScore + 1;
    userOrder = [];
    correctOrder = [];
}

async function orderDisplay() {
    await gameRead();
    for (let i = 0; i < level; i++) {
        generateOrder();
    } 
    
    console.log(correctOrder);
}

//Display

function display() {
    gameRead();
    orderDisplay();
}

display();