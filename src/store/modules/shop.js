// 引入mutation-types
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types'
// 引入api
import { reqGoods, reqRatings, reqInfo } from '../../api'
// 引入Vue
import Vue from 'vue'


const state = {
  // 点餐信息
  goods: [],
  // 评价信息
  ratings: [],
  // 商家信息
  info: {},
  // 存储的是购物车中的食物
  carFoods: []
}

const mutations = {
  // 更新点餐信息
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  // 更新商家信息
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },

  // 增加食品
  [ADD_FOOD_COUNT](state, { food }) {
    //判断count属性是否存在，不存在则创建响应式属性
    if (!food.count) {
      // Vue.set用于向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新(设置什么返回什么)
      Vue.set(food, 'count', 1)
      // food.count=1 这个不是响应式属性

      // 增加的食物 存放到购物车中carFoods
      state.carFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减少食品
  [REDUCE_FOOD_COUNT](state, { food }) {
    //判断，当食品数量大于0 的时候执行减的操作
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        // 点击减少按钮时，删除购物车中对应索引的食物
        state.carFoods.splice(state.carFoods.indexOf(food), 1)
      }
    }
  },

}

const actions = {
  // 获取点餐信息
  async getGoods({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 获取评价信息
  async getRatings({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },

  // 获取商家信息
  async getInfo({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },

  //食物的数量操作
  updateFoodCount({ commit }, { isAdd, food }) {
    //判断操作类型
    if (isAdd) {
      // 增加
      commit(ADD_FOOD_COUNT, { food })
    } else {
      //减少
      commit(REDUCE_FOOD_COUNT, { food })
    }
  }

}
const getters = {
  // 计算总数量
  totalCount(state) {
    return state.carFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 计算总价格
  totalPrice(state) {
    return state.carFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}