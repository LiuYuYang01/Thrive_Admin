<script setup lang="ts">
import { query, querySearch, restaurants } from '../logic/QueryTag'
import { getTagAPI } from '@/api/Tag'

const TagList = ref<any>()

// 获取标签列表
const getTagData = async () => {
    const { data } = await getTagAPI()

    TagList.value = data
}

onMounted(async () => {
    await getTagData()

    restaurants.value = TagList.value
})

// 添加标签
const addTag = () => {
    console.log(11);
    query.value = ""
}
</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <el-row justify="center" style="margin: 20px;">
            <el-autocomplete v-model="query" :fetch-suggestions="querySearch" clearable placeholder="添加标签" value-key="name"
                class="inline-input w-50" @keyup.enter="addTag" />
        </el-row>

        <!-- <div class="list">
            <box-icon name='plus' class="add"></box-icon>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
.ArticleTag {
    .title {
        padding: 10px 15px;

        @include title;
        font-size: 16px;
        padding-bottom: 10px;
        margin-bottom: 0;
        justify-content: center;
    }

    .list {
        &:hover .add {
            background-color: #fafafa;
        }

        .add {
            width: 100%;
            text-align: center;
            height: 70px;
            fill: #e3e3e3;
            cursor: pointer;
            transition: background-color $move;
        }
    }
}
</style>
