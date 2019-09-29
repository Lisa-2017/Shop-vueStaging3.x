import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
// 注册全局公共组件
Vue.component(Header.name, Header)

Vue.config.productionTip = false

/* esllint-distable no-new */
new Vue({
  el:'#app',
  components:{
    App,
   
  },
  template:'<App/>',
  router
})
