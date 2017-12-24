<!--云仓储-->
<style lang="less">
    .cloud-wrapper {
        width: 1920px;
        height: 920px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        padding: 35px 35px 0 35px;
        .el-table th {
            padding: 6px 0;
        }

        .el-table td {
            padding: 3px 0;
        }
        .el-table td, .el-table th.is-leaf {
            border-bottom: 3px solid #172f4b;
        }
        .el-table__body, .el-table__footer, .el-table__header {
            border-bottom: 3px solid #172f4b;
        }
        .cloud-left-wrapper {
            width: 322px;
            height: 885px;
            float: left;
            margin-right: 30px;
            .border-box {
                width: 320px;
                height: 260px;
                background-color: #1C2B44;
                border: solid 2px #96E6EC;
                margin-bottom: 23px;
                position: static;
                #border1 {
                    width: 325px;
                    height: 210px;
                    background-color: #1C2B44;
                    position: relative;
                    top: 22px;
                    left: -3px;
                }
                #border2 {
                    width: 270px;
                    height: 265px;
                    background-color: #1C2B44;
                    position: relative;
                    top: -25px;
                    left: 28px;
                }
                .border-inner-content {
                    width: 325px;
                    height: 264px;
                    position: relative;
                    top: 1px;
                    left: -27px;
                    .data-list-item {
                        height: 170px;
                        font-size: 14px;
                        font-weight: bold;
                        .inner-span {
                            color: #cccccc;
                            padding: 0 5px;
                        }
                        .el-row {
                            padding: 0 10px;
                        }
                    }
                    .dark-item {
                        height: 31px;
                        line-height: 31px;
                    }
                    .light-item {
                        height: 31px;
                        line-height: 31px;
                    }
                    &:last-child {
                        margin-bottom: 0px;
                    }
                }
            }

        }
        .cloud-right-wrapper {
            width: 1492px;
            height: 885px;
            border: solid 1px white;
            float: left;
        }
    }
</style>
<template>
    <div class="cloud-wrapper">
        <div class="cloud-left-wrapper">
            <border-box>
                <data-header-box item-title="云仓储数据" :expand-popup="true"></data-header-box>
                <div class="data-list-item">
                    <el-row v-for="(item,index) in homeLeftDatas.storeData" :key="index"
                            :class=" index%2==0?'dark-item':'light-item'">
                        <el-col :span="9" class="right">
                            {{item.title}}：
                        </el-col>
                        <el-col :span="15" class="right">
                            <span class="inner-span"> {{item.num}}</span>吨
                        </el-col>
                    </el-row>
                </div>
            </border-box>

            <border-box>
                <data-header-box item-title="云仓储待作业" :expand-popup="true"></data-header-box>
                <div class="data-list-item">
                    <el-row v-for="(item,index) in homeLeftDatas.notStoreData" :key="index"
                            :class="index%2==0?'dark-item':'light-item'">
                        <el-col :span="6">
                            {{item.title}}:<span class="inner-span">{{item.titleNum}}</span>
                        </el-col>
                        <el-col :span="3" class="right">
                            重量:
                        </el-col>
                        <el-col :span="8" class="right">
                            <span class="inner-span"> {{item.weight}}</span>吨
                        </el-col>
                        <el-col :span="6" :push="1" class="left">
                            预警:<span class="text-red"> {{item.warn}}</span>
                        </el-col>
                    </el-row>
                </div>
            </border-box>


            <border-box>
                <data-header-box item-title="集团库存数量" :expand-popup="true"></data-header-box>
                <div class="data-list-item">
                    <el-row v-for="(item,index) in homeLeftDatas.groupStoreData" :key="index"
                            :class=" index%2==0?'dark-item':'light-item'">
                        <el-col :span="9" class="right">
                            {{item.title}}：
                        </el-col>
                        <el-col :span="15" class="right">
                            <span class="inner-span"> {{item.num}}</span>吨
                        </el-col>
                    </el-row>
                </div>
                <!--<data-footer-box :left-item="false" :center-item="false"></data-footer-box>-->
            </border-box>
        </div>
        <div class="cloud-right-wrapper">

        </div>
    </div>
</template>

