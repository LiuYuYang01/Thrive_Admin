<script setup lang="ts">
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
    var chartDom = document.getElementById('Linear');
    var myChart = echarts.init(chartDom as HTMLElement);

    var xData = function () {
        var data = [];
        for (var i = 12; i < 20; i = i + 1) {
            data.push('03-' + i);
        }
        return data;
    }();

    var color = ['#727cf5', '#99da69']
    var name = ['新增客户']

    var data = [
        [3, 5, 9, 3, 8, 12, 10, 23]
    ]

    var series = [];

    for (var i = 0; i < 2; i++) {
        series.push({
            name: name[i],
            type: "line",
            symbolSize: 3, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
            symbol: 'circle', //标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            smooth: true, //是否平滑曲线显示
            showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[i]
                }, {
                    offset: 0.8,
                    color: 'rgba(255,255,255,0)'
                }], false),
                shadowColor: 'rgba(255,255,255, 0.1)',
                shadowBlur: 2,
                opacity: 0.3,
            },
            itemStyle: {
                color: color[i],
                lineStyle: {
                    width: 2,
                    type: 'solid' //'dotted'虚线 'solid'实线
                },
                borderColor: color[i], //图形的描边颜色。支持的格式同 color
                borderWidth: 8, //描边线宽。为 0 时无描边。[ default: 0 ]
                barBorderRadius: 0,
                label: {
                    show: false,
                },
                opacity: 0.5,
            },
            data: data[i],

        })
    }

    const option = {
        //backgroundColor: "#141f56",
        // legend: {
        //     top: 20,
        //     right: 80,
        //         itemGap:5,
        //         itemWidth:5,
        //         textStyle: {
        //             color: '#ff0000',
        //             fontSize: '13'
        //         },
        //         data: name
        // },
        title: {
            left: 350,
            textStyle: {
                color: '#fff',
                fontSize: '18',
                fontWeight: 'normal',
            },
            subtextStyle: {
                color: '#90979c',
                fontSize: '16',

            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line',
                // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    color: 'rgba(200,200,200,0)'
                }
            },
            formatter: '日期：{b}<br />访问量: {c}',
            //提示背景
            padding: [8, 10],
        },
        grid: {
            borderWidth: 0,
            top: 55,
            bottom: 55,
            textStyle: {
                color: "#fff"
            }
        },
        xAxis: [{
            type: "category",
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0)'
                }
            },

            boundaryGap: false,
            //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
            axisTick: {
                show: false
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                inside: false,
                color: '#666',
                //x轴字颜色
                fontWeight: 'normal',
                fontSize: '12',
            },
            data: xData,
        }],
        yAxis: {
            show: false,
            type: 'value',
            axisTick: {
                show: false
            },
        },
        series: series,
    }

    option && myChart.setOption(option);
})
</script>

<template>
    <div class="statistics">
        <div class="title"><box-icon name='line-chart' />今日浏览量</div>
        <div id="Linear"></div>
    </div>
</template>

<style scoped lang="scss">
.statistics {
    width: 79%;
    display: flex;
    flex-direction: column;
    @include container;

    .title {
        @include title;
        padding: 15px;
    }

    #Linear {
        height: 348px;
    }
}
</style>
