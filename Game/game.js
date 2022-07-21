import { getUser } from '../services/auth-service.js';
import { getProfile } from '../services/profile-service.js';
import { checkDifficulty, checkProfile, protectPage } from '../utils.js';
import { handleSubmitScore } from '../services/score-service.js';

//State
let theme = localStorage.getItem('theme'),
    difficultyMultiplier = 0,
    playerScore = 0,
    user = null,
    userOrder = [],
    correctOrder = [],
    profile = null,
    level = 0,
    difficulty = null,
    defaultTimer = null,
    glowTimer = defaultTimer;

const buttonSelector = document.getElementById('full-game'),
    [blueButton, redButton, yellowButton, greenButton] = buttonSelector.querySelectorAll('button'),
    gameButtons = [blueButton, redButton, yellowButton, greenButton],
    header = document.querySelector('header'),
    body = document.querySelector('body'),
    readyButton = document.querySelector('#ready');
    
//controls

document.addEventListener('keydown', function(e) {
    if (e.key === 'q') {blueButton.click(), blueButton.focus();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'w') {redButton.click(), redButton.focus();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {yellowButton.click(), yellowButton.focus();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 's') {greenButton.click(), greenButton.focus();}
});
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

function disablePlayerInput() {
    for (let i = 0; i < gameButtons.length; i++) gameButtons[i].disabled = true;
}

function enablePlayerInput() {
    for (let i = 0; i < gameButtons.length; i++) gameButtons[i].disabled = false;
}

async function gameOver() {
    playerScore = playerScore * difficultyMultiplier;
    window.alert(`Game Over you got ${playerScore} points`);
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
        defaultTimer = 1000;
        difficultyMultiplier = 1;
    } else if (difficulty === 'medium') {
        defaultTimer = 750;
        difficultyMultiplier = 1.5;
    } else if (difficulty === 'hard') {
        defaultTimer = 500;
        difficultyMultiplier = 2;
    } else if (difficulty === 'insane') {
        defaultTimer = 275;
        difficultyMultiplier = 3;
    } glowTimer = defaultTimer - 250;
}

function generateOrder() {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    correctOrder.push(randomNumber);
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
        disablePlayerInput();
        await gameOver();

    }
}

async function checkOrder() {
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            disablePlayerInput();
            await gameOver();
            return;
        } 
    }

    increaseScore();
    await setTimeout(function(){orderDisplay();}, 1000);
    display();
}

async function gameRead() {
    level = playerScore + 1;
    userOrder = [];
    correctOrder = [];
}

async function orderDisplay() {
    disablePlayerInput();
    await gameRead();
    for (let i = 0; i < level; i++) {
        generateOrder();
    } 
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
    displayCurrentScore();
}
display();
handlePageLoad();