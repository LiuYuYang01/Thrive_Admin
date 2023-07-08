import { addCateAPI, editCateAPI, getCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { getCateData } from './getCate'

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

const addId = ref<number | undefined>(undefined)
const emitId = ref<number>()
const emitLevel = ref<any>()

// 弹出新增分类框，并且根据id决定新增一级还是二级分类
export const addCate = (id: number | undefined) => {
    cateFormShow.value = true
    addId.value = id
}

// 编辑分类
export const editCate = async (data: Cate | undefined, level: any) => {
    cateFormShow.value = true

    emitId.value = data?.id
    emitLevel.value = level

    const { name, mark, icon, url } = data as Cate
    cateForm.value = { name, mark, icon, url }
}

// 表单校验
export const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        if (emitId.value) {
            // 编辑分类
            emitLevel.value = emitLevel.value >= 0 ? 'one' : 'two'

            const { message } = await editCateAPI(cateForm.value, emitId.value as number, emitLevel.value)

            ElNotification({
                title: '成功',
                message: message,
                type: 'success',
            })
        } else {
            // 新增分类
            // 通过id来判断新增一级还是二级分类
            // 如果没有id就是新增一级，有就二级
            const { message } = addId ? await addCateAPI(cateForm.value, addId.value) : await addCateAPI(cateForm.value)

            ElNotification({
                title: '成功',
                message: message,
                type: 'success',
            })
        }

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