<template>
  <div class="video">
    <div class="posts">
      <ul class="nav">
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
     <!-- <div v-if="show">
          <iframe id="player" width="1200" height="500" 
          allowfullscreen="true" scrolling="no" frameborder="0" border="0" marginwidth="0" marginheight="0"
          src="http://api.baiyug.vip/index.php/m3u8-dp.php?url=https://iqiyi.cdn27-okzyw.net/20210311/9981_efb9cfd5/index.m3u8"/>
	  
      </div>
      <div>
      <iframe id="player" width="1200" height="500" 
          allowfullscreen="true" scrolling="no" frameborder="0" border="0" marginwidth="0" marginheight="0"
          src="https://api.sigujx.com/jx/?url=https://v.qq.com/x/cover/ez00dy0uu12rc4j/s0031upq5ih.html"/>
      </div> -->
    <!-- <Public type="video" model="600bc31194cefa2a9827a72d"/> -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '视频-及乐1997',
      meta: [{ hid: 'description', name: 'description', content: '热门视频' }],
    }
  },
  data() {
    return {
      navlist: [
        { id: 1, text: '电视剧', icon: 'dsj',path:'/video/tv'},
        { id: 2, text: '电影', icon: 'dianying',path:'/video/movie' },
        { id: 3, text: '动漫', icon: 'dongman' ,path:'/video/anime'},
        { id: 4, text: '综艺', icon: 'zongyi' ,path:'/video/variety'},
        { id: 5, text: '少儿', icon: 'shaoer' ,path:'/video/children'},
        { id: 6, text: '记录片', icon: 'jlp' ,path:'/video/documentary'},
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