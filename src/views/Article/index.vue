<script setup lang="ts">
import { View, Edit, Delete } from '@element-plus/icons-vue'
import { getArticleAPI } from '@/api/Article'
import { Article } from '@/types/Article'

const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const ArticleData = ref<Article[]>()

// 获取文章列表
const getArticleData = async () => {
    const { data } = await getArticleAPI()

    ArticleData.value = data as Article[]
    loading.value = false
}
getArticleData()
</script>

<template>
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
        <el-table-column prop="date" label="发布时间" width="180" align="center" />

        <el-table-column fixed="right" label="操作" align="center" width="150">
            <template #default>
                <el-button circle size="small" :icon="View"></el-button>
                <el-button circle type="primary" size="small" :icon="Edit"></el-button>
                <el-button circle type="danger" size="small" :icon="Delete"></el-button>
            </template>
        </el-table-column>
    </el-table>
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
