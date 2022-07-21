import { client } from './client.js';


export async function getLeaderBoard() {

    const response = await client
        .from('leaderboard')
        .select(`
            *,
            userProfile:simon-user-profiles(*)
        `)
        .order('score', { ascending: false });
    
    return response.data;
}

export async function updateLeaderBoard(newScore) {
    const response = await client
        .from('leaderboard')
        .insert(newScore);

    return response.data;
}

export async function handleSubmitScore(profile_id, playerScore) {
    const response = await client
        .from('leaderboard')
        .insert({
            profile_id,
            score: playerScore
        });

    return response.data;
}

export async function getUserScoreBoard(id) {
    

    const response = await client
        .from('leaderboard')
        .select(`
            score,
            profile_id,
            created: created_at,
            user:simon-user-profiles(id, user_id)`)
        .eq('profile_id', id)
        .order('created_at', { ascending: false });
    
    return response.data;
}