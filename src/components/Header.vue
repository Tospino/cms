<template>
  <div id="nav">
    <div class="main clearfix contentWidth">
      <div class="logo fl" @click="toHome">
        <img src="/logo.png" alt="">
      </div>
      <ul class="fl navGroup">
        <router-link :to="{name: 'home'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">首页</a>
          </li>
        </router-link>
        <router-link :to="{name: 'flow'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">入驻流程</a>
          </li>
        </router-link>
        <router-link :to="{name: 'cost'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">资质资费</a>
          </li>
        </router-link>
        <router-link :to="{name: 'news'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">新闻中心</a>
          </li>
        </router-link>
        <router-link :to="{name: 'rules'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">平台规则</a>
          </li>
        </router-link>
        <router-link :to="{name: 'help'}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
            <a :href="href" @click="navigate">商家帮助中心</a>
          </li>
        </router-link>
        <router-link :to="{name: ''}" v-slot="{ href, route, navigate, isActive, isExactActive }">
          <li class="navItem" :class="[isExactActive && 'router-link-exact-active']">
            <a href="http://suppliers.tospino.com" target="_blank">卖家平台</a>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="less">
#nav {
  width: 100%;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.2);
  .main {
    height: 86px;
    .logo {
      height: 100%;
      display: inline-block;
      cursor: pointer;
      img {
        height: 100%;
      }
    }
    .navGroup {
      height: 100%;
    }
    .navItem {
      height: 100%;
      display: inline-block;
      box-sizing: border-box;
      padding: 40px 30px 0 30px;
      a {
        color: #000;
        text-decoration: none;
      }
    }
    .router-link-active{
      border-bottom: 2px solid #dd2222;
      & a {
        color: #dd2222!important;
      }
    }
  }
}
</style>
