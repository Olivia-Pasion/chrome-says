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
    if (body.classList.contains('dark') === true) {
        body.classList.remove('dark');  
    } else {
        body.classList.add('dark');
    }
});



// Action Handlers
async function handlePageLoad() {
    user = await getUser();
    if (protectPage(user)) return;

    scores = await getLeaderBoard() ?? [];

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

// DOM Components 

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const LeaderBoard = createLeaderBoard(document.querySelector('#leader-board'), { handleSubmitScore });

function display() {
    User({ user });
    LeaderBoard({ scores });

}

handlePageLoad();
