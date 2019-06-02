<template>
  <div>
    <h4>{{msg}}</h4>
    <hr>
    <!-- $store.state取值 -->
    <h4>{{$store.state.count}}</h4>
    <!-- 直接取值 -->
    <h4>{{count}}</h4>
    <p>
      <!-- <button @click="$store.commit('add')">+</button>
      <button @click="$store.commit('reduce')">-</button>-->
      <!-- 写了这个methods: mapMutations(['add', 'reduce']),后可简化 -->
      <button @click="add(10)">+</button>
      <button @click="reduce()">-</button>
    </p>
    <p>
      <button @click="addAction(10)">+</button>
      <button @click="reduceAction">-</button>
    </p>
  </div>
</template>

<script>
import store from '@/vuex/store'
// 简化
// eslint-disable-next-line standard/object-curly-even-spacing
import { mapState, mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: 'Count',
  data () {
    return {
      msg: 'Count page'
    }
  },
  computed: {
    // 第一种方法：
    //   {
    //     count () {
    //       return this.$store.state.count
    //     }
    //   },
    // 第二种方法：使用mapState
    //   mapState({
    //     count: state => state.count
    //   }),
    // 第三种方法：使用mapState 数组
    ...mapState(['count']),
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  },
  store
}
</script>

<style scoped>
</style>
