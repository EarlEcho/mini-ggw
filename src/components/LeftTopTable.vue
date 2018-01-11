<style lang="less">
    .left-top-table {
        display: flex;
        .el-table__body, .el-table__footer, .el-table__header {
            border-bottom: 5px solid #172f4b;
        }
        .popup-table {
            height: 100%;
        }
        .expand-table-wrapper {
            .data-content {
                height: 550px;
            }
        }
        .popup-title {
            font-size: 28px;
            color: white;
            text-align: center;
            line-height: 30px;
        }
        .popup-bottom-wrapper {
            width: 33%;
            display: inline-block;
            height: 100%;
        }
        .w {
            .el-table th {
                padding: 6px 0;
            }

            .el-table td {
                padding: 3px 0;
            }
            .el-table td, .el-table th.is-leaf {
                border-bottom: 4px solid #172f4b;
            }
            .border-box {
                width: 449px;
                height: 435px;
                margin-bottom: 20px;
                #border1 {
                    width: 453px;
                    height: 387px;
                    top: 22px;
                    left: -2px;
                }
                #border2 {
                    width: 405px;
                    height: 439px;
                    top: -24px;
                    left: 25px;
                }
                .border-inner-content {
                    width: 453px;
                    height: 435px;
                    top: 2px;
                    left: -25px;
                }
                .data-content {
                    height: 340px;
                    overflow: hidden;
                }
            }
        }

        .popup-table .data-content {
            /*550*/
            height: 590px;
        }

        .table-rank-icon {
            display: inline-block;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #A67A32;
            vertical-align: middle;
            line-height: 25px;
            background: url(../assets/image/rank.png) no-repeat;
            background-size: 100%;
        }
        .numarrow {
            display: inline-block;
            width: 45px;
            text-align: left;
            i {
                margin-right: -2px;
                vertical-align: middle;
            }
        }
        .group-left {
            float: left;
            .el-button + .el-button {
                margin: 0;
            }
        }
        .group-center {

        }
        .group-right {
            float: right;
            .el-button + .el-button {
                margin: 0;
            }
        }

    }

    .expand-table-wrapper .el-table th {
        font-size: 15px;
    }

    .expand-table-wrapper .el-table td {
        padding: 7px 0;
        border-bottom: 6px solid #172f4b;
    }

    .expand-table-wrapper .el-table tr {
    }

    .expand-table-wrapper .el-table th.is-leaf {
        border-bottom: 6px solid #172f4b;
    }


