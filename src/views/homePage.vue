<!--首页-->
<style scoped lang="less">

</style>
<template>
    <div class="index-wrapper">
        首页
    </div>
</template>

<script>
    import ggdp from '@/functions/common'

    export default {
        name: '',
        components: {},
        props: [],
        data() {
            return {
                msg: 'hello vue'
            }
        },
        mounted(){
            /*ggdp.getAjax('/dbapi/price/timemark?timemark=1&proname=%E9%99%95%E8%A5%BF', (data) => {
                console.log(data);
            });*/
        },
        methods: {}
    }
</script>
