<template>
  <div class="personal">
      <div class="user_head">
        <div class="user">
          <div class="avatar">
            <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=94ibfNqX8Sruo8IZ6wXS73Q&s=140&t=1607061484" alt="">
          </div>
          <div class="right">
            <div class="nickname">
              及乐1997
              <a-icon type="man" style="color:#00a1d6"/>
              <!-- <a-icon type="woman" style="color:#FB7299" /> -->
            </div>
            <span class="signature">行路难</span>
          </div>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li v-for="item in navlist" :key="item.id" :class="item.id == current?'active':''" @click="Jump(item)">
            <nuxt-link :to="item.path" no-prefetch>
            <svg-icon :icon-class="item.svg" class-name="svg" :style="{fontSize:item.size}"/>
            <span>{{item.content}}</span>
            </nuxt-link>
          </li>
        </ul>
        <nuxt-child :key="$route.path"></nuxt-child>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navlist:[
        {id:1,svg:'home',content:'主页',size:'19px',path:'/personal'},
        {id:2,svg:'tougao',content:'文章',size:'17px',path:'/personal/article'},
        {id:3,svg:'shoucang',content:'收藏',size:'20px',path:'/personal/collection'},
        {id:4,svg:'dianzan',content:'点赞',size:'18px',path:'/personal/likes'},
        // {id:5,svg:'reply',content:'回复',size:'17px',path:'/personal/likes'},
        {id:6,svg:'shezhi',content:'设置',size:'18px',path:'/personal/setup'},
      ]
    }
  },
  computed:{
    current(){
      for(let item of this.navlist){
        if(this.$route.path == item.path){
          return item.id
        }else{
          if(new RegExp(item.path).test(this.$route.path) && item.path != '/personal'){
            return item.id
          }
        }
      }
    }
  },
  methods:{
    Jump(item){

      this.$router.push(item.path)
    }
  },
  mounted(){
    document.body.style.backgroundColor = '#F4F5F7'
  }
}
</script>

<style lang="scss" scoped>
.nav{
  width: 66%;
  margin: 0 auto;
  height: 66px;
  background-color: white;
  border-radius:0 0 8px 8px;
  
  /* color: #00A1D6; */
  ul{
    padding: 0;
    display: flex;
    align-items: center;
    padding-left: 40px;
    li{
      list-style: none;
      margin-right: 40px;
      padding: 0 6px;
      height: 66px;
      display: flex;
      align-items: center;
      cursor: pointer;
      a{
        color: #1a1a1a;
      }
      span{
        margin-left: 10px;
        font-size: 14px;
      }
      &:hover{
        border-bottom: 3px solid #00A1D6;
      }
    }
    .active{
      border-bottom: 3px solid #00A1D6;
    }
   
  }
}
.user_head{
  width: 66%;
  height: 240px;
  margin: 0 auto;
  position: relative;
  &::before{
    content: "";
    position: absolute;
    background: url(/img/bg_profile.jpg) no-repeat;
    background-size: cover;
    background-position: center;
    top:0;
    left: 0;
    width: 100%;
    height: 240px;
    filter: blur(2px);
  }
  .user{
    position: absolute;
    bottom:40px;
    left:40px;
    display: flex;
    align-items: center;
    .avatar{
      width: 66px;
      height: 66px;
      border: 2px solid white;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      img{
        width: 66px;
      }
    }
    .right{
      margin-left: 30px;
      width: 120px;
      .nickname{
        font-size: 18px;
        font-weight: 700;
        color: white;
      }
      .signature{
        color: #d6dee4;
        font-size: 12px;
      }
    }

  }
}
</style>