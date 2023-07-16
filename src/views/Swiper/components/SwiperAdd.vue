<script setup lang="ts">
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { Swiper } from '@/types/Swiper'
import { addSwiperAPI, editSwiperAPI, getSwiperAPI } from '@/api/Swiper'

const props = defineProps<{ data: any }>()

const SwiperData = ref<Swiper>({
    title: '',
    description: '',
    url: '',
    image: ''
})

// 数据回显
watch(props.data, async swiper => {
    if (swiper.title === "修改轮播图") {
        const { data } = await getSwiperAPI(swiper.id)

        SwiperData.value = data as Swiper
    }
})

// 轮播图实例
const SwiperRef = ref<FormInstance>()

// 数据校验
const rules = reactive<FormRules<Swiper>>({
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
const SubmitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 有id就是修改，没有就是添加
        if (SwiperData.value.id) {
            // 编辑轮播图
            const { title, description, url, image } = SwiperData.value
            const { code, message } = await editSwiperAPI(props.data.id, { title, description, url, image })

            if (code !== 200) return

            ElNotification({
                title: '成功',
                message: message,
                type: 'success',
            })
        } else {
            // 新增轮播图
            const { code, message } = await addSwiperAPI(SwiperData.value)

            if (code !== 200) return

            ElNotification({
                title: '成功',
                message: message,
                type: 'success',
            })
        }
    })
}
</script>

<template>
    <div class="manage">
        <!-- 表单 -->
        <el-form ref="SwiperRef" label-position="top" :model="SwiperData" :rules="rules"
            style="width: 400px; max-width: 460px" size="large">
            <el-form-item label="标题" prop="title">
                <el-input v-model="SwiperData.title" placeholder="要么沉沦 要么巅峰!" />
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input v-model="SwiperData.description" placeholder="Either sink or peak!" />
            </el-form-item>

            <el-form-item label="链接" prop="url">
                <el-input v-model="SwiperData.url" placeholder="http://liuyuyang.net/" />
            </el-form-item>

            <el-form-item label="图片" prop="image">
                <el-input v-model="SwiperData.image" placeholder="http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="SubmitForm(SwiperRef)">{{ props.data.title
                }}</el-button>
            </el-form-item>
        </el-form>

        <!-- 插画 -->
        <img src="@/assets/svg/image.svg" class="image">
    </div>
</template>

<style scoped lang="scss">
.add {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;

    .image {
        width: 350px;
        margin-right: 220px;
        margin-top: 20px;
    }
}
</style>
