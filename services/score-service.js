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
        .select()
        .insert(newScore);

    return response.data;
}

export async function handleSubmitScore(playerScore, profile) {
    const response = await client
        .from('leaderboard')
        .select(`*`)
        .eq('profile_id', profile.id)
        .insert('score', playerScore);

    return response.data;
}