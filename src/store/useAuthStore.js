import {defineStore} from 'pinia'
import api from "@/request/api.js";
import {
    getId,
    getStatus, getToken,
    getUser, removeId,
    removeStatus,
    removeToken,
    removeUser, setId,
    setStatus,
    setToken,
    setUser
} from "@utils/token.js";


export const useAuthStore = defineStore("auth", {

    state() {
        return {
            id: getId() === null ? '' : getId(),
            token: getToken(),
            info: getUser() === null ? {} : getUser(),
            login: getStatus(),
        }
    },

    getters: {
        getId: (state) => state.id,
        getToken: (state) => state.token,
        getInfo: (state) => state.info,
        getLogin: (state) => state.login,
    },
    actions: {
        async auth(res) {
            this.token = res.data.token
            this.info = res.data.user
            this.login = true
            this.id = res.data.user.id
            setToken(res.data.token)
            setStatus()
            setUser(res.data.user)
            setId(res.data.user.id)
        },
        async register(res) {
            this.token = res.data.token
            this.info = res.data.user
            this.login = true
            this.id = res.data.user.id
            setToken(res.data.token)
            setStatus()
            setUser(res.data.user)
            setId(res.data.user.userId)
        },
        async logout() {
            try {
                const res = await api.logout()
                removeToken()
                removeUser()
                removeStatus()
                removeId()
                this.login = false
                this.token = null
                this.info = null
                this.id = ''
                return res
            } catch (err) {
                return err
            }

        },
        async setUser(data) {
            this.info = data
            setUser(data)
        }
    }
})

