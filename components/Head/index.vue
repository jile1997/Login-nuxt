<template>
  <div>
      <div class="head">
    <div class="nav">
      <div class="logo">
        <svg-icon icon-class="cat" class-name="svg" />
        <span>长路漫漫</span>
      </div>
      <div class="link">
        <nuxt-link
          v-for="item in nav"
          :key="item.id"
          :to="item.path"
          no-prefetch
          active-class="active"
          :exact="item.path == '/' ? true : false"
        >
          <span>{{ item.name }}</span>
          <a-icon :type="item.icon" theme="filled" />
        </nuxt-link>
      </div>
      <div class="other">
        <a-input
          placeholder="视频/音乐/话题/..."
          v-model="search"
          allowClear
          class="input"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
        <div class="user">
          <nuxt-link to="/personal" no-prefetch>
          创作中心
          </nuxt-link>
        </div>

        <a-popover placement="bottom" v-if="$store.state.user.avatar">
          <template slot="content">
            <div class="drop"><a-icon type="user" /><span>
              <nuxt-link to="/personal" no-prefetch>
              个人主页
              </nuxt-link>
              </span>
              
            </div>
            <div class="drop">
              <a-icon type="message" /><span><nuxt-link to="/news" no-prefetch>我的消息</nuxt-link></span
              ><a-badge :count="$store.state.app.unreadNum" />
            </div>
            <div class="drop">
              <a-icon type="setting" /><span><nuxt-link to="/personal/setup" no-prefetch>设置</nuxt-link></span>
            </div>
            <div class="drop" @click="loginout">
              <a-icon type="poweroff" /><span>退出</span>
            </div>
          </template>
          <a-badge :count="$store.state.app.unreadNum" dot>
            <div class="avatar">
              <img :src="$store.state.user.avatar" alt="avatar" />
            </div>
          </a-badge>
        </a-popover>
        <span v-else class="login" @click="gologin">登陆</span>
      </div>
    </div>
    <a-modal
      v-model="$store.state.app.visible"
      :title="title"
      on-ok="handleOk"
      :footer="null"
      @cancel="handcancel"
      :mask="false"
      :dialog-style="{ top: '200px' }"
      :width="528"
      :maskClosable="false"
      :afterClose="close"
    >
      <div style="display: flex" v-if="type == 'defalut'">
        <div
          style="width: 50%; border-right: 1px dashed #ccc; padding-right: 16px"
        >
          <div
            style="height: 120px; background: url(/img/platform.png) no-repeat"
          ></div>
          <a-button
            block
            style="margin-top: 10px"
            type="primary"
            @click="handlogin"
            >登陆</a-button
          >
          <a-button block style="margin-top: 20px" @click="handreg"
            >注册</a-button
          >
        </div>
        <div
          style="
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <div style="display: flex; align-items: center">
            <img
              style="width: 38px; height: 38px"
              src="~/assets/img/wx.png"
              alt="wx"
            />
            <a style="margin-left: 20px" href="">微信登陆</a>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center">
            <img
              style="width: 38px; height: 38px"
              src="~/assets/img/qq.png"
              alt="qq"
            />
            <a style="margin-left: 20px" href="">QQ登陆</a>
          </div>
        </div>
      </div>
      <a-form-model
        v-else
        ref="loginform"
        :model="loginform"
        :title="title"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        @submit.prevent="handleSubmit"
        :rules="loginrules"
      >
        <a-form-model-item has-feedback label="邮箱" prop="email">
          <a-input v-model="loginform.email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          label="密码"
          prop="password"
          help="忘记密码请登陆APP进行修改"
        >
          <a-input-password
            v-model="loginform.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-item
          v-if="type == 'login'"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-checkbox v-model="loginform.check"> 记住我 </a-checkbox>
        </a-form-item>
        <a-form-model-item label="验证码" prop="code" v-else-if="type == 'reg'">
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input v-model="loginform.code" autocomplete="off" />
            </a-col>
            <a-col :span="12">
              <a-button @click="getcode" :disabled="regbtn">{{
                content
              }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-item :wrapper-col="formTailLayout.wrapperCol">
          <a-button html-type="submit" type="primary" :loading="loading">
            {{ title }}
          </a-button>
          <a-button
            style="margin: 0 8px"
            @click="
              type = 'defalut'
              title = '登陆'
            "
          >
            返回
          </a-button>
        </a-form-item>
      </a-form-model>
    </a-modal>
  </div>
<!--   <div class="_nav">

  </div> -->
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}
const formTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
}
export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      let reg = /^.+@.+\..{2,4}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确!'))
      }
    }

    return {
      user: {
        avatar: null,
      },
      nav: [
        { id: 1, path: '/', name: '发现好玩', icon: 'compass' },
        { id: 2, path: '/video', name: '视频', icon: 'youtube' },
        { id: 3, path: '/music', name: '音乐', icon: 'customer-service' },
        { id: 4, path: '/talk', name: '话题', icon: 'instagram' },
      ],
      search: '',
      visible: false,
      title: '登陆',
      type: 'defalut',
      formItemLayout,
      formTailLayout,
      loginform: {
        email: '',
        password: '',
        check: true,
        code: '',
      },
      loading: false,
      loginrules: {
        email: [
          { required: true, message: '请输入邮箱!', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码!', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码!', trigger: 'blur' }],
      },
      regbtn: false,
      codetime: 180,
      content: '获取验证码',
      title: '登陆',
    }
  },
  created() {},
  mounted() {
    let code = sessionStorage.getItem('sendcode')
    if (code && +new Date() - code < 180000) {
      this.content = '1分钟后重新获取'
      this.regbtn = true
      setTimeout(() => {
        this.regbtn = false
        sessionStorage.removeItem('sendcode')
      }, 60000)
    }

    if (this.$store.state.user.token) {
      this.$store.dispatch('app/getUnreadnum')
    }
  },
  methods: {
    getunreads() {},
    loginout() {
      this.user.avatar = ''
      this.$store.dispatch('user/logout')
    },
    gologin() {
      // this.visible = true
      this.$store.commit('app/SET_MODAL', true)
    },
    clear() {
      this.$nextTick(() => {
        this.loginform.email = ''
        this.loginform.password = ''
        this.loginform.code = ''
        this.$refs.loginform.resetFields()
      })
    },
    getcode() {
      if (this.regbtn) return

      this.$refs.loginform.validateField('email', (errorMessage) => {
        if (errorMessage) {
          this.$message.info(errorMessage)
        } else {
          this.regbtn = true
          this.$axios.get(`user/getcode/${this.loginform.email}`)
          sessionStorage.setItem('sendcode', +new Date())
          this.content = this.codetime + 's后重新发送'
          let clock = setInterval(() => {
            this.content = this.codetime + 's后重新发送'
            this.codetime--
            if (this.codetime < 0) {
              this.regbtn = false
              this.content = '重新发送验证码'
              this.codetime = 180
              clearInterval(clock)
              sessionStorage.removeItem('sendcode')
            }
          }, 1000)
        }
      })
    },
    handlogin() {
      this.title = '登陆'
      this.type = 'login'
      this.clear()
    },
    handreg() {
      this.title = '注册'
      this.type = 'reg'
      this.clear()
    },
    handleOk() {},
    handcancel() {
      this.$store.commit('app/SET_MODAL', false)
    },
    close() {},
    handleSubmit(e) {
      this.loading = true
      let res
      this.$refs['loginform'].validate(async (valid) => {
        if (valid) {
          if (this.type == 'login') {
            res = await this.$store.dispatch('user/login', this.loginform)
            await this.$store.dispatch('user/getInfo')
            if (res.statusCode == 0) {
              //this.visible = false
              this.$store.commit('app/SET_MODAL', false)
              //this.user.avatar = this.$store.state.user.avatar
              this.$message.success('登陆成功,开启美好的一天吧!')
              this.$store.dispatch('app/getUnreadnum')
            }
          } else if (this.type == 'reg') {
            res = await this.$axios.post('user/register', this.loginform)
            if (res.statusCode == 0) {
              this.type = 'login'
              this.title = '登陆'
              this.$message.success('注册成功!')
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.drop {
  display: flex;
  height: 30px;
  margin: 4px 0;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 8px;
    a{
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
/* ._nav{
  height: 34px;
  background-color: #C20C0C;
} */
.head {
  background-color: #242424;
  height: 66px;
  border-bottom: 2px solid #00a1d6;
  .nav {
    max-width: 1200px;
    height: 66px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 200px;
      color: #ebcc61;
      display: flex;
      align-items: center;
      cursor: pointer;
      .svg {
        font-size: 28px;
        margin-left: 15px;
        transform: rotateY(180deg);
      }

      span {
        font-size: 22px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .link {
      flex: 1;
      display: flex;
      height: 66px;
      justify-content: center;
      a {
        width: 130px;
        display: flex;
        color: #ccc;
        line-height: 66px;
        justify-content: center;
        align-items: center;
        span {
          margin-right: 8px;
        }
        &:hover {
          background-color: #000;
          border-bottom: 2px solid #6eceff;
          /* border-bottom: 2px solid #00a1d6; */
          transition: all 0.3s;
        }
      }
      .active {
        color: white;
      }
    }
    .other {
      display: flex;
      align-items: center;
      .input {
        border-radius: 18px;
        overflow: hidden;
        width: 240px;

        /deep/.ant-input {
          font-size: 12px;
        }
      }
      .user {
        width: 100px;
        margin: 0 20px;
        border-radius: 16px;
        padding: 10 20px;
        text-align: center;
        line-height: 31px;
        color: #ccc;
        border: 1px solid #4f4f4f;
        font-size: 12px;
        cursor: pointer;
        a{
          color: #ccc;
        }
        &:hover {
          color: white;
          border-color: white;
        }
      }
      .avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 34px;
        }
      }
      .login {
        width: 70px;
        color: #787878;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>