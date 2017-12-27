import App from './App'
import router from './router'

/*引入elementUI的样式文件*/
require('../theme/index.css');

require('@/assets/css/reset.css');
require('@/assets/css/common.less');
require('@/assets/css/iconfont.css');

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

router.beforeEach((to, from, next) => {
    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})

