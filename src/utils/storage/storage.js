import {isNullOrUndef} from '@/utils/is.js'

class Storage {
    constructor(option) {
        this.storage = option.storage
        this.prefixKey = option.prefixKey
    }

    getKey(key) {
        return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key, value, expire) {
        let stringData = {
            value,
            time: Date.now()
        }
        if (!isNullOrUndef(expire)) {
            stringData.expire = new Date().getTime() + expire * 1000
        }
        this.storage.setItem(this.getKey(key), JSON.stringify(stringData))
    }

    get(key) {
        const {value} = this.getItem(key, {})
        return value
    }

    getItem(key, def = null) {
        const val = this.storage.getItem(this.getKey(key))
        if (!val) return def
        try {
            const data = JSON.parse(val)
            const {value, time, expire} = data
            if (isNullOrUndef(expire) || expire > new Date().getTime()) {
                return {value, time}
            }
            this.remove(key)
            return def
        } catch (error) {
            this.remove(key)
            return def
        }
    }

    remove(key) {
        this.storage.removeItem(this.getKey(key))
    }

    clear() {
        this.storage.clear()
    }
}

export function createStorage({prefixKey = '', storage = sessionStorage}) {
    return new Storage({prefixKey, storage})
}
