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

        </div>
    </div>

</template>

<script>
    import ggdp from '@/functions/common'
    import RotateCricle from '@/components/rotateCricle'

    import LeftTopTable from '@/components/LeftTopTable'
    import LeftBottomTable from '@/components/LeftBottomTable'


    export default {
        name: '',
        components: {
            RotateCricle,
            LeftTopTable,
            LeftBottomTable
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
            }
        },
        beforeCreate() {
            /*此处获取地图上方的交易数据概述*/
            ggdp.getAjax('/inter.ashx?action=statistics', (data) => {
                this.transactionDatas = data;
            });
        },
        methods: {}
    }
</script>
