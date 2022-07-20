import { getUser } from '../services/auth-service.js';
import { getProfile } from '../services/profile-service.js';
import { checkDifficulty, checkProfile, protectPage } from '../utils.js';
import { handleSubmitScore } from '../services/score-service.js';
//Add buttons into an array and access them dynamically.
//implement sound using the same timout logic as the glowing function
//Add a popup showing you lost with your score.
//implement lives perhaps
//State
let theme = localStorage.getItem('theme');
let difficultyMultiplier = 0;
let playerScore = 0;
let user = null;
let userOrder = [];
let correctOrder = [];
let profile = null;
let level = 0;
let difficulty = null;
let defaultTimer = null;
let glowTimer = null;

const header = document.querySelector('header');
const body = document.querySelector('body');
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
    playerScore = playerScore * difficultyMultiplier;
    await handleSubmitScore(profile.id, playerScore);
    
    localStorage.removeItem('difficulty');
    location.replace('/');
}

async function handlePageLoad() {
    disablePlayerInput();

    user = await getUser();
    protectPage(user);
    
    profile = await getProfile();
    checkProfile(profile);

    difficulty = localStorage.getItem('difficulty');
    checkDifficulty(difficulty);
    setDifficulty();
    handleTheme();
    disablePlayerInput();
}

function handleTheme() {
    if (theme === 'dark') {
        body.classList.add('dark-body');
        header.classList.add('dark-header');
    } else {
        body.classList.remove('dark-body');
        header.classList.remove('dark-header');
    }
}

function setDifficulty() {
    if (difficulty === 'easy') {
        defaultTimer = 1500;
        glowTimer = 1250;
        difficultyMultiplier = 1;
    } else if (difficulty === 'medium') {
        defaultTimer = 1250;
        glowTimer = 1000;
        difficultyMultiplier = 1.5;
    } else if (difficulty === 'hard') {
        defaultTimer = 1000;
        glowTimer = 750;
        difficultyMultiplier = 2;
    }
}

const buttonSelector = document.getElementById('full-game');
const [blueButton, redButton, yellowButton, greenButton] = buttonSelector.querySelectorAll('button');


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
    currentScore.textContent = playerScore * difficultyMultiplier;

}

async function checkLength() {

    if (userOrder.length === correctOrder.length) {
        checkOrder();
    } else if (userOrder.length > correctOrder.length) {
        await gameOver(playerScore);
    }
}


async function checkOrder() {
    
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            await gameOver(playerScore);
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
}


//Display
async function buttonsLightUp() {
    for (let i = 0; i < correctOrder.length; i++) {
        createDelay(i);
        if (i === correctOrder.length - 1) {
            let inputDelay = i + 1; 
            setTimeout(function(){enablePlayerInput();}, inputDelay * defaultTimer);
        }
    } 

    function createDelay(i) {
        setTimeout(function() {
            if (correctOrder[i] === 1) {
                blueButton.classList.add('glowing');
                setTimeout(function(){blueButton.classList.remove('glowing');}, glowTimer);
            }
            else if (correctOrder[i] === 2) {
                redButton.classList.add('glowing');
                setTimeout(function(){redButton.classList.remove('glowing');}, glowTimer);
            }
            else if (correctOrder[i] === 3) {
                yellowButton.classList.add('glowing');
                setTimeout(function(){yellowButton.classList.remove('glowing');}, glowTimer);
            }
            else if (correctOrder[i] === 4) {
                greenButton.classList.add('glowing');
                setTimeout(function(){greenButton.classList.remove('glowing');}, glowTimer);
            }
        }, defaultTimer * i);
    }
    
}

readyButton.addEventListener('click', () => {
    readyButton.classList.add('hidden');
    readyButton.disabled = true;
    orderDisplay();
    readyButton.classlist.add('hidden');
    readyButton.disabled = true;
});




function display() {
    // gameRead();
    // orderDisplay();
    displayCurrentScore();
}
display();
handlePageLoad();