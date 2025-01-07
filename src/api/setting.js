import request, {fetcher} from '@/utils/request'
import useSWR from "swr";

export const apiSetting = () => {
    const {data, error, isLoading} = useSWR('/api/public/settings', fetcher)
    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}

export const apiSaveSetting = (data) => {
    return request({
        url: '/private/setting',
        method: 'post',
        headers: {
            token: true
        },
        data: data
    })
}