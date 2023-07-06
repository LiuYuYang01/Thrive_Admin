<script setup lang="ts">
import { ref } from 'vue'
import { getSwiperAPI } from '@/api/Swiper'
import { Swiper } from '@/types/Swiper'

// Loading加载效果
const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const tableData = ref<Swiper[]>()

// 获取轮播图
const getSwiperData = async () => {
    const { data } = await getSwiperAPI()
    loading.value = false

    tableData.value = data
}
getSwiperData()

const viewImageShow = ref(false)
const image = ref<string>("")
</script>

<template>
    <div class="list">
        <el-table :data="tableData" style="width: 100%" v-loading="loading" :element-loading-svg="svg"
            class="custom-loading-svg" element-loading-svg-view-box="-10, -10, 50, 50">
            <el-table-column prop="id" label="ID" width="80" />

            <el-table-column prop="image" label="图片" width="200">
                <template #default="{ row }">
                    <img :src="row.image" title="查看图片" class="image"
                        @click="viewImageShow = !viewImageShow; image = row.image">
                </template>
            </el-table-column>

            <el-table-column prop="title" label="标题" width="300" />

            <el-table-column prop="description" label="描述" />

            <el-table-column label="操作" align="center" width="200" #default="{ row }">
                <el-button type="primary">修改</el-button>

                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="50" class="mt-4" />
        </div>
    </div>

    <el-dialog v-model="viewImageShow" title="查看图片" width="30%" center>
        <img :src="image" alt="" style="width: 100%; border-radius: 5px;">
    </el-dialog>
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
