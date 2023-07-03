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

      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;

  .main {
    width: 100%;
  }
}
</style>
