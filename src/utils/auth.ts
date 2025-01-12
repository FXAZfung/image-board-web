import {Types} from "@/types/types";

export function isExpire() {
    const auth = getAuth();
    const expire = new Date(auth.expire);
    return new Date() > expire;
}

export function getAuth():Types {
    const auth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
}

export function getToken() {
    const auth = getAuth();
    return auth?.token;
}

export function setAuth(data:Types, remember:boolean) {
    const auth = JSON.stringify(data);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('auth', auth);
}

export function removeAuth() {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
}


