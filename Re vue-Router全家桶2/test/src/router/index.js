import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Hi3 from '@/components/Hi3'
import Params from '@/components/Params'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  // mode的设置(history) 网址没有#号    (hash)有#号
  mode: 'history',
  routes: [
    {
      // 坑：别名请不要用在path为'/'中
      path: '/',
      name: 'HelloWorld',
      components: {
        // 单页面多路由
        default: HelloWorld,
        left: Hi1,
        right: Hi2
      }
    },
    {
      // 加正则\\d+
      path: '/params/:username/:age(\\d+)',
      name: 'Params',
      component: Params
      // 路由中的钩子 beforeEnter
      // beforeEnter: (to, from, next) => {
      // console.log(to)
      // console.log(from)
      // 1.跳转
      // next()
      // 2.跳转
      // next({path: '/'})
      // }
    },
    {
      // 重定向(无参) 网址一样
      path: '/goHome',
      redirect: '/'
    },
    {
      // 重定向(有参) 网址一样
      path: '/goParams/:username/:age(\\d+)',
      redirect: '/params/:username/:age(\\d+)'
    },
    {
      // alias别名 网址不一样
      path: '/Hi3',
      name: 'Hi3',
      component: Hi3,
      alias: '/tnsihy'
    },
    {
      // 404设置
      path: '*',
      component: Error
    }
  ]
})
