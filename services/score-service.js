import { client } from './client.js';


export async function getLeaderBoard() {

    const response = await client
        .from('leaderboard')
        .select(`
        created_at,
        profile_id,
        score
        `);
    
    return response.data;
}

export async function updateLeaderBoard(newScore) {
    const response = await client
        .from('leaderboard')
        .insert(newScore);

    return response.data;
}

export async function handleSubmitScore(playerScore, profile_id) {
    const response = await client
        .from('leaderboard')
        .insert({
            profile_id: profile_id,
            score: playerScore
        });

    return response.data;
}