<template>
  <div class="contribute">
    <div class="content">
      <ul class="nav">
        <li>文章投稿</li>
      </ul>
      <nuxt-child :key="$route.path"></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{

      }
    },
    mounted(){
      document.body.style.backgroundColor = '#F4F5F7'
    },
}
</script>

<style lang="scss" scoped>
.content{
  max-width: 1180px;
  margin: 0 auto;
  .nav{
    height: 64px;
    background-color: white;
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    padding: 0;
    margin: 0;
    margin-top: 16px;
    border-radius:4px 4px 0 0;
    li{
      list-style: none;
      font-size: 16px;
      font-weight: bolder;
      width: 90px;
      color: #31c27c;
      /* color: #00a1d6; */
      text-align: center;
      line-height: 62px;
      margin-left: 20px;
      border-bottom: 2px solid #31c27c;
    }
  }
}
</style>