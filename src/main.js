import Vue from 'vue'
import App from './App.vue'
// 引入路由器
import router from './router'
import store from './store'

import Header from './components/Header/Header.vue'
// 引入Star
import Star from './components/Star/Star.vue'

// 引入vee-validtejs文件
import './vee-validate'

// 引入mint-ui中的buttom
import { Button } from 'mint-ui';

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
    App,
   
  },
  template:'<App/>',
  router ,// 注册路由器
  store   // 注册仓库
})
