"use client"

import React, {createContext, useContext, useEffect, useState} from "react"
import {apiSetting} from "@/api/setting";

const SettingContext = createContext(undefined)

export function SettingProvider({children}) {
    const [setting, setSetting] = useState(null)

    const {data} = apiSetting()

    useEffect(() => {
        if (data) {
            setSetting(data)
        }
    }, []);

    return <SettingContext.Provider value={{setting, setSetting}}>{children}</SettingContext.Provider>
}

export function useStatus() {
    const context = useContext(SettingContext)
    if (context === undefined) {
        throw new Error("useStatus must be used within a StatusProvider")
    }
    return context
}
