<template>
  <div class="news_center">
    <div class="new">
      <div class="type">
        <p>
          <svg-icon icon-class="aircraft" class-name="svg" /><span
            >我的消息</span
          >
        </p>
        <ul>
          <li
            v-for="item in meun"
            :key="item.id"
            :class="item.id == current ? 'active' : ''"
            @click="chengtype(item.type, item.id,item)"
          >
            <!-- <nuxt-link :to="item.path" no-prefetch> -->
            {{ item.text }}
            <!-- </nuxt-link> -->
          </li>
        </ul>
      </div>
      <nuxt-child :key="$route.path"></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '我的消息-及乐1997',
      meta: [{ hid: 'description', name: 'description', content: '我的消息' }],
    }
  },
  data() {
    return {
      meun: [
        { id: 0, text: '回复我的', type: 'reply',path:'/news'},
        { id: 1, text: '收到的赞', type: 'likes',path:'/news/likes'},
        { id: 2, text: '系统通知', type: '', path:''},
        { id: 3, text: '我的消息', type: '',path:''},
      ],
    }
  },
  computed:{
    current(){
      let page = this.meun.find(item=>item.path == this.$route.path)
      return page.id
    }
  },
  methods: {
    chengtype(val, id,item) {
      setTimeout(() => {
        this.spinning = false
      }, 1000)
      if (val == '') {
        this.$message.warning('苦逼程序员正在开发中~')
      } else {
        this.$router.push(item.path)
       
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.news_center {
  width: 100%;
  height: calc(100vh - 66px);
  background: url(/img/login-background3.png) no-repeat;
  background-size: cover;
  .new {
    display: flex;
    margin: 0 auto;
    width: 1103px;
    justify-content: space-between;
  }
  .type {
    width: 140px;
    height: calc(100vh - 66px);
    background-color: white;
    opacity: 0.7;
    box-shadow: 0 2px 4px 0 #edf8fd;
    p {
      height: 62px;
      font-weight: 600;
      text-align: center;
      font-size: 15px;
      line-height: 62px;
      cursor: pointer;
      span {
        margin-left: 6px;
      }
    }
    ul {
      li {
        height: 40px;
        color: #6b757b;
        font-weight: 600;
        cursor: pointer;
        
      }
    }
    .active {
      color: #2faee3
      
    }
  }
 
}
</style>