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
                        <!--<el-button icon="icon iconfont icon-fangda" @click="showPopupTable"></el-button>-->
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
                        <p class="popup-title">价格指数分析</p>
                        <!--<el-form class="select-group-wrapper" ref="popupSearchData" :model="popupSearchData"
                                 :inline="true">
                            <el-form-item>
                                <el-date-picker v-model="popupSearchData.timer1" type="date" placeholder="选择日期"
                                                size="small"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker v-model="popupSearchData.timer2" type="date" placeholder="选择日期"
                                                size="small"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="popupSearchData.provice" placeholder="省份" size="small">
                                    <el-option v-for="item in proviceOptions" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="popupSearchData.city" placeholder="城市" size="small">
                                    <el-option v-for="item in cityOptions" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="popupSearchData.variety" placeholder="品种" size="small">
                                    <el-option v-for="item in varietyOptions" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="showDialogType1 = true" size="small">搜索</el-button>
                            </el-form-item>
                        </el-form>-->
                        <div class="temp-gap-w">

                        </div>
                        <div class="type2-chart-table-box clearfix">
                            <div class="expand-table-wrapper g-lf">
                                <div class="data-content type2-data-table">
                                    <el-table :data="dailyVolumeFullData" size="small" fit>
                                        <el-table-column prop="pname" label="省份" width="50px"></el-table-column>
                                        <el-table-column prop="city" label="城市" width="65px"
                                                         show-overflow-tooltip></el-table-column>
                                        <el-table-column prop="reltime" label="发布时间" width="95px"
                                                         show-overflow-tooltip></el-table-column>

                                        <el-table-column prop="exponent" label="指数" width="76px" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span :class="scope.row.exponent>2000?'red bold':'green bold'"
                                                      style="font-size: 13px">{{scope.row.exponent}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="rise" label="涨跌" width="65px" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <span :class="scope.row.rise>0?'text-red numarrow':'text-green numarrow'">
                                                    <i :class="riseIcon(scope.row.rise)"></i>
                                                    {{mathAbs(scope.row.rise)}}
                                                            <!--math.abs是取绝对值的函数-->
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="expand-chart-wrapper g-rt">
                                <div class="chart-content">
                                    <div id="popup-chart" ref="popupChart" style="width: 100%; height: 470px;">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<div class="popup-other-infos">
                            <p class="other-item">2017年10月1日至2017年10月25日，<span class="yellow">xxxx</span>地区，
                                合同数量<span class="blue">222</span>件，总交易量<span class="pink">111111</span>吨，
                                总交易金额<span class="orange">111111</span>万元，
                                已出库<span class="green">xxxx</span>吨，
                                未出库<span class="red">xxxx</span>吨。
                            </p>
                            <p class="other-item">2017年10月1日至2017年10月25日，<span class="yellow">xxxx</span>地区，
                                合同数量<span class="blue">222</span>件，总交易量<span class="pink">111111</span>吨，
                                总交易金额<span class="orange">111111</span>万元，
                                已出库<span class="green">xxxx</span>吨，
                                未出库<span class="red">xxxx</span>吨。
                            </p>
                        </div>-->
                    </border-box>

                </el-dialog>
            </div>

        </div>


    </div>

</template>

<script>
    import ggdp from '@/functions/common'
    import BorderBox from '@/components/BoderCompontents'

    // 按需引入 ECharts 主模块
    //    let echarts = require('echarts/lib/echarts');
    //
    //    require('echarts/lib/chart/line');
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

            }
        },
        mounted(){
            setInterval(()=>{
                ggdp.getAjax('/inter.ashx?action=getmidwestdata', (data) => {
                    this.dailyVolumeFullData = data.mx.Row;
                    data = data.mx.Row;
                    this.$set(this.dailyVolumeTable, 0, data.slice(0, 7))
                    this.$set(this.dailyVolumeTable, 1, data.slice(7, 14))
                });
            },310000)
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
                this.showPriceDialog = true;


                /*let map = setInterval(function () {
                    if (myChart == '' || typeof(myChart) == 'undefined') {
                        myChart = echarts.init(_this.$refs.popupChart);
                        myChart.setOption(_this.chartOption, true);
                    } else {
                        myChart.dispose();
                        myChart = echarts.init(_this.$refs.popupChart);
                        myChart.setOption(_this.chartOption);
                    }
                    clearInterval(map);
                }, 1000)*/


            },
            dailyPriceChart: function () {
                let _this = this;
                _this.showDailyPriceLine = !_this.showDailyPriceLine;
                let LineChart = echarts.init(document.getElementById('daily-price-chart'));
                LineChart.setOption(_this.dailyLineOptions);
            },
            expandData: function () {

            },

        },
        mounted() {


        }

    }
</script>
