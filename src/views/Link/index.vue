<script setup lang="ts">
import { addLinkAPI, delLinkAPI, editLinkAPI, getLinkAPI } from '@/api/Link'
import { Link } from '@/types/Link'
import { whetherToDelete } from '@/utils/ConfirmMessage';
import { Search } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'

const loading = ref(false)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

// 选项卡选中
const tabValue = ref<string>("list")

// 网站列表
const linkList = ref<Link[]>([])
const linkData = ref<Link[]>(linkList.value)

// 获取网站列表数据
const getLinkData = async () => {
    loading.value = true

    const { data } = await getLinkAPI();
    linkList.value = data as Link[]
    linkData.value = linkList.value

    loading.value = false
}
getLinkData()

// 搜索的数据
const search = ref<string>("")
// 监听搜索数据的变化
watch(search, data => {
    console.log(data, 222);

    linkData.value = linkList.value.filter(item => {
        return item.title.includes(data) || item.description.includes(data)
    })
})

// 跳转页面
const toHref = (url: string) => {
    // 在新窗口跳转
    open(url, "_blank")
}

// 网站表单
const linkForm = ref<Link>({
    title: "",
    description: "",
    email: "",
    image: "",
    url: "",
    type: ""
})

// 表单校验
const linkRules = {
    title: [
        { required: true, message: "网站标题不能为空", trigger: "blur" },
        { min: 2, max: 30, message: "网站标题限制在2 ~ 30个字符", trigger: "blur" }
    ],
    description: [
        { required: true, message: "网站描述不能为空", trigger: "blur" },
        { min: 2, max: 100, message: "网站描述限制在2 ~ 100个字符", trigger: "blur" }
    ],
    email: [
        { required: true, message: "网站邮箱不能为空", trigger: "blur" }
    ],
    image: [
        { required: true, message: "网站图标不能为空", trigger: "blur" },
    ],
    url: [
        { required: true, message: "网站链接不能为空", trigger: "blur" }
    ],
    type: [
        { min: 2, max: 10, message: "网站类型限制在2 ~ 10个字符", trigger: "blur" },
        { required: true, message: "网站类型不能为空", trigger: "blur" }
    ]
}

const linkRef = ref<FormInstance>()

// 提交表单
const submit = () => {
    // 新增之前先校验一下数据是否合法
    linkRef.value?.validate(async valid => {
        if (valid) {
            // const { code } = await addLinkAPI(linkForm.value)
            // if (code !== 200) return

            // 有ID就是编辑，没有就是新增
            if (linkForm.value.id) {
                // 编辑网站
                const { code } = await editLinkAPI(linkForm.value.id!, linkForm.value)
                if (code !== 200) return

                ElNotification({
                    title: '成功',
                    message: "编辑网站成功",
                    type: 'success',
                })
            } else {
                // 新增网站
                const { code } = await addLinkAPI(linkForm.value)
                if (code !== 200) return

                ElNotification({
                    title: '成功',
                    message: "新增网站成功",
                    type: 'success',
                })
            }

            // 重置校验并初始化数据
            linkRef.value?.resetFields()

            // 获取最新数据
            getLinkData()

            // 将选项卡切换到列表
            tabValue.value = "list"
        }
    })
}

// 删除网站
const deleteLink = async (id: number) => {
    const fn = async () => {
        const { code } = await delLinkAPI(id)

        if (code !== 200) return

        ElNotification({
            title: '成功',
            message: "删除网站成功",
            type: 'success',
        })

        getLinkData()
    }

    // 确认是否删除
    whetherToDelete(fn, "网站")
}

// 修改网站
const editLink = async (item: Link) => {
    // delete item.id 可以将item属性的id排除

    // 将选项卡切换到编辑网站
    tabValue.value = "operate"

    delete item.date
    linkForm.value = item
}
</script>

