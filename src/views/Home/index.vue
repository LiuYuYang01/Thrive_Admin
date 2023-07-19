<script setup lang="ts">

</script>

<template>
    <div class="home">
        <HeaderInfo />

        <div class="chart">
            <Linear />
            <Columnar />
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    margin: 20px;

    .chart{
        display: flex;
    }
}
</style>
