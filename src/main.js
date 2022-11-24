import Vue from 'vue'
Vue.config.productionTip = false
// 引入 element ui
import 'element-ui/lib/theme-chalk/index.css'


import App from './App.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import router from './router'

// 引入Swiper样式
import "swiper/dist/css/swiper.css";

// 引入 vuescroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll);

// 引入图片查看器
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

// 引入仓库
import store from './store'

// 引入自制样式
import './assets/base.css'
//title修改
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    // 兼容firefox
    document.documentElement.scrollTop = 0
    // 兼容safari
    window.pageYOffset = 0
    // 鼠标点击
    if (to.meta.title) {
        document.title = to.meta.title;
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

