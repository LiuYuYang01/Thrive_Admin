import { getTagListAPI } from "@/api/Tag"

export const list = ref<Tag[]>([])

// 获取标签列表
export const getTagList = async (cb?: () => void) => {
    const { data } = await getTagListAPI({ page: 1, size: 9999 })
    list.value = data.result as Tag[]

    cb?.()
}