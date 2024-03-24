<script setup lang="ts">
import { getLayoutDataAPI } from '@/api/System';
import { Picture } from '@element-plus/icons-vue'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

const layout = ref<Layout>({
    // 选择文章布局方式
    isArticleLayout: "",
    // 选择显示的侧边栏模块
    rightSidebar: [],
    // 首页背景图
    swiperImage: "",
    // 打字机文本
    swiperText: ``,
})

// 选择显示的侧边栏模块
const onSidebar = (select: RightSidebar) => {
    const is = layout.value.rightSidebar.includes(select)

    // 判断是否存在，如果存在就去掉，反之新增
    if (is) {
        const index = layout.value.rightSidebar.indexOf(select)
        layout.value.rightSidebar.splice(index, 1)
    } else {
        layout.value.rightSidebar.push(select)
    }
}

// 获取布局配置
const getLayoutData = async () => {
    loading.value = true

    const { data } = await getLayoutDataAPI()
    layout.value = data

    loading.value = false
}
getLayoutData()
</script>

<template>
    <div class="layout" v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
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
            <el-input v-model="layout.swiperText" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            <el-alert title="示例：['第一段文本', '第二段', '第四段', '...']" type="info" style="margin-top: 5px;"/>
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
