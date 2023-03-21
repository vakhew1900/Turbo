export function reloadOutdatedUser() {

    if (localStorage.getItem('token') != null) {
        localStorage.removeItem('token');
        window.location.reload();
    }
}

