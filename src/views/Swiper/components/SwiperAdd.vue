<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { Swiper } from '@/types/Swiper'
import { addSwiperAPI } from '@/api/Swiper'

const swiperForm = reactive<Swiper>({
    title: '',
    description: '',
    url: '',
    image: ''
})

const swiperRef = ref<FormInstance>()

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
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        // 校验不通过，则后续的业务逻辑不再执行
        if (!valid) return

        // 校验通过
        const { message } = await addSwiperAPI(swiperForm)

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })
    })
}
</script>

<template>
    <div class="add">
        <!-- 表单 -->
        <el-form ref="swiperRef" label-position="top" :model="swiperForm" :rules="rules"
            style="width: 400px; max-width: 460px" size="large">
            <el-form-item label="标题" prop="title">
                <el-input v-model="swiperForm.title" placeholder="要么沉沦 要么巅峰!" />
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input v-model="swiperForm.description" placeholder="Either sink or peak!" />
            </el-form-item>

            <el-form-item label="链接" prop="url">
                <el-input v-model="swiperForm.url" placeholder="http://liuyuyang.net/" />
            </el-form-item>

            <el-form-item label="图片" prop="image">
                <el-input v-model="swiperForm.image" placeholder="http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="submitForm(swiperRef)">新增轮播图</el-button>
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
