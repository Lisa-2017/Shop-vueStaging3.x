// 包含了多个直接修改状态数据的方法的对象
// 引入mutation-types文件
import { RECEIVE_ADDRESS, RECEIVE_CATEGORY, RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_TOKEN,RESET_TOKEN} from './mutation-types'
export default {
  // 更新地址 
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  // 更新食品分类
  [RECEIVE_CATEGORY](state,categorys){
    state.categorys = categorys
  },

  //更新商铺信息
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
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
    state.token = '   '
  }
}