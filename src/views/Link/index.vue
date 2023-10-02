<script setup lang="ts">
import { addLinkAPI } from '@/api/Link'
import { Link } from '@/types/Link'
import { Search } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'

// 选项卡选中
const tabValue = ref<string>("list")

const list = ref<Link[]>([
    {
        id: 1,
        title: "Thrive",
        description: "记录一个架构师的崛起",
        email: "3311118881@qq.com",
        image: "https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640",
        url: "/",
        type: "技术类"
    },
    {
        id: 2,
        title: "张洪Heo",
        description: "分享设计与科技生活",
        email: "3311118881@qq.com",
        image: "https://bu.dusays.com/2022/12/28/63ac2812183aa.png",
        url: "https://blog.zhheo.com/",
        type: "生活类"
    },
    {
        id: 3,
        title: "友人C",
        description: "友人C的个人空间",
        email: "3311118881@qq.com",
        image: "https://s1.ax1x.com/2023/06/02/p9zTn0O.png",
        url: "http://space.eyescode.top",
        type: "技术类"
    },
    {
        id: 4,
        title: "秦枫鸢梦",
        description: "花有重开日，人无再少年",
        email: "3311118881@qq.com",
        image: "https://blog.zwying.com/avatar.jpg",
        url: "https://blog.zwying.com",
        type: "生活类"
    },
    {
        id: 5,
        title: "生活倒影",
        description: "这是一个 Vue2 Vue3 与 SpringBoot 结合的产物～",
        email: "3311118881@qq.com",
        image: "https://s1.ax1x.com/2022/11/10/z9E7X4.jpg",
        url: "https://poetize.cn/",
        type: "生活类"
    },
    {
        id: 6,
        title: "心月云",
        description: "须知少时凌云志，曾许人间第一流！",
        email: "3311118881@qq.com",
        image: "https://wch666.com/head.png",
        url: "https://wch666.com",
        type: "技术类"
    },
    {
        id: 7,
        title: "一克猫",
        description: "一只微不足道的猫",
        email: "3311118881@qq.com",
        image: "https://cravatar.cn/avatar/7adbfaef92d9d082be5dec39f3fe3d02?s=200",
        url: "https://www.1gcat.com",
        type: "生活类"
    },
    {
        id: 8,
        title: "频率",
        description: "风卷过的起点",
        email: "3311118881@qq.com",
        image: "https://cravatar.cn/avatar/cc763511474fe24ffcc80257fb7cb970?s=256",
        url: "https://pinlyu.com/",
        type: "生活类"
    },
    {
        id: 9,
        title: "青灯暮雨",
        description: "再渺小的星光，也有属于它的光芒",
        email: "3311118881@qq.com",
        image: "https://www.blatr.cn/images/adminAvatar.jpg",
        url: "https://www.blatr.cn",
        type: "技术类"
    },
    {
        id: 10,
        title: "相左",
        description: "心有山海，静而不争",
        email: "3311118881@qq.com",
        image: "https://qiniu.ztyang.com/img/wechatavatar.jpg",
        url: "https://www.ztyang.com",
        type: "生活类"
    },
    {
        id: 11,
        title: "Echo’s blog",
        description: "韶华不为少年留 恨悠悠 几时休",
        email: "3311118881@qq.com",
        image: "https://yy.liveout.cn/photo/photo2.jpg",
        url: "https://www.liveout.cn/index/",
        type: "生活类"
    },
    {
        id: 12,
        title: "奇异纬度",
        description: "不曾与你分享的时间，我在进步。",
        email: "3311118881@qq.com",
        image: "https://blog.isww.cn/logo.head.jpg",
        url: "https://blog.isww.cn/",
        type: "生活类"
    },
    {
        id: 13,
        title: "正物博客",
        description: "一场凡梦，一份追求。",
        email: "3311118881@qq.com",
        image: "https://www.zwbo.com/tx.png",
        url: "https://www.zwbo.com/",
        type: "生活类"
    },
    {
        id: 14,
        title: "HONG的小站",
        description: "或许是个二次元？",
        email: "3311118881@qq.com",
        image: "https://blog.zwying.com/usr/uploads/sina/63adb58e798d4.jpg",
        url: "https://hongweblog.com/",
        type: "生活类"
    },
    {
        id: 15,
        title: "七鳄の学习格",
        description: "如果世界多了精彩，每一位都是创造者，大家都是你的观众",
        email: "3311118881@qq.com",
        image: "https://blog.gmcj0816.top/img/SeriousWission_TouXiangPic.png",
        url: "https://blog.gmcj0816.top/",
        type: "技术类"
    }
])

const linkData = ref<Link[]>(list.value)

// 搜索的数据
const search = ref<string>("")
// 监听搜索数据的变化
watch(search, data => {
    console.log(data, 222);

    linkData.value = list.value.filter(item => {
        return item.title.includes(data) || item.description.includes(data)
    })
})

// 跳转页面
const toHref = (url: string) => {
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
        { min: 2, max: 10, message: "网站标题限制在2 ~ 10个字符", trigger: "blur" }
    ],
    description: [
        { required: true, message: "网站描述不能为空", trigger: "blur" },
        { min: 2, max: 10, message: "网站描述限制在2 ~ 10个字符", trigger: "blur" }
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
        { min: 2, max: 5, message: "网站类型限制在2 ~ 5个字符", trigger: "blur" },
        { required: true, message: "网站类型不能为空", trigger: "blur" }
    ]
}

const linkRef = ref<FormInstance>()

// 提交表单
const submit = () => {
    // 新增之前先校验一下数据是否合法
    linkRef.value?.validate(async valid => {
        if (valid) {
            const { code, message, data } = await addLinkAPI(linkForm.value)
            if (code !== 200) return

            ElNotification({
                title: '成功',
                message: "新增网站成功",
                type: 'success',
            })

            // 重置校验并初始化数据
            linkRef.value?.resetFields()

            // 将选项卡切换到列表
            tabValue.value = "list"
        }
    })
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

                <div class="list">
                    <div class="item" v-for="item in linkData">
                        <div class="avatar">
                            <img :src="item.image" alt="">
                        </div>

                        <div class="name">{{ item.title }}</div>
                        <div class="description">{{ item.description }}</div>
                        <div class="type">{{ item.type }}</div>

                        <div class="headFor" @click="toHref(item.url)">前往该网站 -></div>
                    </div>
                </div>

                <!-- 空状态 -->
                <Null style="margin-top: 30px;" v-if="!linkData?.length" />
            </el-tab-pane>

            <el-tab-pane label="新增网站" name="add">
                <el-row style="flex-direction: column; width: 500px; margin-left: 40px;">
                    <Title title="新增网站" icon="globe" class="title" />

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

                    <el-button type="primary" size="large" @click="submit">新增网站</el-button>
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