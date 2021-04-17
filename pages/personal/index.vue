<template>
  <div class="home_page">
    
    <div class="left">
      <div class="title"><span></span> 个人信息</div>
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="昵称" prop="nickname">
          <a-input v-model="ruleForm.nickname"  autocomplete="off" allow-clear />
        </a-form-model-item>
        <a-form-model-item has-feedback label="头像" prop="nickname">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                更换头像
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item has-feedback label="个性签名" prop="signature">
           <a-textarea
           allow-clear
            v-model="ruleForm.signature"
            placeholder="我就是我颜色不一样的烟火！"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="性别" prop="sex">
            <a-radio-group  button-style="solid" v-model="ruleForm.sex">
            <a-radio-button value="male">
              男
            </a-radio-button>
            <a-radio-button value="female">
              女
            </a-radio-button>
            <a-radio-button value="secrecy">
              保密
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback label="生日" prop="birthdays">
          <a-date-picker placeholder="生日" v-model="ruleForm.birthdays" valueFormat="YYYY-MM-DD HH:mm:ss" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
          <a-button  type="primary" @click="submitForm('ruleForm')">
            保存
          </a-button>
        </a-form-model-item>
        
      </a-form-model>
    </div>
    <div class="right">
      <div class="signin">
        <a-icon type="bell"  />
        <span>点击领取今天的签到奖励!</span>
      </div>

      <div class="write">
          <a-button type="link" block size="large" icon="edit">
            <nuxt-link to="/contribute" no-prefetch>
             创作中心
            </nuxt-link>
           
          </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ruleForm:{
        nickname: '',
        avatar:'',
        signature:'',
        birthdays:'',
        sex:'secrecy'
      },
      rules: {
        
      },
      layout: {
        labelCol: { span: 2},
        wrapperCol: { span: 14 },
      },
      loading:false
    }
  },
  methods:{
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    submitForm(){

    }
  }
}
</script>

<style lang="scss" scoped>
.home_page {
  display: flex;
  border: 1px solid #fafafa;
  justify-content: space-between;
  .right{
    width: 19%;
    
    .signin{
      height: 70px;
      border-radius: 10px;
      background-color: white;
      display: flex;
      font-size: 13px;
      justify-content: center;
      align-items: center;
      span{
        cursor: pointer;
      }
    }
    .write{
      height: 110px;
      border-radius: 10px;
      margin-top: 20px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
     /*  .bg{
        width: 120px;
        height: 34px;
        background: url(/img/icon_createCenters.png) no-repeat;
        background-size: 120px 34px;
      } */
    }

  }
  .left {
    width: 80%;
    padding: 40px;
    background-color: white;
    border-radius: 10px;
    .title{
        font-size: 20px;
        padding-left: 10px;
        margin-bottom: 20px;
     /*  display: flex;
      align-items: center;

      span{
        width: 2px;
        height: 18px;
        border-radius: 1px;
        background-color: #00a1d6;
        margin-right: 10px;
      } */
    }
  }
  
}
</style>