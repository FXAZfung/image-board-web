"use client"

import { apiSetting } from "@/api/setting"

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"

const SettingContext = createContext(undefined)

export function SettingProvider({ children }) {
    const [setting, setSetting] = useState(null)

    useEffect(() => {
        // 获取本地存储的设置
        const setting = localStorage.getItem("setting")
        if (!setting) {
            // 获取默认设置
            apiSetting().then((res) => {
                setSetting(res)
            })
            return
        }
        setSetting(JSON.parse(setting))
    }, [])

    useEffect(() => {
        // 保存设置到本地存储
        localStorage.setItem("setting", JSON.stringify(setting))
    }, [setting])

    return <SettingContext.Provider value={{ setting, setSetting }}>{children}</SettingContext.Provider>
}

export function useStatus() {
    const context = useContext(StatusContext)
    if (context === undefined) {
        throw new Error("useStatus must be used within a StatusProvider")
    }
    return context
}
