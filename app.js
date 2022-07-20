import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

//Score Service
import { getLeaderBoard } from './services/score-service.js';
import { getProfile } from './services/profile-service.js';


//Components
import createLeaderBoard from './components/LeaderBoard.js';



// State
let profile = null,
    user = null,
    scores = [],
    theme = 'light';
const sectionUserButtons = document.querySelector('#user-buttons'),
    sectionBoardDisplay = document.querySelector('#board-display'),
    sectionDifficultyContainer = document.querySelector('#difficulty-container'),
    header = document.querySelector('header'),
    body = document.querySelector('body'),
    darkModeButton = document.querySelector('.dark-mode'),
    easy = document.querySelector('.easy'),
    medium = document.querySelector('.medium'),
    hard = document.querySelector('.hard');

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
    profile = await getProfile();
    

    theme = localStorage.getItem('theme');
    handleTheme();

    display();
}

async function handleSignOut() {
    signOut();
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
    document.querySelector('#user'), { href: './Profile', text: 'Edit Profile' },
    { handleSignOut }
);

const LeaderBoard = createLeaderBoard(document.querySelector('#leader-board'));

function display() {
    User({ user, profile });
    LeaderBoard({ scores });

}

handlePageLoad();
