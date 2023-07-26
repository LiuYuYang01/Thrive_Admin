<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
const props = defineProps<{ modelValue: string | Date }>()
const emit = defineEmits<{ (e: "update:modelValue", data: string | Date): void }>()
const date = ref(props.modelValue)

// 控制时间框是否显示隐藏
const isDate = ref<boolean>(false)

// 引入时间插件
import moment from 'moment';

// 格式化一个新的时间
const time = ref(date.value)

watch(date, data => {
    // 更新时间
    time.value = moment(data).format('YYYY-MM-DD HH:mm:ss')

    emit("update:modelValue", data)

    // 关闭时间框
    isDate.value = false
}, { immediate: true })
</script>

<template>
    <div class="ArticleDate">
        <div class="title"><box-icon name='time-five' />时间</div>

        <el-input class="w-50 m-2" size="large" :placeholder="(<string>time)">
            <template #append>
                <el-button :icon="Edit" @click="isDate = !isDate" />
            </template>
        </el-input>

        <Date v-model="date" v-show="isDate" />
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

    :deep .el-input {
        margin: 10px 0px 20px;
        padding: 0 20px;
    }

    :deep .vc-bordered {
        border: none;
    }
}
</style>
