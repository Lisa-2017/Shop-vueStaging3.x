import ajax from './ajax.js'
// http://localhost:5000/position/40.10038,116.36867
// const BASE = 'http://localhost:5000' ===>（客户端访问的端口号8080，服务端端口号5000） 会有跨域问题
const BASE = '/api'
// 获取地址信息
export const reqAddress = (longitude, latitude)=> ajax.get(BASE+`/position/${latitude},${longitude}`)

// 获取食品分类信息-- get在对象内部指定
export const reqCategorys = ()=>ajax({
  method:'GET',
  url:BASE+`/index_category`
})

// 获取商铺信息
export const reqShops = ({longitude, latitude}) => ajax({
  method:'GET',
  url:BASE+`/shops`,
  params:{
    longitude,
    latitude
  }
})