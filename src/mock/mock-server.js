import Mock from 'mockjs'
import data from './data.json'

//拦截ajax请求，生成随机的数据
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/ratings',{code:0,data:data.ratings})
Mock.mock('/info',{code:0,data:data.info})
