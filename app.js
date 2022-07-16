import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';

// State
let user = null;

const body = document.querySelector('body');
const darkModeButton = document.querySelector('.dark-mode');

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
