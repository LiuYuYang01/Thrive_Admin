<script setup lang="ts">
import { ref } from 'vue';
import { View, Edit, Delete } from '@element-plus/icons-vue'
import { getArticleAPI } from '@/api/Article'
import { Article } from '@/types/Article'

const ArticleData = ref<Article[]>()

// 获取文章列表
const getArticleData = async () => {
    const {data} = await getArticleAPI()

    ArticleData.value = data as Article[]
}
getArticleData()
</script>

<template>
    <Title title="文章管理" icon="notepad" />

    <el-table :data="ArticleData" height="95%" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="sketch" label="简述" width="180" />
        <el-table-column prop="cate" label="分类" width="180" />
        <el-table-column prop="tag" label="标签" width="180" />
        <el-table-column prop="view" label="浏览量" width="180" />
        <el-table-column prop="count" label="评论数量" width="180" />
        <el-table-column prop="date" label="发布时间" width="180" />

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
::v-deep(.el-table td.el-table__cell) {
    border-right: none !important;
}
</style>
