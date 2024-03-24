<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'

const layout = reactive({
    // 选择文章布局方式
    isArticleLayout: "classics",
    // 选择显示的侧边栏模块
    rightSidebar: ["author", "hotArticle", "randomArticle", "newComments"],
    // 首页背景图
    swiperImage: "https://bu.dusays.com/2023/11/10/654e2cf6055b0.jpg",
    // 打字机文本
    swiperText: `['System.out.print("有些梦虽然遥不可及，但并不是不可能实现!");',
        'print(" 互联网从不缺乏天才, 而努力才是最终的入场券!")',
        'console.log("再渺小的星光，也有属于他的光芒!")']`
})

// 选择显示的侧边栏模块
const onSidebar = (select: RightSidebar) => {
    const is = layout.rightSidebar.includes(select)

    // 判断是否存在，如果存在就去掉，反之新增
    if (is) {
        const index = layout.rightSidebar.indexOf(select)
        layout.rightSidebar.splice(index, 1)
    } else {
        layout.rightSidebar.push(select)
    }
}
</script>

<template>
    <div class="layout">
        <Title title="布局配置" icon="user" />

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 首页背景图</el-divider>
        <div class="swiper">
            <el-input v-model="layout.swiperImage" style="max-width: 600px" placeholder="请输入背景图地址">
                <template #prepend>
                    <el-icon>
                        <Picture />
                    </el-icon>
                </template>
            </el-input>

            <img :src="layout.swiperImage" alt="">
        </div>

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 打字机文本</el-divider>
        <div class="text">
            <el-input v-model="layout.swiperText" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                placeholder="['第一段文本', '第二段', '...']" />
        </div>

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 侧边栏</el-divider>
        <div class="sidebar">
            <div :class="['item', layout.rightSidebar.includes('author') ? 'active' : '']" @click="onSidebar('author')">
                <img src="@/assets/img/layout/author.png" alt="">
                <p>作者信息模块</p>
            </div>

            <div :class="['item', layout.rightSidebar.includes('hotArticle') ? 'active' : '']"
                @click="onSidebar('hotArticle')">
                <img src="@/assets/img/layout/hotArticle.png" alt="">
                <p>文章推荐模块</p>
            </div>

            <div :class="['item', layout.rightSidebar.includes('randomArticle') ? 'active' : '']"
                @click="onSidebar('randomArticle')">
                <img src="@/assets/img/layout/randomArticle.png" alt="">
                <p>随机文章模块</p>
            </div>

            <div :class="['item', layout.rightSidebar.includes('newComments') ? 'active' : '']"
                @click="onSidebar('newComments')">
                <img src="@/assets/img/layout/newComments.png" alt="">
                <p>最新评论模块</p>
            </div>
        </div>

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 文章布局</el-divider>
        <div class="article">
            <div :class="['item', layout.isArticleLayout === 'classics' ? 'active' : '']"
                @click="layout.isArticleLayout = 'classics'">
                <img src="@/assets/img/layout/classics.png" alt="">
                <p>经典布局</p>
            </div>

            <div :class="['item', layout.isArticleLayout === 'card' ? 'active' : '']"
                @click="layout.isArticleLayout = 'card'">
                <img src="@/assets/img/layout/card.png" alt="">
                <p>卡片布局</p>
            </div>

            <div :class="['item', layout.isArticleLayout === 'waterfall' ? 'active' : '']"
                @click="layout.isArticleLayout = 'waterfall'">
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

    .swiper {
        margin-bottom: 50px;

        img {
            width: 100%;
            margin-top: 10px;
            border-radius: 5px;
        }
    }

    .text {
        margin-bottom: 50px;
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
