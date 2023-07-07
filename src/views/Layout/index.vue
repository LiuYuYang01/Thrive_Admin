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

      <div class="page">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;

  .main {
    position: relative;
    width: 100%;

    .page {
      position: absolute;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      margin: 20px;
      
      border-radius: $round;
      background-color: #fff;
      box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
    }
  }
}
</style>
