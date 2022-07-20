import { getUser } from '../services/auth-service.js';
import { getProfile } from '../services/profile-service.js';
import { checkDifficulty, checkProfile, protectPage } from '../utils.js';
import { handleSubmitScore } from '../services/score-service.js';
<<<<<<< HEAD
//Add buttons into an array and access them dynamically.
//implement sound using the same timeout logic as the glowing function
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

let audioButton = document.querySelector('.audio-button'); 
audioButton.addEventListener('click', function(){
    var audio = document.getElementById('audio');

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
            // audio.currentTime = 0
    }
});
=======

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
    glowTimer = null;
const buttonSelector = document.getElementById('full-game'),
    [blueButton, redButton, yellowButton, greenButton] = buttonSelector.querySelectorAll('button'),
    gameButtons = [blueButton, redButton, yellowButton, greenButton],
    header = document.querySelector('header'),
    body = document.querySelector('body'),
    readyButton = document.querySelector('#ready');
>>>>>>> aa6321a1bb6502ff286c5c8778e9d2fb653edf27

document.addEventListener('keydown', function(e) {
    if (e.key === 'q') {blueButton.click();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'w') {redButton.click();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'a') {yellowButton.click();}
});
document.addEventListener('keydown', function(e) {
    if (e.key === 's') {greenButton.click();}
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
        defaultTimer = 1500;
        difficultyMultiplier = 1;
    } else if (difficulty === 'medium') {
        defaultTimer = 1250;
        difficultyMultiplier = 1.5;
    } else if (difficulty === 'hard') {
        defaultTimer = 1000;
        difficultyMultiplier = 2;
    } glowTimer = defaultTimer - 250;
}

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
    await orderDisplay();
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

<<<<<<< HEAD

=======
>>>>>>> aa6321a1bb6502ff286c5c8778e9d2fb653edf27
function display() {
    displayCurrentScore();
}
display();
handlePageLoad();