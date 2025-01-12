"use client"

import React, {createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode} from "react"
import {apiSetting} from "@/api/setting";

interface SettingContextType {
    setting: any;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export function SettingProvider({children}: {children: ReactNode}) {
    const [setting, setSetting] = useState(null)

    const {data} = apiSetting()

    useLayoutEffect(() => {
        if (data) {
            setSetting(data)
            localStorage.setItem('setting', JSON.stringify(data))
        }
    }, [data]);

    return <SettingContext.Provider value={{setting}}>{children}</SettingContext.Provider>
}

export function useSetting() {
    const context = useContext(SettingContext)
    if (context === undefined) {
        throw new Error("useStatus must be used within a StatusProvider")
    }
    return context
}