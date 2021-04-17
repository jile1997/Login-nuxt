<template>
  <div class="collection">
    <div class="nav">
      <div class="title">我的收藏</div>
      <div
        v-for="item in navlist"
        :key="item.id"
        :class="item.id == current ? 'active item' : 'item'"
      >
        <nuxt-link :to="item.path" no-prefetch>
          {{ item.text }}
        </nuxt-link>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navlist: [
        { id: 1, text: '视频', path: '/personal/collection' },
        { id: 2, text: '文章', path: '/personal/collection/article' },
        { id: 3, text: '专辑', path: '/personal/collection/album'},   
        { id: 4, text: '歌曲', path: '/personal/collection/song' },
      ],
    }
  },
  computed: {
    current() {
      for (let item of this.navlist) {
        if (this.$route.path == item.path) {
          return item.id
        } else {
          if (
            new RegExp(item.path).test(this.$route.path) &&
            item.path != '/personal/collection'
          ) {
            return item.id
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.collection {
  padding: 40px;
  padding-left: 30px;
  border: 1px solid #fafafa;
  border-radius: 10px;
  background-color: white;
  .nav {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .item {
      margin-left: 18px;
      position: relative;
      height: 24px;
      a {
        color: #1a1a1a;
      }
    }
    .active {
      a {
        color: #00a1d6;
      }
      border-bottom: 1px solid #00a1d6;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        margin-left: -3px;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 3px solid #00a1d6;
        border-top: 0;
        border-left: 3px dashed transparent;
        border-right: 3px dashed transparent;
      }
    }
  }
}
</style>