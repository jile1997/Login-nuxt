<template>
  <div class="video">
    <a-spin :spinning="spinning">
    <div class="list">
      <Video-Item v-for="item in 15" :key="item" class="item" :iscollection="true"/>
      
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
import VideoItem from '@/components/videos/VideoItem.vue'
export default {
  data(){
    return{
      spinning:true
    }
  },
  mounted(){
    setTimeout(()=>{
      this.spinning = false
    },1000)
  },
  components: {
    VideoItem
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
.line_texts {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video{
  margin-top: 20px;
  margin-left: 12px;
  padding-bottom: 40px;
  .list{
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-right: 30px;
      margin-top: 30px;
    }
  }

   .pager{
    display: flex;
    margin-top: 40px;
    justify-content: center;
  }
}
</style>