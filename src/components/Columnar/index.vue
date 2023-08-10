<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
    var chartDom = document.getElementById('Columnar') as HTMLElement;
    var myChart = echarts.init(chartDom);

    const option = {
        color: ['#727cf5'],
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#999'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e0e2ff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: false // 不显示坐标轴上的文字
            },
            splitLine: {
                lineStyle: {
                    color: '#f9f9f9' // 分割线颜色
                }
            }
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                barWidth: '50%', // 设置柱状图宽度
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    }

    option && myChart.setOption(option)
})
</script>

<template>
    <div id="Columnar"></div>
</template>

<style scoped lang="scss">
#Columnar {
    width: 500px;
    height: 300px;
    margin: 10px 0 0 10px;

    @include container;
}
</style>
