<script setup lang="ts">
defineProps<{ icon: string, title: string }>()
</script>

<template>
    <div class="title"><i :class="['bx', `bx-${icon}`, 'icon']"></i>{{ title }}</div>
</template>

<style scoped lang="scss">
.title {
    @include title;

    .icon {
        margin-right: 10px;
        margin-bottom: -2px;
        font-size: 25px;
    }
}
</style>
