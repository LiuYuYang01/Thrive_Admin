<script setup lang="ts">
import moment from 'moment';
import { ElNotification } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
import svg from '@/utils/LoadingIcon'

// 获取文章列表
import { getArticleData, ArticleData, total, loading } from './logic/getArticle'
getArticleData()

// 删除文章
import { deleteArticleAPI } from '@/api/Article'
import { whetherToDelete } from '@/utils/ConfirmMessage'

// 删除文章
const delArticleData = async (id: number) => {
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

const router = useRouter()

// 监听页码变化
const pageChange = (value: number) => {
    getArticleData(value, 6)
}
</script>

<template>
    <div class="page">
        <Title title="文章管理" icon="notepad" />

        <el-table :data="ArticleData" v-loading="loading" :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50" class="table">
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="title" label="标题" width="180" align="center" />
            <el-table-column prop="sketch" label="简述" width="300" aligFn="sketch" class="briefly" />
            <el-table-column prop="cate" label="分类" width="130" align="center" />
            <el-table-column prop="tag" label="标签" width="230" align="center" />
            <el-table-column prop="view" label="浏览量" width="100" align="center" />
            <el-table-column prop="comment" label="评论数量" width="100" align="center" />
            <el-table-column prop="date" label="发布时间" width="180" align="center">
                <template #default="{ row }">
                    {{ moment(row.date).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template #default="{ row }">
                    <el-button type="primary" size="small" @click="router.push(`/write?id=${row.id}`)"
                        style="margin-left: 10px;">修改</el-button>
                    <el-button type="danger" size="small" @click="delArticleData(row.id)"
                        style="margin-left: 10px;">删除</el-button>
                </template>
            </el-table-column>

            <template v-slot:empty>
                <!-- 空状态 -->
                <Null style="margin-top: 30px;" v-if="!ArticleData?.length" />
            </template>
        </el-table>

        <el-row justify="end" style="margin-top: 20px;" v-if="ArticleData?.length">
            <el-pagination background layout="prev, pager, next" :page-size="6" :total="total"
                @current-change="pageChange" />
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.el-table :deep(.el-table_1_column_3 .cell) {
    display: -webkit-box !important;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.table :deep(.el-table__row) {
    height: 100px;
}
</style>
