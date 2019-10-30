// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);
Vue.config.productionTip = false

import axios from "axios";
axios.defaults.baseURL="http://127.0.0.1:3000";
Vue.prototype.$http = axios;
Vue.prototype.$URL = "http://127.0.0.1:3000/upload";
import pop from "@/components/pop";
Vue.component("my-pop",pop)

//路由守卫
router.beforeEach((to,from,next)=>{
	if(to.matched.every(i=>i.path.includes("manage"))){
		let res = sessionStorage.getItem("admin")
			if(res){
				next()
			}else{
				next("/")
			}
		}else{
			next()
	}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
