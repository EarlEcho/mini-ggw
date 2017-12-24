<!--云仓储-->
<style  lang="less">
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
                            padding: 0 8px;
                        }
                        .el-row {
                            padding: 0 15px;
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
            border: solid 1px red;
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
                        <el-col :span="4" class="right">
                            重量:
                        </el-col>
                        <el-col :span="6" class="right">
                            <span class="inner-span"> {{item.num}}</span>吨
                        </el-col>
                        <el-col :span="5" :push="3" class="left">
                            预警:<span class="red"> {{item.warn}}</span>
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
                    }],
                    notStoreData: [{
                        title: '入库',
                        titleNum: '22',
                        num: '232',
                        warn: '2'
                    }, {
                        title: '出库',
                        titleNum: '12',
                        num: '1231',
                        warn: '3'
                    }, {
                        title: '加工',
                        titleNum: '17',
                        num: '33',
                        warn: '1'
                    }, {
                        title: '收费',
                        titleNum: '2',
                        num: '432',
                        warn: '10'
                    }, {
                        title: '车皮',
                        titleNum: '41',
                        num: '18',
                        warn: '9'
                    }],
                    groupStoreData: [{
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
                },
            }
        },
        methods: {}
    }
</script>
