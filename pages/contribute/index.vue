<template>
  <div class="theypost">
    <div class="editor">
      <div
        :class="1 == current ? 'active item' : 'item'"
        style="margin-right: 40px"
        @click="changeEditor(1)"
      >
        富文本
      </div>
      <div
        :class="2 == current ? 'active item' : 'item'"
        @click="changeEditor(2)"
      >
        Markdown
      </div>
    </div>
    <div class="mark" v-if="current == 2">
      <div class="main">
        <input
          type="text"
          v-model="title"
          placeholder="请输入标题(建议30字以内)"
          class="input_tit"
        />
        <Md ref="md" />
        <div style="margin: 8px 8px; font-size: 14px; color: #000">
          请选择文章分类
        </div>
        <template v-for="tag in tags">
          <a-checkable-tag
            :key="tag._id"
            :checked="selectedTags.indexOf(tag._id) > -1"
            @change="(checked) => handleChange(tag, checked)"
          >
            {{ tag.name }}
          </a-checkable-tag>
        </template>
        <div style="margin: 8px 8px; font-size: 14px; color: #000">
          设置封面图
        </div>
        <a-upload
          list-type="picture-card"
          class="avatar-uploader"
          style="margin: 8px 8px"
          :show-upload-list="false"
          :customRequest="upload"
        >
          <img class="upImg" v-if="imgurl" :src="imgurl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">封面图</div>
          </div>
        </a-upload>
        <a-button type="primary" style="margin: 8px 8px" @click="published"> 发布文章 </a-button>
      </div>
    </div>
    <div class="center" v-else>
      <div class="main">
        <input
          type="text"
          v-model="title"
          placeholder="请输入标题(建议30字以内)"
          class="input_tit"
        />
        <Editor ref="editor" />

        <div style="margin: 8px 8px; font-size: 14px; color: #000">
          请选择文章分类
        </div>
        <template v-for="tag in tags">
          <a-checkable-tag
            :key="tag._id"
            :checked="selectedTags.indexOf(tag._id) > -1"
            @change="(checked) => handleChange(tag, checked)"
          >
            {{ tag.name }}
          </a-checkable-tag>
        </template>
        <div style="margin: 8px 8px; font-size: 14px; color: #000">
          设置封面图
        </div>
        <a-upload
          list-type="picture-card"
          class="avatar-uploader"
          style="margin: 8px 8px"
          :show-upload-list="false"
          :customRequest="upload"
        >
          <img class="upImg" v-if="imgurl" :src="imgurl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">封面图</div>
          </div>
        </a-upload>
        <a-button type="primary" style="margin: 8px 8px" :loading="btnloading" @click="published"> 发布文章 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor/index.vue'
import Md from '@/components/Md/index.vue'
export default {
  data() {
    return {
      current: 1,
      title: '',
      tags: [],
      selectedTags: [],
      loading: false,
      btnloading:false,
      imgurl:'https://qpic.y.qq.com/music_cover/8X18GF1Yb7uV6ragKSHLl0icHC3mBACkuiajY3Sf1wG63MDwicLia0PNkg/300',
    }
  },
  async asyncData({ $axios }) {
    const tags = await $axios.$get('article/label')

    return {
      tags
    }
  },
  components: {
    Editor,
    Md,
  },
  methods: {
    handleChange(tag, checked) {
      this.selectedTags = [tag._id]
    },
    upload(info){
      let flag= this.beforeUpload(info.file)
      if(flag){
        let formData = new FormData()
        formData.append('file', info.file)
        this.$axios.post('/upload', formData).then((res) => {
          this.imgurl = res.fileUrl
        })
      }
    },
    changeEditor(val) {
      this.current = val
    },
    async published(){
      this.btnloading = true
       if(this.selectedTags.length == 0){
           this.$message.warning('文章分类不能为空!');
           this.btnloading = false
           return
       }
      if(this.current == 1){
       
        let editorCon = this.$refs.editor.getEditorData()
        let data = {
          text_content:editorCon.text,
          html_content:editorCon.html,
          cover:this.imgurl,
          title:this.title,
          class:this.selectedTags[0],
        }
        let res = await this.$axios.post('article/add',data)
        if(res.statusCode == 0){
          this.$message.success('发表成功!');
        }
        
      }else if(this.current == 2){
        let mdCon = this.$refs.md.getdata()
        let data = {
          text_content:mdCon.text,
          html_content:mdCon.html,
          cover:this.imgurl,
          title:this.title,
          class:this.selectedTags[0],
        }
        let res = await this.$axios.post('article/add',data)
        if(res.statusCode == 0){
          this.$message.success('发表成功!');
        }
      }
      this.btnloading = false
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('图片格式不合法!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2m!')
      }
      return isJpgOrPng && isLt2M
    },
  },
}
</script>

<style lang="scss" scoped>
.upImg {
  max-width: 8rem;
  height: auto;
  display: block;
  margin: 0 auto;
}
.theypost {
  width: 100%;
  height: 746px;
  overflow: hidden;
  background-color: white;
  border-radius: 0 0 10px 10px;
  .mark {
    height: 660px;
    overflow: auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .main{
        width: 1000px;
        height: 1120px;
        padding: 30px;
        box-sizing: border-box;
        border: 1px solid #e5e9ef;
        border-radius: 4px;
        .input_tit {
            width: 100%;
            height: 64px;
            color: #1a1a1a;
            font-weight: bold;
            font-size: 28px;
            border: 0;
            outline: none;
        }
    }
  }
  .center {
    margin-top: 20px;
    height: 660px;
    overflow: auto;
    display: flex;
    justify-content: center;
  }
  .main {
    width: 800px;
    padding: 30px;
    height: 1120px;
    box-sizing: border-box;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    .input_tit {
      width: 100%;
      height: 64px;
      color: #1a1a1a;
      font-weight: bold;
      font-size: 28px;
      border: 0;
      outline: none;
    }
  }
  .editor {
    width: 740px;
    margin: 0 auto;
    display: flex;
    padding-top: 10px;
    .item {
      height: 30px;
      position: relative;
      cursor: pointer;
    }
    .active {
      color: #00a1d6;

      border-bottom: 1px solid #00a1d6;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        margin-left: -3px;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 3px solid #00a1d6;
        border-top: 0;
        border-left: 3px dashed transparent;
        border-right: 3px dashed transparent;
      }
    }
  }
}
</style>