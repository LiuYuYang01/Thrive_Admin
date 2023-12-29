<script setup lang="ts">
import { getCommentListAPI } from '@/api/Comment'

const commentList = ref<Comment[]>()

const getCommentList = async () => {
    const { code, data } = await getCommentListAPI()
    commentList.value = data
    console.log(data);
    
}
getCommentList()
</script>

<template>
    <div class="page">
        <Title title="评论管理" icon="comment-minus" />

        <el-table ref="form" :data="commentList" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="评论时间" width="120">
                <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column property="name" label="名称" width="120" />
            <el-table-column property="email" label="邮箱" show-overflow-tooltip />
        </el-table>
    </div>
</template>

<style scoped lang="scss"></style>
