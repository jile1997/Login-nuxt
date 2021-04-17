<template>
    <span key="comment-basic-dislike">
        <a-tooltip title="收藏">
        <a-icon
            type="star"
            :theme=" status ? 'filled' : 'outlined'"
            @click="toggle"
            :style="styleObj" 
        />
        </a-tooltip>
        <span style="padding-left: '10px';cursor: 'auto'">
        {{counts === 0?'':counts}}
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
            status:false,
            counts:0
        }
    },
    mounted(){

    },
    methods:{
        async getStatus(){
            let params = {
                type:this.type,
                model:this.model,
                hanle:'star'
            }
            if(this.$store.state.user.token){
                let res = await this.$axios.get('action/status',{ params })
                this.status = res.status
                this.counts = res.counts
            }else{
                let res = await this.$axios.get('action/counts',{ params })
                this.counts = res.counts
            }
        },
        async toggle(){
            let params = {
                type:this.type,
                model:this.model,
                hanle:'star'
            }
            let res = await this.$axios.post('action/star',params)
            this.status = res.status
            this.counts = res.counts
        },
    }
}
</script>

<style>

</style>