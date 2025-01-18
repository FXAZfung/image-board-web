import request, {fetcher} from '@/utils/request'
import UseSWR from "swr";
import {Setting, SettingRequest} from "@/types/types";

export const apiSetting = () => {
    const {data, error, isLoading} = UseSWR('/public/settings', fetcher)
    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}

export const apiSaveSetting = (data:SettingRequest[]) => {
    return request({
        url: '/private/setting',
        method: 'post',
        headers: {
            token: true
        },
        data: data
    })
}