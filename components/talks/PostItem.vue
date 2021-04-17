<template>
  <div class="postitem" :style="ItemObj">
    <div class="item_content">
      <p class="title line_texts">
        19岁独立游戏制作人：做游戏是我对抗这个世界的方式。
      </p>
      <div class="ctx">
        <p class="brief line_texts">
          “我是雪狼工作室的创始人，也是《Warmerica》的主策划、主程序和主美术。”朱恒介绍自己只用了这么一句话。但他今年只有19岁。
        </p>
        <a-dropdown :trigger="['click','hover']" v-if="iscollection">
        <div class="hanle"><a-icon type="more" /></div>
        <a-menu slot="overlay">
            <a-menu-item key="0">
            {{hanletext}}
            </a-menu-item>
        </a-menu>
        </a-dropdown> 
      </div>
      <div class="info">
        <div class="avatar"></div>
        <span class="nickname">情报系</span>
        <span class="label">科技</span>
        <div class="action"></div>
        <div class="tips" v-if="iscollection">收藏于：3-19</div>
      </div>
      
    </div>
    <div class="cover">
      <img src="" alt="" />
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
    },
    hanletext:{
      type:String,
      default:'取消收藏'
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
.postitem {
 
  height: 132px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f4f5f7;
  .item_content {
    overflow: hidden;
    flex: 1;
    .tips{
      font-size: 12px;
      margin-left: 728px;
      color: #97a2ab;
    }
    .title {
      font-size: 20px;
      color: #212121;
      cursor: pointer;
      margin: 0;
      &:hover {
        color: #00a1d6;
      }
    }
    .brief {
      font-size: 12px;
      color: #99a2aa;
      margin-top: 8px;
    }
    .ctx{
      position: relative;
      .hanle{
        position:absolute;
        right: 30px;
        bottom: 0;
        cursor: pointer;
      }
    }
    .info {
      display: flex;
      font-size: 12px;
      align-items: center;
      color: #99a2aa;
      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: bisque;
        overflow: hidden;
        cursor: pointer;
      }
      .nickname {
        margin: 0 25px;
        cursor: pointer;
      }
    }
  }
  .cover {
    width: 117px;
    height: 88px;
    border-radius: 6px;
    background-color: aqua;
  }
}
</style>