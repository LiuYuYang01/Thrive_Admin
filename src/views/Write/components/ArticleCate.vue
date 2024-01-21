<script setup lang="ts">
import { svg } from '@/utils'
import { getCateListAPI } from '@/api/Cate'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: "update:modelValue", name: string): void }>()

const tree = ref()
const loading = ref<boolean>(false)

// 分类列表
const list = ref<Cate[]>()

// 获取分类列表数据
const getCateList = async () => {
    loading.value = true

    const { data } = await getCateListAPI()
    list.value = data.result as Cate[]

    loading.value = false
}
getCateList()

const handleCheckChange = (data: any) => {
    // 通过tree实例获取选中的分类
    const SelectedCate = tree.value.getCheckedKeys().join(',')
    emit("update:modelValue", SelectedCate)
}
</script>

<template>
    <div class="ArticleCate">
        <div class="title">分类列表</div>

        <div class="list">
            <el-tree :data="list" :props="{ children: 'children', label: 'name' }" node-key="name" show-checkbox
                v-loading="loading" :element-loading-svg="svg" @check-change="handleCheckChange" ref="tree" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.ArticleCate {
    overflow: hidden;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        color: #fff;
        font-weight: 900;
        background-color: $color;
    }

    .list {
        padding: 20px;
    }
}
</style>
