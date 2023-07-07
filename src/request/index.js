import axios from 'axios'
import {getToken, removeStatus, removeToken, removeUser} from "@utils/token.js"
import {v4 as uuidV4} from "uuid"
import jsSHA from "jssha/sha256";
import {ElMessage, ElMessageBox} from "element-plus";

const appId = import.meta.env.VITE_APP_ID;
const secretKey = import.meta.env.VITE_SECRET_KEY


export function handlerParams(data) {
    if (data === null || data === undefined || data === '') {
        data = {}
    }
    data['appid'] = appId
    data['timestamp'] = new Date().getTime().toString()
    data['randomStr'] = uuidV4()

    let keys = Object.keys(data).sort();
    let str = ''
    for (let i in keys) {
        if (keys[i] === "signature") {
            continue
        }
        if (data[keys[i]] === null || data[keys[i]] === '' || data[keys[i]] === undefined) {
            continue
        }
        str = str + keys[i] + '=' + data[keys[i]] + '&'
    }
    let hmac = new jsSHA("SHA-256", "TEXT")
    hmac.update(str + secretKey)
    const signature = hmac.getHash('HEX')
    str = str + 'signature=' + signature
    return '?' + str
}

export function handlerData(data) {
    if (data == null) {
        data = {}
    }
    data['appid'] = appId
    data['timestamp'] = new Date().getTime().toString()
    data['randomStr'] = uuidV4()

    let keys = Object.keys(data).sort();
    let str = ''
    let param = {}
    for (let i in keys) {
        if (keys[i] === "signature") {
            continue
        }
        if (data[keys[i]] === null || data[keys[i]] === '' || data[keys[i]] === undefined) {
            continue
        }
        param[keys[i]] = data[keys[i]]
        str = str + keys[i] + '=' + data[keys[i]] + '&'
    }
    let hmac = new jsSHA("SHA-256", "TEXT")
    hmac.update(str + secretKey)
    param['signature'] = hmac.getHash('HEX')
    return param
}

export function resolveResError(code, message) {
    switch (code) {
        case 400:
            message = message ?? '请求错误'
            break
        case 401:
            message = message ?? '登录过期'
            break
        case 403:
            message = message ?? '没有权限'
            break
        case 404:
            message = message ?? '资源不存在'
            break
        case 500:
            message = message ?? '服务异常'
            break
        default:
            message = message ?? '未知异常'
            break
    }
    return message
}


export function reqResolve(config) {
    // 处理不需要token的请求
    if (!config.haveToken) {
        return config
    }

    const token = getToken()
    if (token) {
        config.headers.Authorization = config.headers.Authorization || 'Bearer ' + getToken()
    }

    return config
}

export function reqReject(error) {
    return Promise.reject(error)
}

export function resResolve(response) {
    const {data, status, config, statusText} = response

    if (data !== '' && data?.code !== 200) {
        const code = data?.code ?? status
        if (code === 401) {
            remove()
        }
        /** 根据code处理对应的操作，并返回处理后的message */
        const message = resolveResError(code, data?.message ?? statusText)
        return Promise.reject({code, message, error: data || response})
    }

    if (data === '') {
        return Promise.resolve({code: status, data: response, message: statusText});
    }

    return Promise.resolve(data)
}

export function resReject(error) {
    if (error.code === "ECONNABORTED") {
        return ElMessage.error(error.message)
    }

    if (!error || !error.response) {
        const code = error?.code
        if (code === 401) {
            remove()
        }
        /** 根据code处理对应的操作，并返回处理后的message */
        const message = resolveResError(code, error.message)
        return Promise.reject({code, message, error})
    }
    const {data, status, config} = error.response
    const code = data?.code ?? status
    if (code === 401) {
        remove()
    }
    const message = resolveResError(code, data?.message ?? error.message)
    return Promise.reject({code, message, error: error.response?.data || error.response})
}

function remove() {
    removeToken()
    removeUser()
    removeStatus()
}

export function axiosCreate(options = {}) {
    const defaultOptions = {
        timeout: 60000,
    }
    const service = axios.create({
        ...defaultOptions,
        ...options,
    })
    service.interceptors.request.use(reqResolve, reqReject)
    service.interceptors.response.use(resResolve, resReject)
    return service
}

export const http = axiosCreate({
        baseURL: import.meta.env.VITE_BASE_API,
    },
)
