<script setup lang="ts">
import { Select } from '@element-plus/icons-vue'
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

// 点击选中标签
const TagSelect = () => {
    // 禁止重复添加
    const isExist = TagList.value.find(item => item.toLocaleLowerCase() === query.value.toLocaleLowerCase())
    if (isExist) return query.value = ""

    // 标签不能为空
    if(!query.value.trim()) return

    TagList.value.push(query.value)

    // 清空内容
    query.value = ""

    // 关闭搜索框
    AutocompleteRef.value.activated = false
}

// 添加标签
const addTagData = async () => {
    // 添加前先判断需要添加的标签是否存在，如果存在就没必要再添加了
    const isExist = TagData.value.find((item: Tag) => item.name.toLocaleLowerCase() === query.value.toLocaleLowerCase())

    // 如果能找到就是标签已存在，就不再调用接口重新添加了
    if (isExist) {
        TagSelect()
    } else {
        await addTagAPI({ name: query.value })

        TagSelect()
    }

    // 获取最新数据
    await getTagData()

    restaurants.value = TagData.value
}

onMounted(async () => {
    await getTagData()

    restaurants.value = TagData.value
})
</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <el-row justify="center" style="margin: 20px 20px 10px;">
            <el-autocomplete v-model="query" ref="AutocompleteRef" size="large" :fetch-suggestions="querySearch"
                placeholder="添加标签" value-key="name" class="inline-input w-50" @keyup.enter="addTagData" @select="TagSelect">
                <template #append>
                    <el-button :icon="Select" @click="addTagData" />
                </template>
            </el-autocomplete>
        </el-row>

        <div class="list">
            <span class="item" v-for="item in TagList" :key="item">{{ item }}</span>
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
        padding: 0 20px 10px;

        &:hover .add {
            background-color: #fafafa;
        }

        .item {
            display: inline-block;
            padding: 2px 5px;
            margin: 2px;
            color: #fff;
            font-size: 14px;
            border-radius: $round;
        }

        .item:nth-of-type(1) {
            background-color: $color;
        }

        .item:nth-of-type(2) {
            background-color: #49b984;
        }

        .item:nth-of-type(3) {
            background-color: #ffbb47;
        }

        .item:nth-of-type(4) {
            background-color: #f95a46;
        }

        .item:nth-of-type(5) {
            background-color: #b680f1;
        }

        .item:nth-of-type(6) {
            background-color: #6cb3f2;
        }

        .item:nth-of-type(n+7){
            color: #666;
            background-color: #fff;
            border: 1px solid #eee;
        }
    }
}</style>
