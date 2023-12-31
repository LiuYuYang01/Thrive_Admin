import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { Swiper } from '@/types/Swiper'
import { addSwiperAPI, editSwiperAPI, getSwiperAPI, delSwiperAPI } from '@/api/Swiper'
import { getSwiperData } from './getSwiper'

// tabs切换
export const activeName = ref("list")

export const SwiperForm = ref<Swiper>({
    title: '',
    description: '',
    url: '',
    image: ''
})

// 轮播图实例
export const SwiperRef = ref<FormInstance>()

// 数据校验
export const rules = reactive<FormRules<Swiper>>({
    title: [
        { required: true, message: "轮播图标题不能为空", trigger: "blur" },
        { min: 5, max: 30, message: "轮播图标题限制在5 ~ 30个字符", trigger: "blur" }
    ],
    description: [
        { required: true, message: "轮播图描述不能为空", trigger: "blur" },
        { min: 10, message: "轮播图描述不能少于10个字符", trigger: "blur" }
    ],
    url: [
        { required: true, message: "轮播图链接不能为空", trigger: "blur" },
    ],
    image: [
        { required: true, message: "轮播图不能为空", trigger: "blur" },
    ]
})

// 修改轮播图
export const editSwiperData = (data: Swiper) => {
    SwiperForm.value = data

    activeName.value = "operate"
}

import {whetherToDelete} from '@/utils/ConfirmMessage'

// 删除轮播图
export const delSwiperData = async (id: number) => {
    async function fn() {
        const { code, message } = await delSwiperAPI(id)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        getSwiperData()
    }

    whetherToDelete(fn, "轮播图")
}

// 提交表单
export const SubmitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    // 减少代码冗余
    const fn = (code: number, message: string) => {
        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        // 获取最新数据
        getSwiperData()

        // 回退到列表
        activeName.value = "list"

        // 将数据初始化
        SwiperRef.value?.resetFields()
    }

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 有ID就是编辑，没有就是新增
        if (SwiperForm.value.id) {
            // 修改轮播图
            const { title, description, url, image } = SwiperForm.value
            const { code, message } = await editSwiperAPI(SwiperForm.value.id, { title, description, url, image })

            fn(code, message)
        } else {
            // 新增轮播图
            const { code, message } = await addSwiperAPI(SwiperForm.value)

            fn(code, message)
        }
    })
}