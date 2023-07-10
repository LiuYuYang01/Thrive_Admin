<script setup lang="ts">
const props = defineProps<{ modelValue: Date }>()
const emit = defineEmits<{ (e: "update:modelValue", data: Date): void }>()
const date = ref(props.modelValue)

watch(date, data => emit("update:modelValue", data))
</script>

<template>
    <div class="date">
        <div>时间</div>
        <Date v-model="date" />
    </div>
</template>

<style scoped lang="scss"></style>
