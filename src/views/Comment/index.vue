<script setup lang="ts">
import { getCommentListAPI } from '@/api/Comment'
import List from './components/List.vue'

const info = reactive<Info>({
    tab: "list",
    loading: false,
    list: [],
    paginate: { size: 0, page: 0, total: 0 }
})


const tabClick = (e: any) => {
    const name = e.props.name
    info.tab = name

    getCommentList()
}

// 获取评论列表
const getCommentList = async (page?: Page) => {
    info.loading = true

    const { data } = await getCommentListAPI(page)

    info.paginate.size = data.size
    info.paginate.page = data.page
    info.paginate.total = data.total

    if (info.tab === "list") {
        // 审核成功的评论
        info.list = data.result.filter(item => item.audit === 1)
    } else if (info.tab === "audit") {
        // 待审核的评论
        info.list = data.result.filter(item => item.audit === 0)
    }

    info.loading = false
}

getCommentList()
</script>

<template>
    <div class="page">
        <Title title="评论管理" icon="comment-minus" />

        <el-tabs v-model="info.tab" @tab-click="tabClick">
            <el-tab-pane label="评论列表" name="list">
                <List :data="info" @get="getCommentList" />
            </el-tab-pane>

            <el-tab-pane label="待审核" name="audit">
                <List :data="info" @get="getCommentList" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss"></style>
