import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import manage from '@/pages/manage'
import home from '@/pages/child/home'
import user from '@/pages/child/user'
import admin from '@/pages/child/admin'
import addGoods from '@/pages/child/addGoods'
import updateGoods from '@/pages/child/updateGoods'
import goods from '@/pages/child/goods'
import order from '@/pages/child/order'
import ment from '@/pages/child/ment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      component: manage,
      children:[
      	{
      		path:"",
      		name:"home",
      		component:home
      	},
      	{
      		path:"user",
      		name:"user",
      		component:user,
      		meta:["数据管理","用户列表"]
      	},
      	{
      		path:"admin",
      		name:"admin",
      		component:admin,
      		meta:["数据管理","管理员列表"]
      	},
      	{
      		path:"addGoods",
      		name:"addGoods",
      		component:addGoods,
      		meta:["添加数据","添加商品"]
      	},
      	{
      		path:"goods",
      		name:"goods",
      		component:goods,
      		meta:["数据管理","商品列表"]
      	},
      	{
      		path:"order",
      		name:"order",
      		component:order,
      		meta:["数据管理","订单列表"]
      	},
      	{
      		path:"ment",
      		name:"ment",
      		component:ment,
      		meta:["数据管理","商家列表"]
      	},
      	{
      		path:"updateGoods",
      		name:"updateGoods",
      		component:updateGoods,
      		meta:["数据管理","修改商品"]
      	}
      ]
    }
  ]
})