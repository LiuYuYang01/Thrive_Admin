import axios from 'axios'
import router from '@/routers'
import type { Response } from '@/types/Response'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores'

// 配置项目API域名
export const baseURL = "http://localhost:5000/api"
// export const baseURL = "http://api.liuyuyang.net/api"

// 创建 axios 实例
const instance = axios.create({
    // 项目API根路径
    baseURL,
    // 请求超时的时间
    timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        const store = useUserStore()

        // 如果有token就把赋值给请求头
        if (store.user?.token) {
            config.headers['Authorization'] = `Bearer ${store.user?.token}`
        }

        return config
    },
    (err) => {
        Promise.reject(err)
    }
)

// 响应拦截
instance.interceptors.response.use(
    res => {
        // 只要code不等于200, 就相当于响应失败
        if (res.data?.code !== 200) {
            ElNotification({
                title: '失败',
                message: res.data?.message || "未知错误",
                type: 'error',
            })

            Promise.reject(res.data)
        }

        return res.data
    },
    err => {
        // 如果401相当于认证失败
        if (err.response.status === 401) {
            const store = useUserStore()

            // 删除用户信息
            store.delUser()

            // 跳转到登录页
            router.push({
                path: "/login",
                query: { returnUrl: router.currentRoute.value.fullPath }
            })
        }

        return Promise.reject(err)
    }
)

// 如果是GET传参就自动识别为query，POST为data
const Request = <T>(method: string, url: string, reqParams?: object) => {
    if (!method) method = "GET"

    return instance.request<any, Response<T>>({
        method, url,
        [method.toLocaleUpperCase() === "GET" ? "params" : "data"]: reqParams
    })
}

export default Request