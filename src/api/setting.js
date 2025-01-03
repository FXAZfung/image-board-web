import request from '@/utils/request'


export const apiSetting = async () => {
    return request({
        url: '/public/settings',
        method: 'get',
    })
}