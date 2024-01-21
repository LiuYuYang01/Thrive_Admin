import Request from '@/utils/Request'

// 登录
export const loginDataAPI = (data: Login) => Request<account>("POST", "/login", data)

// 获取用户信息
export const getLinkDataAPI = (id?: number) => Request<Paginate<User>>("GET", `/user/${id}`)

// 修改用户信息
export const editUserDataAPI = (data: User) => Request<User>("PATCH", "/user/", data)