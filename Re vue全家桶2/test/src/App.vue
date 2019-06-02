<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br/>
    <!-- 编程式导航 -->
    <div>
      <button @click="Comein">前进</button>
      <button @click="goBack">后退</button>
      <button @click="goHome">返回首页</button>
    </div>
    <!-- url传递参数 通过$route.params接收 -->
    <router-link to="/">HelloWorld</router-link> |
    <router-link to="/params/小君君/18">Params</router-link> |
    <!-- 重定向 -->
    <router-link to="/goHome">goHome</router-link> |
    <router-link to="/goParams/大君君/20">goParams</router-link> |
    <!-- alias别名的使用 实现重定向效果 -->
    <router-link to="/Hi3">Hi3</router-link> |
    <router-link to="/tnsihy">tnsihy</router-link>
    <!-- 单页面多路由操作 -->
    <!-- 路由的动画效果 用transition包裹router-view -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <router-view name="left" style="background-color:#ccc;float:left;height:250px;width:50%"></router-view>
    <router-view name="right" style="background-color:#f0f;float:left;height:250px;width:50%"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack () {
      // 编程式导航
      this.$router.go(-1)
    },
    Comein () {
      this.$router.go(1)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  opacity: 0;
  transition:opacity .5s;
}
</style>
