<script setup lang="ts">
import { Article } from '@/types/Article'
import { Edit, Picture, Tickets } from '@element-plus/icons-vue'

const ArticleData = ref<Article>({
    title: "",
    sketch: "",
    content: "",
    cover: "",
    cate: "",
    tag: "",
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

            <el-input v-model="ArticleData.title" size="large" :prefix-icon="Picture" placeholder="文章封面"
                style="margin: 20px 0;" />

            <el-input v-model="ArticleData.title" type="textarea" maxlength="100" show-word-limit size="large"
                placeholder="文章简述" class="sketch" />
        </div>

        <!-- 侧边栏 -->
        <div class="sidebar">
            <!-- 分类 -->
            <ArticleCate v-model="ArticleData.cate" />

            <!-- 日期 -->
            <ArticleDate v-model="ArticleData.date" />

            <!-- 标签 -->
            <ArticleTag v-model="ArticleData.tag" />
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

        .sketch {
            margin-bottom: 20px;

            :deep textarea {
                height: 100px !important;
            }
        }
    }

    .sidebar {
        width: 250px;

        div {
            border: 1px solid #eee;
            border-radius: $round;
            background-color: #fff;
            box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .v-md-editor {
        border: 1px solid #eee;
        box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
    }
}
</style>
