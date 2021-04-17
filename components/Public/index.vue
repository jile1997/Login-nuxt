<template>
  <div class="public">
      
      <a-comment>
        <a-avatar
            slot="avatar"
            :src="$store.state.user.avatar?$store.state.user.avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
            :alt="$store.state.user.nickname?$store.state.user.nickname:'Han Solo'"
        />
        <div slot="content" class="content">
            <a-form-item>
            <a-textarea placeholder="发表你的评论" :rows="4" v-model ="content" id="input" />
            </a-form-item>
            <a-form-item>
            <a-button  @click="showDialog = !showDialog" style="margin-right:20px;">😃表情</a-button>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                发表评论
            </a-button>
            
            <no-ssr>
                <div class="emoji">
                    <VEmojiPicker  v-show="showDialog" @select="selectEmoji" />
                </div>
            </no-ssr>
            </a-form-item>
      </div>
    </a-comment>
    <a-spin :spinning="spinning">
    <a-list
    class="comment-list"
    :header="`${publicCount} 评论`"
    item-layout="horizontal"
    :data-source="list"
    :rowKey="getRowKey"
    >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-comment :author="item.user.nickname" :avatar="item.user.avatar" style="width:100%;">


        <template slot="actions">
            <Islike type ="public" :model ="item._id"/>
            <span key="comment-basic-reply-to" @click="toreply(item._id,item.user.nickname,item.user._id,'public')">回复</span>
        </template>


        <p slot="content">
          {{ item.content }}
        </p>
        <a-tooltip slot="datetime" :title="item.datetime">
          <span>{{ item.time }}</span>
        </a-tooltip>

            <a-comment v-for="reply in item.replys" :key="reply._id">
                <template slot="actions">
                    <Islike type ="reply" :model ="reply._id"/>
                    <span key="comment-basic-reply-to" @click="toreply(item._id,reply.form_user.nickname,reply.form_user._id,'reply')">回复</span>
                </template>
                <a-tooltip slot="datetime" :title="reply.datetime">
                    <span>{{ reply.time }}</span>
                </a-tooltip>
                <a slot="author"><span>{{reply.form_user.nickname}}</span>
                <span v-if="reply.to_user._id != item.user._id"><b>&nbsp; 回复: &nbsp;</b>
                <span style="color:#00a1d6">@{{reply.to_user.nickname}}</span></span></a>
                <a-avatar
                    slot="avatar"
                    :src="reply.form_user.avatar"
                    :alt="reply.form_user.nickname"
                />
                <p slot="content">
                    {{reply.reply_content}}
                    
                </p>
            </a-comment>
            
            <span v-if="item.replys.length < item.replyCount && item.see">共{{item.replyCount}}条回复,<span style="color:#00a1d6;cursor: pointer;" 
            @click="seereplay(item._id,index)">点击查看</span></span>
            <a-pagination v-if="!item.see" hideOnSinglePage v-model="childPage" @change="replist(item._id,index,$event)" :defaultPageSize="4" size="small" :total="item.replyCount" />

            
            
            <div  v-if="public_id == item._id">
                <a-form-item>
                <a-textarea :placeholder="'回复@ '+ to_name + ':'" :rows="4" v-model ="childcontent" id="childinput" />
                </a-form-item>
                <a-form-item>
                <a-button  @click="childDialog = !childDialog" style="margin-right:20px;">😃表情</a-button>
                <a-button html-type="submit" :loading="childsub" type="primary" @click="handleSubmit_child(item._id,index)">
                    发表评论
                </a-button>
                
                <no-ssr>
                    <div class="emoji">
                        <VEmojiPicker  v-show="childDialog" @select="selectEmoji_child" />
                    </div>
                </no-ssr>
                </a-form-item>
            </div>
        </a-comment>
    </a-list-item>
    </a-list>
    </a-spin>
    <a-pagination v-if="list.length>0" v-model="pubPage" @change="publiclist" :defaultPageSize="8" :total="publicCount" :item-render="itemRender" />
    <div class="bg" v-show="showDialog || childDialog" @click="showDialog = false;childDialog=false"></div>
  </div>
</template>

