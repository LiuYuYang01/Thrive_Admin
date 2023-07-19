<script setup lang="ts">

</script>

<template>
    <div class="home">
        <HeaderInfo />

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
