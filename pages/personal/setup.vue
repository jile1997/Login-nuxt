<template>
  <div class="setup">
    <div class="title">修改密码</div>
    <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        
        <!--  <a-form-model-item
          has-feedback
          label="旧密码"
          prop="password"
        >
          <a-input-password
            v-model="ruleForm.OldPassword"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item> -->
         <a-form-model-item
          has-feedback
          label="新密码"
          prop="password"
        >
          <a-input-password
            v-model="ruleForm.NewPassword"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item label="验证码" prop="code">
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input v-model="ruleForm.code" autocomplete="off" />
            </a-col>
            <a-col :span="12">
              <a-button @click="getcode" :disabled="regbtn">获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 2 }">
          <a-button :loading="loading" type="primary" @click="submitForm('ruleForm')">
            保存
          </a-button>
        </a-form-model-item>
        
      </a-form-model>
  </div>
</template>

<script>
export default {
  data(){
    return{
      regbtn:false,
      ruleForm:{
       NewPassword:'',
       OldPassword:'',
       code:''
      },
      rules: {
        
      },
      layout: {
        labelCol: { span: 2},
        wrapperCol: { span: 12 },
      },
      loading:false
    }
  },
  methods:{
    getcode(){

    },
    submitForm(){
      this.loading= true
    }
  }
}
</script>

<style lang="scss" scoped>
.setup{
    padding: 40px;
    padding-left: 30px;
    border: 1px solid #fafafa;
    border-radius: 10px;
    background-color: white;
    .title{
        font-size: 20px;
        padding-left: 10px;
        margin-bottom: 20px;
    }
}
</style>