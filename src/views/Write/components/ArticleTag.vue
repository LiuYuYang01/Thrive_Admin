<script setup lang="ts">
import { Tag } from '@/types/Tag';
import { query, querySearch, restaurants } from '../logic/QueryTag'
import { getTagAPI, addTagAPI } from '@/api/Tag'

const TagData = ref<any>()

// 标签搜索框实例
const AutocompleteRef = ref()

// 获取标签列表
const getTagData = async () => {
    const { data } = await getTagAPI()

    TagData.value = data
}

// 已选择的标签
const TagList = ref<string[]>([])

// 添加标签
const addTagData = async () => {
    // 添加前先判断需要添加的标签是否存在，如果存在就没必要再添加了
    const isExist = TagData.value.find((item: Tag) => item.name.toLowerCase === query.value.toLowerCase)

    // 如果能找到就是标签已存在，就不再调用接口重新添加了
    if (isExist) {
        // 选择标签
        TagList.value.push(query.value)
    } else {
        await addTagAPI({ name: query.value })

        // 选择标签
        TagList.value.push(query.value)
    }

    // 清空内容
    query.value = ""

    // 获取最新数据
    await getTagData()

    restaurants.value = TagData.value

    // 关闭搜索框
    AutocompleteRef.value.activated = false
}

// 点击选中标签
const TagSelect = (item: any) => {
    TagList.value.push(query.value)

    // 关闭搜索框
    AutocompleteRef.value.activated = false

    // 清空内容
    query.value = ""
}

onMounted(async () => {
    await getTagData()

    restaurants.value = TagData.value
})
</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <el-row justify="center" style="margin: 20px;">
            <el-autocomplete v-model="query" ref="AutocompleteRef" :fetch-suggestions="querySearch" clearable
                placeholder="添加标签" value-key="name" class="inline-input w-50" @keyup.enter="addTagData"
                @select="TagSelect" />
        </el-row>

        <div class="list">
            <!-- <box-icon name='plus' class="add"></box-icon> -->
            <div class="item" v-for="item in TagList" :key="item">{{ item }}</div>
        </div>
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
