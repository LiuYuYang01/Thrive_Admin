import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { getUserAPI, editUserAPI } from '@/api/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    // 获取用户信息
    const getUser = async () => {
        const { data } = await getUserAPI(1)
        console.log(data, 444);
        
        user.value = data as User
    }

    // 修改用户信息
    const setUser = (data: User) => {
        user.value = data
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
    }

    return { user, getUser, setUser, delUser }
}, { persist: true })