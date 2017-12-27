<style lang="less">
    .transaction-data-table {
        .border-box {
            width: 322px;
            height: 402px;
            margin-bottom: 13px;
            position: static;
            #border1 {
                width: 326px;
                height: 350px;
                top: 24px;
                left: -2px;
            }
            #border2 {
                width: 274px;
                height: 406px;
                top: -26px;
                left: 24px;
            }
            .border-inner-content {
                width: 326px;
                height: 402px;
                top: 0px;
                left: -24px;
            }
            .data-content {
                height: 312px;
            }
        }

    }

    .transaction-item {
        font-size: 15px;
        font-weight: bolder;
        span {
            color: #cccccc;
            padding: 0 8px;
        }
        .el-col-8 {
            text-align: right;
        }

        .dark-item {
            height: 34px !important;
            line-height: 34px !important;
            padding: 0 15px !important;
        }

        .light-item {
            height: 50px !important;
            line-height: 35px !important;
            padding: 0 15px 0 15px !important;
        }
    }

    .transaction-pie {
        .border-box {
            width: 449px;
            height: 426px;
            margin-bottom: 13px;
            background-color: #1C2B44;
            border: solid 2px #96E6EC;
            position: static;
            #border1 {
                width: 453px;
                height: 381px;
                position: relative;
                background-color: #1C2B44;
                top: 24px;
                left: -2px;
            }
            #border2 {
                width: 406px;
                height: 432px;
                background-color: #1C2B44;
                position: relative;
                top: -26px;
                left: 24px;
            }
            .border-inner-content {
                width: 453px;
                height: 432px;
                position: relative;
                top: 0px;
                left: -24px;
            }
        }

    }

    .mian-box {
        .group-right {
            float: right;
        }
    }

</style>
<template>
    <div class="mian-box">
        <!--左下方的数据图-->
        <el-collapse-transition>
            <div class="transaction-pie" v-show="showDatas">
                <border-box>
                    <div class="data-header-box">
                        <span class="title">交易数据分析</span>
                        <div class="table-header-group">
                            <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                                <el-button icon="icon iconfont icon-question"></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="data-content">
                        <div class="transaction-item">
                            <el-row class="dark-item">
                                <el-col :span="8">单日交易量：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.jrxl}}</span></el-col>
                                <el-col :span="4">吨</el-col>
                            </el-row>
                            <el-row class="light-item">
                                <el-col :span="8">金额：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.jrze}}</span></el-col>
                                <el-col :span="4">元<br></el-col>
                            </el-row>
                            <el-row class="dark-item">
                                <el-col :span="8">本周交易量：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.bzxl}}</span></el-col>
                                <el-col :span="4">吨</el-col>
                            </el-row>
                            <el-row class="light-item">
                                <el-col :span="8">金额：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.bzze}}</span></el-col>
                                <el-col :span="4">元</el-col>
                            </el-row>
                            <el-row class="dark-item">
                                <el-col :span="8">本月交易量：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.byxl}}</span></el-col>
                                <el-col :span="4">吨</el-col>
                            </el-row>
                            <el-row class="light-item">
                                <el-col :span="8">金额：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAnalysis.byze}}</span></el-col>
                                <el-col :span="4">元</el-col>
                            </el-row>
                            <el-row class="dark-item">
                                <el-col :span="8">累计交易量：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAccount.zjyl}}</span></el-col>
                                <el-col :span="4">吨</el-col>
                            </el-row>
                            <el-row class="light-item">
                                <el-col :span="8">金额：</el-col>
                                <el-col :span="10" :offset="2" class="right"><span>{{dataAccount.zjyje}}</span></el-col>
                                <el-col :span="4">元</el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="footer-btn-group clearfix">
                        <div class="group-right">
                            <el-button><i class="icon iconfont icon-menu2" @click="showMainTable"></i></el-button>
                            <el-button><i class="icon iconfont icon-chart1" @click="showPieChart"></i></el-button>
                        </div>
                    </div>
                </border-box>
            </div>
        </el-collapse-transition>

        <!--左下方的饼图-->
        <transition name="el-zoom-in-center">
            <div class="transaction-pie" v-show="pieChart">
                <border-box>
                    <div class="data-header-box">
                        <span class="title">交易数据分析</span>
                        <div class="table-header-group">
                            <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                                <el-button icon="icon iconfont icon-question"></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <!--<div class="checkbox-wrapper clearfix">
                        <el-radio-group v-model="radioValue1">
                            <el-radio :label="3">金额</el-radio>
                            <el-radio :label="6">量</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="radioValue2" class="g-rt">
                            <el-radio :label="3">今日</el-radio>
                            <el-radio :label="6">本周</el-radio>
                            <el-radio :label="9">本月</el-radio>
                        </el-radio-group>
                    </div>-->
                    <div id="transaction-pie-chart" style="width: 450px;height: 340px;"></div>
                    <div class="footer-btn-group clearfix">
                        <div class="group-right">
                            <el-button><i class="icon iconfont icon-menu2" @click="showMainTable"></i></el-button>
                            <el-button><i class="icon iconfont icon-chart1" @click="showPieChart"></i></el-button>
                        </div>
                    </div>
                </border-box>
            </div>

        </transition>


    </div>

