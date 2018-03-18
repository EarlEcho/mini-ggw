<style lang="less">
    .right-bottom-table {
        height: 362px;
        .popup-table {
            height: 100%;
        }
        .el-table th {
            padding: 6px 0;
        }

        .el-table td {
            padding: 3px 0;
        }
        .el-table td, .el-table th.is-leaf {
            border-bottom: 3px solid #172f4b;
        }
        .popup-title {
            font-size: 28px;
            color: white;
            text-align: center;
            line-height: 30px;
        }

        .expand-table-wrapper {
            .data-content {
                height: 550px;
            }
        }
        .pages-group-center {
            width: 58%;
            display: inline-block;
            text-align: right;
        }

        .pages-group-right {
            width: 40%;
            display: inline-block;
            text-align: right;
            .el-button + .el-button {
                margin-left: 0;
            }
        }
        .pages-group-signle {
            width: 99%;
            display: inline-block;
            text-align: right;
            .el-button + .el-button {
                margin-left: 0;
            }
        }

        .type2-chart-table-box {
            padding: 0 10px;
            height: 535px;
            .expand-table-wrapper {
                width: 26%;
            }
            .el-tabs__nav-wrap.is-scrollable {
                padding: 0 !important;
            }
            .type2-data-table {
                height: 460px !important;
            }
            .data-content .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
                width: 103px;
            }
            .data-content .el-tabs__item {
                width: 103px;
            }
            .expand-chart-wrapper {
                width: 72%;
                #popup-chart {
                    width: 100%;
                    height: 470px;
                }
            }
        }
        .right-line-charts-wrapper2 {
            width: 820px;
            height: 370px;
            background-color: #1b3a57;
            float: right;
        }
        .numarrow {
            display: inline-block;
            width: 35px;
            text-align: center;
            i {
                margin-right: -6px;
                vertical-align: middle;
            }
        }
        .daily-price-msg {
            height: 240px;
            width: 130px;
            float: left;
            background-color: #0E2A43;
            color: #1291de;
            font-weight: 600;
            padding: 25px 15px;
            text-align: center;
            span {
                color: white;
            }
        }
        .daily-price-table {
            float: right;
            .border-box {
                width: 522px;
                height: 362px;
                margin-bottom: 13px;
                background-color: #1C2B44;
                border: solid 2px #96E6EC;
                position: static;
                #border1 {
                    width: 526px;
                    height: 310px;
                    position: relative;
                    background-color: #1C2B44;
                    top: 24px;
                    left: -2px;
                }
                #border2 {
                    width: 474px;
                    height: 366px;
                    background-color: #1C2B44;
                    position: relative;
                    top: -26px;
                    left: 24px;
                }
                .border-inner-content {
                    width: 526px;
                    height: 366px;
                    position: relative;
                    top: -1px;
                    left: -24px;
                }
                .data-content {
                    height: 272px;
                }
            }
            .el-col-12 {
                border-right: solid 1px #11213A;
                border-left: solid 1px #11213A;
            }
        }
    }


