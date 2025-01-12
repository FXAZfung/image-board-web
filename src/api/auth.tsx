import request from "@/utils/request";
import {Auth} from "@/types/types";

export const apiLogin = async (username:string, password:string):Promise<Auth> => {
    return request({
        url: '/public/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
