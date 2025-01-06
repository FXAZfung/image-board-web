import request, {fetcher} from '@/utils/request'
import useSWR from "swr";

export const apiSetting =  () => {
    const {data, error, isLoading} = useSWR('/api/public/settings', fetcher)
    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}