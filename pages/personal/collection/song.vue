<template>
  <div class="song">
    <a-table :columns="columns" :data-source="tabledata" :pagination="false" :loading="loading">

        <nuxt-link to="/" no-prefetch slot="name" slot-scope="text">{{ text}}</nuxt-link>
        <span slot="customTitle">
            <!-- <a-icon type="heart" />  -->
            <a-icon type="customer-service" />
            歌曲
        </span>
        
        <div slot="cover_img" slot-scope="cover">
            <img :src="cover" alt="" style="width:46px;height:46px;display:block;">
        </div>

        <div slot="solt_singer" slot-scope="singer">
            <nuxt-link to="/" no-prefetch >{{singer}}</nuxt-link>
        </div>

        <div slot="solt_album" slot-scope="album">
            <nuxt-link to="/" no-prefetchp >{{album}}</nuxt-link>
        </div>

        <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
            <a-tooltip>
                <template slot="title">
               添加播放
                </template>
                <a-button type="primary" shape="circle" @click="save(record)" icon="play-circle" size="small">
                <!-- 添加播放 -->
                </a-button>
            </a-tooltip>
           
            <a-tooltip>
                <template slot="title">
               取消收藏
                </template>
                <a-button type="danger" shape="circle" @click="save(record)" icon="delete" size="small" >
                    <!-- 取消收藏 -->
                </a-button>
            </a-tooltip>

            
        </div>
        </template>
    </a-table>
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

export default {
    data(){
        return{
            loading:true,
            columns:[
                {
                    dataIndex: 'name',
                    key: 'name',
                    slots: { title: 'customTitle' },
                    scopedSlots: { customRender: 'name' },
                },
                {
                    dataIndex: 'cover',
                    key: 'cover',
                    title:'封面图',
                    scopedSlots: { customRender: 'cover_img' },
                },
               {
                    dataIndex: 'singer',
                    key: 'singer',
                    title:'歌手',
                    scopedSlots: { customRender: 'solt_singer' },
                },
                {
                    dataIndex: 'album',
                    key: 'album',
                    title:'专辑',
                    scopedSlots: { customRender: 'solt_album' },
                },
                {
                    dataIndex: 'duration',
                    key: 'duration',
                    title:'时长',
                },
                {
                    dataIndex:'time',
                    key:'time',
                    title:'收藏于'
                },
                {
                    dataIndex: 'operation',
                    key:'operation',
                    title: '操作',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            tabledata:[
                {
                    key: '1',
                    name: 'John Brown',
                    cover:'http://y.gtimg.cn/music/photo_new/T002R90x90M000002i2n680vNDOw.jpg',
                    singer:'周杰伦',
                    album:'迷人花思',
                    duration:'08:41',
                    time:'收藏于：3-19'
                },
                {
                    key: '2',
                    name: 'John Brown',
                    cover:'http://y.gtimg.cn/music/photo_new/T002R90x90M000002i2n680vNDOw.jpg',
                    singer:'周杰伦',
                    album:'迷人花思',
                    duration:'08:41',
                    time:'收藏于：3-19'
                },
                {
                    key: '3',
                    name: 'John Brown',
                    cover:'http://y.gtimg.cn/music/photo_new/T002R90x90M000002i2n680vNDOw.jpg',
                    singer:'周杰伦',
                    album:'迷人花思',
                    duration:'08:41',
                    time:'收藏于：3-19'
                },
            ]
        }
    },
    methods:{
        save(val){
            console.log(val)
        },
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
    },
    mounted(){
      setTimeout(()=>{
        this.loading = false
      },1000)
    }
}
</script>

<style lang="scss" scoped>
.song{
    .pager{
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }
}
</style>