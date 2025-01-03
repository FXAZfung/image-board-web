import axios from 'axios';
import error from './error';
import { toast } from "sonner";
const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

request.interceptors.request.use(
    (config) => {
        const isToken = (config.headers || {}).token === true

        if (isToken) {
            //TODO 从本地存储中获取token
        }
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?' + tansParams(config.params)
            url = url.slice(0, -1)
            config.params = {}
            config.url = url
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        const code = response.data.code || 200;
        const message = response.data.message || error[code] || error['default'];
        // 二进制数据则直接返回
        if (
            response.request.responseType === 'blob' ||
            response.request.responseType === 'arraybuffer'
        ) {
            return response.data
        }
        if (code === 200) {
            return Promise.resolve(response.data.data)
        } else {
            return Promise.reject(message)
        }
    },
    (error) => {
        toast.error(message)
        return Promise.reject(error);
    }
);


export default request;

