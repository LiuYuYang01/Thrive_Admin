<script setup lang="ts">

</script>

<template>
    <div class="header">
        <div class="info"><box-icon type='solid' name='hot' />新一代博客管理系统</div>

        <div class="nav">
            <div class="list">
                <a href="/">作者博客</a>
                <a href="/">GitHub</a>
            </div>

            <div class="my">
                <img src="https://q1.qlogo.cn/g?b=qq&amp;nk=3311118881&amp;s=640" alt="">

                <div class="name">YuYang</div>

                <el-collapse-transition>
                    <div class="box">
                        <dl>
                            <dd><box-icon name='user' />个人设置</dd>
                            <dd><box-icon name='exit' />退出登录</dd>
                        </dl>
                    </div>
                </el-collapse-transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    margin-left: -20px;
    background-color: #fff;
    box-shadow: 0px 2px 15px -3px rgba(121, 122, 243, 0.1);

    .info {
        display: flex;
        align-items: center;
        margin-left: 20px;

        box-icon {
            fill: #ec4747;
            margin-right: 5px;
        }
    }

    .nav {
        display: flex;
        justify-content: space-between;
        width: 340px;
        margin-right: 60px;

        .list {
            display: flex;
            align-items: center;

            a {
                padding: 20px;
                transition: all $move;

                &:hover {
                    color: #727cf5;
                    background-color: #f9f9f9;
                }
            }
        }

        .my {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 15px;
            transition: color $move;
            cursor: pointer;

            img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin-right: 10px;
            }

            &:hover .name {
                color: #727cf5;
            }

            .box {
                overflow: hidden;
                position: absolute;
                top: 53px;
                left: 0;
                width: 130px;
                height: 0;
                border-radius: $round;
                background-color: #fff;
                box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.1);
                transition: height $move;

                dl {
                    padding: 10px 0;

                    dd {
                        display: flex;
                        align-items: center;
                        padding-left: 10px;
                        line-height: 35px;
                        color: #666;
                        transition: all $move;

                        &:hover {
                            padding-left: 15px;
                            background-color: #f5f5fb;
                        }

                        box-icon {
                            fill: #666;
                            width: 20px;
                            height: 30px;
                            margin-right: 5px;
                        }
                    }
                }
            }

            &:hover .box {
                height: 90px;
            }
        }
    }
}
</style>
