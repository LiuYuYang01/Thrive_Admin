<script setup lang="ts">
import { getCommentAllAPI } from '@/api/Comment'

// const tab = ref("list")

const tabClick = (e: any) => {
    const name = e.props.name

    getCommentList(name)
}

const info = reactive<Info>({
    tab: "list",
    loading: false,
    total: 0,
    list: []
})

// 获取评论列表
const getCommentList = async (name: string) => {
    info.loading = true

    const { data } = await getCommentAllAPI()

    if (name === "list") {
        // 审核成功的评论
        info.list = data.filter(item => item.audit === 1)

        info.total = info.list.length
        info.tab = "list"
    } else {
        // 待审核的评论
        info.list = data.filter(item => item.audit === 0)
        info.total = info.list.length
        info.tab = "audit"
    }

    info.loading = false
}

getCommentList("list")
</script>

<template>
    <div class="page">
        <Title title="评论管理" icon="comment-minus" />

        <el-tabs v-model="info.tab" @tab-click="tabClick">
            <el-tab-pane label="评论列表" name="list">
                <CommentList :data="info" @get="getCommentList('list')" />
            </el-tab-pane>

            <el-tab-pane label="待审核" name="audit">
                <CommentList :data="info" @get="getCommentList('list')" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss"></style>
