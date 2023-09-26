<script setup lang="ts">
import moment from 'moment';
import { ElNotification } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

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

// 每页显示多少个文章
const size = ref<number>(2)

// 监听页码变化
const pageChange = (value: number) => {
    getArticleData(value, size.value)
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
            <el-table-column prop="count" label="评论数量" width="100" align="center" />
            <el-table-column prop="date" label="发布时间" width="180" align="center">
                <template #default="{ row }">
                    {{ moment(row.date).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template #default="{ row }">
                    <el-button circle type="primary" size="small" :icon="Edit"
                        @click="router.push(`/write?id=${row.id}`)" />
                    <el-button circle type="danger" size="small" :icon="Delete" @click="delArticleData(row.id)" />
                </template>
            </el-table-column>
        </el-table>

        <el-row justify="end" style="margin-top: 20px;">
            <el-pagination background layout="prev, pager, next" :page-size="size" :total="total"
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
