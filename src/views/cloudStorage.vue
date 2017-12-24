<!--云仓储-->
<style scoped lang="less">
    .cloud-wrapper{
        border: solid 1px red;
        width: 1920px;
        height: 950px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        padding: 0 35px;
        .cloud-left-wrapper{
            width: 322px;
            height: 914px;
            border: solid 1px red;
            float: left;
            margin-right: 30px;
        }
        .cloud-right-wrapper{
            width: 1492px;
            height: 914px;
            border: solid 1px red;
            float: left;
        }
    }
</style>
<template>
    <div class="cloud-wrapper">
        <div class="cloud-left-wrapper">

        </div>
        <div class="cloud-right-wrapper">

        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: [],
        data() {
            return {
                msg: 'hello vue'
            }
        },
        methods: {}
    }
</script>
