

export default function createUserScoreBoard(ul) {
    
    return ({ userScores }) => {
        ul.innerHTML = '';

        for (const userScore of userScores) {
            const li = document.createElement('li');

            const scoreSpan = document.createElement('span');
            scoreSpan.classList.add('score-span');
            scoreSpan.textContent = userScore.score;

            const gameTime = document.createElement('span');
            gameTime.classList.add('time-span');
            gameTime.textContent = userScore.created;

            li.append(scoreSpan, gameTime);
            ul.append(li);
        }
        
    };
}
