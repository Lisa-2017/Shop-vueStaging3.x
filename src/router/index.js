import Vue from 'vue'
// 引入Vue-Router
import VueRouter from 'vue-router'
// 引入 routes
import routes from './routes.js'
// 声明使用
Vue.use(VueRouter)

// 向外暴露路由器对象
export default new VueRouter({
  mode:'history',
  routes
})