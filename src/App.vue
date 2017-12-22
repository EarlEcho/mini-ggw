<style lang="less">
    #app {
        width: 1920px;
        height: 1080px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        color: #2ca1f4;
    }

    .index-header {
        width: 100%;
        height: 130px;
        background-image: url(./assets/image/logo.png);
        background-repeat: no-repeat;
        background-size: 100%;
        box-sizing: border-box;
        div {
            box-sizing: border-box;
        }
        .el-menu--horizontal{
            border-bottom: none;
            background-color: transparent;
        }
        .el-menu--horizontal .el-menu-item {
            width: 115px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            background-color: #11213a;
            border: 2px solid #2ca1f4;
            border-bottom-color: #2ca1f4 !important;
            margin: 0 10px;
            -webkit-transform: skewX(44deg);
            transform: skewX(44deg);
            span {
                display: inline-block;
                -webkit-transform: skew(-44deg);
                vertical-align: top;
                line-height: 26px;
            }
        }
        .el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-menu-item:focus {
            background-color: #2ca1f4;
            color: white;
        }
        .el-menu--horizontal .el-menu-item.is-active {
            background-color: #2ca1f4;
            color: white;
        }
    }

    .header-left-menu {
        display: inline-block;
        position: relative;
        top: 72px;
        left: 200px;

    }

    .header-action-box {
        position: relative;
        top: 72px;
        right: 20px;
        display: inline-block;
        width: 550px;
        height: 40px;
        color: #007ccf;
        width: 550px;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        div {
            display: inline-block;
        }
        .header-timer {
            letter-spacing: 1px;
            margin-right: 20px;
        }
        .header-chooser {

        }
        .tool-group {

        }

    }

    .header-chooser-select {
        .el-input__inner {
            border: none;
            background: transparent;
            color: #007ccf;
            font-size: 14px;
        }
        .el-select > .el-input {
            display: inline-block;
            width: 57%;
        }
        .el-input__suffix {
            right: 18px;
            top: -2px;
        }
    }

    .el-select-dropdown, .el-popper {
        min-width: 120px !important;
    }

    .el-select-dropdown, .el-popper {
        border: none;
    }

    .el-popper[x-placement^="bottom"] .popper__arrow {
        border-bottom-color: transparent;
    }

    .dialog-fade-enter-active {
        -webkit-animation: dialog-fade-in 1.2s;
        animation: dialog-fade-in 1.2s
    }

    .dialog-fade-leave-active {
        -webkit-animation: dialog-fade-out 1.2s;
        animation: dialog-fade-out 1.2s
    }

    @-webkit-keyframes dialog-fade-in {
        0% {
            transform: scale(1.23);
            opacity: 0
        }
        100% {
            transform: scale(1);
            opacity: 1
        }
    }

    @keyframes dialog-fade-in {
        0% {
            transform: scale(1.23);
            opacity: 0
        }
        100% {
            transform: scale(1);
            opacity: 1
        }
    }

    @-webkit-keyframes dialog-fade-out {
        0% {
            transform: scale(1);
            opacity: 1
        }
        100% {
            transform: scale(1.23);
            opacity: 0
        }
    }

    @keyframes dialog-fade-out {
        0% {
            transform: scale(1);
            opacity: 1
        }
        100% {
            transform: scale(1.23);
            opacity: 0
        }
    }
</style>
<template>
    <div id="app">
        <!--系统的头部-->
        <div class="index-header clearfix">
            <el-menu :default-active="logoHeaderActive" mode="horizontal" class="header-left-menu" router="true"  @select="handleSelect">
                <el-menu-item index="/">
                    <span>
                        <img src="./assets/image/logobk.png" alt="" style="width: 26px;vertical-align: middle;">首页
                    </span>
                </el-menu-item>
                <el-menu-item index="/cloud-storage">
                    <span><i class="icon iconfont icon-tilewarehouse"></i>云仓储</span>
                </el-menu-item>
                <el-menu-item index="/transaction">
                    <span><i class="icon iconfont icon-chart"></i>交易监控</span>
                </el-menu-item>
            </el-menu>
            <div class="header-action-box g-rt">
                <span class="header-timer">{{nowDate | filterTime}}</span>
                <div class="header-chooser">监测间隔
                    <div class="header-chooser-select">
                        <el-select v-model="intervalValue" placeholder="请选择" size="mini">
                            <el-option
                                v-for="item in intervalOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value" width="80px">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span class="tool-group">
                    <i class="icon iconfont icon-yifu"></i>
                    <i class="icon iconfont icon-zhaopian"></i>
                    <i class="icon iconfont icon-windows"></i>
                </span>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'index-header',
        components: {},
        data() {
            return {
                logoHeaderActive: '/transaction',
                nowDate: new Date(),
                intervalValue: '1',
                intervalOptions: [{
                    value: '1',
                    label: '2分钟'
                }, {
                    value: '2',
                    label: '5分钟'
                }, {
                    value: '3',
                    label: '10分钟'
                }]
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.logoHeaderActive = key;
            }
        },
        mounted() {
            let path = this.$router.history.current.fullPath
            if (path == '/cloud-storage') {
                this.logoHeaderActive = '/cloud-storage';
            }
            if (path == '/transaction') {
                this.logoHeaderActive = '/transaction';
            }
            /*if (path == '/') {
                this.logoHeaderActive = '/';
            }*/
        },
        filters: {
            filterTime: function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
            }
        }
    }
</script>

