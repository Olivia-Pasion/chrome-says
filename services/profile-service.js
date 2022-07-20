import { client, SUPABASE_URL } from './client.js';
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


export async function updateProfile(profileInput) {
    if (profileInput.avatar_url && profileInput.avatar_url.size > 0) {
        const publicUrl = await uploadAvatar(profileInput.id, profileInput.avatar_url);
        profileInput.avatar_url = publicUrl;
    }

    const response = await client
        .from('simon-user-profiles')
        .upsert(profileInput)
        .eq('id', profileInput.id)
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




async function uploadAvatar(profileId, imageFile) {
    //if (imageFile.size === 0) return null;

    const name = Math.floor(Math.random() * 100000);
    const ext = imageFile.type.split('/')[1];

    let filename = `/${profileId}/${name}.${ext}`;
    const bucket = client
        .storage
        .from('chromesays-avatar');

    const { data, error } = await bucket
        .upload(filename, imageFile, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${data.Key}`;

    return url;
}