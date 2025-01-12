import request, {fetcher} from "@/utils/request";
import useSWR from "swr";
import {ImageRequest} from "@/types/types";

export const apiUploadImage = async (data: FormData) => {
    return request({
        url: '/auth/upload',
        method: 'post',
        data: data,
        headers: {
            token: true
        }
    })
}

export const apiGetImages = (page:number, pageSize:number) => {
    const {data, error, isLoading} = useSWR(`/api/public/images?page=${page}&page_size=${pageSize}`, fetcher)

    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}

// export const apiGetImageByName = async (name) => {
//     return request({
//         url: '/public/images/' + name,
//         method: 'get',
//     })
// }