<script>
    import ggdp from '@/functions/common'
    import DataHeaderBox from '@/components/ToolTop'

    import BorderBox from '@/components/BoderCompontents'

    export default {
        name: '',
        components: {
            DataHeaderBox,
            BorderBox
        },
        props: [],
        data() {
            return {
                homeLeftDatas: {
                    storeData: [{
                        title: '今日入库量',
                        num: '0'
                    }, {
                        title: '出库量',
                        num: '0'
                    }, {
                        title: '本月入库量',
                        num: '0'
                    }, {
                        title: '出库量',
                        num: '0'
                    }, {
                        title: '实时静态库存',
                        num: '0'
                    }],
                    notStoreData: [{
                        title: '入库',
                        titleNum: '0',
                        weight: '0',
                        warn: '0'
                    }, {
                        title: '出库',
                        titleNum: '0',
                        weight: '0',
                        warn: '0'
                    }, {
                        title: '加工',
                        titleNum: '0',
                        weight: '0',
                        warn: '0'
                    }, {
                        title: '收费',
                        titleNum: '0',
                        weight: '0',
                        warn: '0'
                    }, {
                        title: '车皮',
                        titleNum: '0',
                        weight: '0',
                        warn: '0'
                    }],
                    groupStoreData: [{
                        title: '今日入库量',
                        num: '0'
                    }, {
                        title: '出库量',
                        num: '0'
                    }, {
                        title: '本月入库量',
                        num: '0'
                    }, {
                        title: '出库量',
                        num: '0'
                    }, {
                        title: '实时静态库存',
                        num: '0'
                    }]
                },
            }
        },
        beforeCreate() {
            /*1、云仓储数据*/
            ggdp.getAjax('/inter.ashx?action=wstorage', (data) => {
                let storageData = data.Data;
                this.homeLeftDatas.storeData[0].num = storageData.FTodayIn;  //今日入库量
                this.homeLeftDatas.storeData[1].num = storageData.FTodayOut;  //今日出库量
                this.homeLeftDatas.storeData[2].num = storageData.FMonthIn;  //本月入库量
                this.homeLeftDatas.storeData[3].num = storageData.FMonthOut;  //本月出库量
                this.homeLeftDatas.storeData[4].num = storageData.FNowStrage;  //实时静态库存
            });


            /*云仓储待作业*/
            ggdp.getAjax('/inter.ashx?action=processed', (data) => {
                let processData = data.Data;
                /*入库*/
                this.homeLeftDatas.notStoreData[0].titleNum = processData.FInCount;  //入库单数量
                this.homeLeftDatas.notStoreData[0].weight = processData.FInWeight;  //入库重量
                this.homeLeftDatas.notStoreData[0].warn = processData.FInALCount;  //入库单预警数量

                /*出库*/
                this.homeLeftDatas.notStoreData[1].titleNum = processData.FOutCount;  //出库单数量
                this.homeLeftDatas.notStoreData[1].weight = processData.FOutWeight;  //出库重量
                this.homeLeftDatas.notStoreData[1].warn = processData.FOutALCount;  //出库单预警数量

                /*加工*/
                this.homeLeftDatas.notStoreData[2].titleNum = processData.FMhCount;  //加工单数量
                this.homeLeftDatas.notStoreData[2].weight = processData.FMhWeight;  //加工重量
                this.homeLeftDatas.notStoreData[2].warn = processData.FMhALCount;  //加工单预警数量

                /*收费*/
                this.homeLeftDatas.notStoreData[3].titleNum = processData.FChCount;  //收费单数量
                this.homeLeftDatas.notStoreData[3].weight = processData.FChWeight;  //收费重量
                this.homeLeftDatas.notStoreData[3].warn = processData.FChALCount;  //收费单预警数量

                /*车皮*/
                this.homeLeftDatas.notStoreData[4].titleNum = processData.FTkCount;  //车皮单数量
                this.homeLeftDatas.notStoreData[4].weight = processData.FTkWeight;  //车皮重量
                this.homeLeftDatas.notStoreData[4].warn = processData.FTkALCount;  //车皮单预警数量

            });


            /*集团库存数据*/
            ggdp.getAjax('/inter.ashx?action=stack', (data) => {
                let stackData = data;
                this.homeLeftDatas.groupStoreData[0].num = stackData.jrrk;  //今日入库量
                this.homeLeftDatas.groupStoreData[1].num = stackData.jrck;  //今日出库量
                this.homeLeftDatas.groupStoreData[2].num = stackData.byljrk;  //本月入库量
                this.homeLeftDatas.groupStoreData[3].num = stackData.byljck;  //本月出库量
                this.homeLeftDatas.groupStoreData[4].num = stackData.ssjtkc;  //实时静态库存

                /*
                * groupStoreData: [{
                        title: '今日入库量',
                        num: '1564584.4'
                    }, {
                        title: '出库量',
                        num: '12485.7'
                    }, {
                        title: '本月入库量',
                        num: '3598444.2'
                    }, {
                        title: '出库量',
                        num: '254874.9'
                    }, {
                        title: '实时静态库存',
                        num: '545645.4'
                    }]
                * */

            });

        },
        methods: {}
    }
</script>
