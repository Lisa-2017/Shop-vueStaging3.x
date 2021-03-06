// 引入mutation-types
import { RECEIVE_USER,RESET_USER,RECEIVE_TOKEN,RESET_TOKEN} from '../mutation-types'
// 引入api
import {reqAutoLogin } from '../../api'

const state={
  // 用户信息
  user:{},
  // token 标识
  token:localStorage.getItem('token_key')
}

const mutations={
  // 更新用户信息
  [RECEIVE_USER](state,user){
    state.user = user
  },
  // 重置用户信息
  [RESET_USER](state){
    state.user = {}
  },
  // 更新token
  [RECEIVE_TOKEN](state,token){
    state.token = token
  },
  // 重置token
  [RESET_TOKEN](state){
    state.token = ' '
  }
}
const actions={
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
    
    // 自动登陆
    async autoLogin({commit,state}){
      // 判断是否有token
      if(state.token){
        // 自动登录
        const result = await reqAutoLogin()
        const user = result.data
        commit(RECEIVE_USER,user)
      }
    }
}
const getters={}

export default{
  state,
  mutations,
  actions,
  getters
}