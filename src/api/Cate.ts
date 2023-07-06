import Request from '@/utils/Request'
import { Cate } from '@/types/Cate'

// 新增分类
export const addCateAPI = (data: Cate) => Request<Cate>("POST", "/cate", data)

// 获取分类
export const getCateAPI = () => Request<Cate[]>("GET", "/cate")