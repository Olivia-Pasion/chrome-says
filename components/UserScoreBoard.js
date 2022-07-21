

export default function createUserScoreBoard(tr) {
    
    return ({ userScores }) => {
        tr.innerHTML = '';

        for (const userScore of userScores) {
            const tb = document.createElement('tb');

            const scoreSpan = document.createElement('td');
            scoreSpan.classList.add('score-span');
            scoreSpan.textContent = userScore.score;
            
            const niceDate = (new Date(userScore.created)).toLocaleString();
            const dateTb = document.createElement('td');
            dateTb.classList.add('date-tb');
            dateTb.textContent = niceDate;

            tb.append(scoreSpan, dateTb);
            tr.append(tb);
        }
    };
}
