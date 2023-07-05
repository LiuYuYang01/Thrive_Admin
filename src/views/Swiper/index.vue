<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('list')

const handleClick = () => {
  console.log("被选中了")
}
</script>

<template>
  <Title title="轮播图管理" icon="image" />

  <el-tabs v-model="activeName" tab-position="left" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="轮播图列表" name="list">
      <SwiperList />
    </el-tab-pane>

    <el-tab-pane label="新增轮播图" name="add">
      <SwiperAdd />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
