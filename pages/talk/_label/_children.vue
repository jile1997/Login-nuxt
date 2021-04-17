<template>
  <div>
    <a-spin :spinning="spinning">
        {{$route.params}}
        <Post-Item v-for="item in 8" :key="item" />
        </a-spin>
        <a-pagination
          class="pages"
          @change="getlist"
          :total="40"
          :item-render="itemRender"
        />
    
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

<style scoped>
.pages {
    margin-top: 40px;
}
</style>