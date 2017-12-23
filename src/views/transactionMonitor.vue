<!--交易监控-->
<style scoped lang="less">
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
        left: 530px;
        width: 460px;
        height: 55px;
        p {
            font-weight: bold;
            font-size: 17px;
            color: #F1951A;
            line-height: 25px;
        }
        span {
            color: #fff;
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
                <p>今日未出库数量<span>{{transactionDatas.wck}}</span>吨，已出库数量累计<span>{{transactionDatas.yck}}</span>吨</p>
                <p>累计<span>{{transactionDatas.zjyl}}</span>吨，交易金额<span>{{transactionDatas.zjyje}}</span>万元</p>
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
                /*位于地图上方的交易数据概述*/
                transactionDatas: {
                    /*未出库，已出库，总交易金额，总交易量*/
                    wck: '',
                    yck: '',
                    zjyje: '',
                    zjyl: ''
                },
                series: [],
                fromdata: '北京',
                BJData: [
                    [{
                        name: '北京'
                    }, {
                        name: '上海',
                        value: 100
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '广州',
                        value: 70
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '葫芦岛',
                        value: 30
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '成都',
                        value: 30
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '哈尔滨',
                        value: 30
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '鄂尔多斯',
                        value: 30
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '银川',
                        value: 10
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '拉萨',
                        value: 80
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '西安',
                        value: 55
                    }],
                    [{
                        name: '北京'
                    }, {
                        name: '乌鲁木齐',
                        value: 90
                    }]
                ],
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
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('transaction-map'));
                /*
                                myChart.on('click', function (param) {
                                    console.log(param)
                                    if (param.componentType == 'geo') {
                                        this.mapClickEvent();
                                    }
                                });*/

                // 绘制图表
                myChart.setOption({
                    visualMap: {
                        min: 1000,
                        max: 5000,
                        calculable: true,
                        right: '32%',
                        bottom: '6%',
                        zlevel: 10,
                        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {show: true}
                        },
                        zlevel: 10,
                        layoutCenter: ['46%', '52.4%'],
                        roam: true,
                        layoutSize: "108%",
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
                            normal: {show: true, position: 'right', offset: [5, 0], formatter: '{b}'}
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
                                value: chinaPoint[dataItem[1].name].concat([dataItem[1].name])
                            };
                        }),
                        /*markPoint 表示  高亮点*/
                        /*markPoint: {  symbol: 'circle',  symbolSize: 6,  label: {      normal: {          show: false      }  },  itemStyle: {      normal: {          color: 'red'      },      emphasis: {          color: 'red'      }  },  data: [      {          name: '广东',          value: 10,          coord: [113.23, 23.16]      }, {          name: '深圳',          coord: [114.07, 22.62]      }, {          name: '成都',          coord: [102.56, 30.92]      }, {          name: '南京',          coord: [118.78, 32.04]      }, {          name: '兰州',          coord: [103.73, 35.03]      }, {          name: '武汉',          coord: [114.31, 30.5]      }, {          name: '义乌',          coord: [120.06, 29.32]      }, {          name: '抚顺',          coord: [123.97, 41.97]      }, {          name: '拉萨',          coord: [91.11, 30.97]      }, {          name: '曲靖',          coord: [103.79, 25.51]      }, {          name: '嘉峪关',          coord: [98.289152, 39.77313]      }, {          name: '张家口',          coord: [114.87, 40.82]      }, {          name: '铜川',          coord: [109.11, 35.09]      }  ]
                         }*/
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
