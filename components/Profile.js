

export default function createProfile(form, { handleUpdateProfile }) {
    const usernameInput = form.querySelector('input[name=name]');
    const avatarInput = form.querySelector('input[name=avatar');
    const avatarDisplay = form.querySelector('img');

    let uploadPreview = null;

    avatarInput.addEventListener('change', () => {
        if (uploadPreview) {
            URL.revokeObjectURL(uploadPreview);
        }

        const [file] = avatarInput.files;
        uploadPreview = URL.createObjectURL(file);

        avatarDisplay.src = uploadPreview;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleUpdateProfile(
            formData.get('name'),
            formData.get('avatar')
        );
        form.reset();
    });

    return ({ user, profile }) => {
        console.log(profile);
        if (profile) {
            const { username, avatar_url } = profile;
            if (username) usernameInput.value = username;
            if (typeof avatar_url === 'string') avatarDisplay.src = avatar_url;
            if (uploadPreview) avatarDisplay.src = uploadPreview;
        }
        else {

            usernameInput.value = user?.email.split('@')[0];
        }
    };
   
}