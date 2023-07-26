<script setup lang="ts">
import moment from 'moment';
import { View, Edit, Delete } from '@element-plus/icons-vue'

// 获取文章列表
import { getArticleData, ArticleData, loading, svg } from './logic/getArticle'
getArticleData()

// 删除文章
import { delArticleData } from './logic/delArticle'

// 编辑文章
import { editArticleData } from './logic/editArticle'

const router = useRouter()
</script>

<template>
    <div class="page">
        <Title title="文章管理" icon="notepad" />

        <el-table :data="ArticleData" v-loading="loading" :element-loading-svg="svg" class="custom-loading-svg"
            element-loading-svg-view-box="-10, -10, 50, 50">
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="title" label="标题" width="180" align="center" />
            <el-table-column prop="sketch" label="简述" width="300" align="sketch" class="briefly" />
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
</style>
