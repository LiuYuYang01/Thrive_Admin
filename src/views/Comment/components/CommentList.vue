<script setup lang="ts">
import moment from 'moment';
import svg from '@/utils/LoadingIcon'

import { ArticleData, getArticleData } from '@/views/Article/logic/getArticle'
import { auditCommentDataAPI } from '@/api/Comment';
getArticleData() // 获取文章列表

const props = defineProps<{ data: Info }>()
const emit = defineEmits<(e: "get", tab:string) => void>()

// 默认每页显示个数
// const defaultSize = ref<number>(2)

// 过滤该评论所属的文章
const filterArticleTitle = (id: number) => {
    const data = ArticleData.value?.filter(item => item.id == id)

    return data?.length ? data[0].title : " ";
}

// 筛选选中的数据
const handleSelectionChange = (e: Comment[]) => {
    console.log(e);
}

// 审核评论
const auditComment = async (id: number) => {
    const { code } = await auditCommentDataAPI(id)
    
    if(code != 200) return

    // 获取最新数据
    emit("get", "list")

    ElMessage({
        message: '评论审核成功',
        type: 'success',
    })
}

// 监听页码变化
// const pageChange = (value: number) => {
//     console.log(value,999);
    
//     emit("get", { page: value, size: 6 })
// }
</script>

<template>
    <div class="list">
        <el-table ref="form" :data="data.list" v-loading="data.loading" :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50" style="width: 100%" @selection-change="handleSelectionChange"
            size="large">
            <el-table-column type="selection" width="55" />

            <el-table-column property="id" label="ID" width="100" fixed="left" />

            <el-table-column property="name" label="名称" width="170" fixed="left" />

            <el-table-column property="email" label="邮箱" width="230" />

            <el-table-column property="content" label="内容" width="270" />

            <el-table-column property="url" label="网站" width="250">
                <template #default="scope">
                    <a :href="scope.row.url" class="url">{{ scope.row.url }}</a>
                </template>
            </el-table-column>

            <el-table-column property="rid" label="所属文章" width="300">
                <template #default="scope">
                    {{ filterArticleTitle(scope.row.aid) }}
                </template>
            </el-table-column>

            <el-table-column label="评论时间" width="230">
                <template #default="scope">{{ moment(scope.row.date).format('YYYY-MM-DD HH:mm:ss') }}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="data.tab === 'audit' ? 120 : 80" align="center">
                <template #default="scope">
                    <el-button link type="primary" size="small" v-if="data.tab === 'audit'" @click="auditComment(scope.row.id)"><b>通过</b></el-button>
                    <el-button link type="danger" size="small"><b>删除</b></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-row justify="end" style="margin-top: 20px;" v-if="data.list?.length && data.list?.length > 3">
            <el-pagination background layout="prev, pager, next" :page-size="2" :total="data.list?.length"
                @current-change="pageChange" />
        </el-row> -->
    </div>
</template>

<style scoped lang="scss">
.url {
    &:hover {
        color: $color;
        transition: color $move;
    }
}
</style>
