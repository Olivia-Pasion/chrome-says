

export default function createLeaderBoard(ul) {
    
    return ({ scores }) => {
        ul.innerHTML = '';
        console.log(ul);
        for (const score of scores) {
            const li = document.createElement('li');
            
            const usernameSpan = document.createElement('span');
            usernameSpan.classList.add('username-span');
            usernameSpan.textContent = score.userProfile.profile_name;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.classList.add('score-span');
            scoreSpan.textContent = score.score;
            
            li.append(usernameSpan, scoreSpan);
            ul.append(li);
            
        }
    };
}

export function createPlayerHighScore(p) {
    return ({ highScores }) => {
        p.innerHTML = '';
        for (const score of highScores) {
            const li = document.createElement('li');
            
            const highestScore = document.createElement('span');
            highestScore.classList.add('highest-score');
            highestScore.textContent = score.score;
      
            li.append(highestScore);
            p.append(li);
            console.log(p);
        }
    };
}