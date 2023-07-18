import Request from '@/utils/Request'
import { User, UserInfo } from '@/types/User'

// 登录
export const loginAPI = (data: Omit<User, "token">) => Request<User>("POST", "/login", data)

// 获取用户信息 [有id就获取单个，没有id就获取全部]
export const getUserAPI = (id?: number) => id ? Request<User>("GET", `/user/${id}`) : Request<User[]>("GET", `/swiper`)

// 修改用户信息
export const editUserAPI = (id: number, data: UserInfo) => Request<User>("PATCH", `/user/${id}`, data)