<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import { addCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'
import { ElNotification, FormInstance, FormRules } from 'element-plus';

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: "update:modelValue", data: boolean): void, (e: "getData"): void }>()

// 控制新增表单弹出框是否显示
const show = computed<boolean>(() => props.modelValue)

// 新增表单框实例
const cateRef = ref<FormInstance>()

// 表单数据
const cateForm = ref<Cate>({
    name: "",
    mark: "",
    url: "",
    icon: "",
    children: []
})

// 约束表单数据
const rules = reactive<FormRules<Omit<Cate, "id" | "icon" | "children">>>({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' },
        { min: 1, max: 10, message: '分类名称限制为 1 ~ 10 个字符', trigger: 'blur' }
    ],
    mark: [
        { required: true, message: '分类标识不能为空' },
        { min: 1, max: 10, message: '分类标识限制为 1 ~ 10 个字符' }
    ],
    url: [{ required: true, message: '分类链接不能为空' }],
})

// 表单校验
const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 校验通过
        const { message } = await addCateAPI(cateForm.value)

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        // 重置表单数据
        cateForm.value = {
            name: "",
            mark: "",
            url: "",
            icon: "",
            children: []
        }

        // 关闭新增分类表单框
        emit('update:modelValue', false)
        // 获取最新数据
        emit('getData')
    })
}
</script>

<template>
    <el-dialog v-model="show" title="新增分类导航" width="30%" style="padding-bottom: 0px;"
        @close="emit('update:modelValue', false)">
        <el-form ref="cateRef" :rules="rules" label-position="top" :model="cateForm" size="large">
            <el-form-item label="名称" prop="name">
                <el-input v-model="cateForm.name" placeholder="大前端" />
            </el-form-item>

            <el-form-item label="标识" prop="mark">
                <el-input v-model="cateForm.mark" placeholder="dqd" />
            </el-form-item>

            <el-form-item label="图标" prop="icon">
                <el-input v-model="cateForm.icon" placeholder="🎉" />
            </el-form-item>

            <el-form-item label="链接" prop="url">
                <el-input v-model="cateForm.url" placeholder="https://liuyuyang.net/" />
            </el-form-item>

            <el-form-item style="margin-bottom: -5px;">
                <el-button @click="emit('update:modelValue', false)">取消</el-button>
                <el-button type="primary" @click="submit(cateRef)">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped lang="scss">
::v-deep(.el-form-item__content) {
    display: flex;
    justify-content: end;
}
</style>
