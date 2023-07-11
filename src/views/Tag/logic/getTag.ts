import { Tag } from '@/types/Tag'
import { getTagAPI } from '@/api/Tag'

export const TagList = ref<Tag[]>([])

// 获取标签列表
export const getTagData = async (cb?: () => void) => {
    const { data } = await getTagAPI()
    TagList.value = data as Tag[]

    cb?.()
}