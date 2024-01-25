<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- 侧边导航 -->
    <Sidebar />

    <!-- 主体内容 -->
    <div class="main">
      <!-- 顶部 -->
      <Header />

      <!-- 标签页 -->
      <TagPage />

      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 定义滚动条的高度、宽度和颜色 */
::-webkit-scrollbar {
  width: 7px;
  height: 0;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  /* 滑块的颜色 */
  background-color: #727cf5;
  /* 滑块的圆角 */
  border-radius: 5px;
}

.container {
  display: flex;
  height: 100vh;

  .main {
    overflow: scroll;
    position: relative;
    width: 100%;
  }
}
</style>
