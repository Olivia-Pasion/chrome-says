
export async function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
    }
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function checkLevel(level) {
    if (!level) {return `./`;}
}

export async function checkProfile(profile) {
    if (!profile) {
        location.replace(`Profile/index.html`);
    }
}

export async function checkDifficulty(difficulty) {
    if (!difficulty) {
        location.replace(`../`);
    }
}