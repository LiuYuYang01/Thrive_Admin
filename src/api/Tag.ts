import Request from '@/utils/Request'
import { Tag } from '@/types/Tag'

// 新增标签
export const addTagAPI = (data: Tag) => Request<Tag>("POST", "/tag", data)

// 删除标签
export const delTagAPI = (id: number) => Request<Tag>("DELETE", `/tag/${id}`)

// 修改标签
export const editTagAPI = (id: number, data: Tag) => Request<Tag>("PATCH", `/tag/${id}`, data)

// 获取标签
export const getTagAPI = (id?: number) => id ? Request<Tag>("GET", `/tag/${id}`) : Request<Tag[]>("GET", "/tag")