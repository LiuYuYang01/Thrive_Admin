<script setup lang="ts">
const router = useRouter()

const path = ref<string>("")
path.value = router.currentRoute.value.path

onBeforeRouteUpdate(to => {
  path.value = to.path
})
</script>

<template>
  <div class="container">
    <!-- 侧边导航 -->
    <Sidebar />

    <!-- 主体内容 -->
    <div class="main">
      <!-- 顶部 -->
      <Header />

      <!-- <div :class="path !== '/home' ? 'page' : ''">
        <RouterView></RouterView>
      </div> -->

      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;

  .main {
    position: relative;
    width: 100%;
  }
}
</style>
