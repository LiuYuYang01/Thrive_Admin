import { ElNotification } from 'element-plus';
import { delCateAPI } from "@/api/Cate";
import { getCateData } from './getCate'

export const delCate = async (id: number, level: any) => {
    level = level >= 1 || level === 0 ? 'one' : 'two'

    // 根据level决定删除一级还是二级分类
    if (level === "one") {
        var res: any = await delCateAPI(id, "one")
    } else if (level === "two") {
        var res: any = await delCateAPI(id, "two")
    }

    if (res.code !== 200) return

    ElNotification({
        title: '成功',
        message: res?.message,
        type: 'success',
    })

    // 删除成功后获取最新数据
    getCateData()
}