<template>
    <div class="page">
        <Title title="网站管理" icon="globe" />

        <el-tabs tab-position="left" v-model="tabValue">
            <el-tab-pane label="网站列表" name="list">
                <div class="search">
                    <el-input v-model="search" class="w-50 m-2" size="large" placeholder="通过网站名称或描述信息进行查询"
                        :prefix-icon="Search" />
                </div>

                <div class="list" v-loading="loading" :element-loading-svg="svg"
                    element-loading-svg-view-box="-10, -10, 50, 50">
                    <div class="item" v-for="item in linkData">
                        <div class="avatar">
                            <img :src="item.image" alt="">
                        </div>

                        <div class="name">{{ item.title }}</div>
                        <div class="description">{{ item.description }}</div>
                        <div class="type">{{ item.type }}</div>

                        <div class="operate">
                            <div @click="editLink(item)">修改</div>
                            <div @click="deleteLink(item.id!)">删除</div>
                        </div>

                        <div class="headFor" @click="toHref(item.url)">前往该网站 -></div>
                    </div>
                </div>

                <!-- 空状态 -->
                <Null style="margin-top: 30px;" v-if="!loading && !linkData?.length" />
            </el-tab-pane>

            <el-tab-pane :label="linkForm.id ? '编辑网站' : '新增网站'" name="operate">
                <el-row style="flex-direction: column; width: 500px; margin-left: 40px;">
                    <Title :title="linkForm.id ? '编辑网站' : '新增网站'" icon="globe" class="title" />

                    <el-form label-position="top" size="large" ref="linkRef" :rules="linkRules" :model="linkForm">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="linkForm.title" placeholder="Thrive" />
                        </el-form-item>

                        <el-form-item label="描述" prop="description">
                            <el-input v-model="linkForm.description" placeholder="Thrive" />
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="linkForm.email" placeholder="3311118881@qq.com" />
                        </el-form-item>

                        <el-form-item label="头像" prop="image">
                            <el-input v-model="linkForm.image"
                                placeholder="https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640" />
                        </el-form-item>

                        <el-form-item label="链接" prop="url">
                            <el-input v-model="linkForm.url" placeholder="https://liuyuyang.net/" />
                        </el-form-item>

                        <el-form-item label="类型" prop="type">
                            <el-input v-model="linkForm.type" placeholder="技术类" />
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" size="large" @click="submit">{{ linkForm.id ? '编辑网站' : '新增网站' }}</el-button>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.page {
    overflow: auto;
}

.link {
    width: 1000px;
    margin: 0 auto;
    margin-top: 50px;
}

.search {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 30px 0 50px;

    .el-input {
        width: 500px;
    }
}

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    min-height: 100px;

    .item {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        height: 260px;
        padding: 0px 20px;
        margin-right: 50px;
        margin-bottom: 20px;
        @include container;

        &:nth-of-type(5n) {
            margin-right: 0;
        }

        &:hover .name {
            color: $color;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background-color: $color;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border-bottom-left-radius: 50%;
            border-bottom-right-radius: 50%;
        }

        .avatar {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 90px;
            margin-top: 30px;
            border-radius: 50%;
            background-color: #fff;
            z-index: 999;

            img {
                width: 93%;
                height: 93%;
                border-radius: 50%;
                transition: transform $move;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .name {
            margin: 10px 0;
            font-weight: 900;
            transition: color $move;
            cursor: pointer;
        }

        .description {
            font-size: 13px;
            color: #666;
            line-height: 20px;

            display: -webkit-box !important;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .type {
            position: absolute;
            bottom: 12px;
            padding: 2px 15px;
            margin: 10px 0;
            border-radius: 10px;
            color: #fff;
            background-color: $color;
            transition: bottom $move;
        }

        &:hover .type {
            bottom: -40px;
        }

        .operate {
            position: absolute;
            bottom: -40px;
            display: flex;
            background-color: #fff;
            transition: bottom $move;

            width: 100%;
            justify-content: center;
            padding: 10px 0;

            div {
                padding: 3px 10px;
                margin: 0 5px;
                color: #fff;
                font-size: 14px;
                border-radius: 5px;
                cursor: pointer;

                &:nth-child(1) {
                    background-color: #49b984;
                }

                &:nth-child(2) {
                    background-color: #f16c6d;
                }
            }
        }

        &:hover .operate {
            bottom: 35px;
        }

        .headFor {
            position: absolute;
            bottom: -30px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30px;
            color: #fff;
            background-color: $color;
            transition: bottom $move;

            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            cursor: pointer;
        }

        &:hover .headFor {
            bottom: 0;
        }
    }
}

.el-row .title {
    display: flex;
    justify-content: center;
    width: 500px;
    margin: 10px 0;
    border-bottom: none;
}
</style>