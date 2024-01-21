<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
import { addTagDataAPI, getTagListAPI } from '@/api/Tag'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: "update:modelValue", data: string): void }>()

interface RestaurantItem {
    name: string
    link: string
}

// 标签远程搜索
const query = ref<string>('')
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value

    console.log(queryString, 344);

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

// 标签列表
const list = ref<Tag[]>()

// 标签搜索框实例
const AutocompleteRef = ref()

// 获取标签列表
const getTagList = async () => {
    const { data } = await getTagListAPI()

    list.value = data.result as Tag[]
}

// 已选择的标签
const selectTagList = ref<string[]>([])

// 保存数据
selectTagList.value = props.modelValue ? props.modelValue.split(",") : []

// 点击选中标签
const TagSelect = () => {
    // 禁止重复添加
    const isExist = selectTagList.value.find(item => item.toLocaleLowerCase() === query.value.toLocaleLowerCase())
    if (isExist) return query.value = ""

    // 标签不能为空
    if (!query.value.trim()) return

    selectTagList.value.push(query.value)

    // 子向父传值
    emit("update:modelValue", selectTagList.value.join(","))

    // 清空内容
    query.value = ""

    // 关闭搜索框
    AutocompleteRef.value.activated = false
}

// 添加标签
const addTagData = async () => {
    if (!query.value.trim()) return ElNotification({
        title: '失败',
        message: "标签不能为空",
        type: 'error',
    })

    // 添加前先判断需要添加的标签是否存在，如果存在就没必要再添加了
    const isExist = list.value?.find((item: Tag) => item.name.toLocaleLowerCase() === query.value.toLocaleLowerCase())

    // 如果能找到就是标签已存在，就不再调用接口重新添加了
    if (isExist) {
        TagSelect()
    } else {
        const { code, message } = await addTagDataAPI({ name: query.value })
        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: message,
            type: 'success',
        })

        TagSelect()
    }

    // 获取最新数据
    await getTagList()

    restaurants.value = list.value as any
}

// 删除选择的标签
const delTagData = (data: string) => selectTagList.value.splice(selectTagList.value.findIndex(item => item === data), 1)

onMounted(async () => {
    await getTagList()

    restaurants.value = list.value as any
})
</script>

<template>
    <div class="ArticleTag">
        <div class="title"><box-icon name='purchase-tag' />标签</div>

        <el-row justify="center" class="query">
            <el-autocomplete v-model="query" ref="AutocompleteRef" size="large" :fetch-suggestions="querySearch"
                placeholder="添加标签" value-key="name" class="inline-input w-50" @keyup.enter="addTagData" @select="TagSelect">

                <!-- 手动添加按钮 -->
                <template #append>
                    <el-button :icon="Select" @click="addTagData" />
                </template>
            </el-autocomplete>
        </el-row>

        <div class="list">
            <!-- 渲染选择的标签列表 -->
            <span class="item" v-for="item in selectTagList" :key="item" @click="delTagData(item)">{{ item }}</span>
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
