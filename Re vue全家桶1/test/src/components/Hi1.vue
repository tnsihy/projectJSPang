<template>
  <h1>{{msg}}--{{$route.params.username}}--{{$route.params.id}}</h1>
</template>

<script>
export default {
  name: 'Hi1',
  data () {
    return {
      msg: 'Hi1 page'
    }
  }
}
</script>

<style scoped>
</style>
