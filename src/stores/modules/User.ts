import { defineStore } from 'pinia'
import type { User, UserInfo } from '@/types/User'
import { getUserAPI, editUserAPI } from '@/api/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()

    // 获取用户信息
    const getUser = async () => {
        const { data } = await getUserAPI(1)

        user.value = { ...user.value, ...data as User }
    }

    // 编辑用户信息
    const setUser = async (data: UserInfo) => {
        const { code, message } = await editUserAPI(1, data)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        user.value = { ...user.value, ...data as User }
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
    }

    return { user, getUser, setUser, delUser }
}, { persist: true })