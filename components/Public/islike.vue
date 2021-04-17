<template>
    <span>
        <span key="comment-basic-like" style="padding-right:14px" v-if="showlike">
            <a-tooltip title="顶">
            <a-icon 
                type="like" 
                :theme="islike =='like' ? 'filled' : 'outlined'" 
                @click="like"
                :style="styleObj" 
            />
            </a-tooltip>
            <span style="padding-left: '10px';cursor: 'auto'">
            {{likeCounts === 0?'':likeCounts}}
            </span>
        </span>
        <span key="comment-basic-dislike" style="padding-right:14px" v-if="showdislike">
            <a-tooltip title="踩">
            <a-icon
                type="dislike"
                :theme="islike =='dislike' ? 'filled' : 'outlined'"
                @click="dislike"
                :style="styleObj" 
            />
            </a-tooltip>
            <span style="padding-left: '10px';cursor: 'auto'">
            {{disLikeCounts === 0?'':disLikeCounts}}
            </span>
        </span>
    </span>
</template>

<script>
export default {
    props:{
        styleObj:{
            type:Object,
            default:()=>{
                return{
                    fontSize: '12px'
                }
            }
        },
        showlike:{
            type:Boolean,
            default:true
        },
        showdislike:{
            type:Boolean,
            default:true
        },
        type: {
            type: String,
            required: true
        },
        model:{
            type:String,
            required:true
        }

    },
    data(){
        return{
            islike:null,
            likeCounts:0,
            disLikeCounts:0
        }
    },
    mounted(){
       this.getCount()
    },
    methods:{
        async action(hanle){
            let params = {
                type:this.type,
                model:this.model,
                hanle:hanle
            }
            let res = await this.$axios.post(`action/${hanle}`,params)
            this.likeCounts = res.likes
            this.disLikeCounts = res.dislikes
        },
        like(){
            if(!this.$store.state.user.token){
                this.$message.warning('未登陆,请先登陆')
                return 
            }
            this.islike = 'like'
            this.action('like')
        },
        dislike(){
            if(!this.$store.state.user.token){
                this.$message.warning('未登陆,请先登陆')
                return 
            }
            this.islike = 'dislike'
            this.action('dislike')

        },
        async getCount(){
            let params = {
                type:this.type,
                model:this.model
            }
            if(this.$store.state.user.token){
                if(this.showlike){
                    let res = await this.$axios.get('action/status',{params:{...params,hanle:'like'}})
                    if(res.status){
                        this.islike = 'like'
                    }
                    this.likeCounts = res.counts
                }
                if(this.showdislike){
                    let res = await this.$axios.get('action/status',{params:{...params,hanle:'dislike'}})
                    if(res.status){
                        this.islike = 'dislike'
                    }
                    this.disLikeCounts = res.counts
                }

            }else{ 
                let res = await this.$axios.get('action/islike',{params:params})
                this.likeCounts = res.likes
                this.disLikeCounts = res.dislikes
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>