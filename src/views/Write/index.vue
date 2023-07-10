<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

const ArticleData = ref({
    title: "",
    content: "",
    cate: "",
    date: new Date()
})
</script>

<template>
    <Title title="创作" icon="edit-alt" />

    <div class="main">
        <div class="edit">
            <!-- 标题 -->
            <el-input v-model="ArticleData.title" size="large" :prefix-icon="Edit" placeholder="给这篇文章定义个标题吧！"
                style="margin-bottom: 20px;" class="w-50 m-2" />

            <!-- 内容 -->
            <v-md-editor v-model="ArticleData.content" height="600px" mode="edit"></v-md-editor>
        </div>

        <!-- 侧边栏 -->
        <div class="sidebar">
            <!-- 分类 -->
            <ArticleCate v-model="ArticleData.cate" />

            <!-- 日期 -->
            <ArticleDate v-model="ArticleData.date" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .edit {
        width: 1000px;
    }

    .sidebar {
        width: 250px;
    }

    .v-md-editor {
        border: 1px solid #eee;
        box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
    }
}
</style>
