<template>
  <div class="music">
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
   
    <!-- <Public type="video" model="600bc31194cefa2a9827a72d"/> -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '音乐-及乐1997',
      meta: [{ hid: 'description', name: 'description', content: '推荐音乐' }],
    }
  },
  data() {
    return {
      navlist: [
        { id: 1, text: '专辑', icon: 'album',path:'/music'},
        { id: 2, text: '歌手', icon: 'singer',path:'/music/singer' },
        { id: 3, text: '歌曲', icon: 'song' ,path:'/music/song'},
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
            new RegExp(item.path).test(this.$route.path) &&
            item.path != '/music'
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