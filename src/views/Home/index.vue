<script setup lang="ts">

</script>

<template>
    <div class="home">
        <!-- 信息框 -->
        <HeaderInfo />

        <!-- 系统信息 -->
        <div class="system">
            <div class="title"><box-icon name='tachometer' />系统信息</div>

            <SystemParame />
        </div>

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

    .system {
        @include container;
        margin-top: 10px;

        .title {
            @include title;
            padding: 15px;
            margin-bottom: 0;
        }
    }
}
</style>