export default function createProfileUpdate(form, { handleProfileUpdate }) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        handleProfileUpdate(
            formData.get('name')
        );
    
    });
    return () => { };
}