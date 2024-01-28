<script setup lang="ts">
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { addTagDataAPI, delTagDataAPI, editTagDataAPI } from '@/api/Tag'
import { list, getTagList } from './tag'
import { whetherToDelete } from '@/utils';

const form = ref<FormInstance>()

const tag = ref<Tag>({ name: "" })

// 标签数据校验
const rules = reactive<FormRules>({
    name: [
        { required: true, message: "标签不能为空", trigger: "blur" },
        { min: 2, max: 10, message: "标签限制在2 ~ 10个字符", trigger: "blur" }
    ]
})

// 新增 / 编辑 标签切换
const title = ref<string>("新增标签");

// 删除标签
const delTagData = async (id: number) => {
    async function fn() {
        const { code, message } = await delTagDataAPI(id)

        ElNotification({
            title: '成功',
            message: "🎉删除标签成功",
            type: 'success',
        })

        getTagList()
    }

    // 确认是否删除
    whetherToDelete(fn, "标签")
}

// 编辑标签
const editTagData = (data: Tag) => {
    tag.value = data
    title.value = "编辑标签"
}

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 逻辑复用
        const fn = (message: string) => {
            // 初始化数据
            form.value?.resetFields()

            ElNotification({
                title: '成功',
                message: message,
                type: 'success',
            })

            getTagList()
        }

        // 有id就是编辑，没有就是新增
        if (tag.value.id) {
            await editTagDataAPI(tag.value)

            title.value = "新增标签"

            fn("🎉编辑标签成功")
        } else {
            await addTagDataAPI(tag.value)

            fn("🎉新增标签成功")
        }
    })
}
</script>

<template>
    <div class="page">
        <Title title="标签管理" icon="purchase-tag" />

        <el-tabs tab-position="left" class="tabs">
            <el-tab-pane label="标签墙">
                <Tags3D />
            </el-tab-pane>

            <el-tab-pane label="标签管理">
                <el-row justify="space-between" style="padding: 30px 80px">
                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title"><i class='bx bx-cog icon' />标签管理</div>

                        <el-form ref="form" :rules="rules" label-position="top" label-width="100px" :model="tag">
                            <el-form-item label="标签名称" prop="name">
                                <el-input v-model="tag.name" size="large" placeholder="大前端" />
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submit(form)" size="large" style="width: 100%;">{{ title
                                }}</el-button>
                            </el-form-item>
                        </el-form>

                        <img src="@/assets/svg/tag.svg" alt="" style="width: 100%; margin-top: 70px;">
                    </el-row>

                    <el-row style="display: flex; flex-direction: column; width: 40%;">
                        <div class="title"><i class='bx bx-purchase-tag icon' />标签列表</div>

                        <el-table :data="list" width="100%" height="80%" style="height: 800px;">
                            <el-table-column prop="id" label="ID" width="100" />
                            <el-table-column prop="name" label="名称" width="180" align="center" />

                            <el-table-column label="操作" align="center">
                                <template #default="{ row }">
                                    <el-button size="small" @click="editTagData(row)">编辑</el-button>
                                    <el-button size="small" type="danger" @click="delTagData(row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.page {
    .title {
        @include title;

        .icon {
            margin-right: 10px;
            font-size: 25px;
        }
    }

    :deep(.tabs) {
        height: 100%;

        .el-tabs__content {
            height: 100%;
        }

        .from {
            display: flex;
            justify-content: space-between;
        }
    }

    // :deep(.el-table--fit) {
    //     height: 60% !important;
    // }
}
</style>