const darkModeButton = document.querySelector('.dark-mode');
const body = document.querySelector('body');
darkModeButton.addEventListener('click', () => {
    if (body.classList.contains('dark') === true) {
        body.classList.remove('dark');  
    } else {
        body.classList.add('dark');
    }
});
