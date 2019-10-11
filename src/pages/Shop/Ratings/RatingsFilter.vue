<template>
  <div class="ratings-filter">
    <div class="rating-type bottom-border-1px">
      <span class="block" :class="{active:selectState===0}"  @click="selectState=0">
        全部<span class="count">1</span>
      </span>
      <span class="block " :class="{active:selectState===1}" @click="selectState=1">
        推荐<span class="count">1</span>
      </span>
      <span class="block" :class="{active:selectState===2}" @click="selectState=2">
        吐槽<span class="count">0</span>
      </span>
    </div>
    <div class="switch" :class="{on:onlyText}" @click="toggle">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'RatingsFilter',
  data () {
    return {
      selectState:0
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../../common/stylus/mixins.styl"

  .ratings-filter
    .rating-type
      padding: 18px 0
      margin: 0 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>

