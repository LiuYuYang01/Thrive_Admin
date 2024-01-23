<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { useMixStore } from '@/stores'
const store = useMixStore()

const router = useRouter()

// 当前选中的标签页
const active = ref<number | undefined>(0)

interface Item {
    id: number
    name: string
    path: string
}

const list = ref<Item[]>([
    { id: 1, name: "仪表盘", path: "/home" }
])

// 跳转标签页
const operate = (item: Item, e: any) => {
    const domName: string = e.target!.nodeName
    store.tagPageName = item.name
    console.log(domName,33);
    

    if (domName !== "LI") return list.value = list.value.filter(k => k.id !== item.id)

    active.value = item.id
    router.push(item.path)
}

// 监听当前页面路由变化，根据当前路由选中对应的标签页
watch(() => router.currentRoute.value, r => {
    // 如果标签页中已经有这个数据了，就不让他在添加了
    if (!list.value.some(item => item.path === r.path)) {
        const id = list.value[list.value.length - 1].id + 1 as number

        const data: Item = { id, name: r.meta.title as string, path: r.path }
        list.value?.push(data)
    }

    // 点击侧边导航后与标签页对应
    active.value = list.value.find(item => item.path === r.path)!.id as number
}, { immediate: true })
</script>

<template>
    <div class="tagPage">
        <ul>
            <li v-for="item in list" @click="operate(item, $event)" :class="active === item.id ? 'item active' : 'item'">
                {{ item.name }}
                <el-icon class="close">
                    <CircleCloseFilled />
                </el-icon>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.tagPage {
    height: 40px;
    background-color: #fff;

    ul {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;

        // 选中的标签页样式
        .active {
            color: $color;
            background-color: rgb(59 130 246 / 0.07);

            &::before {
                background-color: $color !important;
            }
        }

        .item {
            position: relative;
            padding: 10px;
            padding-left: 20px;
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

            .close {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                color: #d6d6d6;
                opacity: 0;
                transition: all $move;
                z-index: 3;

                &:hover {
                    color: #FF1654;
                }
            }

            // 鼠标经过显示删除按钮
            &:hover {
                padding-right: 35px;
                color: #666;
                background-color: rgb(59 130 246 / 0.07);

                .close {
                    width: 30px;
                    height: 100%;
                    opacity: 1;
                }
            }

            // 第一个标签页不需要显示删除按钮
            &:first-child {
                padding-right: 10px !important;

                .close {
                    display: none;
                    height: 40px;
                }
            }
        }
    }
}
</style>
