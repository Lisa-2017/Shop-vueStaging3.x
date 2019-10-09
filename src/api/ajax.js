import axios from 'axios'
// 引入qs
import qs from 'qs'
// 引入 store 
import store from '../store'
// 引入router
import router from '../router'
// 引入Toast
import {Toast} from 'mint-ui'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 获取methods和data
  const { method, data } = config
  // 判断method是不是POST，datas是不是对象（json格式）
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  // 判断当前接口中是否需要携带 token
  if(config.headers.needToken){
    // 需要token ,去vuex的state中取token
    const token = store.state.user.token
    if(!token){
      // 没有token,报错
      const error = new Error('没有token,请重新登录')
      error.status = 401 // 设定错误码
      throw error
    }else{
      //有token，则加入到请求头中
      config.headers['Authorization'] = token
    }
  }  

  return config
})

// 添加响应拦截
axios.interceptors.response.use(response => {
  return response.data
}, error=> {
  // 请求的错误 ---- 没有token--401
  if(!error.response){
    if(error.status === 401){
      // 判断当前的路由是不是login,不是就跳转到login
      if(router.currentRoute.path!=='/login'){
        Toast(error.message)
        // 跳转到login
        router.replace('/login')
      }
    }
  }else{
    //响应的时候token过期了，或者没有资源都会报错
    const status = error.response.status
    if(status===401){
      // 提示过期了
      Toast(error.response.data.message)
      // 重置用户信息
      store.dispatch('resetUser')
      // 重新登录--- 跳转到login
      router.replace('/login')
    }else if(status === 404){
      // 没有资源
      Toast('没有资源')
    }else{
      // 请求失败了
      Toast('请求错误'+error.message)
    }
  }

  // 



  // 中断错误消息
  return new Promise(()=>{})
})

// 向外暴露
export default axios