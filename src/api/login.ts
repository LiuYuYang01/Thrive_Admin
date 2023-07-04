import Request from '@/utils/Request'
import { User } from '@/types/User'

// 登录
export const loginAPI = (data: Omit<User, "token">) => Request<User>("POST", "/login", data)