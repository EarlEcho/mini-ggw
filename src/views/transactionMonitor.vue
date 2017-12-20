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
        div{
            box-sizing: border-box;
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

            <!--左边数据-->
            <div class="left-data-wrapper">
                <!--左上方表格-->
                <left-top-table></left-top-table>

                <!--<left-bottom-table></left-bottom-table>-->
                <!--左下方的数据图-->
            </div>

        </div>
    </div>

</template>

<script>
    import RotateCricle from '@/components/rotateCricle'

    import LeftTopTable from '@/components/LeftTopTable'

    export default {
        name: '',
        components: {
            RotateCricle,
            LeftTopTable
        },
        props: [],
        data() {
            return {
                msg: 'hello vue'
            }
        },
        methods: {}
    }
</script>
