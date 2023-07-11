import Request from '@/utils/Request'
import { Tag } from '@/types/Tag'

// 新增标签
export const addTagAPI = (data: Tag) => Request<Tag>("POST", "/tag", data)

// 获取标签
export const getTagAPI = (id?: number) => id ? Request<Tag>("GET", `/tag/${id}`) : Request<Tag[]>("GET", "/tag")