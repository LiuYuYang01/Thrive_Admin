import Request from '@/utils/Request'
import { Swiper } from '@/types/Swiper'

// 新增轮播图
export const addSwiperAPI = (data: Swiper) => Request<Swiper>("POST", "/swiper", data)

// 删除轮播图
export const delSwiperAPI = (id: number) => Request<Swiper>("DELETE", `/swiper/${id}`)

// 修改轮播图
export const editSwiperAPI = (id: number, data: Swiper) => Request<Swiper>("PATCH", `/swiper/${id}`, data)

// 获取轮播图 [有id就获取单个，没有id就获取全部]
export const getSwiperAPI = (id?: number) => id ? Request<Swiper>("GET", `/swiper/${id}`) : Request<Swiper[]>("GET", `/swiper`)