import { client } from './client.js';
import { getUser } from './auth-service.js';


export async function updateProfiles(profile, id) {

    const response = await client
        .from('simon-user-profiles')
        .select(`*`)
        .eq('user_id', id)
        .upsert(profile)
        .single();

    return response.data;
}

export async function getProfile() {
    const user = getUser();

    const response = await client
        .from('simon-user-profiles')
        .select(`*`)
        .eq('user_id', user.id)
        .single();

    return response.data;
}


export async function updateProfile(profile, id) {

    const response = await client
        .from('simon-user-profiles')
        .upsert(profile)
        .eq('id', id)
        .single();

    return response.data;
}

export async function getProfileById(id) {
    // if (users.has(id)) return users.get(id);
    const user = getUser(id);

    const { data, error } = await client
        .from('simon-user-profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    // users.set(id, data);

    return data;
}