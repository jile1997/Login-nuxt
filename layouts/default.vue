<template>
  <div>
    <Head />
    <a-config-provider :locale="locale">
      <nuxt />
    </a-config-provider>
  </div>
</template>

<script>
import Head from '@/components/Head'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  components: {
    Head,
  },
  data(){
    return{
      locale: zhCN
    }
  }
}
</script>

<style>
body {
  background-color: #F4F5F7;
}
.line_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.multiline_text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
