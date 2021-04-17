<template>
  <div class="article">
      <a-spin :spinning="spinning">
      <div class="list">
        <Post-Item v-for="item in 8" :key="item" :ItemObj="{width:'1100px'}" class="item" :iscollection="true" />
        
      </div>
      <!-- <a-empty style="margin:0 auto;"/> -->
      </a-spin>
      <div class="pager">
        <a-pagination
        class="pages"
        @change="getlist"
        :total="40"
        :item-render="itemRender"
      />
      </div>
  </div>
</template>

<script>
import PostItem from '@/components/talks/PostItem.vue'
export default {
  data(){
    return{
      spinning:true
    }
  },
  components: {
    PostItem,
  },
  mounted(){
    setTimeout(()=>{
      this.spinning = false
    },1000)
  },
  methods:{
    getlist(){

    },
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a-button>上一页</a-button>
      } else if (type === 'next') {
        return <a-button>下一页</a-button>
      }
      return originalElement
    },
  }
}
</script>

<style lang="scss" scoped>
.article{
  .list{
    padding-bottom: 40px;
    .item{
      margin: 30px auto 0;
      
    }

  }
  .pager{
    display: flex;
    margin-top: 40px;
    justify-content: center;
  }
  .pages{
    
  }
}
</style>