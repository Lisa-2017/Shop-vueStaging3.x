// 引入mutation-types
import { RECEIVE_ADDRESS, RECEIVE_CATEGORY, RECEIVE_SHOPS} from '../mutation-types'
// 引入api
import { reqAddress, reqCategorys, reqShops } from '../../api'
const state={
  // 经度
  longitude: '116.36867',
  // 纬度
  latitude: '40.10038',
  // 地址信息---对象
  address: {},
  // 视频分类--- 数组
  categorys: [],
  // 商铺信息---数组
  shops: []
}
const mutations={
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
  }
}
const actions={
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
  }
}
const getters={}

export default{
  state,
  mutations,
  actions,
  getters
}