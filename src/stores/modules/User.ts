import { defineStore } from 'pinia'
import type { User, UserInfo } from '@/types/User'
import { getUserAPI, editUserAPI } from '@/api/User'

export const useUserStore = defineStore('user', () => {
    const user = ref<User>()
    const userInfo = ref<UserInfo>()

    // 获取用户信息
    const getUser = async () => {
        const { data } = await getUserAPI(1)

        userInfo.value = (data as User).userInfo
    }

    // 编辑用户信息
    const setUser = async (data: UserInfo, type: string) => {
        switch (type) {
            case "login":
                user.value = data as User
                break;

            case "edit":
                const { code, message } = await editUserAPI(1, data)

                if (code !== 200) return

                ElNotification({
                    title: '成功',
                    message: message,
                    type: 'success',
                })

                userInfo.value = data as UserInfo
                break;
        }
    }

    // 清空用户，退出后使用
    const delUser = () => {
        user.value = undefined
        userInfo.value = undefined
    }

    return { user, userInfo, getUser, setUser, delUser }
}, { persist: true })