<script>
import Islike from './islike'

export default {
    props:{
        type: {
            type: String,
            required: true
        },
        model:{
            type:String,
            required:true
        }
    },
    components:{
        Islike
    },
    data(){
        return{
            showDialog: false,
            content:'',
            submitting: false,

            
            childDialog:false,
            childcontent:'',
            childsub:false,

            to_name:'Han',
            public_id:null,

            list:[],
            publicCount:0,

            pubPage:1,
            childPage:1,
            to_user:'',
            reply_type:'',

            spinning:false
        }
    },
    mounted(){
        this.getpublic()
    },
    methods:{
        getRowKey(row) {
            return row._id;
        },
        async getpublic(page = 1){
            this.spinning = true
            let params = {
                type:this.type,
                model:this.model,
                currentPage:page
            }
            let res= await this.$axios.get('public',{params})
            let list = res.data

            list.forEach(item=>{
                item.see = true
                item.time = this.$dayjs(item.createdAt).fromNow()
                item.datetime = this.$dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
                if(item.replys.length > 0){
                    item.replys.forEach(r=>{
                        r.time = this.$dayjs(r.createdAt).fromNow()
                        r.datetime = this.$dayjs(r.createdAt).format('YYYY-MM-DD HH:mm:ss')
                    })
                }
            })
            this.list = list
            this.publicCount = res.counts
            this.spinning= false
        },
       
        itemRender(current, type, originalElement) {
            if (type === 'prev') {
                return <a-button >上一页</a-button>;
            } else if (type === 'next') {
                return <a-button >下一页</a-button>;
            }
            return originalElement;
        },
        setcon(emoji,el){
            let input = document.getElementById(el)
            let startPos = input.selectionStart
            let endPos = input.selectionEnd
            let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
            input.value = resultText
            input.focus()
            input.selectionStart = startPos + emoji.data.length
            input.selectionEnd = startPos + emoji.data.length
            return resultText
        },
        selectEmoji(emoji) {
           let res = this.setcon(emoji,'input')
           this.content = res
        },
        async handleSubmit(){
            if(!this.$store.state.user.token){
                this.$message.warning('未登陆,请先登陆')
                return 
            }
            this.submitting = true
            let body = {
                type:this.type,
                model:this.model,
                content:this.content
            }
            await this.$axios.post('public',body)
            this.submitting = false
            this.content = ''
            this.getpublic(this.pubPage)
        },
        async handleSubmit_child(id,index){
            if(!this.$store.state.user.token){
                this.$message.warning('未登陆,请先登陆')
                return 
            }
            this.childsub = true
            let body = {
                public:this.public_id,
                reply_content:this.childcontent,
                to_user:this.to_user,
                reply_type:this.reply_type
            }
            await this.$axios.post('public/reply',body)
            this.childsub = false
            this.childcontent = ''
            this.replist(id,index,this.childPage)
        },
        selectEmoji_child(emoji){
            let res = this.setcon(emoji,'childinput')
            this.childcontent = res
        },
        toreply(Publicid,toName,toUser,type){
            this.public_id = Publicid
            this.to_name = toName
            this.to_user = toUser
            this.reply_type = type
        },
        async seereplay(id,index){
            let res = await this.$axios.get(`public/reply?id=${id}`)
            this.$set(this.list[index],"see",false)
            this.$set(this.list[index],"replys",res.data)
        },
        publiclist(page){
            this.getpublic(page)
        },
        async replist(id,index,page){
            let params = {
                id:id,
                currentPage:page
            }
            let res = await this.$axios.get('public/reply',{params})
            this.$set(this.list[index],"replys",res.data)
        },
    }
}
</script>

<style lang="scss" scoped>
/deep/#InputSearch{
    display: none;
}
/deep/#EmojiPicker{
    z-index: 30;
    background-color: white;
    position: absolute;
}
/deep/#Categories{
    background-color: white;
}
.public{
    width: 900px;
    margin: 0 auto;
    padding-bottom: 60px;
    .bg{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
    }
    .emoji{
        position: relative;
    }
    .content{
        /* border-bottom:1px #e8e8e8 solid; */
    }
}
</style>