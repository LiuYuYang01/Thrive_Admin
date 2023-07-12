<script setup lang="ts">
import { addTagAPI, delTagAPI, editTagAPI } from '@/api/Tag'
import { TagList, getTagData } from './logic/getTag'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
const TagRef = ref<FormInstance>()

const TagData = ref({
    name: ""
})

// 标签数据校验
const rules = reactive<FormRules>({
    name: [
        { required: true, message: "标签不能为空", trigger: "blur" },
        { min: 2, max: 10, message: "标签限制在2 ~ 10个字符", trigger: "blur" }
    ]
})

// 删除标签
const delTagData = async (id: number) => {
    const { code, message } = await delTagAPI(id)

    if (code !== 200) return

    ElNotification({
        title: '成功',
        message: message,
        type: 'success',
    })

    getTagData()
}

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        const { code, message } = await addTagAPI(TagData.value)

        if (code !== 200) return

        // 初始化数据
        TagData.value.name = ""

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        getTagData()
    })
}
</script>

<template>
    <div class="tag">
        <el-tabs tab-position="left" class="demo-tabs">
            <el-tab-pane label="标签墙">
                <Tags3D />
            </el-tab-pane>

            <el-tab-pane label="标签管理">
                <el-row justify="space-between" style="padding: 30px 80px">
                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title">标签列表</div>

                        <el-table :data="TagList" width="100%" height="80%" style="height: 800px;">
                            <el-table-column prop="id" label="ID" width="100" />
                            <el-table-column prop="name" label="名称" width="180" align="center" />

                            <el-table-column label="操作" align="center">
                                <template #default="{ row }">
                                    <el-button size="small">编辑</el-button>
                                    <el-button size="small" type="danger" @click="delTagData(row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>

                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title">标签管理</div>

                        <el-form ref="TagRef" :rules="rules" label-position="top" label-width="100px" :model="TagData">
                            <el-form-item label="标签名称" prop="name">
                                <el-input v-model="TagData.name" size="large" placeholder="新增标签" />
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