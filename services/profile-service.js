import { client } from './client.js';
import { getUser } from '.client.js';

export async function getProfiles() {
    const response = await client;
    const user = getUser

        .from('simon-user-profiles')
        .select(`
        id,
        profileName: profile_name,
        userName: user_name,
        user_id`)
        .eq('user_id', user.id)
        .single();

    return response.data;
}

export async function updateProfiles(profile, id) {

    const response = await client
        .from('simon-user-profiles')
        .select(`*`)
        .eq('user_id', id)
        .upsert(profile)
        .single();

    return response.data;
}

