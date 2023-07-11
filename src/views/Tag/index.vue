<script setup lang="ts">
import { TagList, getTagData } from './logic/getTag'

import { FormInstance } from 'element-plus'
const TagRef = ref<FormInstance>()

const TagData = ref({
    name: ""
})

getTagData()

const submit = (TagRef: FormInstance) => {

}
</script>

<template>
    <div class="tag">
        <el-tabs ref="TagRef" tab-position="left" class="demo-tabs">
            <el-tab-pane label="标签墙">
                <Tags3D />
            </el-tab-pane>

            <el-tab-pane label="标签管理">
                <el-row justify="space-between" style="padding: 30px 80px">
                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title">标签列表</div>

                        <el-table :data="TagList" style="width: 100%">
                            <el-table-column prop="id" label="ID" width="100" />
                            <el-table-column prop="name" label="名称" width="180" align="center" />

                            <el-table-column label="操作" align="center">
                                <template #default="scope">
                                    <el-button size="small">编辑</el-button>
                                    <el-button size="small" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>

                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title">标签管理</div>

                        <el-form label-position="top" label-width="100px" :model="TagData">
                            <el-form-item label="标签名称" style="margin-bottom: 10px;">
                                <el-input v-model="TagData.name" size="large" />
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submit(TagRef!)" size="large"
                                    style="width: 100%;">新增标签</el-button>
                            </el-form-item>
                        </el-form>

                        <img src="@/assets/svg/tag.svg" alt="" style="width: 100%; margin-top: 70px;">
                    </el-row>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.tag {
    height: 100%;

    .title {
        @include title;
    }

    :deep .demo-tabs {
        height: 100%;

        .el-tabs__content {
            height: 100%;
        }

        .from {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>