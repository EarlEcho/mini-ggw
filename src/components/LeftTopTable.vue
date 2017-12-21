<style lang="less">
    .left-top-table {
        display: flex;
        .el-table__body, .el-table__footer, .el-table__header {
            border-bottom: 5px solid #172f4b;
        }
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
            border-bottom: 4px solid #172f4b;
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

        .popup-bottom-wrapper {
            width: 33%;
            display: inline-block;
            height: 100%;
        }
        .w {
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
            height: 550px;
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
        }
        .group-center {

        }
        .group-right {
            float: right;

        }

    }


</style>
<template>
    <!--
    fphm          销售组织
ywrq          业务日期
dhkh          订货客户
jyjg          交易价格
cjsl          成交数量
wzgg          物资规格
wzpm           物资品名
wzcd           物资产地
wzck           仓库
khsf            省份
djzt          状态
dcks        待出库吨数

    -->


    <div class="left-top-table" v-cloak>
        <!--实时交易数据的表格-->
        <div class="w">
            <border-box>
                <div class="data-header-box">
                    <span class="title">{{tableTitle}}</span>
                </div>
                <div class="data-content">
                    <el-table :data="tempData" size="small" fit>
                        <el-table-column prop="date" label="时间" width="40px" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="area" label="地区" width="50px"></el-table-column>
                        <el-table-column prop="company" label="公司" width="79px"></el-table-column>
                        <el-table-column prop="type" label="品种" width="75px"></el-table-column>
                        <el-table-column prop="standard" label="规格" width="55px"></el-table-column>
                        <el-table-column prop="num" label="数量" width="50px"></el-table-column>
                        <el-table-column prop="price" label="单价" width="51px"></el-table-column>
                        <el-table-column prop="allCount" label="总价" width="53px"></el-table-column>
                    </el-table>
                </div>
                <div class="footer-btn-group clearfix">
                    <div class="group-left">
                        <el-button><i class="icon iconfont icon-left"></i></el-button>
                        <el-button><i class="icon iconfont icon-right"></i></el-button>
                    </div>
                    <div class="group-center">
                        <el-button><i class="icon iconfont icon-left" @click="lastPage"></i></el-button>
                        <el-button><i class="icon iconfont icon-right" @click="nextPage"></i></el-button>
                    </div>
                    <div class="group-right">
                        <el-button><i class="icon iconfont icon-left"></i></el-button>
                        <el-button><i class="icon iconfont icon-right"></i></el-button>
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
    //    require('echarts/lib/chart/pie');
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
                tableTitle: '实时交易数据',
                showTableBox2: false,
                tempData: [
                    {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'
                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '15870',
                        price: '354',
                        allCount: '1320001'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'

                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'
                    }, {
                        date: '11.30',
                        area: '成都',
                        company: '某某公司',
                        type: '一类',
                        standard: '1#',
                        num: '12',
                        price: '354',
                        allCount: '13213'
                    }
                ],
                realTimeFullData: [],
                realTimeData: []
            }
        },
        mounted() {
            ggdp.getAjax('/inter.ashx?action=transaction', (data) => {
                /*将获取到的数据赋值给realTimeFullData储存*/
                this.realTimeFullData = data.mx.Row;
                /*计算页数，数组长度除以一页显示的条数，得到的数向上取整*/
                let realDataPage = Math.ceil(this.realTimeFullData.length / 9);

                /*储存分页数据*/
                for (let i = 0, j = 0; i < realDataPage; i++) {
                    this.realTimeData[i] = this.realTimeFullData.slice(j, j + 9);
                    j = j + 9;
                }
                console.log(this.realTimeData);
            });
        },
        methods: {
            lastPage() {
                console.log('上一页');
                /*1：*/
            },
            nextPage() {
                console.log('下一页');
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
