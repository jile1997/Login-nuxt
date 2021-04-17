<template>
  <div class="talk_item">
    <div class="center">
      <a-menu @click="menuClick" v-model="current" mode="horizontal">
        <a-menu-item key="all">全部</a-menu-item>
        <a-menu-item key="app">电影</a-menu-item>
        <a-menu-item key="alipay">电视剧</a-menu-item>
      </a-menu>
      <nuxt-child :key="$route.path"></nuxt-child>
    </div>
    <div class="right">
      <Ranking />
    </div>
  </div>
</template>

<script>
import Public from '@/components/Public/index.vue'
import PostItem from '@/components/talks/PostItem.vue'
import Ranking from '@/components/talks/Ranking.vue'
export default {
  data() {
    return {
        spinning:true,
        current:'all',
    }
  },
  mounted(){
      setTimeout(()=>{
          this.spinning = false
      },1000)
  },
  components: {
    Public,
    PostItem,
    Ranking,
  },
  methods: {
    callback() {},
    getlist() {},
    menuClick({ item, key, keyPath }){
     
    },
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a-button>上一页</a-button>
      } else if (type === 'next') {
        return <a-button>下一页</a-button>
      }
      return originalElement
    },
  },
}
</script>

<style lang="scss" scoped>
.talk_item {
  display: flex;
}
.center {
  width: 680px;
  margin-right: 40px;
  .ant-tabs-tab-active {
    color: #2faee3;
  }
  .ant-tabs-ink-bar {
    background-color: #2faee3;
  }
  .pages {
    margin-top: 40px;
  }
}
</style>