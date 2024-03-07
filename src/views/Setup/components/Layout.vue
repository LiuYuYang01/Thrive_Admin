<script setup lang="ts">
const article = ref(1)
</script>

<template>
    <div class="layout">
        <Title title="布局配置" icon="user" />

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 文章布局</el-divider>

        <div class="article">
            <div class="item">
                <img src="@/assets/img/layout/classics.png" alt="">
                <p>经典布局</p>
            </div>

            <div class="item">
                <img src="@/assets/img/layout/card.png" alt="">
                <p>卡片布局</p>
            </div>

            <div class="item">
                <img src="@/assets/img/layout/waterfall.png" alt="">
                <p>瀑布流布局</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    width: 500px;

    .title {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        border-bottom: none;
    }

    :deep(.el-divider__text) {
        font-size: 20px;
        display: flex;
        align-items: center;
    }

    .article {
        display: flex;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            margin: 10px;
            border: 2px solid #eee;
            border-radius: $round;
            transition: border $move;
            cursor: pointer;

            &:hover {
                border: 2px solid $color;
            }
        }

        img {
            height: 200px;
            margin-bottom: 10px;
            border-radius: 10px;
        }
    }

    .icon {
        margin-right: 10px;
        margin-bottom: -2px;
        font-size: 35px;
    }
}
</style>
