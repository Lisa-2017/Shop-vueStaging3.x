<template>
  <section class="msite">
    <!--首页头部-->
    <!-- <Header title="昌平区北七家宏福科技园(337省道北)"> -->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a 
            href="javascript:" 
            class="link_to_food"
            v-for="(category,index) in categorys"
            :key="index"
            >
              <div class="food_container">
                <!-- <img src="./images/nav/1.jpg" /> -->
                <img :src="`https://fuss10.elemecdn.com`+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>            
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>
<script>
// 引入ShopList组件
import ShopList from '../../components/ShopList/ShopList.vue'
// 引入Swiper
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

// 引入vuex 
 import { mapState } from 'vuex'
 
export default {
  components: {
    ShopList
  },
  computed: {
    // 从vuex中的state中获取数据
    // ...mapState(['address','categorys']),
    ...mapState({
      address:state=>state.msite.address,
      categorys:state=>state.msite.categorys
    }),
    /**
     * 每一屏展示8条数据
     * categorys---数组---16条数据
     * 界面显示多少个屏---要通过categorys来进行计算有多少屏
     * 显示多少个屏使用一个大数组来进行存储---bigArr-----2条
     * 每一个屏中显示多少条数据用一个小数组来进行存储---smallArr---8条
     * 大数组中应该存储两个小数组,每个小数组中有8条数据
    */

    categorysArr(){
      // 获取的是一个食品分类的数组(16条数据)
      const { categorys } = this
      // 存储的是多个小数组,小数组的个数决定了有多少页
      let bigArr = []
      let smallArr =[]
      // 遍历数据,进行大数组的装载数据
      categorys.forEach(category =>{
        // 如果小数组中没有数据,则把小数组添加到大数组中
        if(smallArr.length === 0){
          bigArr.push(smallArr)
        }
         // 向小数组中添加数据
         smallArr.push(category)
         // 判断,如果小数组中的数据的个数为8的时候,重新下一次的添加数据(小数组重新添加到大的数组中,小数组继续添加数据)
         if(smallArr.length ===8){
           smallArr = []
         }
      })
      return bigArr
    }
  },

  async mounted() {
    // 提交action---获取的商铺的信息
    this.$store.dispatch('getShops')
    // 提交action---获取的是食品分类信息
    await this.$store.dispatch('getCategorys')
    // 第三种 创建Swiper对象，实现轮播
    this.$nextTick(()=>{
      var mySwiper = new Swiper('.swiper-container', {
      autoplay:true,
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .star // 2x图 3x图
                    float left
                    font-size 0
                    .star-item
                      display inline-block
                      background-repeat no-repeat
                    &.star-48
                      .star-item
                        width 20px
                        height 20px
                        margin-right 22px
                        background-size 20px 20px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/stars/star48_on')
                        &.half
                          bg-image('./images/stars/star48_half')
                        &.off
                          bg-image('./images/stars/star48_off')
                    &.star-36
                      .star-item
                        width 15px
                        height 15px
                        margin-right 6px
                        background-size 15px 15px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/stars/star36_on')
                        &.half
                          bg-image('./images/stars/star36_half')
                        &.off
                          bg-image('./images/stars/star36_off')
                    &.star-24
                      .star-item
                        width 10px
                        height 10px
                        margin-right 3px
                        background-size 10px 10px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/stars/star24_on')
                        &.half
                          bg-image('./images/stars/star24_half')
                        &.off
                          bg-image('./images/stars/star24_off')
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(0.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(0.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(0.9)
                  color #666
                .segmentation
                  color #ccc
</style>