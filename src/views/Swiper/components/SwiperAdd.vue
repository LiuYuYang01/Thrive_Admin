<script setup lang="ts">
import { reactive } from 'vue'

const SwiperForm = reactive({
    title: '',
    description: '',
    url: '',
    image: ''
})
</script>

<template>
    <div class="add">
        <!-- 表单 -->
        <el-form label-position="top" label-width="100px" :model="SwiperForm" style="width: 400px;max-width: 460px"
            size="large">
            <el-form-item label="标题">
                <el-input v-model="SwiperForm.title" />
            </el-form-item>

            <el-form-item label="描述">
                <el-input v-model="SwiperForm.description" />
            </el-form-item>

            <el-form-item label="链接">
                <el-input v-model="SwiperForm.url" />
            </el-form-item>

            <el-form-item label="图片">
                <el-input v-model="SwiperForm.image" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width: 100%;">新增轮播图</el-button>
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
