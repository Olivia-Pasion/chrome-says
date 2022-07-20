import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

//Score Service
import { getLeaderBoard, handleSubmitScore } from './services/score-service.js';


//Components
import createLeaderBoard from './components/LeaderBoard.js';



// State
let user = null;
let scores = [];
let theme = 'light';
const sectionUserButtons = document.querySelector('#user-buttons');
const sectionBoardDisplay = document.querySelector('#board-display');
const sectionDifficultyContainer = document.querySelector('#difficulty-container');
const header = document.querySelector('header');
const body = document.querySelector('body');
const darkModeButton = document.querySelector('.dark-mode');
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');

easy.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'easy');
    location.replace('./Game/index.html');
});
medium.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'medium');
    location.replace('./Game/index.html');
});
hard.addEventListener('click', () => {
    localStorage.setItem('difficulty', 'hard');
    location.replace('./Game/index.html');
});

darkModeButton.addEventListener('click', () => {
    if (theme === 'dark') {
        theme = 'light';
        localStorage.setItem('theme', 'light');
        handleTheme();
    } else {
        localStorage.setItem('theme', 'dark');
        theme = 'dark';
        handleTheme();
    }
});



// Action Handlers
async function handlePageLoad() {
    user = await getUser();
    protectPage(user);

    scores = await getLeaderBoard();
    

    theme = localStorage.getItem('theme');
    handleTheme();

    display();
}

async function handleSignOut() {
    signOut();
}

// Realtime function

function realtimeAddScore(score) {
    scores.unshift(score);
    display();
}

function handleTheme() {
    if (theme === 'dark') {
        body.classList.add('dark-body');
        sectionUserButtons.classList.add('dark-section');
        sectionBoardDisplay.classList.add('dark-section');
        sectionDifficultyContainer.classList.add('dark-section');
        header.classList.add('dark-header');
        darkModeButton.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-body');
        sectionUserButtons.classList.remove('dark-section');
        sectionBoardDisplay.classList.remove('dark-section');
        sectionDifficultyContainer.classList.remove('dark-section');
        header.classList.remove('dark-header');
        darkModeButton.textContent = 'Dark Mode';
    }
}

// DOM Components 

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const LeaderBoard = createLeaderBoard(document.querySelector('#leader-board'));
function display() {
    User({ user });
    LeaderBoard({ scores });

}

handlePageLoad();
