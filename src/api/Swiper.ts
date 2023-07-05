import Request from '@/utils/Request'
import { Swiper } from '@/types/Swiper'

// 新增轮播图
export const addSwiperAPI = (data: Swiper) => Request<Swiper>("POST", "/swiper", data)