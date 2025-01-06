import request, {fetcher} from "@/utils/request";
import useSWR from "swr";



export const apiCreateCategory = (data) => {
    return request({
        url: '/auth/categories',
        method: 'post',
        data: data,
        headers: {
            token: true
        }
    })
}

export const apiGetCategories = () => {
    const {data, error, isLoading} = useSWR('/api/public/categories', fetcher)
    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}
