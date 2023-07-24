import { getSwiperAPI } from '@/api/Swiper'

import { Swiper } from '@/types/Swiper'
import { ElNotification } from 'element-plus'

// Loading加载效果
export const loading = ref(true)
export const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

export const SwiperList = ref<Swiper[]>()

// 获取轮播图
export const getSwiperData = async () => {
  const { data } = await getSwiperAPI()
  loading.value = false

  SwiperList.value = data as Swiper[]
}

// 是否查看轮播图
export const viewImageShow = ref(false)
export const image = ref<string>("")