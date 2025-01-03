import request from "@/utils/request";


export const apiLogin = async (username, password) => {
    return request({
        url: '/public/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
