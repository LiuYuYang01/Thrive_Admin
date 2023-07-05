<script setup lang="ts">
const tableData = [
    {
        id: 1,
        image: "http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg",
        title: '互联网从不缺乏天才，而努力才是最终的入场券！',
        description: 'The internet never lacks genius, and hard work is the ultimate ticket!',
    }
]
</script>

<template>
    <div class="list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />

            <el-table-column prop="image" label="图片" width="200">
                <template #default="{ row }">
                    <img :src="row.image" alt="" class="image">
                </template>
            </el-table-column>

            <el-table-column prop="title" label="标题" />

            <el-table-column prop="description" label="描述" />

            <el-table-column label="操作" align="center">
                <el-button type="primary">修改</el-button>
               
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="scss">
.list {
    margin-left: 30px;

    .image {
        height: 100px;
        border-radius: $round;
        background-size: cover;
    }
}
</style>
