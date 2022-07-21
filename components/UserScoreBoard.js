

export default function createUserScoreBoard(ul) {
    
    return ({ userScores }) => {
        ul.innerHTML = '';

        for (const userScore of userScores) {
            const li = document.createElement('li');

            const scoreSpan = document.createElement('span');
            scoreSpan.classList.add('score-span');
            scoreSpan.textContent = userScore.score;
            
            const niceDate = (new Date(userScore.created)).toLocaleString();

            li.append(scoreSpan, niceDate);
            ul.append(li);
        }
    };
}
