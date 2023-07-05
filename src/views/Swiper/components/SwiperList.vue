<script setup lang="ts">
import { ref } from 'vue'
import { getSwiperAPI } from '@/api/Swiper'
import { Swiper } from '@/types/Swiper'

const tableData = ref<Swiper[]>()

// 获取轮播图
const getSwiperData = async () => {
    const { data } = await getSwiperAPI()
    
    tableData.value = data
}
getSwiperData()

const viewImageShow = ref(false)
const image = ref<string>("")
</script>

<template>
    <div class="list">
        <el-table :data="tableData" style="width: 100%">
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
