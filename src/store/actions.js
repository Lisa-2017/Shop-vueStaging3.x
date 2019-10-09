// 包含了多个间接修改状态数据的方法的对象
// 引入mutation-types
import { RECEIVE_ADDRESS, RECEIVE_CATEGORY, RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_TOKEN,RESET_TOKEN, RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO } from './mutation-types'
// 引入api
import { reqAddress, reqCategorys, reqShops,reqAutoLogin, reqGoods, reqRatings, reqInfo } from '../api'

export default {
  //  发送请求获取地址信息
  async getAddress({ state, commit }) {
    // 获取参数(经纬度信息)
    const { longitude, latitude } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      //向mutations提交
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 发送请求获取食品分类信息
  async getCategorys({ commit },cb) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORY, categorys)
      typeof cb==='function'&&cb()
    }
  },
  // 发送请求获取商铺信息
  async getShops({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqShops({ longitude, latitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 保存用户信息
  saveUser({commit},user){
    // 取出token
    const token = user.token
    // 保存在vuex中
    commit(RECEIVE_TOKEN,token)
    // 保存在localStorage中
    localStorage.setItem('token_key',token)
    // 删除user中的token
    delete user.token
    commit(RECEIVE_USER,user)
  },
  // 重置用户信息
  resetUser({commit}){
    commit(RESET_USER)
    // 重置token
    commit(RESET_TOKEN)
    // 删除localStorage中的token
    localStorage.removeItem('token_key')
  },
  
  async autoLogin({commit,state}){
    // 判断是否有token
    if(state.token){
       // 自动登录
      const result = await reqAutoLogin()
      const user = result.data
      commit(RECEIVE_USER,user)
    }
  },

  // 获取点餐信息
  async getGoods({commit}){
    const result = await reqGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
    }
  },
  // 获取评价信息
  async getRatings({commit}){
    const result = await reqRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  // 获取商家信息
  async getInfo({commit}){
    const result = await reqInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  }



}