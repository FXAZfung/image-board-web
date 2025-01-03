"use client";
import {apiLogin} from '@/api/auth';
import {createContext, useContext, useEffect, useState} from 'react';

// 创建 Context
const AuthContext = createContext(undefined);

// 创建一个 AuthProvider 组件，来提供 Context 给子组件
export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // 检查本地存储中的登录状态
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))?.token || JSON.parse(sessionStorage.getItem('token'))?.token;
        setIsAuthenticated(!!token);
    }, []);

    const login = async (username, password, remember) => {
        if (!username || !password) {
            throw new Error('用户名和密码不能为空');
        }

        try {
            const res = await apiLogin(username, password);
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('token', JSON.stringify(res));
            setIsAuthenticated(true);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
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