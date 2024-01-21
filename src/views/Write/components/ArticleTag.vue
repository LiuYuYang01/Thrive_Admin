<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
import { getTagDataAPI, getTagListAPI, addTagDataAPI } from '@/api/Tag'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: "update:modelValue", data: string): void }>()
console.log(props.modelValue, 999);

const list = ref<any>()

// 标签搜索框实例
const AutocompleteRef = ref()

// 获取标签列表
const getTagList = async () => {
    const { data } = await getTagListAPI()

    list.value = data
}
getTagList()

// 已选择的标签
const TagList = ref<string[]>([])


interface RestaurantItem {
    name: string
    link: string
}

const query = ref<string>('')

const restaurants = ref<RestaurantItem[]>([])

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    // 调用回调函数以返回建议
    cb(results)
}

const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

// 点击选中标签
const TagSelect = () => {
    // 禁止重复添加
    const isExist = TagList.value.find(item => item.toLocaleLowerCase() === query.value.toLocaleLowerCase())
    if (isExist) return query.value = ""

    // 标签不能为空
    if (!query.value.trim()) return

    TagList.value.push(query.value)

    // 子向父传值
    emit("update:modelValue", TagList.value.join(","))

    // 清空内容
    query.value = ""

    // 关闭搜索框
    AutocompleteRef.value.activated = false
}
</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <el-row justify="center" class="query">
            <el-autocomplete v-model="query" ref="AutocompleteRef" size="large" :fetch-suggestions="querySearch"
                placeholder="添加标签" value-key="name" class="inline-input w-50" @keyup.enter="() => 1" @select="TagSelect">

                <!-- 手动添加按钮 -->
                <template #append>
                    <el-button :icon="Select" />
                </template>
            </el-autocomplete>
        </el-row>

        <div class="list">
            <!-- 渲染选择的标签列表 -->
            <span class="item" v-for="item in TagList" :key="item">{{ item }}</span>
            <!-- <span class="item" v-for="item in 5" :key="item">大前端</span> -->
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

    .query {
        margin: 20px 20px 10px;
    }

    .list {
        padding: 0 20px 10px;

        &:hover .add {
            background-color: #fafafa;
        }

        .item {
            overflow: hidden;
            position: relative;
            display: inline-block;
            padding: 2px 5px;
            margin: 2px;
            color: #fff;
            font-size: 14px;
            border-radius: $round;

            // 鼠标经过后显示删除按钮
            &::before {
                content: "删除";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                font-size: 0;
                background-color: transparent;
                transition: background-color $move;
                text-align: center;
                cursor: pointer;
            }

            &:hover::before {
                font-size: 14px;
                padding-top: 2px;
                background-color: #F56C6C !important;
            }
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

        .item:nth-of-type(n+7) {
            color: #666;
            background-color: #fff;
            border: 1px solid #eee;
        }
    }
}
</style>
