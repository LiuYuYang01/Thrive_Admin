import Request from '@/utils/Request'
import { Cate } from '@/types/Cate'

// 新增分类：传cid代表新增一级分类，不传代表新增二级
export const addCateAPI = (data: Cate, cid?: number) => cid ? Request<Cate>("POST", "/cate", { ...data, cid }) : Request<Cate>("POST", "/cate", data)

// 删除分类
export const delCateAPI = (id: number, level: string) => Request<Cate>("DELETE", `/cate/${id}`, { level })

// 修改分类
export const editCateAPI = (data: Cate, id: number, level: string) => Request<Cate>("PUT", `/cate/${id}`, { ...data, level })

// 获取分类：传ID代表获取单个分类，不传代表所有分类
export const getCateAPI = (id?: number) => id ? Request<Cate>("GET", `/cate/${id}`) : Request<Cate[]>("GET", "/cate")