"use client";
import { apiLogin } from '@/api/auth';
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { getToken, isExpire, removeAuth, setAuth } from '@/utils/auth';
import { toast } from "sonner";
import { Auth } from '@/types/types';

interface AuthContextType {
    isAuthenticated: boolean | null;
    login: (username: string, password: string, remember: boolean) => Promise<Auth>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useLayoutEffect(() => {
        const token = getToken();
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        if (isExpire()) {
            removeAuth();
            setIsAuthenticated(false);
            toast.error('登录状态已过期，请重新登录');
            return;
        }
        setIsAuthenticated(true);
    }, []);

    const login = async (username: string, password: string, remember: boolean) => {
        if (!username || !password) {
            throw new Error('用户名和密码不能为空');
        }
        try {
            const res = await apiLogin(username, password);
            setAuth(res, remember);
            setIsAuthenticated(true);
            return res;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const logout = () => {
        removeAuth();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}