import { ElNotification } from 'element-plus';
import { delCateAPI } from "@/api/Cate";
import { getCateData } from './getCate'

export const delCate = async (id: number) => {
    try {
        const { message } = await delCateAPI(id)
        console.log(id, message);

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        // 删除成功后获取最新数据
        getCateData()
    } catch (error) {
        ElNotification({
            title: '失败',
            message: "删除分类前请确保该分类下没有子分类",
            type: 'error',
        })
    }
}