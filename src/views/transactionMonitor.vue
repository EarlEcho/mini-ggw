<!--交易监控-->
<style lang="less">
    .transaction-wrapper {
        width: 1920px;
        height: 950px;
        box-sizing: border-box;
        position: absolute;
    }

    #transaction-map {
        position: absolute;
        top: 0;
        left: 5%;
        z-index: 0;
        width: 90%;
        height: 96%;
        overflow: hidden;
    }

    .transaction-content {
        position: absolute;
        width: 200px;
        height: 200px;
    }

    .left-data-wrapper {
        position: absolute;
        left: 30px;
        top: 34px;
        width: 453px;
        height: 890px;
        overflow: hidden;
        float: left;
        div {
            box-sizing: border-box;
        }
    }

    .right-data-wrapper {
        position: absolute;
        z-index: 1;
        top: 34px;
        right: 30px;
        overflow: hidden;
        float: right;
    }

    .storage-main-infos {
        position: absolute;
        top: 35px;
        left: 700px;
        height: 55px;
        p {
            font-weight: bold;
            font-size: 18px;
            color: #F1951A;
            line-height: 25px;
        }
        span {
            color: #fff;
        }
    }

    .el-popover {
        padding: 0;
        border-radius: 0;
    }

    .map-click-chart {
        width: 650px;
        height: 390px;
        position: absolute;
        border: solid 1px #288ed9;
        top: 25%;
        left: 32%;
        background: rgba(22, 45, 72, 0.8);
        .title {
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: white;
            border-bottom: solid 1px #288ed9;
        }
        .chart-tabs {
            height: 35px;
            .el-tabs--card > .el-tabs__header {
                border-bottom: none;
            }
            .el-tabs--card > .el-tabs__header .el-tabs__nav {
                border: none;
            }
            .el-tabs__item {
                border: none;
                border-radius: 0;
                background: transparent;
                height: 34px;
                line-height: 34px;
                color: white;
                width: 299px;
                text-align: center;
                border-bottom: solid 1px #288ed9;
                &:first-child {
                    border-right: solid 1px #288ed9;
                }
            }
            .el-tabs__item.is-active {
                border-bottom: none;
            }

        }
    }

    .map-inner-charts {
        .el-dialog {
            background: rgba(22, 45, 72, 0.9);
        }
        .el-dialog__header {
            color: white;
            font-weight: bold;
            margin: 0 0 10px;
        }
        .el-dialog__body {
            padding: 10px 0;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__nav {
            border: none;
        }
        .el-tabs__item {
            width: 325px;
            text-align: center;
            color: white;
        }
        .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
            border: none;
            background-color: #2CA1F4;
            color: white;
        }
        .el-tabs--card > .el-tabs__header {
            border: none;
        }
    }
