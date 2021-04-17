<template>
  <div class="talk">
    <div class="posts">
      <ul class="nav">
        <!-- <p>话题专栏</p> -->
        <li
          v-for="item in navlist"
          :key="item.id"
          :class="item.id == current ? 'active' : ''"
          @click="changeform(item)"
        >
          <nuxt-link :to="item.path" no-prefetch>
          <svg-icon :icon-class="item.icon" class-name="svg" />
          <span>{{ item.text }}</span>
          </nuxt-link>
        </li>
      </ul>
      <nuxt-child :key="$route.path"></nuxt-child>
    </div>
   
    <!-- <Public type="video" model="600bc31194cefa2a9827a72d"/> -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '话题-及乐1997',
      meta: [{ hid: 'description', name: 'description', content: '热门话题' }],
    }
  },
  data() {
    return {
      navlist: [
        { id: 1, text: '影视', icon: 'yingshi',path:'/talk/film'},
        { id: 2, text: '程序人生', icon: 'code',path:'/talk/code' },
        { id: 3, text: '二次元', icon: 'acg' ,path:'/talk/acg'},
        { id: 4, text: '生活', icon: 'life' ,path:'/talk/life'},
        { id: 5, text: '科技', icon: 'keji' ,path:'/talk/science'},
        { id: 6, text: '游戏', icon: 'game' ,path:'/talk/game'},
        { id: 7, text: '情感', icon: 'qinggan' ,path:'/talk/emotion'},
        { id: 8, text: '校园', icon: 'school' ,path:'/talk/school'},
      ],
    }
  },
  computed:{
    current() {
      for (let item of this.navlist) {
        if (this.$route.path == item.path) {
          return item.id
        } else {
          if (
            new RegExp(item.path).test(this.$route.path)
          ) {
            return item.id
          }
        }
      }
    },
  },
  methods: {
    changeform(item){
      this.$router.push(item.path)
    }
  },
  mounted(){
    document.body.style.backgroundColor = '#ffffff'

  },
  beforeDestroy(){
    // document.body.style.backgroundColor = '#F4F5F7'
   
  }
}
</script>

<style lang="scss" scoped>
.posts {
  width: 1180px;
  min-height: 600px;
  margin: 0 auto;
  display: flex;
  padding: 30px 0;
  .nav {
    width: 180px;
    padding: 0;
    padding-top: 40px;
    li {
      list-style: none;
      height: 40px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #222;
      cursor: pointer;
      a{
        color: #222;
      }
      .svg {
        font-size: 20px;
      }
      span {
        margin-left: 20px;
      }
    }
    .active {
      color: #2faee3;
      a{
        color: #2faee3;
      }
    }
    p {
      font-size: 20px;
      font-weight: 600;
      color: #2faee3;
    }
  }
}
</style>