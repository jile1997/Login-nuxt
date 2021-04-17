<template>
        <div class="content">
        <div class="title"><span>回复我的</span></div>
        <a-spin :spinning="spinning">
          <div class="list">
            <div class="empty" v-if="newlist.length == 0">
              <a-empty description="然而并没有数据" />
            </div>
            <div v-else>
              <div class="list_item">
                <div class="avatar"></div>
                <div class="right">
                  <div class="top">
                    <span class="nickname">及乐1997</span>
                    <span class="reply line_text"
                      >回复了我的评论"你代码怎么写的？"</span
                    >
                  </div>
                  <div class="center multiline_text">谢谢，过奖啦[抱拳]</div>
                  <div class="bottom">
                    <span>2021年2月27日 23:10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
        <!-- <a-pagination v-model="current" :total="50" show-less-items style="margin-top:30px;"/> -->
      </div>
</template>

<script>
export default {
    data(){
        return{
            spinning: true,
            newlist: ['1'],
            type: 'reply',
            indicator: <a-icon type="loading" style="font-size: 24px" spin />,
        }
    },
     mounted(){
      setTimeout(()=>{
          this.spinning = false
      },1000)
  },
}
</script>

<style lang="scss" scoped>
.content {
    width: 950px;
    height: 600px;
    padding-top: 10px;
    .title {
      height: 42px;
      border-radius: 4px;
      background-color: #fff;
      font-size: 15px;
      color: #666;
      span {
        line-height: 42px;
        margin-left: 20px;
      }
    }
    .list {
      margin-top: 14px;
      background-color: white;
      min-height: 304px;
      border-radius: 4px;
      position: relative;
      .empty {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
      }
      .list_item {
        padding: 24px;
        display: flex;
        .avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: #2faee3;
        }
        .right {
          flex: 1;
          margin-left: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid #ccc;
          .top {
            width: 100%;
            overflow: hidden;
          }
          .nickname {
            color: #505050;
            font-size: 14px;
            font-weight: 600;
          }
          .reply {
            color: #505050;
            font-size: 14px;
            margin-left: 14px;
          }
          .center {
            font-size: 15px;
            margin-top: 10px;
            overflow: hidden;
          }
          .bottom {
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>