</style>
<template>
    <div>
        <!--底部旋转动画-->
        <rotate-cricle></rotate-cricle>
        <div class="transaction-wrapper">
            <!--!&#45;&#45;最底部的旋转动画&ndash;&gt;-->

            <bottom-gloab></bottom-gloab>
            <!--中间底部的旋转球体-->
            <div id="transaction-map">
                <!--中间的地图-->
            </div>

            <div class="storage-main-infos">
                <!--<p>今日已成交<span>{{transactionDatas.}}</span>笔，累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>万元</p>
                <p>已发布成交价信息<span>{{transactionDatas.}}</span>条，价格指数信息<span>{{transactionDatas.}}</span>条</p>-->
                <p>今日待出库数量<span>{{transactionDatas.wck}}</span>吨，已出库数量<span>{{transactionDatas.yck}}</span>吨</p>
                <p>累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>元</p>
                <!--<p>已发布成交价信息<span>{{transactionDatas.}}</span>条，价格指数信息<span>{{transactionDatas.}}</span>条</p>-->
            </div>
            <el-button size="small" @click="showFourTables">{{switchBtnText}}</el-button>
            <!--左边数据-->


            <div class="left-data-wrapper" v-if="showFourItem">
                <!--左上方表格-->
                <left-top-table></left-top-table>

                <left-bottom-table></left-bottom-table>
                <!--左下方的数据图-->
            </div>

            <!--右侧数据-->
            <div class="right-data-wrapper clearfix" v-if="showFourItem">
                <!--右上方的数据-->
                <right-top-table></right-top-table>

                <!--右下方的数据-->
                <right-bottom-table></right-bottom-table>
            </div>

            <!--点击地图的弹出框-->

            <el-dialog :visible.sync="showMapChart" width="650px" top="17%" center class="map-inner-charts">
                <template slot="title">
                    {{mapInnerArea}}地区交易及价格信息
                </template>
                <div class="chart-tabs">
                    <el-tabs v-model="mapType" type="card">
                        <el-tab-pane label="价格指数分析" name="first"></el-tab-pane>
                        <el-tab-pane label="价格信息分析" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="checkbox-wrapper clearfix">
                    <el-radio-group v-model="mapInnerMonther" class="g-rt">
                        <el-radio :label="1">1月</el-radio>
                        <el-radio :label="3">3月</el-radio>
                        <el-radio :label="6">6月</el-radio>
                    </el-radio-group>
                </div>
                <div id="map-innner-chart" style="width: 100%;height: 260px;" ref="mapInnerChart">

                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import ggdp from '@/functions/common'

    /*引入地图的经纬度文件*/
    import chinaPoint from '@/functions/chinaPoint'
    // 按需引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    import china from 'echarts/map/js/china.js';
    import RotateCricle from '@/components/rotateCricle'

    /*4个表格 懒加载*/
    const LeftTopTable = () => import('@/components/LeftTopTable');
    const LeftBottomTable = () => import('@/components/LeftBottomTable');
    const RightTopTable = () => import('@/components/RightTopTable');
    const RightBottomTable = () => import('@/components/RightBottomTable');

    const BottomGloab = () => import('@/components/bottomGloab');

    let innerChart;

    export default {
        name: '',
        components: {
            RotateCricle,
            LeftTopTable,
            LeftBottomTable,
            RightTopTable,
            RightBottomTable,
            BottomGloab
        },
        props: [],
        data() {
            return {
                //是否显示4个模块表格
                showFourItem: false,
                switchBtnText: '显示表格',
                /*地图弹出框*/


                //点击地图打开的曲线图
                //月份选项
                mapInnerMonther: 1,
                //城市选项
                mapInnerArea: '',
                //折线图的类型
                mapType: 'first',


                showMapChart: false,
                /*位于地图上方的交易数据概述*/
                transactionDatas: {
                    /*未出库，已出库，总交易金额，总交易量*/
                    wck: '',
                    yck: '',
                    zjyje: '',
                    zjyl: ''
                },
                series: [],
                fromdata: '西安',
                BJData: [
                    [{
                        name: '西安'
                    }, {
                        name: '乌鲁木齐',
                        value: 100
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '拉萨',
                        value: 70
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '西宁',
                        value: 30
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '银川',
                        value: 30
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '兰州',
                        value: 30
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '包头',
                        value: 30
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '成都',
                        value: 10
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '重庆',
                        value: 80
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '贵阳',
                        value: 55
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '长沙',
                        value: 90
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '太原',
                        value: 90
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '昆明',
                        value: 90
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '贵阳',
                        value: 90
                    }]
                ],
                chartOption: {
                    backgroundColor: '#172f4b',
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        left: '0',
                        right: '10px',
                        top: '5px',
                        bottom: '0',
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
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            margin: 5,
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
                        name: '规格1',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(137, 189, 27, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(137, 189, 27, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)'
                            }
                        },
                        data: [],
                    }]
                },
            }
        },
        watch: {
            //http://219.144.217.162:8085/inter.ashx?action=timemark&timemark=1&proname=陕西
            mapType(val, oldval) {
                console.log(val, oldval);
                let _this = this;
                if (val == 'first') {
                    //价格指数分析的接口
                    let url = '/inter.ashx?action=getexponent&timemark=' + this.mapInnerMonther + '&proname=' + this.mapInnerArea;
                    ggdp.getAjax(url, (data) => {
                        // console.log(data);
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                            _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                            _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                            _this.$message('请稍等，数据切换中...');
                            setTimeout(function () {
                                if (innerChart == '' || typeof(innerChart) == 'undefined') {
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption, true);
                                } else {
                                    innerChart.dispose();
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption);
                                }
                            }, 1000);
                        }
                    });

                } else {
                    //价格信息分析的接口
                    let url = '/inter.ashx?action=timemark&timemark' + this.mapInnerMonther + '&proname=' + this.mapInnerArea;
                    ggdp.getAjax(url, (data) => {
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                            _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                            _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                            _this.$message('请稍等，数据切换中...');
                            setTimeout(function () {
                                if (innerChart == '' || typeof(innerChart) == 'undefined') {
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption, true);
                                } else {
                                    innerChart.dispose();
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption);
                                }
                            }, 1000);
                        }
                    });
                }


            },

            ////点击地图打开的曲线图
            //月份选项
            // mapInnerMonther: 1,
            // //城市选项
            // mapInnerArea: '',
            // //折线图的类型
            // mapType: 'first',

            mapInnerMonther(val, oldval) {
                console.log(val, val);
                let _this = this;
                if (_this.mapType == 'first') {
                    //价格指数分析的接口
                    let url = '/inter.ashx?action=getexponent&timemark=' + val + '&proname=' + this.mapInnerArea;
                    ggdp.getAjax(url, (data) => {
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                            _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                            _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                            _this.$message('请稍等，数据切换中...');
                            setTimeout(function () {
                                if (innerChart == '' || typeof(innerChart) == 'undefined') {
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption, true);
                                } else {
                                    innerChart.dispose();
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption);
                                }
                            }, 1000);
                        }
                    });

                } if(_this.mapType == 'second') {
                    //价格信息分析的接口
                    let url = '/inter.ashx?action=timemark&timemark' + val + '&proname=' + this.mapInnerArea;
                    ggdp.getAjax(url, (data) => {
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                            _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                            _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                            _this.$message('请稍等，数据切换中...');
                            setTimeout(function () {
                                if (innerChart == '' || typeof(innerChart) == 'undefined') {
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption, true);
                                } else {
                                    innerChart.dispose();
                                    innerChart = echarts.init(_this.$refs.mapInnerChart);
                                    innerChart.setOption(_this.chartOption);
                                }
                            }, 1000);
                        }
                    });
                }
            }
        },
        methods: {
            showFourTables() {
                if (!this.showFourItem) {
                    this.showFourItem = true;
                    this.switchBtnText = '隐藏表格';
                } else {
                    this.showFourItem = false;
                    this.switchBtnText = '显示表格';
                }

            },
            convertData(data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let dataItem = data[i];
                    let fromCoord = chinaPoint[dataItem[0].name];
                    let toCoord = chinaPoint[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name, toName: dataItem[1].name, coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            },
            mapClickEvent(param) {
                // let _this = this;
                //
                // let url = '';  //请求的url
                // let getType = ''; //价格指数分析还是价格信息分析
                // let area = param.name;  //点击区域
                //
                // url = '/inter.ashx?action=getexponent&timemark=' + _this.mapInnerMonther + '&proname=' + param.name;
                // ggdp.getAjax(url, (data) => {
                //     console.log(data);
                //     _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                //     _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                //     _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                //     _this.mapInnerArea = data.mx.Row.pname;
                // });
                //
                // this.showMapChart = true;
                // setTimeout(function () {
                //     innerChart = echarts.init(document.getElementById('map-innner-chart'));
                //     innerChart.setOption(_this.chartOption);
                // }, 1000);


            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('transaction-map'));
                let _this = this;
                myChart.on('click', function (param) {

                    let url = '/inter.ashx?action=getexponent&timemark=' + _this.mapInnerMonther + '&proname=' + param.name;
                    ggdp.getAjax(url, (data) => {
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            if (data.mx.Row.datas.dates == '') {
                                _this.$message('数据为空');
                                return;
                            }
                            _this.chartOption.xAxis.data = data.mx.Row.datas.dates;
                            _this.chartOption.series[0].data = data.mx.Row.datas.lwg;
                            _this.chartOption.series[0].name = data.mx.Row.datas.tips.lwgtip;
                            _this.mapInnerArea = data.mx.Row.pname;
                            _this.showMapChart = true;
                            setTimeout(function () {
                                innerChart = echarts.init(document.getElementById('map-innner-chart'));
                                innerChart.setOption(_this.chartOption);
                            }, 1000);
                        }
                    });
                    /*if (this.showMapChart) {
                        this.showMapChart = false;
                    } else {
                        if (param.componentType == 'geo') {
                            _this.mapClickEvent(param);
                        }
                    }*/
                });

                // 绘制图表
                myChart.setOption({
                    color: ['#fc5353', '#f4fc6c', '#e68b55', '#9a68ff', '#ff60c5'],
                    visualMap: {
                        min: 1000,
                        max: 5000,
                        calculable: true,
                        right: '32%',
                        bottom: '6%',
                        zlevel: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            if (params.value) {
                                return params.name + ' : ' + params.value[2];
                            } else {
                                return params.name;
                            }
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'horizontal',
                        left: '50',
                        top: '10',
                        data: ['高线'],
                        textStyle: {
                            color: '#ffffff'
                        },
                        icon: 'circle',
                    },
                    geo: {
                        map: 'china',
                        zlevel: 10,
                        layoutCenter: ['48%', '50%'],
                        roam: true,
                        layoutSize: "100%",
                        zoom: 1.08,
                        itemStyle: {
                            normal: {
                                color: '#062031',
                                borderWidth: 1.1,
                                borderColor: '#43D0D6'
                            },
                            emphasis: {
                                areaColor: '#43D0D6'
                            }
                        }

                    },
                    series: this.series,
                });
            },
            convertData2(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = chinaPoint[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            }
        },
        created() {
            /*此处获取地图上方的交易数据概述*/
            ggdp.getAjax('/inter.ashx?action=statistics', (data) => {
                this.transactionDatas = data;
            });

            let _this = this;
            /*绘制地图*/
            [[_this.fromdata, _this.BJData]].forEach(function (item, i) {
                _this.series.push(
                    {
                        name: '高线',
                        type: 'scatter',
                        zlevel: 20,
                        color: '#f00',
                        coordinateSystem: 'geo',
                        data: _this.convertData2([
                            {name: "章丘", value: 45},
                            {name: "肇庆", value: 46},
                            {name: "大连", value: 47},
                            {name: "临汾", value: 47},
                            {name: "吴江", value: 47},
                            {name: "石嘴山", value: 49},
                            {name: "沈阳", value: 50},
                            {name: "苏州", value: 50},
                            {name: "茂名", value: 50},
                            {name: "嘉兴", value: 51},
                            {name: "长春", value: 51},
                            {name: "胶州", value: 52},
                            {name: "银川", value: 52},
                            {name: "张家港", value: 52},
                            {name: "三门峡", value: 53},
                            {name: "锦州", value: 54},
                            {name: "南昌", value: 54},
                            {name: "柳州", value: 54},
                            {name: "三亚", value: 54},
                            {name: "自贡", value: 56},
                            {name: "吉林", value: 56},
                            {name: "阳江", value: 57},
                            {name: "泸州", value: 57},
                            {name: "西宁", value: 57},
                        ]),
                        symbolSize: 10,
                        itemStyle: {
                            normal: {color: '#f00'}
                        }

                    },
                    {
                        type: 'lines',
                        zlevel: 15,
                        effect: {
                            show: true, period: 4, trailLength: 0, symbol: 'arrow', symbolSize: 7,
                        },
                        lineStyle: {
                            normal: {width: 1.2, opacity: 0.6, curveness: 0.2, color: '#F19000'}
                        },
                        data: _this.convertData(item[1])
                    },
                    //出发点
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 15,
                        rippleEffect: {
                            period: 4, brushType: 'stroke', scale: 4
                        },
                        symbol: 'circle',
                        symbolSize: function (val) {
                            return 4 + val[2] / 10;
                        },
                        itemStyle: {
                            normal: {show: true, color: '#FA4D41'}
                        },
                        data: [{
                            name: _this.fromdata, value: chinaPoint[item[0]].concat([100]),
                        }],
                    },
                    /*到达点*/
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        rippleEffect: {
                            period: 4, brushType: 'stroke', scale: 4
                        },
                        zlevel: 15,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 15,
                        itemStyle: {
                            normal: {
                                color: '#F19000'
                            }
                        },
                        data: item[1].map(function (dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: chinaPoint[dataItem[1].name].concat([dataItem[1].name]),
                                tooltip: {
                                    formatter: dataItem[0].name + "--" + dataItem[1].name + "：" + dataItem[1].value
                                }
                            };
                        }),
                    }
                );
            });
            let map = setInterval(function () {
                _this.drawLine();
                clearInterval(map);
            }, 500)
        },

    }
</script>
