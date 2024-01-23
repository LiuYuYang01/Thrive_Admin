<script setup lang="ts">
const router = useRouter()

// 当前选中的标签页
const active = ref<number | undefined>(0)

interface Item {
    name: string;
    path: string
}

// const list = ref([
//     { name: "仪表盘", path: "/home" },
//     { name: "文章管理", path: "/manage/article" },
//     { name: "分类管理", path: "/manage/cate" },
//     { name: "标签管理", path: "/manage/tag" },
//     { name: "轮播图管理", path: "/manage/swiper" },
// ])

const list = ref<Item[]>([
    { name: "仪表盘", path: "/home" }
])

// 监听当前页面路由变化，根据当前路由选中对应的标签页
watch(() => router.currentRoute.value, r => {
    console.log(r);
    const data: Item = { name: r.meta.title as string, path: r.path }

    console.log(list.value.some(item => item.path === data.path),555);
    
    // 如果标签页中已经有这个数据了，就不让他在添加了
    if (!list.value.some(item => item.path === data.path)) {
        list.value?.push(data)
    }

    active.value = list.value?.findIndex(item => item.path === r.path)
}, { immediate: true })
</script>

<template>
    <div class="tabPage">
        <ul>
            <li v-for="(item, index) in list" @click="$router.push(item.path); active = index"
                :class="active === index ? 'item active' : 'item'">
                {{ item.name }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.tabPage {
    height: 40px;
    background-color: #fff;

    ul {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;

        .item {
            padding: 10px 20px;
            border-right: 1px solid #eee;
            background-color: $move;
            border-bottom: 1px solid #eee;
            transition: all $move;
            cursor: pointer;

            &::before {
                content: "";
                width: 9px;
                height: 9px;
                margin-right: 8px;
                display: inline-block;
                border-radius: 50%;
                background-color: #ddd;
                transition: background-color $move;
            }
        }

        .active {
            color: $color;
            background: rgb(59 130 246 / 0.07);

            &::before {
                background-color: $color;
            }
        }
    }
}
</style>
