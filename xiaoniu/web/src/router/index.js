import Vue from 'vue'
import Router from 'vue-router'
import index from "@/pages/index"
import order from "@/pages/order"
import server from "@/pages/server"
import user from "@/pages/user"
import list from "@/pages/list"
import detail from "@/pages/detail"
import reg from "@/pages/reg"
import login from "@/pages/login"
import shopcar from "@/pages/shopcar"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/server',
      name: 'server',
      component: server
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    }
  ]
})
