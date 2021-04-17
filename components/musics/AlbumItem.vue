<template>
    <div class="album_item">
      <a-tooltip title="苦中作乐 | 下班的路上我们都在听什么歌">
      <div class="cover">
        <img src="https://qpic.y.qq.com/music_cover/YaotUQb3PpgJEcxCTJ8J4TicT1HbHibs6CzjZICLJAGFI9ic6tk99iaEIw/300" alt="">
        <nuxt-link to="/" no-prefetch class="cover_link">
        </nuxt-link>
        <div class="bottom"> 
          <a-icon type="customer-service" />
          <span class="second_rate">20608</span>
        </div>
      </div>
      </a-tooltip>
      <p class="name line_texts">苦中作乐 | 下班的路上我们都在听什么歌</p>
      <p class="author line_texts">by<span class="author_name">GNC顾念晨</span></p>
      <div class="tips" v-if="iscollection"><span class="txt">收藏于：3-19</span>
        <a-dropdown :trigger="['click','hover']">
          <div class="hanle"><a-icon type="more" /></div>
          <a-menu slot="overlay">
              <a-menu-item key="0">
              取消收藏
              </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
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
.album_item{
    width: 140px;
    p{
      margin: 0;
    }
    .name{
      font-size: 14px;
      color: #000;
    }
    .author{
      font-size: 12px;
      display: flex;
      .author_name{
        color: #333;
        font-size: 12px;
        margin-left: 4px;
      }
    }
    .tips{
      position: relative;
      .txt{
        font-size: 12px;
        margin-top: 4px;
        color: #97a2ab;
      }
      .hanle{
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
    }
    .cover{
      width: 140px;
      height: 140px;
      position: relative;
      display: flex;
      img{
        width: 140px;
        height: 140px;
      }
      .cover_link{
        width: 140px;
        height: 140px;
        position: absolute;
        top: 0;
        left: 0;
        background: url(/img/coverall.png) no-repeat;
        background-position: 0 0;
      }
      .bottom{
        width: 100%;
        height: 27px;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #ccc;
        background: url(/img/coverall.png) no-repeat;
        background-position: 0 -537px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        .second_rate{
          margin-left: 4px;
          font-size: 12px;
        }
      }
    }
  }
</style>