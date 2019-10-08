// 包含了多个状态数据的对象(对象中定义需要共享或者改变的数据)
export default {
  // 经度
  longitude: '116.36867',
  // 纬度
  latitude: '40.10038',
  // 地址信息---对象
  address: {},
  // 视频分类--- 数组
  categorys: [],
  // 商铺信息---数组
  shops: [],
  // 用户信息
  user:{},
  // token 标识
  token:localStorage.getItem('token_key')
}