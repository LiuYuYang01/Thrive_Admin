import Request from '@/utils/Request'
import { Cate } from '@/types/Cate'

// 新增分类
export const addCateAPI = (data: Cate, cid?: number) => cid ? Request<Cate>("POST", "/cate", { ...data, cid }) : Request<Cate>("POST", "/cate", data)

// 删除分类
export const delCateAPI = (id: number) => Request<Cate>("DELETE", `/cate/${id}`)

// 修改分类
export const editCateAPI = (data: Cate, id: number) => Request<Cate>("PUT", `/cate/${id}`, data)

// 获取分类
export const getCateAPI = () => Request<Cate[]>("GET", "/cate")