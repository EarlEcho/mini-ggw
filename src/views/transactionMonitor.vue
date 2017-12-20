<!--交易监控-->
<style scoped lang="less">
    .transaction-wrapper {
        width: 1920px;
        height: 950px;
        box-sizing: border-box;
        border: solid 1px red;
        position: absolute;
    }

    #transaction-map {
        position: absolute;
        top: 0;
        left: 5%;
        z-index: 0;
        width: 90%;
        height: 96%;
        border: solid 1px red;
        overflow: hidden;
    }

    .transaction-content {
        position: absolute;
        width: 200px;
        height: 200px;
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
            <div class="transaction-content">
                hhhhhhhhhhhhhhhhhhhhh
            </div>
        </div>
    </div>

</template>

<script>
    const RotateCricle = () => import('@/components/rotateCricle')
    export default {
        name: '',
        components: {
            RotateCricle
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
