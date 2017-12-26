<style lang="less">
    .right-top-table {
        height: 500px;
        .el-table th {
            padding: 6px 0;
        }

        .el-table td {
            padding: 4px 0;
        }
        .el-table td, .el-table th.is-leaf {
            border-bottom: 3px solid #172f4b;
        }
        .el-table__body, .el-table__footer, .el-table__header {
            border-bottom: 3px solid #172f4b;
        }

        .right-line-charts-wrapper {
            width: 820px;
            height: 500px;
            background-color: #1b3a57;
            margin-bottom: 10px;
            float: right;
        }

        .popup-table {
            height: 100%;
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

        .type2-chart-table-box {
            padding: 0 10px;
            height: 535px;
            .expand-table-wrapper {
                width: 30%;
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
                width: 69%;
                #popup-chart {
                    width: 100%;
                    height: 470px;
                }
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
        .numarrow {
            display: inline-block;
            width: 45px;
            text-align: left;
            i {
                margin-right: -2px;
                vertical-align: middle;
            }
        }
        .daily-volume-msg {
            height: 60px;
            width: 100%;
            background-color: #0E2A43;
            color: #1291de;
            font-weight: 600;
            padding-top: 10px;
            span {
                color: white;
            }
        }

    }

    .daily-volume-table {
        float: right;
        .border-box {
            width: 522px;
            height: 500px;
            margin-bottom: 13px;
            background-color: #1C2B44;
            border: solid 2px #96E6EC;
            position: static;
            #border1 {
                width: 526px;
                height: 448px;
                background-color: #1C2B44;
                position: relative;
                top: 25px;
                left: -2px;
            }
            #border2 {
                width: 474px;
                height: 504px;
                background-color: #1C2B44;
                position: relative;
                top: -27px;
                left: 24px;
            }
            .border-inner-content {
                width: 526px;
                height: 500px;
                position: relative;
                top: 0px;
                left: -24px;
            }
            .data-content {
                height: 410px;

            }
        }

        .data-content .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
            width: 525px;
        }
        .data-content .el-tabs__item {
            width: 525px;
        }
    }
</style>
<template>
    <div class="right-top-table clearfix">
        <!--右侧数据-->
        <div class="daily-volume-table">
            <border-box>
                <div class="data-header-box">
                    <span class="title">实施成交价</span>
                    <div class="table-header-group">
                        <el-button icon="icon iconfont icon-fangda" @click="showPopupTable"></el-button>
                        <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                            <el-button icon="icon iconfont icon-question"></el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="data-content">
                    <el-tabs v-model="tabActive" type="card">
                        <!--<el-tab-pane label="螺纹钢" name="first"></el-tab-pane>
                        <el-tab-pane label="盘螺" name="third"></el-tab-pane>
                        <el-tab-pane label="热轧板卷" name="fourth"></el-tab-pane>-->
                        <el-tab-pane label="高线" name="second"></el-tab-pane>
                        <el-table :data="tempData" size="small" fit>
                            <el-table-column prop="pname" label="省份" width="61px"></el-table-column>
                            <el-table-column prop="city" label="城市" width="70px"></el-table-column>
                            <el-table-column prop="tradname" label="品名" width="85px"></el-table-column>
                            <el-table-column prop="standard" label="规格" width="70px"></el-table-column>
                            <el-table-column prop="material" label="材质" width="70px"></el-table-column>
                            <el-table-column prop="steelFactory" label="钢厂" width="95px"></el-table-column>
                            <el-table-column prop="price" label="价格" width="75px"></el-table-column>
                        </el-table>
                    </el-tabs>

                </div>
                <div class="footer-btn-group clearfix">
                    <div class="group-left">

                    </div>
                    <div class="group-center">
                        <el-button><i class="icon iconfont icon-left" @click="lastPage"></i></el-button>
                        <el-button><i class="icon iconfont icon-right" @click="nextPage"></i></el-button>
                    </div>
                    <div class="group-right">

                    </div>
                </div>
            </border-box>
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

    export default {
        name: 'RightTopTable',
        components: {BorderBox},
        props: [],
        data() {
            return {
                /*今日成交价的属性*/
                tabActive: 'first',
                priceDataAnalyze: [],
                tempData: [],
                priceFullData: [],
                priceFirstData:[],
                pricePage: 0, /*分页数据的页数*/
                clickPage: 0,//点击页码的次数


            }
        },
        beforeCreate() {
            ggdp.getAjax('/inter.ashx?action=bigscreen', (data) => {
                this.priceFullData = data.mx.Row.gx;

                /*计算页数，数组长度除以一页显示的条数，得到的数向上取整*/
                this.pricePage = Math.ceil(this.priceFullData.length / 10);
                /*储存分页数据*/
                for (let i = 0, j = 0; i < this.pricePage; i++) {
                    this.$set(this.priceFirstData, i, this.priceFullData.slice(j, j + 10))
                    j = j + 10;
                }
                this.tempData = this.priceFirstData[0];
            });

        },
        methods: {
            lastPage() {
                /*点击一次  clickPage增加一次*/
                 console.log(this.clickPage, this.pricePage);
                 if (this.clickPage == 0) {
                     this.$message('已经是第一页');
                     return;
                 }
                 if (this.clickPage < this.pricePage) {
                     this.tempData = this.priceFirstData[this.clickPage - 1];
                 }
                 this.clickPage--;
            },
            nextPage() {
                console.log(this.clickPage, this.pricePage);
                if (this.clickPage == this.pricePage - 1) {
                    this.$message('已经是最后一页');
                    return;
                }
                if (this.clickPage < this.pricePage) {
                    this.tempData = this.priceFirstData[this.clickPage + 1];
                }
                this.clickPage++;
            },
            showPopupTable: function () {
                /*let _this = this;
                _this.showDialogType2 = true;
                let map = setInterval(function () {
                    myChart = echarts.init(document.getElementById('popup-chart'));
                    myChart.setOption(_this.chartOption);
                    clearInterval(map);
                    myChart.on('click', function (param) {
                    });
                }, 1000)*/
            },
            dailyLineChart: function () {
                /*let _this = this;
                _this.showDailyVolumeLine = !_this.showDailyVolumeLine;
                let LineChart = echarts.init(document.getElementById('daily-line-chart'));
                LineChart.setOption(_this.dailyLineOptions);*/
            },
            dailyLineTable: function () {
                this.showDailyVolumeLine = false;
            },
            expandData: function () {
                console.log('展开');
            },
            popupLastPage() {
                /*点击一次  clickPage增加一次*/
                /*console.log(this.clickPopupPage, this.popupDataLength);
                if (this.clickPopupPage == 0) {
                    this.$message('已经是第一页');
                    return;
                }
                if (this.clickPopupPage < this.popupDataLength) {
                    this.tempPopupData = this.popupRealTime[this.clickPopupPage - 1];
                }
                this.clickPopupPage--;*/
            },
            popupNextPage() {
                console.log(this.clickPopupPage, this.popupDataLength);
                /*if (this.clickPopupPage == this.popupDataLength - 1) {
                    this.$message('已经是最后一页');
                    return;
                }
                if (this.clickPopupPage < this.popupDataLength) {
                    this.tempPopupData = this.popupRealTime[this.clickPopupPage + 1];
                }
                this.clickPopupPage++;*/
            },



        }

    }
</script>
