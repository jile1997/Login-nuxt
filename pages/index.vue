<template>
  <div class="home">
    <!-- <div class="show" :style="{ '--bgImg': bgvar }"> -->
    <div class="show" :style="bg">
      <div class="banner">
        <div class="item">
          <a-carousel effect="fade" autoplay :beforeChange="onChange" ref="carousel">
            <div class="banner_item" v-for="item in banners" :key="item.id">
              <img :src="item.src" alt="" />
            </div>
          </a-carousel>
        </div>
        <div class="bg"></div>
        <div class="left_ctr" @click="$refs.carousel.prev()"></div>
        <div class="right_ctr" @click="$refs.carousel.next()"></div>
      </div>
    </div>
    <nuxt-link to="/news">我的消息</nuxt-link><br />
    <nuxt-link to="/personal">个人中心</nuxt-link><br />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '首页-及乐1997',
      meta: [{ hid: 'description', name: 'description', content: '网站首页' }],
    }
  },
  data() {
    return {
      banners: [
        {
          id: 1,
          src:
            'http://p1.music.126.net/kvz-TOxWjpLPzj2kPKL8Rw==/109951165880642101.jpg?imageView&quality=89',
          bgscr:'http://p1.music.126.net/kvz-TOxWjpLPzj2kPKL8Rw==/109951165880642101.jpg?imageView&blur=40x20'
        },
        {
          id: 2,
          src:
            'http://p1.music.126.net/CXKypjF3ZySPPI5n6TyVDQ==/109951165885506715.jpg?imageView&quality=89',
          bgscr:'http://p1.music.126.net/CXKypjF3ZySPPI5n6TyVDQ==/109951165885506715.jpg?imageView&blur=40x20'
        },
        {
          id: 3,
          src:
            'http://p1.music.126.net/NS5m1sLkISGZJacr9LQWag==/109951165880595627.jpg?imageView&quality=89',
          bgscr:'http://p1.music.126.net/NS5m1sLkISGZJacr9LQWag==/109951165880595627.jpg?imageView&blur=40x20'
        }
      ],
       bg:{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage:"url('http://p1.music.126.net/kvz-TOxWjpLPzj2kPKL8Rw==/109951165880642101.jpg?imageView&blur=40x20')",
      },
      bgvar:"url('http://p1.music.126.net/kvz-TOxWjpLPzj2kPKL8Rw==/109951165880642101.jpg?imageView&blur=40x20')",
    }
  },
  methods:{
    onChange(to,form) {
      // this.bgvar = `url(${this.banners[current].src})`
      this.bg.backgroundImage = `url(${this.banners[form].bgscr})`
      // console.log(to)
      // console.log(form)
    },
  },
  mounted(){
    document.body.style.backgroundColor = '#F4F5F7'
  }
}
</script>

<style lang="scss" scoped>
.show {
  width: 100%;
  height: 300px;
  /* position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: var(--bgImg);
    background-size: 6000px;
    background-repeat: no-repeat;
    background-position: center center;
    filter: blur(10px);
  } */
  .banner {
    width: 982px;
    margin: 0 auto;
    position: relative;
    .item{
      width: 730px;
    }
    .banner_item {

      img {
        width: 730px;
        display: block;
        height: 300px;
      }
    }
    .bg{
      width: 252px;
      height: 300px;
      background-color: black;
      opacity: .8;
      position: absolute;
      z-index: 99;
      right: 0;
      top: 0;
    }
    .left_ctr{
      width: 37px;
      height: 63px;
      cursor: pointer;
      background: url(/img/arrl.png) no-repeat;
      background-size: 37px 63px;
      position: absolute;
      left: -68px;
      top: 50%;
      transform: translateY(-50%);
      transition: all 1.2s;
      &:hover{
        background-color: rgba(255,255,255,.3);
      }
    }
    .right_ctr{
      width: 37px;
      height: 63px;
      cursor: pointer;
      background: url(/img/arrr.png) no-repeat;
      background-size: 37px 63px;
      position: absolute;
      right: -68px;
      top: 50%;
      transform: translateY(-50%);
      transition: all 1.2s;
      &:hover{
        background-color: rgba(255,255,255,.3);
      }
    }
  }
}
</style>
