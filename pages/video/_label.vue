<template>
  <div class="video_page">
    <a-menu @click="menuClick" v-model="current" mode="horizontal">
      <a-menu-item key="mail">Navigation One</a-menu-item>
      <a-menu-item key="app">Navigation Two</a-menu-item>
      <a-sub-menu key="haha" @titleClick="submenuClick">
        <span slot="title" class="submenu-title-wrapper"
          >Navigation Three - Submenu</span
        >
          <a-menu-item key="setting:1" v-show="false">
            Option 1
          </a-menu-item>
          <a-menu-item key="setting:2">
            Option 2
          </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <nuxt-child :key="$route.path"></nuxt-child>
  </div>
</template>

<script>
export default {
  data(){
    return{
      current: ['mail'],
    }
  },
  methods:{
    submenuClick({ key, domEvent }){
     this.current = ['setting:1']
    },
    menuClick({ item, key, keyPath }){
     
    }
  }
}
</script>

<style lang="scss" scoped>
.video_page{
  width: 1000px;
}
</style>