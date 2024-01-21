<script setup lang="ts">
const props = defineProps<{ modelValue: string | Date }>()
const emit = defineEmits<{ (e: "update:modelValue", date: Date): void }>()
const date = ref(props.modelValue)

// 格式化一个新的时间
const time = ref(date.value)

// 监听选择的时间
const change = (date: Date) => {
    emit("update:modelValue", date)
}
</script>

<template>
    <div class="ArticleDate">
        <div class="title"><box-icon name='time-five' />时间</div>

        <el-date-picker v-model="time" type="datetime" placeholder="Select date and time" size="large" style="width: 100%;"
            @change="change" />
    </div>
</template>

<style scoped lang="scss">
.ArticleDate {
    .title {
        color: #333;
        padding: 10px 15px;

        @include title;
        font-size: 16px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        justify-content: center;
    }

    :deep(.el-input) {
        margin: 10px 0px 20px;
        padding: 0 20px;
    }

    :deep(.vc-bordered) {
        border: none;
    }
}
</style>
