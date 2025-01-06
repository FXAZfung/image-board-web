export function isExpire() {
    const auth = getAuth();
    const expire = new Date(auth.expire);
    return new Date() > expire;
}

export function getAuth() {
    return JSON.parse(localStorage.getItem('auth')) || JSON.parse(sessionStorage.getItem('auth'));
}

export function getToken() {
    const auth = getAuth();
    return auth?.token;
}

export function setAuth(data, remember) {
    const auth = JSON.stringify(data);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth', auth);
}

export function removeAuth() {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
}


