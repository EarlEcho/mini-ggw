<!--交易监控-->
<style lang="less">
    .red-point {
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        margin-right: 4px;
    }

    .blue-point {
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 10px;
        background: #2ca1f4;
        border-radius: 50%;
        margin-right: 4px;
    }

    .transaction-wrapper {
        width: 1920px;
        height: 950px;
        box-sizing: border-box;
        position: absolute;
        .popup-table {
            height: 100%;
        }
        .popup-title {
            font-size: 28px;
            color: white;
            text-align: center;
            line-height: 30px;
        }
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

</style>
<template>
    <div>
        <!--底部旋转动画-->
        <rotate-cricle></rotate-cricle>
        <div class="transaction-wrapper">
            <!--!&#45;&#45;最底部的旋转动画&ndash;&gt;-->
            <bottom-gloab :fout-table-event="tableClickEvent"></bottom-gloab>
            <!--中间底部的旋转球体-->
            <div id="transaction-map">
                <!--中间的地图-->
            </div>
            <div class="storage-main-infos">
                <!--<p>今日已成交<span>{{transactionDatas.}}</span>笔，累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>万元</p>
                <p>已发布成交价信息<span>{{transactionDatas.}}</span>条，价格指数信息<span>{{transactionDatas.}}</span>条</p>-->
                <p>今日待出库吨数<span>{{transactionDatas.wck}}</span>，已出库吨数<span>{{transactionDatas.yck}}</span></p>
                <p>累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>元</p>
                <!--<p>已发布成交价信息<span>{{transactionDatas.}}</span>条，价格指数信息<span>{{transactionDatas.}}</span>条</p>-->
            </div>
            <!--<el-button size="small" @click="showFourTables">{{switchBtnText}}</el-button>-->
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

            <div class="popup-table">
                <div class="expand-dialog">
                    <el-dialog :visible.sync="showMapChart" width="1486px" top="100px" :modal="false" center>
                        <border-box>
                            <p class="tooltip">
                                <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
                                    <el-button icon="icon iconfont icon-wenhao"></el-button>
                                </el-tooltip>
                            </p>
                            <p class="popup-title">{{mapInnerArea}}地区成交价分析</p>
                            <div class="temp-gap-w">

                            </div>

                            <div id="map-innner-chart" style="width: 100%;height: 670px;" ref="mapInnerChart">

                            </div>

                        </border-box>
                    </el-dialog>
                </div>

            </div>
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
    import BorderBox from '@/components/BoderCompontents'

    let innerChart;

    export default {
        name: '',
        components: {
            RotateCricle,
            LeftTopTable,
            LeftBottomTable,
            RightTopTable,
            RightBottomTable,
            BottomGloab,
            BorderBox
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
                mapType: 'second',
                mapLineNum: 1,


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
                        name: '乌鲁木齐'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '拉萨'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '西宁'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '银川'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '兰州'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '包头'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '成都'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '重庆'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '贵阳'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '长沙'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '太原'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '昆明'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '贵阳'
                    }],
                    [{
                        name: '西安'
                    }, {
                        name: '广东'
                    }]
                ],
                chartOption: {
                    backgroundColor: '#1C2B44',
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
                        data: ['高线', '螺纹钢','盘螺','热轧板卷'],
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
                        name: '规格1',
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
                                    offset: 1,
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
                        name: '规格1',
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
                                    color: 'rgba(67, 208, 214, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(67, 208, 214, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(67, 208, 214)',
                                borderColor: 'rgba(67, 208, 214,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: []
                    }, {
                        name: '规格1',
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

                                color: 'rgb(0, 136, 212)',
                                borderColor: 'rgba(0, 136, 212,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: []
                    },  {
                        name: '规格1',
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
                                    color: 'rgba(241, 149, 261, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(241, 149, 26, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: 'rgb(241, 149, 26)',
                                borderColor: 'rgba(241, 149, 26,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: []
                    }]
                },
            }
        },
        methods: {
            tableClickEvent() {
                if (!this.showFourItem) {
                    this.showFourItem = true;
                } else {
                    this.showFourItem = false;
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
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('transaction-map'));
                let _this = this;
                myChart.on('click', function (param) {
                    let url = '/inter.ashx?action=timemark&timemark=' + 1 + '&proname=' + param.name;
                    ggdp.getAjax(url, (data) => {
                        if (data.mx.Row.errno == 2) {
                            _this.$message(data.mx.Row.errmsg);
                        } else {
                            if (data.mx.Row.datas.dates == '') {
                                _this.$message('数据为空');
                                return;
                            }
                            let item = _this.chartOption.series;
                            _this.chartOption.xAxis[0].data = data.mx.Row.datas.dates;
                            if (data.mx.Row.datas.lwg) {
                                item[0].data = data.mx.Row.datas.lwg;
                                item[0].name = data.mx.Row.datas.tips.lwgtip;
                            } else {
                                item[0].data = [];
                                item[0].name = [];
                            }

                            if (data.mx.Row.datas.gx) {
                                item[1].data = data.mx.Row.datas.gx;
                                item[1].name = data.mx.Row.datas.tips.gxtip;
                            }
                            else {
                                item[1].data = [];
                                item[1].name = [];
                            }

                            if (data.mx.Row.datas.pl) {
                                item[2].data = data.mx.Row.datas.pl;
                                item[2].name = data.mx.Row.datas.tips.pltip;
                            } else {
                                item[2].data = [];
                                item[2].name = [];
                            }

                            if (data.mx.Row.datas.rzbj) {
                                item[3].data = data.mx.Row.datas.rzbj;
                                item[3].name = data.mx.Row.datas.tips.rzbjtip;
                            }
                            else {
                                item[3].data = [];
                                item[3].name = [];
                            }
                            //省份
                            _this.mapInnerArea = data.mx.Row.pname;
                            _this.showMapChart = true;
                            setTimeout(function () {
                                innerChart = echarts.init(document.getElementById('map-innner-chart'));
                                innerChart.setOption(_this.chartOption);
                            }, 1000);
                        }
                    });
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
                        left: '27%',
                        top: '5%',
                        data: ['高线'],
                        textStyle: {
                            color: '#ffffff'
                        },
                        icon: 'circle',
                    },
                    geo: {
                        map: 'china',
                        zlevel: 10,
                        layoutCenter: ['48%', '43%'],
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
                let res = [];
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
        mounted() {
            //每5分钟刷新一次数据
            let _this = this;
            setInterval(() => {
                /*地图 散点图*/
                ggdp.getAjax('/inter.ashx?action=getfinalprice', (data) => {
                    [[_this.fromdata, _this.BJData]].forEach(function (item, i) {
                        _this.series.push(
                            {
                                name: '西安',
                                type: 'scatter',
                                zlevel: 20,
                                color: '#f00',
                                coordinateSystem: 'geo',
                                data: _this.convertData2(data.mapPointData),
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
                                    normal: {show: false}
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
                                        show: false
                                    }
                                },
                                tooltip: {
                                    show: false,
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

                });
                /*此处获取地图上方的交易数据概述*/
                ggdp.getAjax('/inter.ashx?action=statistics', (data) => {
                    this.transactionDatas = data;
                });
                /*绘制地图*/
                let map = setInterval(function () {
                    _this.drawLine();
                    clearInterval(map);
                }, 1500);

            }, 300000)
        },
        beforeMount() {
            let _this = this;
            /*地图 散点图*/
            ggdp.getAjax('/inter.ashx?action=getfinalprice', (data) => {
                [[_this.fromdata, _this.BJData]].forEach(function (item, i) {
                    _this.series.push(
                        {
                            name: '西安',
                            type: 'scatter',
                            zlevel: 20,
                            color: '#f00',
                            coordinateSystem: 'geo',
                            data: _this.convertData2(data.mapPointData),
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
                                normal: {show: false}
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
                                    show: false
                                }
                            },
                            tooltip: {
                                show: false,
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

            });
            /*此处获取地图上方的交易数据概述*/
            ggdp.getAjax('/inter.ashx?action=statistics', (data) => {
                this.transactionDatas = data;
            });

            /*绘制地图*/

            let map = setInterval(function () {
                _this.drawLine();
                clearInterval(map);
            }, 1500)
        },

    }
</script>
