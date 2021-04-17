<template>
  <div class="album">
    <a-spin :spinning="spinning">
    <div class="list">
     <Album-Item v-for="item in 15" :key="item" class="item" :iscollection="true"/>
    
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
import AlbumItem from '@/components/musics/AlbumItem.vue'
export default {
  data(){
    return{
      spinning:true
    }
  },
  components: {
    AlbumItem
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
.album{
  
  .list{
    display: flex;
    flex-wrap: wrap;
    padding-left: 45px;
    .item{
      margin: 20px;
    }
  }
  .pager{
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }
}
</style>