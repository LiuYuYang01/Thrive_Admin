<script setup lang="ts">
import moment from 'moment'
import { addArticleDataAPI, editArticleDataAPI, getArticleDataAPI } from '@/api/Article'
import { Edit, Picture, Setting } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'

const form = ref<FormInstance>()

// 文章数据
const article = ref<Article>(localStorage.getItem("article") ? JSON.parse(localStorage.getItem("article")!) : {
    title: "",
    sketch: "",
    content: "",
    cover: "",
    cate: "",
    tag: "",
    date: new Date()
})

// 保存文章
const save = () => {
    // 保存文章到本地
    localStorage.setItem("article", JSON.stringify({ ...article.value, cate: "" }))

    ElNotification({
        title: '成功',
        message: '文章保存成功',
        type: 'success',
    })
}

// 文章数据校验规则
const rules = {
    title: [
        { required: true, message: '标题不能为空', trigger: 'blur' },
        { max: 50, message: '标题最大限制在50个字符', trigger: 'blur' },
    ]
}
</script>

<template>
    <div class="page">
        <Title title="创作" icon="edit-alt" />

        <div class="job">
            <div class="edit">
                <el-form ref="form" :rules="rules" :model="article">
                    <el-form-item prop="title">
                        <!-- 文章标题 -->
                        <el-input v-model="article.title" size="large" :prefix-icon="Edit" placeholder="给这篇文章定义个标题吧！" />
                    </el-form-item>
                </el-form>

                <!-- 文章内容 -->
                <v-md-editor v-model="article.content" height="600px" mode="edit"></v-md-editor>

                <el-collapse class="extend">
                    <el-collapse-item name="1">
                        <template #title>
                            <el-icon class="header-icon" style="margin-right: 5px;">
                                <Setting />
                            </el-icon>扩展设置
                        </template>

                        <el-input v-model="article.cover" size="large" :prefix-icon="Picture" placeholder="文章封面（选填）"
                            style="margin: 10px 0 15px;" />

                        <el-input v-model="article.description" type="textarea" maxlength="100" show-word-limit size="large"
                            placeholder="文章简述（选填）" class="sketch" />
                    </el-collapse-item>
                </el-collapse>
            </div>

            <!-- 侧边栏 -->
            <div class="sidebar">
                <!-- 分类 -->
                <ArticleCate v-model="article.cate" />

                <!-- 日期 -->
                <ArticleDate v-model="article.createtime" />

                <!-- 标签 -->
                <ArticleTag v-model="article.tag" />

                <div class="operate">
                    <!-- 保存文章 -->
                    <div style="background-color: #727cf5" @click="save">保存文章</div>
                    <!-- 发布 -->
                    <div style="margin-top: 10px">发布文章</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    position: relative;
    top: 0;

    .job {
        display: flex;
        justify-content: space-between;
        padding: 0 50px;

        .edit {
            width: 75%;

            :deep .el-collapse-item__content {
                padding-bottom: 0px !important;
            }

            .extend {
                :deep .el-collapse-item__header {
                    font-size: 18px;
                    height: 30px;
                    margin: 15px 0 10px;
                    margin-left: 10px;
                    border-bottom: none;
                }
            }

            .sketch {
                margin-bottom: 20px;

                :deep textarea {
                    height: 100px !important;
                }
            }
        }

        .sidebar {
            width: 20%;

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
                display: flex;
                flex-direction: column;
                padding: 20px;

                >div {
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                    border-radius: $round;
                    background-color: #49b984;
                }
            }
        }

        .v-md-editor {
            border: 1px solid #eee;
            box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
        }
    }
}
</style>
