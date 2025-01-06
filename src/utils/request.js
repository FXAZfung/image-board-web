import axios from 'axios';
import error from './error';
import {tansParams} from "@/utils/method";
import {getToken} from "@/utils/auth";

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

export const fetcher = (url) =>
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => data.data)
        .catch((err) => {
            console.error(err)
            throw err
        })

export const fetchWithToken = (url) =>
    fetch(url, {
        headers: {
            Authorization: getToken(),
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => data.data)
        .catch((err) => {
            console.error(err)
            throw err
        })

request.interceptors.request.use(
    (config) => {
        if (config.headers.token) {
            config.headers.Authorization = getToken()
            delete config.headers.token
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
        console.log(error);
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
        } else if (code === 401) {
            return Promise.reject('请先登录')
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);


export default request;

