import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import { getProfile, updateProfile } from '../services/profile-service.js';

import createUser from '../components/User.js';

import createProfile from '../components/Profile.js';


// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile() || [];


    display();
}

async function handleSignOut() {
    signOut();
}

async function handleUpdateProfile(username, avatar) {
    const profileInput = {
        id: profile.id,
        profile_name: username,
        user_id: user.id,
        avatar_url: avatar
    };

    
    await updateProfile(profileInput);
    location.replace('/');

    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Profile = createProfile(document.querySelector('#profile-form'), { handleUpdateProfile });



function display() {
    User({ user });
    Profile({ user, profile });
    
}

handlePageLoad();