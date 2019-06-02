<template>
    <div>
        {{msg}}--{{$route.params.username}}--{{$route.params.age}}
    </div>
</template>

<script>
export default {
  name: 'Params',
  data () {
    return {
      msg: 'Params Page'
    }
  },
  // 在模板中写钩子函数 beforeRouteEnter
  beforeRouteEnter: (to, from, next) => {
    console.log('准备进入params路由模板')
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('准备离开params路由模板')
    next()
  }
}
</script>

<style scoped>
</style>
