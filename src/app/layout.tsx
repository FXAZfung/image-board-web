import "@/styles/globals.css";
import {Toaster} from "@/components/ui/sonner";
import {ThemeProvider} from "@/components/theme-provider";
import {AuthProvider} from "@/context/auth-context";
import {SettingProvider} from "@/context/setting-context";
import request from "@/utils/request";
import BackTop from "@/components/back-top";
import {Setting} from "@/types/types";
import React from "react";


// 定义 generateMetadata 函数
export async function generateMetadata() {
    // 异步获取设置数据
    const setting = await request.get('/public/settings') as Setting;

    return {
        title: setting.site_title,
        description: setting.index_title,
    };
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="zh-CN">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <SettingProvider>
                    <div id="root" className="min-h-screen w-full antialiased">
                        {children}
                        <Toaster richColors position="top-right"/>
                        <BackTop/>
                    </div>
                </SettingProvider>
            </AuthProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
