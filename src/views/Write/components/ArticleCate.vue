<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: "update:modelValue", name: string): void }>()

import { getCateData, cateList, loading, svg } from '@/views/Cate/logic/getCate'
getCateData()

const tree = ref()
const handleCheckChange = (data: any) => {
    // 通过tree实例获取选中的分类
    const SelectedCate = tree.value.getCheckedKeys().join(',')
    emit("update:modelValue", SelectedCate)
}
</script>

<template>
    <div class="cate">
        <div class="title">分类列表</div>

        <div class="list">
            <el-tree :data="cateList" :props="{ children: 'children', label: 'name' }" show-checkbox node-key="name"
                v-loading="loading" :element-loading-svg="svg" class="custom-loading-svg" @check-change="handleCheckChange"
                ref="tree" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.cate {
    overflow: hidden;
    border-radius: $round;
    background-color: #fff;
    box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);

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
        border: 1px solid #eee;
    }
}
</style>
