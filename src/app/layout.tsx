import "@/styles/globals.css";
import {Toaster} from "@/components/ui/sonner";
import {ThemeProvider} from "@/components/theme-provider";
import {AuthProvider} from "@/context/auth-context";
import {SettingProvider} from "@/context/setting-context";
import request from "@/utils/request";
import BackTop from "@/components/back-top";
import {Setting} from "@/types/types";
import React from "react";

const setting = await request.get('/public/settings') as Setting;

export const metadata = {
    title: setting.site_title,
    description: setting.index_title,
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
