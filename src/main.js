// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 移动端适配rem
import 'lib-flexible/flexible.js'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 动画类
import './css/animate.css'
// 清除样式
import './css/reset.css'
import './css/global.css'
// icon图标
import './css/iconfont.js'
//引入vuex
import store from './store'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// var options={
//   fullscreenEl:false //关闭全屏按钮
// }

// Vue.use(vuePhotoPreview,options)

Vue.config.productionTip = false

Vue.use(MintUI);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
