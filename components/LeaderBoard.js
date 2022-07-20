

export default function createLeaderBoard(ul) {
    
    return ({ scores }) => {
        ul.innerHTML = '';
        console.log(ul);
        for (const score of scores) {
            const li = document.createElement('li');

            const avatarImage = document.createElement('img');
            avatarImage.classList.add('avatar-image');
            avatarImage.src = score.profile.avatar_url;
            
            const usernameSpan = document.createElement('span');
            usernameSpan.classList.add('username-span');
            usernameSpan.textContent = score.userProfile.profile_name;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.classList.add('score-span');
            scoreSpan.textContent = score.score;
            
            li.append(avatarImage, usernameSpan, scoreSpan);
            ul.append(li);

    
            
        }
    };
}