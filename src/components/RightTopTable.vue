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
        /*.numarrow {
            display: inline-block;
            width: 45px;
            text-align: left;
            i {
                margin-right: -2px;
                vertical-align: middle;
            }
        }*/
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
    .numarrow {
        display: inline-block;
        width: 35px;
        text-align: center;
        i {
            margin-right: -6px;
            vertical-align: middle;
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
            width: 133px;
        }
        .data-content .el-tabs__item {
            width: 131px;
        }
    }

    .table-inner-dialog {
        z-index: 999999;
        background: rgba(0, 0, 0, 0.8);
        .el-dialog {
            background: rgba(22, 45, 72, 0.9);
        }
        .el-dialog__title {
            color: white;
            font-weight: bold;
            text-align: center;
        }
        .el-dialog__body {
            padding: 10px 0 0 0 !important;
        }

    }
</style>
<template>
    <div class="right-top-table clearfix">
        <!--右侧数据-->
        <div class="daily-volume-table">
            <border-box>
                <div class="data-header-box">
                    <span class="title">实时成交价</span>
                    <div class="table-header-group">
                        <!--<el-button icon="icon iconfont icon-fangda" @click="showPopupTable"></el-button>-->
                        <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                            <el-button icon="icon iconfont icon-question"></el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="data-content">
                    <el-tabs v-model="tabActive" type="card">
                        <el-tab-pane label="螺纹钢" name="lwg"></el-tab-pane>
                        <el-tab-pane label="高线" name="gx"></el-tab-pane>
                        <el-tab-pane label="盘螺" name="pl"></el-tab-pane>
                        <el-tab-pane label="热轧板卷" name="rzbj"></el-tab-pane>
                        <el-table :data="tempData" size="small" fit @row-click="clickTableDialog">
                            <el-table-column prop="time" label="时间" width="50px">
                                <template slot-scope="scope">
                                    <span>{{scope.row.time.slice(5)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pname" label="省份" width="51px"></el-table-column>
                            <el-table-column prop="city" label="城市" width="55px"></el-table-column>
                            <el-table-column prop="tradname" label="品名" width="65px"></el-table-column>
                            <el-table-column prop="standard" label="规格" width="60px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="material" label="材质" width="60px"></el-table-column>
                            <el-table-column prop="steelFactory" label="钢厂" width="75px"></el-table-column>
                            <el-table-column prop="price" label="价格" width="55px"></el-table-column>
                            <el-table-column prop="rise" label="涨跌" width="55px">
                                <template slot-scope="scope">
                                        <span :class="scope.row.rise>0?'text-red numarrow':'text-green numarrow'">
                                            <i :class="riseIcon(scope.row.rise)"></i>
                                            {{mathAbs(scope.row.rise)}}
                                            <!--math.abs是取绝对值的函数-->
                                        </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tabs>
                </div>
                <div class="footer-btn-group clearfix">
                    <div class="group-left">

                    </div>
                    <div class="group-center">
                        <el-button><i class="icon iconfont icon-left" @click="lastPage(tabActive)"></i></el-button>
                        <el-button><i class="icon iconfont icon-right" @click="nextPage(tabActive)"></i></el-button>
                    </div>
                    <div class="group-right">

                    </div>
                </div>
            </border-box>
        </div>


        <!--点击表格 出现的弹出框-->
        <el-dialog :title="innerTableTitle" :visible.sync="tableDialogVisible" center width="700px" class="table-inner-dialog" :modal="false" :close-on-click-modal="false">
            <el-table :data="innerTable" size="small" fit>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="pname" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="tradname" label="品名"></el-table-column>
                <el-table-column prop="standard" label="规格"></el-table-column>
                <el-table-column prop="material" label="材质"></el-table-column>
                <el-table-column prop="steelFactory" label="钢厂"></el-table-column>
                <el-table-column prop="price" label="成交价"
                                 show-overflow-tooltip></el-table-column>
            </el-table>
        </el-dialog>


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
                /*弹出框*/
                tableDialogVisible: false,
                /*今日成交价的属性*/
                tabActive: 'lwg',
                tempData: [],

                /*高线*/
                gxFullData: [],
                gxLength: 0,
                gxClickPage: 0,
                gxShowPage: [],

                /*螺纹钢*/
                lwgFullData: [],
                lwgLength: 0,
                lwgClickPage: 0,
                lwgShowPage: [],

                /*盘螺*/
                plFullData: [],
                plLength: 0,
                plClickPage: 0,
                plShowPage: [],


                /*热轧板卷*/
                rzbjFullData: [],
                rzbjLength: 0,
                rzbjClickPage: 0,
                rzbjShowPage: [],


                priceDataAnalyze: [],
                priceFullData: [],
                priceFirstData: [],
                pricePage: 0, /*分页数据的页数*/
                clickPage: 0,//点击页码的次数

                innerTable: [],
                innerTableTitle: '',


            }
        },
        watch: {
            tabActive(val, oldval) {
                if (val == 'gx') {
                    this.tempData = this.gxShowPage[0];
                    this.gxClickPage = 0;
                }
                if (val == 'lwg') {
                    this.tempData = this.lwgShowPage[0];
                    this.lwgClickPage = 0;
                }
                if (val == 'pl') {
                    this.tempData = this.plShowPage[0];
                    this.plClickPage = 0;
                }
                if (val == 'rzbj') {
                    this.tempData = this.rzbjShowPage[0];
                    this.rzbjClickPage = 0;
                }
            }
        },
        mounted() {
            setInterval(() => {
                ggdp.getAjax('/inter.ashx?action=bigscreen', (data) => {
                    //第一版默认显示螺纹钢

                    /*螺纹钢*/
                    this.lwgFullData = data.mx.Row.lwg;
                    this.lwgLength = Math.ceil(this.lwgFullData.length / 10);
                    for (let i = 0, j = 0; i < this.lwgLength; i++) {
                        this.$set(this.lwgShowPage, i, this.lwgFullData.slice(j, j + 10))
                        j = j + 10;
                    }
                    this.tempData = this.lwgShowPage[0];


                    //高线
                    this.gxFullData = data.mx.Row.gx;
                    this.gxLength = Math.ceil(this.gxFullData.length / 10);
                    /*储存分页数据*/
                    for (let i = 0, j = 0; i < this.gxLength; i++) {
                        this.$set(this.gxShowPage, i, this.gxFullData.slice(j, j + 10))
                        j = j + 10;
                    }


                    /*盘螺*/
                    this.plFullData = data.mx.Row.pl;
                    this.plLength = Math.ceil(this.plFullData.length / 10);
                    for (let i = 0, j = 0; i < this.plLength; i++) {
                        this.$set(this.plShowPage, i, this.plFullData.slice(j, j + 10))
                        j = j + 10;
                    }

                    /*热轧板卷*/
                    this.rzbjFullData = data.mx.Row.rzbj;
                    this.rzbjLength = Math.ceil(this.rzbjFullData.length / 10);
                    for (let i = 0, j = 0; i < this.rzbjLength; i++) {
                        this.$set(this.rzbjShowPage, i, this.rzbjFullData.slice(j, j + 10))
                        j = j + 10;
                    }

                });
            }, 320000)
        },
        beforeCreate() {
            ggdp.getAjax('/inter.ashx?action=bigscreen', (data) => {
                //第一版默认显示螺纹钢

                /*螺纹钢*/
                this.lwgFullData = data.mx.Row.lwg;
                this.lwgLength = Math.ceil(this.lwgFullData.length / 10);
                for (let i = 0, j = 0; i < this.lwgLength; i++) {
                    this.$set(this.lwgShowPage, i, this.lwgFullData.slice(j, j + 10))
                    j = j + 10;
                }
                this.tempData = this.lwgShowPage[0];


                //高线
                this.gxFullData = data.mx.Row.gx;
                this.gxLength = Math.ceil(this.gxFullData.length / 10);
                /*储存分页数据*/
                for (let i = 0, j = 0; i < this.gxLength; i++) {
                    this.$set(this.gxShowPage, i, this.gxFullData.slice(j, j + 10))
                    j = j + 10;
                }


                /*盘螺*/
                this.plFullData = data.mx.Row.pl;
                this.plLength = Math.ceil(this.plFullData.length / 10);
                for (let i = 0, j = 0; i < this.plLength; i++) {
                    this.$set(this.plShowPage, i, this.plFullData.slice(j, j + 10))
                    j = j + 10;
                }

                /*热轧板卷*/
                this.rzbjFullData = data.mx.Row.rzbj;
                this.rzbjLength = Math.ceil(this.rzbjFullData.length / 10);
                for (let i = 0, j = 0; i < this.rzbjLength; i++) {
                    this.$set(this.rzbjShowPage, i, this.rzbjFullData.slice(j, j + 10))
                    j = j + 10;
                }

            });

        },
        methods: {
            mathAbs(val) {
                if (val == 0) {
                    return '---'
                }
                else {
                    return Math.abs(val);
                }
            },
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
            clickTableDialog(row) {
                ggdp.getAjax('/inter.ashx?action=allprice&time=' + row.time + '&city=' + row.city + '&trade=' + row.tradname, (data) => {
                    let infos = data.mx.Row;
                    let infoDatas = data.mx.Row.datas
                    this.innerTableTitle = infos.tradname + '实时成交价';
                    this.innerTable = infoDatas;
                    infoDatas.forEach((item)=> {
                        item.time = infos.time;
                        item.pname = infos.pname;
                        item.city = infos.city;
                        item.tradname = infos.tradname;
                    })
                    this.tableDialogVisible = true;
                });
            },
            lastPage(index) {
                if (index == 'gx') {
                    if (this.gxClickPage == 0) {
                        this.$message('已经是第一页');
                        return;
                    }
                    if (this.gxClickPage < this.gxLength) {
                        this.tempData = this.gxShowPage[this.gxClickPage - 1];
                    }
                    this.gxClickPage--;
                }
                if (index == 'lwg') {
                    if (this.lwgClickPage == 0) {
                        this.$message('已经是第一页');
                        return;
                    }
                    if (this.lwgClickPage < this.lwgLength) {
                        this.tempData = this.lwgShowPage[this.lwgClickPage - 1];
                    }
                    this.lwgClickPage--;
                }
                if (index == 'pl') {
                    if (this.plClickPage == 0) {
                        this.$message('已经是第一页');
                        return;
                    }
                    if (this.plClickPage < this.plLength) {
                        this.tempData = this.plShowPage[this.plClickPage - 1];
                    }
                    this.plClickPage--;

                }
                if (index == 'rzbj') {
                    if (this.rzbjClickPage == 0) {
                        this.$message('已经是第一页');
                        return;
                    }
                    if (this.rzbjClickPage < this.rzbjLength) {
                        this.tempData = this.rzbjShowPage[this.rzbjClickPage - 1];
                    }
                    this.rzbjClickPage--;
                }
            },
            nextPage(index) {
                if (index == 'gx') {
                    if (this.gxClickPage == this.gxLength - 1) {
                        this.$message('已经是最后一页');
                        return;
                    }
                    if (this.gxClickPage < this.gxLength) {
                        this.tempData = this.gxShowPage[this.gxClickPage + 1];
                    }
                    this.gxClickPage++;
                }
                if (index == 'lwg') {
                    if (this.lwgClickPage == this.lwgLength - 1) {
                        this.$message('已经是最后一页');
                        return;
                    }
                    if (this.lwgClickPage < this.lwgLength) {
                        this.tempData = this.lwgShowPage[this.lwgClickPage + 1];
                    }
                    this.lwgClickPage++;
                }
                if (index == 'pl') {
                    if (this.plClickPage == this.plLength - 1) {
                        this.$message('已经是最后一页');
                        return;
                    }
                    if (this.plClickPage < this.plLength) {
                        this.tempData = this.plShowPage[this.plClickPage + 1];
                    }
                    this.plClickPage++;

                }
                if (index == 'rzbj') {
                    if (this.rzbjClickPage == this.rzbjLength - 1) {
                        this.$message('已经是最后一页');
                        return;
                    }
                    if (this.rzbjClickPage < this.rzbjLength) {
                        this.tempData = this.rzbjShowPage[this.rzbjClickPage + 1];
                    }
                    this.rzbjClickPage++;
                }
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
