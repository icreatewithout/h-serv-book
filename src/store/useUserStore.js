import {defineStore} from 'pinia'
import api from "@/request/api.js";

export const useUserStore = defineStore("user", {
    state() {
        return {
            menus: []
        }
    },
    getters: {
        getMenus: (state) => state.menus,
    },
    actions: {
        init(data) {
            this.menus = data
        },
        async findMenus() {
            const res = await api.menusByUser()
            if (res.code === 200 && res.data.length > 0) {
                this.menus = res.data
            }
            return res.data
        }
    }
})