</template>

<script>
    import ggdp from '@/functions/common'
    import BorderBox from '@/components/BoderCompontents'

    // 按需引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    //    // 引入提示框和标题组件
    //    require('echarts/lib/component/tooltip');
    //    require('echarts/lib/component/title');

    export default {
        name: 'LeftBottomTable',
        components: {BorderBox},
        props: [],
        data() {
            return {
                showDatas: true,
                pieChart: false,

                dataAnalysis: {},
                dataAccount: {},
                radioValue1: '',
                radioValue2: '',
                showRealPie: true,
                tabActive: 'first',
                logoHeaderActive: '1',
                showTransacPie: false,
                showDailyVolumeLine: false,
                showDailyPriceLine: false,


                transacPieOptions: {
                    textStyle: {
                        color: '#fff'
                    },
                    title: [{
                        text: '重量和金额总统计',
                        left: '35%',
                        top: '6%',
                        textStyle: {
                            color: '#fff'
                        }
                    }],
                    color: ["#f9882c", "#24c5fb"],
                    textStyle: {
                        color: "#ffffff",

                    },
                    legend: {
                        right: 10,
                        width: 500,
                        itemWidth: 40,
                        textStyle: {
                            color: "#d7d7d7"
                        },
                        data: ['重量', '金额']
                    },
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false
                        },

                        data: ['今日', '本周', '本月', '累计']
                    }],
                    yAxis: {
                        "axisLine": {
                            lineStyle: {
                                color: '#c0576d'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#c0576d'
                            }
                        },
                        "axisTick": {
                            "show": false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#ffd285'
                            }
                        },
                        type: 'value'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    series: [{
                        name: '重量',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 6,
                                color: '#ffd285'
                            }
                        },
                        data: [120, 165, 134, 157]
                    }, {
                        name: '金额',
                        type: 'bar',
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 6,
                                color: '#ec4863'
                            }
                        },
                        data: [247, 210, 195, 207]
                    },]
                }

            }
        },
        methods: {
            showMainTable() {
                this.pieChart = false;
                this.showDatas = true;
            },
            showPieChart() {
                this.pieChart = true;
                this.showDatas = false;
                let pieChart = echarts.init(document.getElementById('transaction-pie-chart'));
                pieChart.setOption(this.transacPieOptions);
            }
        },
        beforeCreate() {
            ggdp.getAjax('/inter.ashx?action=analhysis', (data) => {
                this.transacPieOptions.xAxis.data = data.barGraph.xAxis;
                this.transacPieOptions.series[0].data = data.barGraph.series1;
                this.transacPieOptions.series[1].data = data.barGraph.series2;

                this.dataAnalysis = data;
            });
            ggdp.getAjax('/inter.ashx?action=statistics', (data) => {
                this.dataAccount = data;
            });

        },
    }
</script>
