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
    <div class="page">
        <Title title="创作" icon="edit-alt" />

        <div class="main">
            <div class="edit">
                <!-- 标题 -->
                <el-input v-model="ArticleData.title" size="large" :prefix-icon="Edit" placeholder="给这篇文章定义个标题吧！"
                    style="margin-bottom: 20px;" class="w-50 m-2" />

                <!-- 内容 -->
                <v-md-editor v-model="ArticleData.content" height="600px" mode="edit"></v-md-editor>

                <el-input v-model="ArticleData.cover" size="large" :prefix-icon="Picture" placeholder="文章封面"
                    style="margin: 20px 0;" />

                <el-input v-model="ArticleData.sketch" type="textarea" maxlength="100" show-word-limit size="large"
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

                <!-- 操作 -->
                <div class="operate">
                    <!-- 草稿 -->
                    <div class="draft">保存草稿</div>
                    <!-- 发布 -->
                    <div class="publish">发布文章</div>
                </div>
            </div>
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

        >div {
            border: 1px solid #eee;
            border-radius: $round;
            background-color: #fff;
            box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .operate {
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            border-radius: $round;

            div {
                width: 50%;
                height: 45px;
                line-height: 45px;
                text-align: center;
                color: #fff;
                cursor: pointer;
            }

            .draft {
                background-color: $color;
            }

            .publish {
                background-color: #49b984;
            }

            &::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 45px;
                height: 45px;
                background-color: #fff;
                border-radius: 50%;
            }
        }
    }

    .v-md-editor {
        border: 1px solid #eee;
        box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
    }
}
</style>
