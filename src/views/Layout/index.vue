<script setup lang="ts">

</script>

<template>
  <div class="container">
    <!-- 侧边导航 -->
    <div class="sidebar">
      <Sidebar />
    </div>

    <!-- 主体内容 -->
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: flex;
  height: 100vh;

  .sidebar {
    width: 220px;
    margin-right: 20px;
    background-image: linear-gradient(135deg, #8f75da 0%, #727cf5 60%);
  }
}
</style>
