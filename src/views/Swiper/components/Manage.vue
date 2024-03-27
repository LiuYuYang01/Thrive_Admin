<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';

// 轮播图实例
const form = ref<FormInstance>()

const swiper = ref<Swiper>({
    title: '',
    description: '',
    url: '',
    image: ''
})

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
</script>

<template>
    <div class="manage">
        <!-- 表单 -->
        <el-form ref="form" label-position="top" :model="swiper" :rules="rules" style="width: 400px; max-width: 460px"
            size="large">
            <el-form-item label="标题" prop="title">
                <el-input v-model="swiper.title" placeholder="要么沉沦 要么巅峰!" />
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input v-model="swiper.description" placeholder="Either sink or peak!" />
            </el-form-item>

            <el-form-item label="链接" prop="url">
                <el-input v-model="swiper.url" placeholder="http://liuyuyang.net/" />
            </el-form-item>

            <el-form-item label="图片" prop="image">
                <el-input v-model="swiper.image" placeholder="http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg" />
            </el-form-item>

            <el-form-item>
                <!-- <el-button type="primary" style="width: 100%;">{{ props.data.title }}</el-button> -->
            </el-form-item>
        </el-form>

        <!-- 插画 -->
        <img src="@/assets/svg/image.svg" class="image">
    </div>
</template>

<style scoped lang="scss">
.manage {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 30px;

    .image {
        width: 350px;
        margin-right: 220px;
        margin-top: 20px;
    }
}
</style>
