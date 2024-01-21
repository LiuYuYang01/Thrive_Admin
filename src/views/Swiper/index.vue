<script setup lang="ts">
const tab = ref<string>()

</script>

<template>
  <div class="page">
    <Title title="轮播图管理" icon="image" />

    <el-tabs v-model="tab" tab-position="left" class="tabs">
      <el-tab-pane label="轮播图列表" name="list" class="list">
        <List />
      </el-tab-pane>

      <!-- <el-tab-pane :label="swiper.id ? '编辑轮播图' : '新增轮播图'" name="operate" class="manage"> -->
      <el-tab-pane label="编辑轮播图" name="operate" class="manage">
        <Manage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

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

.manage {
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
