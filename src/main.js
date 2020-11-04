// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//3.路由
import router from './router'

//1.引入静态资源
import './assets/css/reset.css'

//2.引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//6.状态层
//抛出方式一的引入方式
import store  from './store/index.js'
//抛出方式二 的引入方式
// import {store}  from './store/index.js'



//全局组件,只是执行一下不要起名
import './components/index'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
