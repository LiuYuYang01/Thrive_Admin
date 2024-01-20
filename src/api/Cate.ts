import Request from '@/utils/Request'
import { Paginate } from '@/types/Response'

// 新增分类：传cid代表新增一级分类，不传代表新增二级
export const addCateDataAPI = (data: Cate, cid?: number) => cid ? Request<Cate>("POST", "/cate", { ...data, cid }) : Request<Cate>("POST", "/cate", data)

// 删除分类
export const delCateDataAPI = (id: number, level: string) => Request<Cate>("DELETE", `/cate/${id}`, { level })

// 修改分类
export const editCateDataAPI = (data: Cate, id: number, level: string) => Request<Cate>("PATCH", `/cate/${id}`, { ...data, level })

// 获取分类：传ID代表获取单个分类，不传代表所有分类
export const getCateDataAPI = (id?: number) => id ? Request<Paginate<Cate>>("GET", `/cate/${id}`) : Request<Paginate<Cate[]>>("GET", "/cate")