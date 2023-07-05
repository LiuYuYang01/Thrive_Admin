<script setup lang="ts">
defineProps<{ icon: string, title: string }>()
</script>

<template>
    <div class="title"><box-icon :name='icon' />{{ title }}</div>
</template>

<style scoped lang="scss">
.title {
    @include title;
}
</style>
