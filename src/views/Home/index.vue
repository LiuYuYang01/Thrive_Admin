<script setup lang="ts">

</script>

<template>
    <div class="home">
        <!-- 信息框 -->
        <HeaderInfo />

        <!-- 系统信息 -->
        <SystemInfo />

        <div class="box">
            <Linear />
            <Recording />
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    margin: 20px;

    .box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 10px;
    }
}
</style>