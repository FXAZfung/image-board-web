"use client";
import {apiLogin} from '@/api/auth';
import {createContext, useContext, useEffect, useLayoutEffect, useState} from 'react';
import {getToken, isExpire, removeAuth, setAuth} from "@/utils/auth";
import {toast} from "sonner";

// 创建 Context
const AuthContext = createContext(undefined);

// 创建一个 AuthProvider 组件，来提供 Context 给子组件
export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // 检查本地存储中的登录状态
    useLayoutEffect(() => {
        const token = getToken();
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        if (isExpire()) {
            removeAuth()
            setIsAuthenticated(false);
            toast.error('登录状态已过期，请重新登录');
            return;
        }
        setIsAuthenticated(true);
    }, []);

    const login = async (username, password, remember) => {
        if (!username || !password) {
            throw new Error('用户名和密码不能为空');
        }
        try {
            const res = await apiLogin(username, password);
            setAuth(res, remember);
            setIsAuthenticated(true);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    };

    const logout = () => {
        removeAuth()
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// 自定义 hook 用于获取 Context 中的值
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}