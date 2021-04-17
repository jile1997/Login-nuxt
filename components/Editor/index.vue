<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>

<script>
import emojiJSON from '@/assets/js/qq.json'
export default {
  data() {
    return {
      editorContent: '',
      editorhtml: '',
      editor: null,
      emojiJSON: emojiJSON,
    }
  },

  mounted() {
    this.createEditor()
  },
  methods: {
    createEditor() {
      const editor = new wangEditor(this.$refs.editor)
      editor.config.height = 400
      // editor.config.placeholder = '开始编辑...'
      /* editor.config.onchange = (newHtml) => {
        this.editorContent = newHtml
      } */
      editor.config.customAlert = function (s, t) {
        switch (t) {
          case 'success':
            this.$message.success(s)
            break
          case 'info':
            this.$message.info(s)
            break
          case 'warning':
            this.$message.warning(s)
            break
          case 'error':
            this.$message.error(s)
            break
          default:
            this.$message.info(s)
            break
        }
      }
      editor.config.zIndex = 99
      editor.config.menuTooltipPosition = 'down'
      editor.config.onchangeTimeout = 500
      editor.config.emotions.unshift({
        title: '经典表情',
        type: 'image',
        content: this.emojiJSON,
      })
      /* editor.config.uploadImgServer = process.env.SERVER_URL + 'uploads'
      editor.config.uploadImgMaxSize = 3 * 1024 * 1024
      editor.config.uploadImgMaxLength = 5
      editor.config.uploadFileName = 'files'
      editor.config.uploadImgHeaders = {
        "Authorization" :"Bearer " + this.$store.state.user.token
      }
      editor.config.uploadImgTimeout = 60 * 1000 */
      editor.config.uploadImgMaxSize = 3 * 1024 * 1024
      editor.config.uploadImgMaxLength = 5
      editor.config.customUploadImg = (resultFiles, insertImgFn) => {
        if (resultFiles.lenght > 5) {
          this.$message.warning('一次最多只能上传5张!')
          return
        }
        let formData = new FormData()
        for (let item of resultFiles) {
          formData.append('files', item)
        }
        this.$axios.post('/uploads', formData).then((res) => {
          for (let img of res.fileUrls) {
            insertImgFn(img)
          }
        })
      }

      editor.config.showLinkImgAlt = false
      editor.config.showLinkImgHref = false

      /* editor.config.uploadVideoServer = '/upload'
      editor.config.uploadVideoName = 'file'
      editor.config.uploadVideoHeaders = {
        "Authorization" :"Bearer " + this.$store.state.user.token
      } */
      editor.config.uploadVideoMaxSize = 30 * 1024 * 1024
      editor.config.customUploadVideo = (resultFiles, insertVideoFn) => {
        if (resultFiles.lenght > 1) {
          this.$message.warning('一次最多只能上传1个并且不能大于30m!')
          return
        }
        let formData = new FormData()
        formData.append('file', resultFiles[0])
        this.$axios.post('/upload', formData).then((res) => {
          insertVideoFn(res.fileUrl)
        })
      }

      editor.create()
      this.editor = editor
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      let text = this.editor.txt.text()
      return {html:data,text}
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
}
</script>

<style>
</style>