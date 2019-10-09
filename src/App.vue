<template>
<div>
  <router-view></router-view>
  <FooterNav v-show="$route.meta.isShowFooter"/>
</div>
</template>
<script>
// 引入FooterNav.vue组件
import FooterNav from './components/FooterNav/FooterNav.vue'


// 引入接口
// import { reqAddress, reqCategorys, reqShops } from "./api"
export default {
 name: 'App',
 components: {
  FooterNav
 },
 mounted () {
   this.$store.dispatch('getAddress')
   this.$store.dispatch('autoLogin')
  //  this.$store.dispatch('getCategorys')
  //  this.$store.dispatch('getShops')
 }
/* async mounted() {
    // 地址信息
    const result1 = await reqAddress("116.36867", "40.10038");
    const result2 = await reqCategorys();
    const result3 = await reqShops({ longitude: "116.36867", latitude: "40.10038" });
    console.log(result1)
    console.log(result2)
    console.log(result3)
  } */
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>