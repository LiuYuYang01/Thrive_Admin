import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    // 修改用户信息
    const setUser = (data: User) => {
        user.value = data
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
    }

    return { user, setUser, delUser }
}, { persist: true })