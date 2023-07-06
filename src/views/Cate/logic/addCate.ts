import { ref, reactive } from 'vue';
import { addCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { getCateData } from './getCate'

// 控制新增分类的表单是否显示
export const cateFormShow = ref(false)

const cateId = ref<number | undefined>(undefined)

// 弹出新增分类框，并且根据id决定新增一级还是二级分类
export const addCate = (id?: number) => {
    cateFormShow.value = true
    cateId.value = id
}

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

        // 通过id来判断新增一级还是二级分类
        // 如果有id就是新增一级，没有就二级
        const { message } = cateId ? await addCateAPI(cateForm.value, cateId.value) : await addCateAPI(cateForm.value)

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        // 重置表单数据
        formEl.resetFields()

        // 关闭新增分类表单框
        cateFormShow.value = false
        // 获取最新数据
        getCateData()
    })
}

// 关闭弹框时处理的逻辑
export const close = () => {
    // 关闭新增分类弹框
    cateFormShow.value = false

    // 将表单校验初始化
    cateRef.value?.resetFields()
}