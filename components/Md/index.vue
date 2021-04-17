<template>
  <div>
    <!-- <div  class="markdown-body"   v-html="markdown_html"/> -->
    <no-ssr>
      <mavon-editor
        :imageFilter="imgoption"
        fontSize="16px"
        style="min-height: 500px;z-index: 99;"
        :boxShadow="false"
        v-model="content"
        ref="md"
        @save="save"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @change="change"
      />
    </no-ssr>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    return {
      content: '',
      html: '',
      mdhtml: '',
    }
  },
  methods: {
    imgoption(file) {
      if (file.size > 3 * 1024 * 1024) {
        this.$message.warning('图片最大只能为3m')
        return false
      }
      return true
    },
    $imgAdd(pos, $file) {
      let formData = new FormData()
      formData.append('file', $file)
      this.$axios.post('/upload', formData).then((res) => {
        this.$refs.md.$img2Url(pos, res.fileUrl)
      })
    },
    $imgDel(pos) {
      console.log(pos)
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      
      this.html = render
    },
    getdata(){
      let reg = /<\/?.+?>/g
      let text = this.html.replace(reg,"")
      return {html:this.html,text}
    },
    save(render) {
      this.mdhtml = render
      this.$message.success('保存成功')
    },
  },
}
</script>

<style>
</style>