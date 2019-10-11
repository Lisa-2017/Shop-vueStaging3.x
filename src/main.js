import Vue from 'vue'
import App from './App.vue'
// 引入路由器
import router from './router'
import store from './store'

import Header from './components/Header/Header.vue'
// 引入Star
import Star from './components/Star/Star.vue'
// 引入mint-ui中的buttom
import { Button } from 'mint-ui';

// 引入vee-validtejs文件
import './vee-validate'
import './mock/mock-server'

// 引入CartControl组件
import CartControl from './components/CartControl/CartControl.vue'

// 引入vue-lazyload文件
import VueLazyload  from 'vue-lazyload'
// 引入loading图片
import loading from './common/images/loading.gif'

// 引入格式化日期的文件
import './filter'




// 图片懒加载-- 声明使用vue-lazyload
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  loading
  // attempt: 1
})

// 注册全局组件：方式二直接使用使用字符串代替CartControl.name，在组件中就不用指定name了
Vue.component('CartControl',CartControl)
Vue.component(Button.name, Button);
Vue.component(Star.name, Star)
// 注册全局组件（公共组件）
Vue.component(Header.name, Header)



// 设置控制的提示信息
Vue.config.productionTip = false

/* esllint-distable no-new */

// 创建实例对象
new Vue({
  el:'#app',
  components:{
    App   
  },
  template:'<App/>',
  router ,// 注册路由器
  store   // 注册仓库
})
