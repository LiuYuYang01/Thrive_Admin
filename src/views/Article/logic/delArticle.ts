import { deleteArticleAPI } from '@/api/Article'
import { getArticleData, loading } from './getArticle'
import { whetherToDelete } from '@/utils/ConfirmMessage'
import { ElNotification } from 'element-plus'

// 删除文章
export const delArticleData = async (id: number) => {
    async function fn() {
        loading.value = true

        const { code, message } = await deleteArticleAPI(id)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success'
        })

        getArticleData()

        loading.value = false
    }

    whetherToDelete(fn, "文章")
}