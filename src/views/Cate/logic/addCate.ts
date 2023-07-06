import { ref, reactive } from 'vue';
import { addCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { getCateDate } from './getCate'

// 控制新增分类的表单是否显示
export const cateFormShow = ref(false)

// 新增表单框实例
export const cateRef = ref<FormInstance>()

// 表单数据
export const cateForm = ref<Cate>({
    name: "",
    mark: "",
    url: "",
    icon: "",
    children: []
})

// 约束表单数据
export const rules = reactive<FormRules<Omit<Cate, "id" | "icon" | "children">>>({
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
export const submit = async (formEl: FormInstance | undefined) => {
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
        cateFormShow.value = false
        // 获取最新数据
        getCateDate()
    })
}
