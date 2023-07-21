<script setup lang="ts">
const Percentage = ref({
    cpu: 10,
    memory: 30,
    disk: 50,
})

const colors = [
    { color: '#5cb87a', percentage: 20 },
    { color: '#1989fa', percentage: 40 },
    { color: '#6f7ad3', percentage: 60 },
    { color: '#e6a23c', percentage: 80 },
    { color: '#f56c6c', percentage: 100 },
]

import { getSystemParameAPI } from '@/api/System'
const getSystemParameData = async () => {
    const { data } = await getSystemParameAPI()
    console.log(data);
}
getSystemParameData()
</script>

<template>
    <div class="list">
        <div class="item">
            <h4>CPU</h4>

            <el-row justify="center"><el-progress type="dashboard" :percentage="Percentage.cpu" :color="colors" /></el-row>
        </div>

        <div class="item">
            <h4>内存</h4>

            <el-row justify="center"><el-progress type="dashboard" :percentage="Percentage.memory"
                    :color="colors" /></el-row>
        </div>

        <div class="item">
            <h4>磁盘</h4>

            <el-row justify="center"><el-progress type="dashboard" :percentage="Percentage.disk" :color="colors" /></el-row>
        </div>

        <div class="item">
            <h4>容量</h4>

            <el-progress :percentage="Percentage.disk" :stroke-width="10" :color="colors" striped striped-flow
                :duration="10" />

            <ul class="capacity">
                <li>总容量：500G</li>
                <li>可用容量：270G</li>
                <li>剩余量：230G</li>
            </ul>
        </div>

        <div class="item">
            <h4>信息</h4>

            <ul>
                <li>系统名称：Window10</li>
                <li>开机时间：2023-07-20 14:18:48</li>
                <li>已不间断运行：303天</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list {
    display: flex;

    .item {
        flex: 1;
        height: 170px;
        padding: 10px 20px;

        h4 {
            margin-bottom: 10px;
        }

        ul {
            li {
                font-size: 14px;
                margin-top: 20px;
            }
        }

        .capacity {
            li {
                margin-top: 10px;
            }
        }
    }
}
</style>
