<script setup lang="ts">
import { ElNotification } from "element-plus"
import { delArticleDataAPI, getArticleListAPI } from '@/api/Article'
import { svg, whetherToDelete } from '@/utils'
import moment from 'moment';

const loading = ref<boolean>(false)

// 分页
const paginate = ref<Paginate<Article[]>>()

// 获取文章列表数据
const getArticleList = async (page?: Page) => {
    loading.value = true

    const { data } = await getArticleListAPI(page)
    paginate.value = data as Paginate<Article[]>

    loading.value = false
}
getArticleList()

// 监听分页变化
const pageChange = (page: number) => {
    getArticleList({ page, size: paginate.value?.size! })
}

// 删除文章
const delArticleData = async (id: number) => {
    async function fn() {
        loading.value = true

        await delArticleDataAPI(id)

        ElNotification({
            title: '成功',
            message: "🎉删除文章成功",
            type: 'success'
        })

        getArticleList({ page: paginate.value?.page!, size: paginate.value?.size! })

        loading.value = false
    }

    whetherToDelete(fn, "文章")
}

// 标签颜色
const colors = ref<string[]>(['info', '', 'success', 'danger', 'warning'])
</script>

<template>
    <div class="page">
        <Title title="文章管理" icon="notepad" />

        <el-table :data="paginate?.result" v-loading="loading" :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50" class="table">
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="title" label="📑 标题" width="270" align="center" />
            <el-table-column prop="description" label="摘要" width="300" align="center">
                <template #default="{ row }">
                    <span v-if="row.description">{{ row.description }}</span>
                    <span v-else>该文章暂未设置文章摘要</span>
                </template>
            </el-table-column>

            <el-table-column prop="cate" label="🗂️ 分类" width="130" align="center">
                <template #default="{ row }">
                    <span>{{ row.cate[0].name }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="tag" label="🏷️ 标签" width="230" align="center">
                <template #default="{ row }">
                    <el-row justify="space-evenly">
                        <el-tag v-for="(item, index) in row.tag.split(',')" :key="item.label" :type="(colors[index] as any)"
                            effect="light" v-if="row.tag.length">{{ item }}</el-tag>

                        <el-tag type="info" effect="light" v-else>暂无标签</el-tag>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column prop="view" label="🔥 浏览量" width="100" align="center" />
            <el-table-column prop="comment" label="🔢 评论数量" width="120" align="center" />
            <el-table-column prop="createtime" label="⏰ 发布时间" width="180" align="center">
                <template #default="{ row }">
                    {{ moment(row.createtime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center" width="160">
                <template #default="{ row }">
                    <el-button type="primary" text @click="$router.push(`/write?id=${row.id}`)">修改</el-button>
                    <el-button type="danger" text style="margin-left: 0;" @click="delArticleData(row.id)">删除</el-button>
                </template>
            </el-table-column>

            <template v-slot:empty>
                <!-- 空状态 -->
                <Null style="margin-top: 30px;" v-if="!paginate?.result?.length" />
            </template>
        </el-table>

        <el-row justify="end" style="margin-top: 20px;" v-if="paginate?.result?.length">
            <el-pagination background layout="prev, pager, next" :page-size="paginate?.size" :total="paginate?.total"
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
