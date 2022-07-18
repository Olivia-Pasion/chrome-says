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
let playerTurn = false;

function gameRestart() {

    playerScore = 0;
    userOrder = [];
    correctOrder = [];
    gameStarted = false;
    level = 0;
    playerTurn = false;

}

async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    profile = await getProfile();
    checkProfile(profile);
  
}

// function increaseScore() {
//     let currentScore = 
//     playerScore++;
// }

const buttonSelector = document.getElementById('full-game');
const [blueButton, redButton, yellowButton, greenButton] = buttonSelector.querySelectorAll('button');

//clean up later if get a chance

//Players-Input
blueButton.addEventListener('click', () => {
    userOrder.push(1);
    checkLength();
    
});
redButton.addEventListener('click', () => {
    userOrder.push(2);
    checkLength();
    
});
yellowButton.addEventListener('click', () => {
    userOrder.push(3);
    checkLength();
    
});
greenButton.addEventListener('click', () => {
    userOrder.push(4);
    checkLength();
    
});

//Calculators

function generateOrder() {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
// blue
    if (randomNumber === 1) {
        correctOrder.push(1);
    } 
// red
    if (randomNumber === 2) {
        correctOrder.push(2);
    }
// yellow
    if (randomNumber === 3) {
        correctOrder.push(3);
    }
// green
    if (randomNumber === 4) {
        correctOrder.push(4);
    }
        
}

function increaseScore() {
    playerScore++;
}

function displayCurrentScore() {
    let currentScore = document.getElementById('player-current-score');
    currentScore.textContent = playerScore;

}

function checkLength() {

    if (userOrder.length === correctOrder.length) {
        checkOrder();
        //console.log(userOrder.length, correctOrder.length);
    } else if (userOrder.length > correctOrder.length) {
        gameRestart();
    }
}


async function checkOrder() {
    
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            gameRestart();
            return;
        }
    }
    increaseScore();
    await orderDisplay();
    display();
    
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
    buttonsLightUp();
    console.log(correctOrder);
}

// const index = correctOrder.indexOf(order);

//Display
async function buttonsLightUp() {
    console.log(correctOrder); 
    playerTurn = false;
    for (let i = 0; i < correctOrder.length; i++) {

     

        createDelay(i);
        

    } 
    function createDelay(i) {
        setTimeout(function() {
           

            if (correctOrder[i] === 1) {
                blueButton.classList.add('glowing');
                setTimeout(function(){blueButton.classList.remove('glowing');}, 500);
            }
            else if (correctOrder[i] === 2) {
                redButton.classList.add('glowing');
                setTimeout(function(){redButton.classList.remove('glowing');}, 500);
            }
            else if (correctOrder[i] === 3) {
                yellowButton.classList.add('glowing');
                setTimeout(function(){yellowButton.classList.remove('glowing');}, 500);
            }
            else if (correctOrder[i] === 4) {
                greenButton.classList.add('glowing');
                setTimeout(function(){greenButton.classList.remove('glowing');}, 500);
            }
            console.log(i);
        }, 1000 * i);
    }
    
}



function display() {
    // gameRead();
    // orderDisplay();
    displayCurrentScore();
}
orderDisplay();
display();
