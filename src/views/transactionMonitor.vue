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
                <p>今日待出库数量<span>{{transactionDatas.wck}}</span>吨，已出库数量累计<span>{{transactionDatas.yck}}</span>吨</p>
                <p>累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>元</p>
                <!--<p>已发布成交价信息<span>{{transactionDatas.}}</span>条，价格指数信息<span>{{transactionDatas.}}</span>条</p>-->
            </div>
            <!--左边数据-->
            <div class="left-data-wrapper">
                <!--左上方表格-->
                <left-top-table></left-top-table>

                <left-bottom-table></left-bottom-table>
                <!--左下方的数据图-->
            </div>

            <!--右侧数据-->
            <div class="right-data-wrapper clearfix">
                <!--右上方的数据-->
                <right-top-table></right-top-table>

                <!--右下方的数据-->
                <right-bottom-table></right-bottom-table>
            </div>

            <!--点击地图的弹出框-->
            <el-popover popper-class="map-click-chart" transition="el-zoom-in-center" v-model="showMapChart"
                        ref="popover5"
                        placement="top">
                <div class="title">
                    XX地区交易及价格信息
                </div>
                <div class="chart-tabs">
                    <el-tabs v-model="chartActive" type="card">
                        <!--<el-tab-pane label="交易数据分析" name="first"></el-tab-pane>-->
                        <el-tab-pane label="价格信息分析" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="checkbox-wrapper clearfix">
                    <!--<el-radio-group v-model="radioValue1">
                        <el-radio :label="3">按量</el-radio>
                        <el-radio :label="6">按金额</el-radio>
                        <el-radio :label="9">按品种</el-radio>
                    </el-radio-group>-->
                    <el-radio-group v-model="radioValue2" class="g-rt">
                        <el-radio :label="3">1月</el-radio>
                        <el-radio :label="6">3月</el-radio>
                        <el-radio :label="9">6月</el-radio>
                    </el-radio-group>
                </div>
                <div id="map-innner-chart" style="width: 100%;height: 260px;">

                </div>

            </el-popover>

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

    /*4个表格*/
    import LeftTopTable from '@/components/LeftTopTable'
    import LeftBottomTable from '@/components/LeftBottomTable'
    import RightTopTable from '@/components/RightTopTable'
    import RightBottomTable from '@/components/RightBottomTable'

    const BottomGloab = () => import('@/components/bottomGloab');


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
                /*地图弹出框*/
                chartActive: 'first',
                radioValue1: 3,
                radioValue2: 3,
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
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
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
                        data: ["3080", "4000", 0, 0, "3300", "3000.05", "3070", 0, "3090", "3040.00", "3040", "3050", 0, 0, 0, "3373.00", "3073.00", "3250", "2999", "3250", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "3250", "3350.00", 0, "3350", "3350", 0, "3350", "3350", "3350", "3471.00", "3472.11", "3472.11", "3488", "3511", "3555", "3555", 0, 0, 0, "3533", "3533", 0, "3566", "3566", "3566", "3400", "3400", 0, "3400"]
                    }, {
                        name: '规格2',
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
                                    color: 'rgba(0, 136, 212, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(0, 136, 212, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,136,212)'
                            }
                        },
                        data: ["3090", "3080", "3950.1", "3987.3", "3907.3", "3020.05", "3010", "3090", "3080", "3030.00", "3030", "3030", 0, 0, 0, "3353.00", "3053.00", "3500", "3583", "3500", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "3500", "3600.00", 0, "3600", "3600", 0, "3600", "3600", "3600", "3721.00", "3722.11", "3722.11", "3700", "4212", "3555", "3555", 0, 0, 0, "3555", "3555", 0, "3555", "3555", "3555", "3555", "3555", 0, "3555"]
                    }, {
                        name: '规格3',
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
                                    color: 'rgba(219, 50, 51, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(219, 50, 51, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(219,50,51)'
                            }
                        },
                        data: ["3060", "3050", "3800.1", "3837.3", "3757.3", "3010.5", "3040", "3060", "3100", "3050.00", "3050", "3050", 0, 0, 0, "3373.00", "3073.00", "3600", "3603", "3600", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "3600", "3700.00", 0, "3700", "3700", 0, "3700", "3700", "3700", "3821.00", "3822.11", "3822.11", "3500", "4111", "3555", "3555", 0, 0, 0, "3555", "3555", 0, "3555", "3555", "3555", "3580", "3580", 0, "3580"]
                    },]
                },
            }
        },
        methods: {
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
            mapClickEvent() {
                let innerChart;
                let _this = this;
                if (this.showMapChart) {
                    this.showMapChart = false;

                } else {
                    this.showMapChart = true;
                    setTimeout(function () {
                        innerChart = echarts.init(document.getElementById('map-innner-chart'));
                        innerChart.setOption(_this.chartOption);
                    }, 500);
                }


            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('transaction-map'));
                let _this = this;
                myChart.on('click', function (param) {
                    console.log(param)
                    if (param.componentType == 'geo') {
                        _this.mapClickEvent();
                    }
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
                        trigger: 'item'
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
                    legened: {
                        data: ['高线', '螺纹钢', 'XXX'],
                        dataPoints: {
                            data1: [{name: "章丘", value: 45}, {name: "肇庆", value: 45}],
                            data2: [{name: "章丘", value: 45}, {name: "肇庆", value: 45}],
                            data3: [{name: "章丘", value: 45}, {name: "肇庆", value: 45}]
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
                        /*label: {
                            emphasis: {
                                show: true,
                                formatter: '{b}: {c}'
                            }
                        },*/
                        zlevel: 10,
                        layoutCenter: ['48%', '50%'],
                        roam: true,
                        layoutSize: "110%",
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
