import Request from '@/utils/Request'
import { Swiper } from '@/types/Swiper'

// 新增轮播图
export const addSwiperAPI = (data: Swiper) => Request<Swiper>("POST", "/swiper", data)

// 获取轮播图
export const getSwiperAPI = () => Request<Swiper[]>("GET", "/swiper")

// 获取轮播图 [有id就获取单个，没有id就获取全部]
// export const getSwiperAPI = (id?: number) => id ? Request<Swiper>("GET", `/swiper/${id}`) : Request<Swiper>("GET", `/swiper`)