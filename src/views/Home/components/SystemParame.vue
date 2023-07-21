<script setup lang="ts">
// 引入时间插件
import moment from 'moment';
import { SystemParame } from '@/types/System'

const Percentage = ref<SystemParame>({
    cpu: 0,
    memory: {
        memoryAvailable: 0,
        memoryPercent: 0,
        memoryTotal: 0,
        memoryUsed: 0,
    },
    disk: {
        diskFree: 0,
        diskPercent: 0,
        diskTotal: 0,
        diskUsed: 0
    },
    name: "加载中...",
    run: 0,
    boot_time: ""
})

const colors = [
    { color: '#5cb87a', percentage: 20 },
    { color: '#1989fa', percentage: 40 },
    { color: '#6f7ad3', percentage: 60 },
    { color: '#e6a23c', percentage: 80 },
    { color: '#f56c6c', percentage: 100 },
]

// 获取系统信息
import { getSystemParameAPI } from '@/api/System'
const getSystemParameData = async () => {
    const { data } = await getSystemParameAPI()
    Percentage.value = data
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

            <el-tooltip
                :content="`内存：${Percentage.memory.memoryTotal} 已使用：${Percentage.memory.memoryUsed} 剩余：${Percentage.memory.memoryAvailable}`"
                placement="bottom">
                <el-row justify="center"><el-progress type="dashboard" :percentage="Percentage.memory.memoryPercent"
                        :color="colors" /></el-row>
            </el-tooltip>
        </div>

        <div class="item">
            <h4>磁盘</h4>

            <el-row justify="center"><el-progress type="dashboard" :percentage="Percentage.disk.diskPercent"
                    :color="colors" /></el-row>
        </div>

        <div class="item">
            <h4>容量</h4>

            <el-progress :percentage="Percentage.disk.diskPercent" :stroke-width="10" :color="colors" striped striped-flow
                :duration="10" />

            <ul class="capacity">
                <li>总容量：{{ Percentage.disk.diskTotal }}G</li>
                <li>可用容量：{{ Percentage.disk.diskUsed }}G</li>
                <li>剩余量：{{ Percentage.disk.diskFree }}G</li>
            </ul>
        </div>

        <div class="item">
            <h4>信息</h4>

            <ul>
                <li>系统名称：{{ Percentage.name }}</li>
                <li>开机时间：{{ moment(Percentage.boot_time).format('YYYY-MM-DD HH:mm:ss') }}</li>
                <li>已不间断运行：{{ Percentage.run }}天</li>
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
