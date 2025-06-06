/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: { [key: string]: any }) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        const part = encodeURIComponent(propName) + '=';
        if (value !== null && value !== '' && typeof value !== 'undefined') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (
                        value[key] !== null &&
                        value[key] !== '' &&
                        typeof value[key] !== 'undefined'
                    ) {
                        let params = propName + '[' + key + ']'
                        const subPart = encodeURIComponent(params) + '=';
                        result += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return result
}

export function debounce(fn: Function, delay: number) {
    let timer: NodeJS.Timeout | null = null
    return function (this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

export function throttle(fn: Function, delay: number) {
    let canRun = true
    return function (this: any, ...args: any[]) {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, args)
            canRun = true
        }, delay)
    }
}

export function resolveImageUrl(url: string) {
    return "http://localhost:4536"+ "/images/image/" + url
}

// 自动转换内存单位 初始单位为byte
export function formatMemory(memory: number) {
    let unit = 'B'
    if (memory >= 1024) {
        memory = memory / 1024
        unit = 'KB'
    }
    if (memory >= 1024) {
        memory = memory / 1024
        unit = 'MB'
    }
    if (memory >= 1024) {
        memory = memory / 1024
        unit = 'GB'
    }
    return memory.toFixed(2) + unit
}