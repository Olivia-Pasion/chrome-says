import { getUser } from '../services/auth-service.js';
import { getProfile } from '../services/profile-service.js';
import { checkProfile, protectPage } from '../utils.js';
import { handleSubmitScore } from '../services/score-service.js';





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
let profile = null;
let level = 0;

const readyButton = document.querySelector('#ready');


document.addEventListener('keydown', function(e) {
    if (e.key === 'q') {
        blueButton.click();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'w') {
        redButton.click();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {
        yellowButton.click();
    }
});
document.addEventListener('keydown', function(e) {
    if (e.key === 's') {
        greenButton.click();
    }
});

function disablePlayerInput() {

    blueButton.disabled = true;
    greenButton.disabled = true;
    yellowButton.disabled = true;
    redButton.disabled = true;
}

function enablePlayerInput() {
    blueButton.disabled = false;
    greenButton.disabled = false;
    yellowButton.disabled = false;
    redButton.disabled = false;

}


async function gameOver() {
    const newScore = 
    await handleSubmitScore(playerScore, profile);
    location.replace('./');
}

async function handlePageLoad() {
    user = await getUser();
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
        gameOver();
    }
}


async function checkOrder() {
    
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            gameOver();
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
    disablePlayerInput();
    buttonsLightUp();
    console.log(correctOrder);
}

// const index = correctOrder.indexOf(order);

//Display
async function buttonsLightUp() {
    for (let i = 0; i < correctOrder.length; i++) {
        createDelay(i);
        if (i === correctOrder.length - 1) {
            let inputDelay = i + 1; 
            setTimeout(function(){enablePlayerInput();}, inputDelay * 1000);
            console.log(userOrder);
        }
    } 

    function createDelay(i) {
        setTimeout(function() {
            if (correctOrder[i] === 1) {
                blueButton.classList.add('glowing');
                setTimeout(function(){blueButton.classList.remove('glowing');}, 750);
            }
            else if (correctOrder[i] === 2) {
                redButton.classList.add('glowing');
                setTimeout(function(){redButton.classList.remove('glowing');}, 750);
            }
            else if (correctOrder[i] === 3) {
                yellowButton.classList.add('glowing');
                setTimeout(function(){yellowButton.classList.remove('glowing');}, 750);
            }
            else if (correctOrder[i] === 4) {
                greenButton.classList.add('glowing');
                setTimeout(function(){greenButton.classList.remove('glowing');}, 750);
            }
        }, 1000 * i);
    }
    
}

readyButton.addEventListener('click', () => {
    orderDisplay();
});




function display() {
    // gameRead();
    // orderDisplay();
    displayCurrentScore();
}
display();
handlePageLoad();