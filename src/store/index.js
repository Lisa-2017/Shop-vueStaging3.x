import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 引入msite模块
import msite from './modules/msite.js'
import user from './modules/user.js'
import shop from './modules/shop.js'


Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    msite,
    user,
    shop
  }
})