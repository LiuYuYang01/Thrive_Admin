import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { Swiper } from '@/types/Swiper'
import { addSwiperAPI, editSwiperAPI, getSwiperAPI } from '@/api/Swiper'
import { getSwiperData } from './getSwiper'

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
        { min: 10, max: 50, message: "轮播图描述限制在10 ~ 50个字符", trigger: "blur" }
    ],
    url: [
        { required: true, message: "轮播图链接不能为空", trigger: "blur" },
    ],
    image: [
        { required: true, message: "轮播图不能为空", trigger: "blur" },
    ]
})

// 提交表单
export const SubmitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 新增轮播图
        const { code, message } = await addSwiperAPI(SwiperForm.value)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        getSwiperData()
    })
}