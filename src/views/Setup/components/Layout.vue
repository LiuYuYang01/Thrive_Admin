<script setup lang="ts">
import { ElNotification } from "element-plus"
import { editLayoutDataAPI, getLayoutDataAPI } from '@/api/System';
import { Picture } from '@element-plus/icons-vue'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

const tempSwiperText = ref<string>("")
const layout = ref<Layout>({
    // 选择文章布局方式
    isArticleLayout: "classics",
    // 选择显示的侧边栏模块
    rightSidebar: ["author", "hotArticle", "randomArticle", "newComments"],
    // 首页背景图
    swiperImage: "https://bu.dusays.com/2023/11/10/654e2cf6055b0.jpg",
    // 打字机文本
    swiperText: ['这是一段文本', '这是第二段文本']
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

    tempSwiperText.value = layout.value.swiperText.join("\n")

    loading.value = false
}
getLayoutData()

// 修改布局配置
const editLayoutData = async () => {
    loading.value = true

    layout.value.swiperText = tempSwiperText.value.split("\n")

    await editLayoutDataAPI(layout.value)

    ElNotification({
        title: '成功',
        message: "🎉修改布局成功",
        type: 'success'
    })

    loading.value = false
}
</script>

<template>
    <div class="layout" v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
        <Title title="布局配置" icon="user" />

        <el-divider content-position="left"><i :class="['bx', `bx-list-minus`, 'icon']"></i> 首页背景图</el-divider>
        <div class="swiper">
            <el-input v-model="layout.swiperImage" placeholder="请输入背景图地址">
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
            <el-input v-model="tempSwiperText" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
            <el-alert title="以换行分隔，每行表示一段文本" type="info" style="margin-top: 5px;" />
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

        <el-button type="primary" size="large" style="width: 100%;" @click="editLayoutData">修改布局</el-button>
    </div>
</template>

<style scoped lang="scss">
.layout {
    width: 80%;

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
        img {
            width: 30%;
            margin-top: 10px;
            border-radius: 5px;
        }
    }

    .article,
    .sidebar {
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

    .swiper,
    .text,
    .sidebar {
        margin-bottom: 50px;
    }

    .article {
        margin-bottom: 10px;
    }
}
</style>
