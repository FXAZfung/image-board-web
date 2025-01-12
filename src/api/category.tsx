import request, {fetcher} from "@/utils/request";
import useSWR from "swr";
import {CategoryRequest} from "@/types/types";


export const apiCreateCategory = (data:CategoryRequest) => {
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
