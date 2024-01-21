<script setup lang="ts">
import moment from 'moment';
import { svg } from '@/utils'

const tab = ref<string>()
const loading = ref<boolean>(false)

const comment = ref<Comment[]>([])
</script>

<template>
    <div class="page">
        <Title title="评论管理" icon="comment-minus" />

        <el-tabs v-model="tab">
            <el-tab-pane label="评论列表" name="list">
                <el-table ref="form" :data="comment" v-loading="loading" :element-loading-svg="svg"
                    element-loading-svg-view-box="-10, -10, 50, 50" style="width: 100%" size="large">
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
                            <!-- {{ filterArticleTitle(scope.row.aid) }} -->
                        </template>
                    </el-table-column>

                    <el-table-column label="评论发布时间" width="230">
                        <template #default="scope">{{ moment(scope.row.date).format('YYYY-MM-DD HH:mm:ss') }}</template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" :width="tab === 'audit' ? 120 : 80" align="center">
                        <template #default="scope">
                            <el-button link type="primary" size="small" v-if="tab === 'audit'"><b>通过</b></el-button>
                            <el-button link type="danger" size="small"><b>删除</b></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane label="待审核" name="audit">

            </el-tab-pane>
        </el-tabs>
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