</style>
<template>
    <div class="left-top-table" v-cloak>
        <!--实时交易数据的表格-->
        <div class="w">
            <border-box>
                <div class="data-header-box">
                    <span class="title">{{tableTitle}}</span>
                    <div class="table-header-group">
                        <el-button><i class="icon iconfont icon-fangda" @click="showFullRealData"></i></el-button>
                        <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                            <el-button icon="icon iconfont icon-question"></el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="data-content" v-show="realTable">
                    <!--显示实时交易数据的table  showRealTable-->
                    <el-table :data="tempData" size="small" fit v-show="showRealTable">
                        <el-table-column prop="ywrq" label="日期" width="52px" show-overflow-tooltip
                                         :formatter="filterTime"></el-table-column>
                        <el-table-column prop="khsf" label="省份" width="53px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dhkh" label="买方" width="100px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wzpm" label="品名" width="80px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wzgg" label="规格" width="55px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cjsl" label="数量" width="56px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="jyjg" label="交易价格" width="57px" show-overflow-tooltip></el-table-column>
                    </el-table>

                    <!--显示排名的table  showRankTable -->
                    <el-table :data="tempData" size="small" fit v-if="showRankTable">
                        <el-table-column type="index" label="排名" width="50px">
                            <template slot-scope="scope">
                                <span :class="scope.$index<3?'table-rank-icon':''">{{scope.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="khsf" label="省份" width="55px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dhkh" label="订货客户" width="100px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wzpm" label="品名" width="80px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wzgg" label="规格" width="55px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cjsl" label="数量" width="56px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="jyjg" label="交易价格" width="57px" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
                <!--图表-->
                <div class="data-content" v-show="realPieChart">
                    <!--显示实时交易数据的table  showRealTable-->
                    <!--<div class="checkbox-wrapper clearfix">
                        <el-radio-group v-model="radioType">
                            <el-radio :label="1">公司</el-radio>
                            <el-radio :label="2">品种</el-radio>
                            <el-radio :label="3">终端</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="radioMonth" class="g-rt">
                            <el-radio :label="1">1月</el-radio>
                            <el-radio :label="3">3月</el-radio>
                            <el-radio :label="6">6月</el-radio>
                        </el-radio-group>
                    </div>-->
                    <div id="real-pie-chart" style="width: 453px;height: 340px;">
                        <!--点击模块的饼图后的图表-->
                    </div>
                </div>


                <div class="footer-btn-group clearfix">
                    <div class="group-left" v-show="realTable">
                        <el-button><i class="icon iconfont icon-menu1" @click="realTimeEvent"></i></el-button>
                        <el-button><i class="icon iconfont icon-jiugongge-copy" @click="rankEvent"></i></el-button>
                    </div>
                    <div class="group-center" v-show="realTable">
                        <el-button><i class="icon iconfont icon-left" @click="lastPage"></i></el-button>
                        <el-button><i class="icon iconfont icon-right" @click="nextPage"></i></el-button>
                    </div>
                    <div class="group-right">
                        <el-button><i class="icon iconfont icon-menu2" @click="showMainTable"></i></el-button>
                        <el-button><i class="icon iconfont icon-chart1" @click="showPieChart"></i></el-button>
                    </div>
                </div>
            </border-box>
        </div>


        <!--弹出框-->
        <div class="popup-table">
            <div class="expand-dialog">
                <el-dialog :visible.sync="showRealTimeDialog" width="1486px" top="100px" :modal="false">
                    <border-box>
                        <p class="tooltip">
                            <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                                <el-button icon="icon iconfont icon-question"></el-button>
                            </el-tooltip>
                        </p>
                        <p class="popup-title">实时交易数据分析</p>
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
                                <el-select v-model="popupSearchData.city" placeholder="城市" size="small">
                                    <el-option v-for="item in cityOptions" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="popupSearchData.company" placeholder="公司" size="small">
                                    <el-option v-for="item in companyOptions" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select v-model="popupSearchData.user" placeholder="用户" size="small">
                                    <el-option v-for="item in userOptions" :key="item.value" :label="item.label"
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
                                <el-select v-model="popupSearchData.standard" placeholder="规格" size="small">
                                    <el-option v-for="item in standardOptions" :key="item.value" :label="item.label"
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

                        <div class="expand-table-wrapper">
                            <div class="data-content">
                                <el-table :data="tempPopupData" fit class="inner-table">
                                    <el-table-column width="25px">
                                        <template slot-scope="scope">
                                            <i class="icon iconfont icon-right1 text-green"
                                               style="margin-left: 5px;font-size: 16px"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ywrq" label="日期" show-overflow-tooltip
                                                     :formatter="filterTime"></el-table-column>
                                    <el-table-column prop="khsf" label="省份"></el-table-column>
                                    <el-table-column prop="dhkh" label="买方" show-overflow-tooltip
                                                     width="190px"></el-table-column>
                                    <el-table-column prop="fphm" label="卖方" show-overflow-tooltip
                                                     width="190px"></el-table-column>
                                    <el-table-column prop="wzck" label="仓库" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="wzpm" label="品名" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="wzgg" label="规格" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="wzcd" label="钢厂"></el-table-column>
                                    <el-table-column prop="jyjg" label="交易价格"></el-table-column>
                                    <el-table-column prop="djzt" label="状态"></el-table-column>
                                    <el-table-column prop="cjsl" label="成交吨数"></el-table-column>
                                    <el-table-column prop="dcks" label="待出库吨数">
                                        <template slot-scope="scope">
                                            <span class="text-red">{{ scope.row.dcks }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="popup-other-infos">
                                <p class="other-item">
                                    今日待出库数量<span class="text-red"> {{transactionDatas.wck}} </span>吨，已出库数量<span
                                    class="text-green"> {{transactionDatas.yck}} </span>吨
                                    累计<span class="text-orange"> {{transactionDatas.zjyl}} </span>吨，交易金额<span
                                    class="text-blue"> {{transactionDatas.zjyje}} </span>元

                                </p>
                            </div>
                            <div class="footer-btn-group clearfix">
                                <div class="group-center">
                                    <el-button><i class="icon iconfont icon-left" @click="popupLastPage"></i>
                                    </el-button>
                                    <el-button><i class="icon iconfont icon-right" @click="popupNextPage"></i>
                                    </el-button>
                                </div>
                            </div>
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

    //按需引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    //    // 引入提示框和标题组件
    //    require('echarts/lib/component/tooltip');
    //    require('echarts/lib/component/title');
    let myChart;
    export default {
        name: 'leftTopTable',
        components: {
            BorderBox
        },
        props: [],
        data() {
            return {
                transactionDatas: '',
                /*饼图时的单选框*/
                radioType: 1,
                radioMonth: 1,

                realTable: true,
                realPieChart: false,
                tableTitle: '实时交易数据',
                /*实时交易数据 ---- 属性*/
                showRealTable: true,
                tempData: [],
                realTimeFullData: [],
                realDataPage: 0, /*分页数据的页数*/
                realTimeData: [],
                clickPage: 0,//点击页码的次数
                showRealTimeDialog: false,

                /*今日交易量排名 ---属性*/
                showRankTable: false,

                /*展开的弹出框的属性*/
                popupDataLength: 0,
                popupRealTime: [],
                tempPopupData: [],
                clickPopupPage: 0,//点击页码的次数

                /*弹窗搜索部分*/
                popupSearchData: {
                    timer1: '',
                    timer2: '',
                    city: '',
                    company: '',
                    user: '',
                    variety: '',
                    standard: ''
                },
                /*select选择器*/
                cityOptions: [],
                companyOptions: [],
                userOptions: [],
                varietyOptions: [],
                standardOptions: [],

                /*饼图*/
                realPieOptions: {
                    backgroundColor: '#1C2B44',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}吨 ({d}%)"
                    },
                    color: ['#74c31f', '#d35833', '#ffdc90', '#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
                    legend: {
                        itemWidth: 18,
                        itemHeight: 7,
                        orient: 'vertical',
                        padding: [3, 8],
                        top: '15px',
                        left: '5px',
                        x: 'left',
                        data: ['重庆公司', '北京公司', '上海公司', '杭州公司', '西安公司'],
                        textStyle: {
                            color: '#fff',
                            fontSize: 11
                        },
                        backgroundColor: '#274f7d',
                        borderColor: '#53657a',
                        borderWidth: 1,
                        borderRadius: 4,
                        shadowColor: '#29547d',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['61%', '60%'],
                            selectedMode: 'single',
                            minAngle: 40,
                            data: [
                                {value: 305, name: '重庆公司', selected: true},
                                {value: 250, name: '北京公司'},
                                {value: 194, name: '上海公司'},
                                {value: 135, name: '杭州公司'},
                                {value: 145, name: '西安公司'}
                            ],
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: 'inside',
                                    color: 'white',
                                    fontSize: 11,
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'white'
                                    }
                                }
                            }
                        },
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['61%', '60%'],
                            selectedMode: 'single',
                            minAngle: 40,
                            data: [
                                {value: 305, name: '重庆公司', selected: true},
                                {value: 250, name: '北京公司'},
                                {value: 194, name: '上海公司'},
                                {value: 135, name: '杭州公司'},
                                {value: 145, name: '西安公司'}
                            ],
                            label: {
                                normal: {
                                    formatter: "{d}%\n{c}吨",
                                    position: 'outside',
                                    backgroundColor: '#5c6c80',
                                    borderColor: '#495c72',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    color: 'white',
                                    padding: [5, 7],
                                    fontSize: 11,
                                    lineHeight: 33,
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'white'
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        },
        beforeCreate() {
            ggdp.getAjax('/inter.ashx?action=transaction', (data) => {
                /*将获取到的数据赋值给realTimeFullData储存*/
                this.realTimeFullData = data.mx.Row;
                this.realPieOptions.legend.data = data.mx.charts.area;
                this.realPieOptions.series[1].data = data.mx.charts.datas;
                this.realPieOptions.series[0].data = data.mx.charts.datas;

                /*计算页数，数组长度除以一页显示的条数，得到的数向上取整*/
                this.realDataPage = Math.ceil(this.realTimeFullData.length / 9);
                /*储存分页数据*/
                for (let i = 0, j = 0; i < this.realDataPage; i++) {
                    this.$set(this.realTimeData, i, this.realTimeFullData.slice(j, j + 9))
                    j = j + 9;
                }
                this.tempData = this.realTimeData[0];
            });
        },
        filters: {},
        methods: {
            showMainTable() {
                /*显示表格（当前是图表时）*/
                this.realTable = true;
                this.realPieChart = false;
            },
            showPieChart() {
                this.realTable = false;
                this.realPieChart = true;
                let pieChart = echarts.init(document.getElementById('real-pie-chart'));
                pieChart.setOption(this.realPieOptions);
            },

            realTimeEvent() {
                /*显示实时交易数据的事件*/
                this.showRealTable = true;
                this.showRankTable = false
                this.tableTitle = '实时交易数据';
            },
            rankEvent() {
                /*显示交易量排名的事件*/
                this.showRealTable = false;
                this.showRankTable = true
                this.tableTitle = '今日交易量排名';
            },


            /*实时交易数据展开*/
            showFullRealData() {
                this.showRealTimeDialog = true;

                /*计算页数，数组长度除以一页显示的条数，得到的数向上取整*/
                this.popupDataLength = Math.ceil(this.realTimeFullData.length / 12);
                /*储存分页数据*/
                for (let i = 0, j = 0; i < this.popupDataLength; i++) {
                    this.$set(this.popupRealTime, i, this.realTimeFullData.slice(j, j + 12))
                    j = j + 12;
                }
                this.tempPopupData = this.popupRealTime[0];
            },
            filterTime(row, column, cellValue) {
                let date = Date(cellValue);
                date = new Date(date);
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return m + '-' + d;
            },
            popupLastPage() {
                /*点击一次  clickPage增加一次*/
                if (this.clickPopupPage == 0) {
                    this.$message('已经是第一页');
                    return;
                }
                if (this.clickPopupPage < this.popupDataLength) {
                    this.tempPopupData = this.popupRealTime[this.clickPopupPage - 1];
                }
                this.clickPopupPage--;
            },
            popupNextPage() {
                if (this.clickPopupPage == this.popupDataLength - 1) {
                    this.$message('已经是最后一页');
                    return;
                }
                if (this.clickPopupPage < this.popupDataLength) {
                    this.tempPopupData = this.popupRealTime[this.clickPopupPage + 1];
                }
                this.clickPopupPage++;
            },

            lastPage() {
                /*点击一次  clickPage增加一次*/
                if (this.clickPage == 0) {
                    this.$message('已经是第一页');
                    return;
                }
                if (this.clickPage < this.realDataPage) {
                    this.tempData = this.realTimeData[this.clickPage - 1];
                }
                this.clickPage--;
            },
            nextPage() {
                if (this.clickPage == this.realDataPage - 1) {
                    this.$message('已经是最后一页');
                    return;
                }
                if (this.clickPage < this.realDataPage) {
                    this.tempData = this.realTimeData[this.clickPage + 1];
                }
                this.clickPage++;
            },
            /*showTable2() {
                this.showTableBox2 = true;
                this.tableTitle = '今日交易量排名';
            },
            showTable1() {
                this.showTableBox2 = false;
                this.tableTitle = '实时交易数据';
            },*/
            /*realPieChart() {
                this.showRealPie = false;
                let pieChart = echarts.init(document.getElementById('real-pie-chart'));
                pieChart.setOption(this.realPieOptions);
            }*/
        }
    }
</script>
