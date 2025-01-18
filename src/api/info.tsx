import UseSWR from "swr";
import {fetcher} from "@/utils/request";
import {Info} from "@/types/types";

export const apiInfo = () => {
    const {data, isLoading, error} = UseSWR<Info>('/public/info', fetcher)
    return {
        data: data,
        isLoading: isLoading,
        isError: error
    }
}