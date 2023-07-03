<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
    <div class="header">
        <div>{{ new Date() }}</div>
    </div>
</template>

<style scoped lang="scss">
.header {
    height: 60px;
    margin-left: -20px;
    background-color: #fff;
    box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);
}
</style>