</style>
<template>
    <div class="right-bottom-table clearfix">
        <!--右侧数据-->
        <div class="daily-price-table" v-show="!showDailyPriceLine">
            <border-box>
                <div class="data-header-box">
                    <span class="title">中西部螺纹价格指数</span>
                    <div class="table-header-group">
                        <el-button icon="icon iconfont icon-fangda" @click="showPopupTable"></el-button>
                        <el-tooltip class="item" effect="dark" content="指定城市最新一条螺纹钢价格指数数据，其中涨跌是针对与紧接着一条的数据之差。"
                                    placement="top-start">
                            <el-button icon="icon iconfont icon-question"></el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="data-content clearfix">
                    <el-row>
                        <el-col :span="12">
                            <el-table :data="dailyVolumeTable[0]" size="small" fit>
                                <el-table-column prop="time" label="时间" width="75px"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="latestprice" label="最新综合价" width="80px"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="num" label="指数" width="51px" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                    <span :class="scope.row.num>2000?'red bold':'green bold'"
                                          style="font-size: 13px">{{scope.row.num}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="rise" label="涨跌" width="55px" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span :class="scope.row.rise>0?'text-red numarrow':'text-green numarrow'">
                                            <i :class="riseIcon(scope.row.rise)"></i>
                                            {{mathAbs(scope.row.rise)}}
                                            <!--math.abs是取绝对值的函数-->
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="12">
                            <el-table :data="dailyVolumeTable[1]" size="small" fit>
                                <el-table-column prop="time" label="时间" width="75px"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="latestprice" label="最新综合价" width="80px"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="num" label="指数" width="51px" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                    <span :class="scope.row.num>2000?'red bold':'green bold'"
                                          style="font-size: 13px">{{scope.row.num}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="rise" label="涨跌" width="55px" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span :class="scope.row.rise>0?'text-red numarrow':'text-green numarrow'">
                                            <i :class="riseIcon(scope.row.rise)"></i>
                                            {{mathAbs(scope.row.rise)}}
                                            <!--math.abs是取绝对值的函数-->
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
                <div class="footer-btn-group clearfix">
                    <div class="group-right">

                    </div>
                </div>
            </border-box>
        </div>

        <div class="popup-table">
            <div class="expand-dialog">
                <el-dialog :visible.sync="showPriceDialog" width="1486px" top="100px" :modal="false">
                    <border-box>
                        <p class="tooltip">
                            <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                                <el-button icon="icon iconfont icon-wenhao"></el-button>
                            </el-tooltip>
                        </p>
                        <p class="popup-title">中西部螺纹价格指数</p>
                        <div class="temp-gap-w">

                        </div>

                        <div id="right-inner-lines" style="width: 100%;height: 670px;" ref="rightInnerLines">

                        </div>

                    </border-box>

                </el-dialog>
            </div>

        </div>


    </div>

</template>

<script>
    import ggdp from '@/functions/common'
    import BorderBox from '@/components/BoderCompontents'

    //     按需引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    //    // 引入提示框和标题组件
    //    require('echarts/lib/component/tooltip');
    //    require('echarts/lib/component/title');

    let myChart;
    export default {
        name: 'RightTopTable',
        components: {BorderBox},
        props: [],
        data() {
            return {
                dailyVolumeTable: {},
                dailyVolumeFullData: {},
                radioValue1: '',
                radioValue2: '',
                value: '',
                showPriceDialog: false,
                showDailyPriceLine: false,
                popupSearchData: {
                    timer1: '',
                    timer2: '',
                    provice: '',
                    city: '',
                    variety: ''
                },
                /*select选择器*/
                cityOptions: [],
                proviceOptions: [],
                varietyOptions: [],
                chartOption: {
                    backgroundColor: '#1C2B44',
                    title: {
                        text: '行业实时热度指数',
                        show: false,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#F1F1F3'
                        },
                        left: '6%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        icon: 'rect',
                        itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 13,
                        data: ['中西部螺纹指数', '中西部螺纹综合价'],
                        right: '4%',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        data: []
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    }],
                    series: [{
                        name: '中西部螺纹指数',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(219, 50, 51, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(219, 50, 51, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: 'rgb(219,50,51)',
                                borderColor: 'rgba(219,50,51,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: []
                    }, {
                        name: '中西部螺纹综合价',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0, 136, 212, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(0, 136, 212, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,136,212)',
                                borderColor: 'rgba(0,136,212,0.2)',
                                borderWidth: 12

                            }
                        },
                        data: []
                    }]
                },

            }
        },
        mounted() {
            setInterval(() => {
                ggdp.getAjax('/inter.ashx?action=getmidwestdata', (data) => {
                    this.dailyVolumeFullData = data.mx.Row;
                    data = data.mx.Row;
                    this.$set(this.dailyVolumeTable, 0, data.slice(0, 7))
                    this.$set(this.dailyVolumeTable, 1, data.slice(7, 14))
                });
            }, 310000)
        },
        beforeCreate() {
            ggdp.getAjax('/inter.ashx?action=getmidwestdata', (data) => {
                this.dailyVolumeFullData = data.mx.Row.datas;
                data = data.mx.Row.datas;
                this.$set(this.dailyVolumeTable, 0, data.slice(0, 7))
                this.$set(this.dailyVolumeTable, 1, data.slice(7, 14))
            });

        },
        methods: {
            riseIcon(val) {
                if (val == 0) {
                    return 'center';
                }
                if (val > 0) {
                    return 'icon iconfont icon-up';
                }
                else {
                    return 'icon iconfont icon-down';
                }
            },
            mathAbs(val) {
                if (val == 0) {
                    return '---'
                }
                else {
                    return Math.abs(val);
                }
            },
            showPopupTable() {
                /*此处获取dialogd的数据*/
                ggdp.getAjax('/inter.ashx?action=getallmidwestdata', (data) => {
                    let lineDatas = data.mx.Row.datas;
                    this.chartOption.xAxis[0].data = lineDatas.dates;

                    this.chartOption.legend.data[0] = lineDatas.tips.numtip;
                    this.chartOption.legend.data[1] = lineDatas.tips.pricetip;
                    this.chartOption.series[0].data = lineDatas.num;
                    this.chartOption.series[0].name = lineDatas.tips.numtip;


                    this.chartOption.series[1].data = lineDatas.price;
                    this.chartOption.series[1].name = lineDatas.tips.pricetip;

                });
                this.showPriceDialog = true;
                setTimeout(() => {
                    myChart = echarts.init(document.getElementById('right-inner-lines'));
                    myChart.setOption(this.chartOption);
                }, 1000)

            }
        }

    }
</script>
