<template>
  <div id="app">
    <img src="./assets/logo.png">
    <br>
    <router-link to="/">HelloWorld</router-link> |
    <router-link to="/Hi">Hi</router-link> |
    <!-- 第二种方法传参： -->
    <router-link :to="{name:'Hi/Hi1',params:{username:'Tom',id:'888'}}">Hi1</router-link> |
    <router-link to="/Hi/Hi2">Hi2</router-link>
    <!-- 第一种方法：使用name传参 -->
    <p>{{$route.name}}</p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
