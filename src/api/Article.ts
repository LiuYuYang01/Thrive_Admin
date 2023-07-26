import Request from '@/utils/Request'
import { Article } from '@/types/Article'

// 新增文章
export const addArticleAPI = (data: Article) => Request<Article>("POST", "/article", data)

// 删除文章
export const deleteArticleAPI = (id: number) => Request<Article>("DELETE", `/article/${id}`)

// 获取文章 [有id就获取单个，没有id就获取全部]
export const getArticleAPI = (id?: number) => id ? Request<Article>("GET", `/article/${id}`) : Request<Article[]>("GET", `/article`)