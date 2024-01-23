<script setup lang="ts">

</script>

<template>
    <!-- 页面路由切换动画 -->
    <Loading />
    <!-- 页面视图 -->
    <RouterView></RouterView>
</template>

<style lang="scss">
// 路由进度条颜色
#nprogress .bar {
    background: #727cf5 !important;
    box-shadow: 0px 22px 15px -3px rgba(121, 122, 243, 0.1);
}
</style>