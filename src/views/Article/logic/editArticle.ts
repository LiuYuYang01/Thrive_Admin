import { editArticleAPI } from '@/api/Article'
import { getArticleData, loading } from './getArticle'
import { whetherToDelete } from '@/utils/ConfirmMessage'
import { ElNotification } from 'element-plus'
import { Article } from '@/types/Article'

// 编辑文章
export const editArticleData = (id: number, data: Article) => {
    async function fn() {
        const { code, message } = await editArticleAPI(id, data)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success'
        })

        getArticleData()
    }

    whetherToDelete(fn, "文章")
}