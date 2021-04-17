<template>
    <div class="video_item">
    <a-tooltip title="伍六七之玄武国篇">
        <div class="cover">
        <img src="https://puui.qpic.cn/vcover_vt_pic/0/mzc00200y9i58mv1611116313905/350" alt="">
        </div>
    </a-tooltip>
    <div class="line_texts title" >伍六七之玄武国篇</div>
    <div class="line_texts info">最强首席，开启奇险之旅！ </div>
        <a-dropdown :trigger="['click','hover']" v-if="iscollection">
        <div class="hanle"><a-icon type="more" /></div>
        <a-menu slot="overlay">
            <a-menu-item key="0">
            取消收藏
            </a-menu-item>
        </a-menu>
        </a-dropdown> 
        <div class="tips" v-if="iscollection">收藏于：3-19</div>
    </div>
</template>

<script>
export default {
  props:{
    ItemObj:{
      type:Object,
      default:()=>{
          return{
               width: "680px"
          }
      }
    },
    iscollection:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="scss" scoped>
.line_texts {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video_item{
    width: 198px;
    height: 335px;
    cursor: pointer;
    position: relative;
      .tips{
      font-size: 12px;
      margin-top: 4px;
      color: #97a2ab;
    
    }
    .cover{
      width: 198px;
      height: 277px;
      border-radius: 6px;
      overflow: hidden;
    }
    .hanle{
      position: absolute;
      right: 2px;
      bottom: 17px;
    }
    img{
      width: 198px;
      height: 277px;
      display: block;
    }
    .title{
      font-size: 15px;
      font-weight: 700;
      margin-top: 4px;
      &:hover{
        color: #00a1d6;
      }
    }
    .info{
      font-size: 12px;
      color: #999;
    }
  }
</style>