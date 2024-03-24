<script setup lang="ts">
type ArticleLayout = "classics" | "card" | "waterfall"
type RightSidebar = "author" | "hotArticle" | "randomArticle" | "newComments"

const centerDialogVisible = ref(true)

// 选择文章布局方式
const article = ref<ArticleLayout>("classics")

// 选择显示的侧边栏模块
const sidebar = ref<RightSidebar[]>(["author", "hotArticle", "randomArticle", "newComments"])
const onSidebar = (select: RightSidebar) => {
    const is = sidebar.value.includes(select)

    // 判断是否存在，如果存在就去掉，反之新增
    if (is) {
        const index = sidebar.value.indexOf(select)
        sidebar.value.splice(index, 1)
    } else {
        sidebar.value.push(select)
    }
}
</script>

<template>
    <div class="layout">
        <Title title="布局配置" icon="user" />

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 侧边栏</el-divider>
        <div class="sidebar">
            <div :class="['item', sidebar.includes('author') ? 'active' : '']" @click="onSidebar('author')">
                <img src="@/assets/img/layout/author.png" alt="">
                <p>作者信息模块</p>
            </div>

            <div :class="['item', sidebar.includes('hotArticle') ? 'active' : '']" @click="onSidebar('hotArticle')">
                <img src="@/assets/img/layout/hotArticle.png" alt="">
                <p>文章推荐模块</p>
            </div>

            <div :class="['item', sidebar.includes('randomArticle') ? 'active' : '']" @click="onSidebar('randomArticle')">
                <img src="@/assets/img/layout/randomArticle.png" alt="">
                <p>随机文章模块</p>
            </div>

            <div :class="['item', sidebar.includes('newComments') ? 'active' : '']" @click="onSidebar('newComments')">
                <img src="@/assets/img/layout/newComments.png" alt="">
                <p>最新评论模块</p>
            </div>
        </div>

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 文章布局</el-divider>
        <div class="article">
            <div :class="['item', article === 'classics' ? 'active' : '']" @click="article = 'classics'">
                <img src="@/assets/img/layout/classics.png" alt="">
                <p>经典布局</p>
            </div>

            <div :class="['item', article === 'card' ? 'active' : '']" @click="article = 'card'">
                <img src="@/assets/img/layout/card.png" alt="">
                <p>卡片布局</p>
            </div>

            <div :class="['item', article === 'waterfall' ? 'active' : '']" @click="article = 'waterfall'">
                <img src="@/assets/img/layout/waterfall.png" alt="">
                <p>瀑布流布局</p>
            </div>
        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
        <span style="font-size: 30px;">等待开发，敬请期待！</span>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">好的</el-button>
            </span>
        </template>
    </el-dialog>
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

    :deep(.el-divider) {
        .el-divider__text {
            font-size: 20px;
            display: flex;
            align-items: center;
        }
    }

    .icon {
        margin-right: 10px;
        margin-bottom: -2px;
        font-size: 35px;
    }

    .article,
    .sidebar {
        display: flex;
        margin-bottom: 50px;

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

            img {
                height: 200px;
                margin-bottom: 10px;
                border-radius: 10px;
            }

            p {
                width: 130px;
                text-align: center;
            }
        }

        .active {
            border: 2px solid $color;

            p {
                color: $color;
            }
        }
    }
}
</style>
