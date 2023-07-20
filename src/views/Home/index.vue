<script setup lang="ts">
const cpuPercentage = ref(10)
const memoryPercentage = ref(30)
const diskPercentage = ref(50)

const colors = [
    { color: '#5cb87a', percentage: 20 },
    { color: '#1989fa', percentage: 40 },
    { color: '#6f7ad3', percentage: 60 },
    { color: '#e6a23c', percentage: 80 },
    { color: '#f56c6c', percentage: 100 },
]
</script>

<template>
    <div class="home">
        <!-- 信息框 -->
        <HeaderInfo />

        <!-- 系统信息 -->
        <div class="system">
            <div class="title"><box-icon name='tachometer' />系统信息</div>

            <div class="list">
                <div class="item">
                    <h4>信息</h4>

                    <ul>
                        <li>系统名称：Window10</li>
                        <li>开机时间：2023-07-20 14:18:48</li>
                        <li>已不间断运行：303天</li>
                    </ul>
                </div>

                <div class="item">
                    <h4>CPU</h4>

                    <el-row justify="center"><el-progress type="dashboard" :percentage="cpuPercentage"
                            :color="colors" /></el-row>
                </div>

                <div class="item">
                    <h4>内存</h4>

                    <el-row justify="center"><el-progress type="dashboard" :percentage="memoryPercentage"
                            :color="colors" /></el-row>
                </div>

                <div class="item">
                    <h4>磁盘</h4>

                    <el-row justify="center"><el-progress type="dashboard" :percentage="diskPercentage"
                            :color="colors" /></el-row>
                </div>

                <div class="item">
                    <h4>容量</h4>

                    <el-progress :percentage="100" :stroke-width="15" :color="colors" striped striped-flow :duration="10" />

                    <ul class="capacity">
                        <li>总容量：500G</li>
                        <li>可用容量：270G</li>
                        <li>剩余量：230G</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="box">
            <Linear />
            <Recording />
        </div>
    </div>
</template>

<style scoped lang="scss">
.home {
    margin: 20px;

    .box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 10px;
    }

    .system {
        @include container;
        margin-top: 10px;

        .title {
            @include title;
            padding: 15px;
            margin-bottom: 0;
        }

        .list {
            display: flex;

            .item {
                flex: 1;
                height: 170px;
                padding: 10px;

                h4 {
                    margin-bottom: 10px;
                }

                ul {
                    li {
                        font-size: 14px;
                        margin-top: 20px;
                    }
                }

                .capacity{
                    li{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>