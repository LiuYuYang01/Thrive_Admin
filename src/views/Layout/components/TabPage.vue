<script setup lang="ts">
const active = ref<number>(0)

const list = ref([
    { name: "仪表盘", path: "/home" },
    { name: "文章管理", path: "/manage/article" },
    { name: "分类管理", path: "/manage/cate" },
    { name: "标签管理", path: "/manage/tag" },
    { name: "轮播图管理", path: "/manage/swiper" },
])
</script>

<template>
    <div class="tabPage">
        <ul>
            <li v-for="(item, index) in list" @click="$router.push(item.path); active = index"
                :class="['item', active === index ? 'active' : '']">
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
        position: relative;
        z-index: 1;
        padding: 0 20px;

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

            &::before {
                background-color: $color;
            }
        }
    }
}
</style>
