<script setup lang="ts">
import { ref } from 'vue'

const tableData = [
    {
        id: 1,
        image: "http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg",
        title: '互联网从不缺乏天才，而努力才是最终的入场券！',
        description: 'The internet never lacks genius, and hard work is the ultimate ticket!',
    },
    {
        id: 2,
        image: "http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg",
        title: '互联网从不缺乏天才，而努力才是最终的入场券！',
        description: 'The internet never lacks genius, and hard work is the ultimate ticket!',
    }
]

const viewImageShow = ref(false)
const image = ref<string>("")
</script>

<template>
    <div class="list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />

            <el-table-column prop="image" label="图片" width="200">
                <template #default="{ row }">
                    <img :src="row.image" title="查看图片" class="image" @click="viewImageShow = !viewImageShow; image = row.image">
                </template>
            </el-table-column>

            <el-table-column prop="title" label="标题" />

            <el-table-column prop="description" label="描述" />

            <el-table-column label="操作" align="center" #default="{ row }">
                <el-button type="primary">修改</el-button>

                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="viewImageShow" title="查看图片" width="30%" center>
        <img :src="image" alt="" style="width: 100%; border-radius: 5px;">
    </el-dialog>
</template>

<style scoped lang="scss">
.list {
    margin-left: 30px;

    .image {
        height: 100px;
        border-radius: $round;
        background-size: cover;
        cursor: pointer;
    }
}
</style>
