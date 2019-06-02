// vuex是一个专门为vue.js设计的集中式状态管理架构  data中需要共用的属性
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 1
}
// 同步修改状态
const mutations = {
  add (state, n) {
    state.count += n
  },
  reduce (state) {
    state.count--
  }
}
// 过滤
const getters = {
  count: state => {
    state.count += 10
    return state.count
  }
}

// 异步修改状态
const actions = {
  // context可以理解为store本身
  addAction (context) {
    context.commit('add', 10)
  },
  //  直接把commit对象传递过来
  reduceAction ({commit}) {
    commit('reduce')
  }
}
// 暴露出去
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
