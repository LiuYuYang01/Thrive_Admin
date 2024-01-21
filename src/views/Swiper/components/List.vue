<script setup lang="ts">
import svg from '@/utils/LoadingIcon'
import { FormRules } from 'element-plus';

const loading = ref<boolean>(false)

// 查看图片模态框
const viewImageModel = ref<boolean>(false)

const swiperList = ref<Swiper[]>()
</script>

<template>
    <div class="list">
        <!-- 轮播图列表 -->
        <el-table :data="swiperList" style="width: 100%" v-loading="loading" :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50">
            <el-table-column prop="id" label="ID" width="80" />

            <el-table-column prop="image" label="图片" width="200">
                <template #default="{ row }">
                    <img :src="row.image" title="查看图片" class="image" @click="viewImageModel = !viewImageModel;">
                </template>
            </el-table-column>

            <el-table-column prop="title" label="标题" width="300" />

            <el-table-column prop="description" label="描述" />

            <el-table-column label="操作" align="center" width="200" #default="{ row }">
                <el-button type="primary">修改</el-button>

                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>

        <!-- 查看轮播图 -->
        <el-dialog v-model="viewImageModel" title="查看图片" width="30%" center>
            <!-- <img :src="image" alt="" style="width: 100%; border-radius: 5px;"> -->
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.list {
    margin-left: 30px;

    .pagination {
        display: flex;
        justify-content: end;
        margin-top: 20px;
    }

    .image {
        height: 100px;
        border-radius: $round;
        background-size: cover;
        cursor: pointer;
    }
}
</style>
