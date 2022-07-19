import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

// State
let user = null;

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
    user = getUser();
    protectPage(user);

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });

}

handlePageLoad();
