import { ref } from 'vue';
import { getCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'

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

// 分类列表
export const cateList = ref<Cate[]>()

// 获取分类列表
export const getCateDate = async () => {
    const { data } = await getCateAPI()
    cateList.value = data

    loading.value = false
}